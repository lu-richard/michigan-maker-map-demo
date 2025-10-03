import type { Tables } from "../../database.types";
import type { Session } from '@supabase/supabase-js';

export type Makerspace = Tables<'makerspaces'>;
export type Equipment = Tables<'equipment'>;
export type EquipmentModel = Tables<'equipment_models'>;
export type Credential = Tables<'credentials'>;
export type CredentialModel = Tables<'credential_models'>;

export type EquipmentCardData = Tables<{ schema: 'private' }, 'view_equipment_cards'>;
export type MakerspaceCardData = Tables<{ schema: 'private' }, 'view_makerspace_cards'>;
export type CertificateData = Tables<{ schema: 'private' }, 'credential_summary'>;

export interface EquipmentCardProps {
    equipmentCard: EquipmentCardData;
}

export interface MakerspaceCardProps {
    makerspaceCard: MakerspaceCardData;
}

interface MakerspaceEquipment {
    equipment_id: string;
    equipment_name: string;
}
export type MakerspaceDetailData = Omit<Tables<'view_makerspace_detail_pages'>, 'equipment_list'> & {
    equipment_list: MakerspaceEquipment[];
};

export type EquipmentDetailData = Tables<'view_equipment_detail_pages'>;

export interface NavbarData {
    first_name: string;
    last_name: string;
    image_url: string | null;
}

export interface DashboardData {
    first_name: string;
    last_name: string;
}

export interface AppContextType {
    session: Session | null;
    setSession?: React.Dispatch<React.SetStateAction<Session | null>>;
    loading: boolean;
}
