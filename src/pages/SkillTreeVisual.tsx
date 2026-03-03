import type { SkillTreeContext } from '../types/types'
import { TrainingTree } from '../pages/SkillTree';
import { useOutletContext } from 'react-router-dom';

function SkillTreeVisual() {
    const { selectedMakerspace, credsLoading, credsError, credentialModels, prereqMap, completedModelIds } = useOutletContext<SkillTreeContext>();

    return (
        <div className="py-6">
            <h1 className="text-center text-xl font-semibold mb-4">{selectedMakerspace.makerspace_name}</h1>
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
        </div>
    );
}

export default SkillTreeVisual;