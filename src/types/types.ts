import type { Tables } from "../../database.types";
import type { Session } from '@supabase/supabase-js';

export type Makerspace = Tables<'makerspaces'>;
export type Equipment = Tables<'equipment'>;
export type EquipmentModel = Tables<'equipment_models'>;
export type Credential = Tables<'credentials'>;
export type CredentialModel = Tables<'credential_models'>;
export type Profile = Tables<'profiles'>;

export interface MakerspacesById {
    [key: string]: Makerspace;
}

export interface EquipmentById {
    [key: string]: Equipment;
}

export interface EquipmentModelById {
    [key: string]: EquipmentModel;
}

interface MakerspaceCardPackage {
    building: string;
    cover_image: string | null;
    description: string | null;
    id: string;
    name: string;
    rooms: string[];
}
export interface MakerspaceCardProps {
    makerspace: MakerspaceCardPackage;
}


interface EquipmentCardPackage {
    id: string;
    name: string;
    building: string;
    rooms: string[];
    type: string;
    capabilities: string[] | null;
}
export interface EquipmentCardProps {
    equipment: EquipmentCardPackage;
}

export interface OutletContext {
    session: Session | null;
    setSession: React.Dispatch<React.SetStateAction<Session | null>>;
    makerspaces: MakerspacesById;
    equipment: EquipmentById;
    equipmentModels: EquipmentModelById;
}