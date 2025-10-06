import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { UserCredentialAdminData } from "../types/types";
import supabase from "../lib/supabase";
import Loading from "./Loading";
import styles from '../styles/adminProfileDetail.module.css';
import AdminCredentialListItem from "../components/AdminCredentialListItem";
import labels from "../constants/labels";
import SearchIcon from '@mui/icons-material/Search';

const useAdminProfileDetailData = () => {
    const { id } = useParams();
    const [adminProfile, setAdminProfile] = useState<UserCredentialAdminData | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSearchValue(searchValue), 500);

        return clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const { data, error } = await supabase.from('view_user_credentials_admin').select().eq('user_id', id!).maybeSingle();

                if (error) {
                    throw new Error(error.message);
                }

                setAdminProfile(data as UserCredentialAdminData | null);
            }
            catch (e) {
                console.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        };
        
        fetchAdminProfile();
    }, []);

    return { searchValue, setSearchValue, adminProfile, loading };
};

function AdminProfileDetail() {
    const { searchValue, setSearchValue, adminProfile, loading } = useAdminProfileDetailData();

    return (
        <>
            {
                loading ? <Loading /> :
                adminProfile ?
                <div className={styles.container}>
                    <h1 className={styles["main-heading"]}>View User Trainings</h1>
                    <h2 className={styles["student-name"]}>{adminProfile["first_name"]} {adminProfile["middle_initial"] && adminProfile["middle_initial"] + ". "}{adminProfile["last_name"]}</h2>
                    <div className={styles["roles"]}>
                        {adminProfile.roles?.map((role) => <p key={role} className={styles.role}>{labels[role]}</p>)}
                        <p className={`${styles.role} ${styles["modify-or-revoke"]}`}>Modify or Revoke a Certificate</p>
                    </div>
                    <div className={styles["search-bar"]}>
                        <SearchIcon />
                        <input type="text" value={searchValue} placeholder="Search by certificate name, certificate status, or completion date" className={styles["text-field"]} onChange={(e) => setSearchValue(e.target.value)} />
                    </div>
                    <div className={styles["column-names"]}>
                        <p className={styles["column-name"]}>Certificate Name</p>
                        <p className={styles["column-name"]}>Status</p>
                        <p className={styles["column-name"]}>Completion Date</p>
                        <p className={styles["column-name"]}>Name of Issuing Makerspace</p>
                        <p className={styles["column-name"]}>Quick Approve</p>
                    </div>
                    {
                        adminProfile["user_credential_list"].length === 0 ? <p className={styles["no-results-message"]}>No Certificates Yet</p> :
                        <div>
                            {adminProfile.user_credential_list.map((userCredential) => <AdminCredentialListItem key={userCredential["credential_id"]} userCredential={userCredential} />)}
                        </div>
                    }
                </div> :
                <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default AdminProfileDetail;