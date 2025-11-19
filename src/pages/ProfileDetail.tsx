import { useAppContext } from "../context/AppContext";
import styles from '../styles/profileDetail.module.css';
import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import type { ProfileData } from "../types/types";
import { useParams } from 'react-router-dom';
import Loading from "./Loading";
import labels from "../constants/labels";

const useProfileDetailData = () => {
    const { id } = useParams();
    const { profile: currUserProfile } = useAppContext();
    const [profile, setProfile] = useState<ProfileData | null>(currUserProfile);
    const [profilePhoto, setProfilePhoto] = useState("https://njbzosjkwbqlnhieyvug.supabase.co/storage/v1/object/public/profile-photos/default_pfp.png");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);

                const { data, error } = await supabase.from('profiles').select('user_id, uniqname, first_name, middle_initial, last_name, image_url, pronouns, roles, system_theme, is_grad_student, locale').eq('user_id', id!).maybeSingle();

                if (error) {
                    throw new Error(error.message);
                }

                setProfile(data);
            }
            catch (e) {
                console.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        if (id !== currUserProfile!["user_id"]) {
            fetchProfile();
        }
    }, []);

    useEffect(() => {
        if (profile?.["image_url"]) {
            const { data: image } = supabase
                .storage
                .from('profile-photos')
                .getPublicUrl(profile["image_url"]);
            
            setProfilePhoto(image.publicUrl);
        }
    }, [profile]);

    return { profile, profilePhoto, loading };
};

function ProfileDetail() {
    const { profile, profilePhoto, loading } = useProfileDetailData();

    return (
        <>
            {
                loading ? <Loading /> :
                profile ?
                <div className={styles.container}>
                    <div className={styles["top-info"]}>
                        <img src={profilePhoto} className={styles["profile-photo"]} />
                        <p className={styles.name}>{profile!["first_name"]} {profile!["middle_initial"] && profile!["middle_initial"] + ". "}{profile!["last_name"]}</p>
                        {profile!.pronouns && <p className={styles.pronouns}>{profile!.pronouns}</p>}
                        <p className={styles.email}>{profile!.uniqname}@umich.edu</p>
                        {
                            profile!.roles &&
                            <div className={styles.tags}>
                                {profile!.roles.map((role) => <p key={role} className={styles.tag}>{labels[role]}</p>)}
                            </div>
                        }
                    </div>
                </div> :
                <p>The page you are looking for does not exist.</p>
            }
        </>
    );
}

export default ProfileDetail;