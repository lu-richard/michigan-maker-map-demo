import type { Tables, Database } from "../../database.types";
// import type { Session } from '@supabase/supabase-js';

// export type Makerspace = Tables<'makerspaces'>;
// export type Equipment = Tables<'equipment'>;
// export type EquipmentModel = Tables<'equipment_models'>;
// export type Credential = Tables<'credentials'>;
// export type CredentialModel = Tables<'credential_models'>;

export type EquipmentCardData = Tables<{ schema: 'private' }, 'view_equipment_cards'>;
export type MakerspaceCardData = Tables<{ schema: 'private' }, 'view_makerspace_cards'>;

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

export interface ProfileData {
    uniqname: string;
    first_name: string;
    middle_initial: string | null;
    last_name: string;
    image_url: string | null;
    pronouns: string | null;
    roles: Database["public"]["Enums"]["role"][] | null;
    system_theme: Database["public"]["Enums"]["system_theme"];
    is_grad_student: boolean;
    locale: Database["public"]["Enums"]["locale"];
}

export interface AppContextType {
    profile: ProfileData | null;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>> | null;
    loading: boolean;
}