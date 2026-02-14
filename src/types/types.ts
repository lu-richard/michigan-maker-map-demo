import type { Tables, Database } from "../../database.types";

export type MakerspaceCardData = Tables<{ schema: 'private' }, 'view_makerspace_cards'>;
export type CertificateData = Tables<{ schema: 'private' }, 'credential_summary'>;
export type EquipmentCardData = Tables<{ schema: 'private' }, 'view_equipment_cards'>;
export type IssueReportCardData = Tables<'view_issue_report_cards'>;

export type AdminCredential = Tables<'view_credentials_admin'>;
export type TrainingPrerequisites = Tables<'credential_model_prerequisites'>
export type MakerspaceCreds = Tables<'makerspace_credential_models'>;

// export interface UserCredential {
//     credential_id: string;
//     credential_name: string;
//     credential_status: string;
//     completion_date: string | null;
//     issuing_makerspace_name: string;
// }

// export type UserCredentialAdminData = Omit<Tables<'view_user_credentials_admin'>, 'user_credential_list'> & {
//     user_credential_list: UserCredential[];
// };

interface MakerspaceEquipment {
    equipment_id: string;
    equipment_name: string;
}
export type MakerspaceDetailData = Omit<Tables<'view_makerspace_detail_pages'>, 'equipment_list'> & {
    equipment_list: MakerspaceEquipment[];
};

export type EquipmentDetailData = Tables<'view_equipment_detail_pages'>;

export interface ProfileData {
    user_id: string;
    uniqname: string;
    first_name: string;
    middle_initial?: string | null;
    last_name: string;
    image_url?: string | null;
    pronouns?: string | null;
    roles: Database["public"]["Enums"]["role"][] | null;
    system_theme?: Database["public"]["Enums"]["system_theme"];
    is_grad_student?: boolean;
    locale?: Database["public"]["Enums"]["locale"];
}

export interface AppContextType {
    profile: ProfileData | null;
    setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>> | null;
    loading: boolean;
}
