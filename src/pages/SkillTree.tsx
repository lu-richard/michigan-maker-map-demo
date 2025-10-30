import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'
import DashboardNavBar from '../components/DashboardNavBar'
import Sidebar from '../components/SkillTreeSidebar'
import { useAppContext } from '../context/AppContext' 
import type { MakerspaceCardData, MakerspaceCreds, TrainingPrerequisites } from '../types/types'

type CredentialModel = {
  credential_model_id: string
  credential_model_name: string
}

/**
 * Fetch makerspace_credential_models rows for a makerspace.
 */
export async function fetchMakerspaceCredRows(
  makerspaceId: string
): Promise<{ data: MakerspaceCreds[] | null; error: any }> {
  const { data, error } = await supabase
    .from('makerspace_credential_models')
    .select('*')
    .eq('makerspace_id', makerspaceId)
  return { data: (data as MakerspaceCreds[]) ?? null, error }
}

/**
 * Given an array of credential_model_ids, fetch credential_models rows (id + name).
 */
export async function fetchCredentialModelsByIds(
  ids: string[]
): Promise<{ data: CredentialModel[] | null; error: any }> {
  if (!ids || ids.length === 0) return { data: [], error: null }
  const { data, error } = await supabase
    .from('credential_models')
    .select('credential_model_id, credential_model_name')
    .in('credential_model_id', ids)
  return { data: (data as CredentialModel[]) ?? null, error }
}

/**
 * Given dependent credential model ids, fetch prerequisite rows (credential_model_prerequisites)
 * and then fetch the credential_models for those prerequisite ids so callers have names.
 * Returns a map keyed by dependent id: { prerequisite_ids: [...], prerequisite_models: [...] }
 */
export async function fetchPrereqsForDependentModels(dependentIds: string[]): Promise<{
  prereqMap: Record<string, { prerequisite_ids: string[]; prerequisite_models: CredentialModel[] }>
  error: any
}> {
  if (!dependentIds || dependentIds.length === 0) {
    return { prereqMap: {}, error: null }
  }

  const { data: prereqRows, error: prereqErr } = await supabase
    .from('credential_model_prerequisites')
    .select('*')
    .in('dependent_credential_model_id', dependentIds)

  if (prereqErr) return { prereqMap: {}, error: prereqErr }

  const rows = (prereqRows as TrainingPrerequisites[]) ?? []

  const map: Record<string, Set<string>> = {}
  for (const r of rows) {
    const dep = r.dependent_credential_model_id
    const prereq = r.prerequisite_credential_model_id
    if (!map[dep]) map[dep] = new Set()
    map[dep].add(prereq)
  }

  const allPrereqIds = Array.from(new Set(rows.map((r) => r.prerequisite_credential_model_id)))
  const { data: prereqModels, error: modelsErr } = await supabase
    .from('credential_models')
    .select('credential_model_id, credential_model_name')
    .in('credential_model_id', allPrereqIds.length ? allPrereqIds : [''])

  if (modelsErr) return { prereqMap: {}, error: modelsErr }

  const prereqModelsArr = (prereqModels as CredentialModel[]) ?? []

  const prereqMap: Record<string, { prerequisite_ids: string[]; prerequisite_models: CredentialModel[] }> = {}
  for (const depId of Object.keys(map)) {
    const ids = Array.from(map[depId])
    prereqMap[depId] = {
      prerequisite_ids: ids,
      prerequisite_models: prereqModelsArr.filter((m) => ids.includes(m.credential_model_id)),
    }
  }

  return { prereqMap, error: null }
}

/**
 * TrainingTree that orders nodes starting from credentials with zero prereqs
 * and prunes direct edges when a prerequisite is upstream of another prerequisite
 * (i.e. removes redundant direct connection so a dependent shows only under
 * the nearest prerequisite).
 */

// ...existing code...

function TrainingTree({
  models,
  prereqMap,
  completedIds = new Set<string>(),
}: {
  models: CredentialModel[]
  prereqMap: Record<string, { prerequisite_ids: string[]; prerequisite_models: CredentialModel[] }>
  completedIds?: Set<string>
}) {
  // Build node map (include prereq models)
  const allNodesById = new Map<string, CredentialModel>()
  models.forEach((m) => allNodesById.set(m.credential_model_id, m))
  for (const dep of Object.keys(prereqMap)) {
    for (const pm of prereqMap[dep].prerequisite_models ?? []) {
      if (!allNodesById.has(pm.credential_model_id)) allNodesById.set(pm.credential_model_id, pm)
    }
  }

  // dependent -> prereq ids
  const initialPrereqs: Record<string, string[]> = {}
  for (const dep of Object.keys(prereqMap)) initialPrereqs[dep] = Array.from(prereqMap[dep].prerequisite_ids ?? [])

  // build dependents (prereq -> Set(dependents))
  const buildDependents = (m: Record<string, string[]>) => {
    const d: Record<string, Set<string>> = {}
    for (const [dep, prereqs] of Object.entries(m)) {
      for (const p of prereqs) {
        if (!d[p]) d[p] = new Set()
        d[p].add(dep)
      }
    }
    return d
  }
  const initialDependents = buildDependents(initialPrereqs)

  // reachability helper (prereq -> dependent graph)
  const canReach = (from: string, to: string, dependents: Record<string, Set<string>>) => {
    const stack = [from]
    const seen = new Set<string>()
    while (stack.length) {
      const cur = stack.pop()!
      if (seen.has(cur)) continue
      seen.add(cur)
      for (const c of Array.from(dependents[cur] ?? [])) {
        if (c === to) return true
        stack.push(c)
      }
    }
    return false
  }

  // prune upstream prereqs (keep only nearest prerequisites)
  const prunedPrereqs: Record<string, string[]> = {}
  for (const [dep, prereqs] of Object.entries(initialPrereqs)) {
    const S = prereqs.slice()
    const keep: string[] = []
    for (const p of S) {
      const isUpstream = S.some((q) => q !== p && canReach(p, q, initialDependents))
      if (!isUpstream) keep.push(p)
    }
    prunedPrereqs[dep] = keep
  }

  // dependents after pruning
//   const dependentsPerPrereq = buildDependents(prunedPrereqs)

  // compute direct prereq counts
  const prereqCount: Record<string, number> = {}
  for (const id of Array.from(allNodesById.keys())) prereqCount[id] = 0
  for (const dep of Object.keys(prunedPrereqs)) prereqCount[dep] = prunedPrereqs[dep].length

  // compute levels: level = max(prereq level) + 1
  const levelMap: Record<string, number> = {}
  for (const id of allNodesById.keys()) levelMap[id] = 0
  let changed = true
  while (changed) {
    changed = false
    for (const [dep, prereqs] of Object.entries(prunedPrereqs)) {
      const maxPre = prereqs.reduce((acc, p) => Math.max(acc, levelMap[p] ?? 0), -1)
      const target = maxPre === -1 ? 0 : maxPre + 1
      if ((levelMap[dep] ?? 0) !== target) {
        levelMap[dep] = target
        changed = true
      }
    }
  }

  // group nodes by level and sort for stable layout
  const levels: string[][] = []
  for (const [id, lvl] of Object.entries(levelMap)) {
    if (!levels[lvl]) levels[lvl] = []
    levels[lvl].push(id)
  }
  levels.forEach((arr) =>
    arr.sort((a, b) => {
      const an = allNodesById.get(a)!.credential_model_name
      const bn = allNodesById.get(b)!.credential_model_name
      return an.localeCompare(bn)
    })
  )

  // layout grid
  const nodeW = 180
  const nodeH = 68
  const hGap = 48
  const vGap = 100
  const pad = 24

  let maxWidth = 0
  levels.forEach((lvl) => {
    const total = lvl.length * nodeW + Math.max(0, lvl.length - 1) * hGap
    if (total > maxWidth) maxWidth = total
  })

  const positions: Record<string, { x: number; y: number }> = {}
  levels.forEach((lvlNodes, lvl) => {
    const totalWidth = lvlNodes.length * nodeW + Math.max(0, lvlNodes.length - 1) * hGap
    const startX = pad + Math.max(0, (maxWidth - totalWidth) / 2)
    lvlNodes.forEach((id, idx) => {
      positions[id] = { x: startX + idx * (nodeW + hGap), y: pad + lvl * (nodeH + vGap) }
    })
  })

  const totalWidth = pad * 2 + maxWidth
  const totalHeight = pad * 2 + levels.length * nodeH + Math.max(0, levels.length - 1) * vGap

  // connectors: draw smooth cubic bezier paths routed vertically then horizontally
  const connectors: { from: { x: number; y: number }; to: { x: number; y: number } }[] = []
  for (const [dep, prereqs] of Object.entries(prunedPrereqs)) {
    for (const p of prereqs) {
      const a = positions[p]
      const b = positions[dep]
      if (!a || !b) continue
      connectors.push({
        from: { x: a.x + nodeW / 2, y: a.y + nodeH },
        to: { x: b.x + nodeW / 2, y: b.y },
      })
    }
  }

  // smooth path builder using cubic bezier through an intermediate horizontal rail (midY)
  const smoothPath = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    // if vertical-ish and same x, draw straight line
    if (Math.abs(a.x - b.x) < 4) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`

    const midY = (a.y + b.y) / 2
    // control points lie on vertical ends but aim to midY for smooth elbow
    const cp1x = a.x
    const cp1y = midY
    const cp2x = b.x
    const cp2y = midY
    return `M ${a.x} ${a.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${b.x} ${b.y}`
  }

  return (
    <div style={{ position: 'relative', width: totalWidth, minHeight: totalHeight, padding: 12 }}>
      <svg width={totalWidth} height={totalHeight} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
        {/* <defs>
          <marker id="sqArrow" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
            <rect x="0" y="1.5" width="9" height="9" rx="2" fill="#60a5fa" />
          </marker>
        </defs> */}

        {connectors.map((c, i) => (
          <path
            key={i}
            d={smoothPath(c.from, c.to)}
            stroke="#60a5fa"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            markerEnd="url(#sqArrow)"
            opacity={0.95}
          />
        ))}
      </svg>

      {/* nodes */}
      {Array.from(allNodesById.keys()).map((id) => {
        const pos = positions[id]
        const node = allNodesById.get(id)!
        const isDone = completedIds.has(id)
        return (
          <div
            key={id}
            style={{
              position: 'absolute',
              left: pos?.x ?? 0,
              top: pos?.y ?? 0,
              width: nodeW,
              height: nodeH,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                background: 'linear-gradient(180deg,#0f172a,#071033)',
                border: '2px solid rgba(96,165,250,0.16)',
                color: 'white',
                boxShadow: '0 10px 30px rgba(2,6,23,0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 10px',
                textAlign: 'center',
                fontWeight: 700,
                position: 'relative', 
              }}
            >
              {/* checkmark for completed trainings */}
              {isDone && (
                <div style={{ position: 'absolute', top: 6, right: 6, width: 20, height: 20 }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
                    <rect x="0" y="0" width="24" height="24" rx="4" fill="#10b981" />
                    <path d="M7 12.5l2.5 2.5L17 8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              <div style={{ paddingRight: isDone ? 8 : 0 }}>{node.credential_model_name}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
// ...existing code...


export default function SkillTree() {
  const { profile } = useAppContext()                               // changed code: get logged-in user
  const [selectedMakerspace, setSelectedMakerspace] = useState<MakerspaceCardData | null>(null)

  const [credentialModels, setCredentialModels] = useState<CredentialModel[] | null>(null)
  const [prereqMap, setPrereqMap] = useState<Record<string, { prerequisite_ids: string[]; prerequisite_models: CredentialModel[] }> | null>(null)
  const [credsLoading, setCredsLoading] = useState(false)
  const [credsError, setCredsError] = useState<string | null>(null)

  const [completedModelIds, setCompletedModelIds] = useState<Set<string>>(new Set())   // changed code: state for completed

  useEffect(() => {
    // Only bail out when there is no logged-in user.
    // loading completed trainings should not depend on the selected makerspace.
    if (!profile?.['user_id']) {
      setCompletedModelIds(new Set())
      return
    }

    let mounted = true

    const loadCompleted = async () => {
      try {
        const { data, error } = await supabase
          .schema('private')
          .from('credential_summary')
          .select('credential_model_id')
          .eq('recipient_user_id', profile!['user_id'])
        if (!mounted) return
        if (!error && Array.isArray(data)) {
          const ids = new Set((data as any[]).map((r) => String(r.credential_model_id)))
          setCompletedModelIds(ids)
        } else {
          setCompletedModelIds(new Set())
        }
      } catch {
        if (mounted) setCompletedModelIds(new Set())
      }
    }
    void loadCompleted()
    return () => {
      mounted = false
    }
  }, [profile?.['user_id']])
    useEffect(() => {
    let mounted = true

    if (!selectedMakerspace) {
      setCredentialModels(null)
      setPrereqMap(null)
      setCredsError(null)
      setCredsLoading(false)
      return
    }

    const loadCredentials = async () => {
      setCredsLoading(true)
      setCredsError(null)

      const { data: credsRows, error: credsRowsErr } = await fetchMakerspaceCredRows(selectedMakerspace.makerspace_id)
      if (!mounted) return

      if (credsRowsErr) {
        setCredsError(String((credsRowsErr as any)?.message ?? credsRowsErr))
        setCredentialModels([])
        setPrereqMap({})
        setCredsLoading(false)
        return
      }

      const modelIds = (credsRows ?? []).map((r: MakerspaceCreds) => r.credential_model_id)
      if (modelIds.length === 0) {
        setCredentialModels([])
        setPrereqMap({})
        setCredsLoading(false)
        return
      }

      const { data: models, error: modelsErr } = await fetchCredentialModelsByIds(modelIds)
      if (!mounted) return
      if (modelsErr) {
        setCredsError(String((modelsErr as any)?.message ?? modelsErr))
        setCredentialModels([])
        setPrereqMap({})
        setCredsLoading(false)
        return
      }
      setCredentialModels(models ?? [])

      const { prereqMap: fetchedPrereqMap, error: prereqErr } = await fetchPrereqsForDependentModels(modelIds)
      if (!mounted) return
      if (prereqErr) {
        setCredsError(String((prereqErr as any)?.message ?? prereqErr))
        setPrereqMap({})
      } else {
        setPrereqMap(fetchedPrereqMap)
      }

      setCredsLoading(false)
    }

    void loadCredentials()
    return () => {
      mounted = false
    }
  }, [selectedMakerspace])

  return (
    <>
      <DashboardNavBar />
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar onSelect={(m: MakerspaceCardData) => setSelectedMakerspace(m)} />
        <main
          style={{
            flex: 1,
            padding: 20,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',       // horizontal centering
          }}
        >
            
          {selectedMakerspace ? (
            <>
          
              <h1 style={{ marginTop: 0 }}>{selectedMakerspace.makerspace_name}</h1>

              {credsLoading && <div>Loading trainings…</div>}
              {!credsLoading && credsError && <div style={{ color: 'crimson' }}>{credsError}</div>}

              {!credsLoading && !credsError && (credentialModels ?? []).length === 0 && (
                <div style={{ color: '#666' }}>No trainings available for this makerspace.</div>
              )}

              {!credsLoading && !credsError && credentialModels && credentialModels.length > 0 && (
                <section>
                    <TrainingTree
                        models={credentialModels}
                        prereqMap={prereqMap ?? {}}
                        completedIds={completedModelIds}
                    />
                  </section>
              )}
            </>
          ) : (
            <h1>Select a makerspace from the left</h1>
          )}
        </main>
      </div>
    </>
  )
}

