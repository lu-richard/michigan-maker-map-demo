import type { Tables } from "../../database.types";
import type { Session } from '@supabase/supabase-js';

export type Makerspace = Tables<'makerspaces'>;
export type Equipment = Tables<'equipment'>;
export type UserCredential = Tables<'credentials'>;
export type Profile = Tables<'profiles'>;
export interface OutletContext {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    makerspaces: Makerspace[],
    equipment: Equipment[]
};