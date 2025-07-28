import type { Tables } from "../../database.types";
// import type { Session } from '@supabase/supabase-js';

export type Makerspace = Tables<'makerspaces'>;
export type Equipment = Tables<'equipment'>;
export type EquipmentModel = Tables<'equipment_models'>;
export type Credential = Tables<'credentials'>;
export type CredentialModel = Tables<'credential_models'>;
export type Profile = Tables<'profiles'>;
export type EquipmentCardData = Tables<'view_equipment_cards'>;

// export interface MakerspacesById {
//     [key: string]: Makerspace;
// }

// export interface EquipmentById {
//     [key: string]: Equipment;
// }

// export interface EquipmentModelById {
//     [key: string]: EquipmentModel;
// }

export interface MakerspaceCardData {
    building: string
    cover_image: string | null
    description: string | null
    makerspace_id: string
    makerspace_name: string
    rooms: string[] | null
}
export interface MakerspaceCardProps {
    makerspaceCard: MakerspaceCardData;
}


// interface EquipmentCard {
//     id: string;
//     name: string;
//     building: string;
//     rooms: string[];
//     type: string;
//     capabilities: string[] | null;
// }
export interface EquipmentCardProps {
    equipmentCard: EquipmentCardData;
}

// export interface OutletContext {
//     session: Session | null;
//     setSession: React.Dispatch<React.SetStateAction<Session | null>>;
//     makerspaces: MakerspacesById;
//     equipment: EquipmentById;
//     equipmentModels: EquipmentModelById;
// }

interface MakerspaceEquipment {
    equipment_id: string;
    equipment_name: string;
}

export type MakerspaceDetailData = Omit<Tables<'view_makerspace_detail_pages'>, 'equipment_list'> & {
    equipment_list: MakerspaceEquipment[];
};