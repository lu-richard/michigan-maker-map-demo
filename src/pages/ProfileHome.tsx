import { useAppContext } from "../context/AppContext";
// import styles from '../styles/ProfileHome.module.css';
import React, { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import type { ProfileData } from "../types/types";
import { useParams } from 'react-router-dom';
import Loading from "./Loading";
import ProfileInfo from "./ProfileInfo";
import ProfileSettings from "./ProfileSettings";
import ProfileCertifications from "./ProfileCertifications";

const useProfileHomeData = () => {
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

function ProfileHome() {
    const { profile, profilePhoto, loading } = useProfileHomeData();
    const [page, setPage] = useState<number>(0); // 0 = info, 1 = certifications, 2 = settings

    return (
        <div className="h-[80vh] py-8">
            <div className="flex items-end gap-10 border-b border-neutral-300 mb-8">
                <button
                    type="button"
                    onClick={() => setPage(0)}
                    className={`pl-8 relative pb-3 font-medium text-slate-600`}
                >
                    Profile
                </button>
                <button
                    type="button"
                    onClick={() => setPage(1)}
                    className={`relative pb-3 font-medium text-slate-600`}
                >
                    Certifications
                </button>
                <button
                    type="button"
                    onClick={() => setPage(2)}
                    className={`relative pb-3 font-medium text-slate-600"`}
                >
                    Settings
                </button>
            </div>

            {loading ? (
                <Loading />
            ) : profile ? (
                <div className="py-8 px-16">
                    {page === 0 && <ProfileInfo profilePhoto={profilePhoto} profile={profile} />}
                    {page === 1 && <ProfileCertifications />}
                    {page === 2 && <ProfileSettings />}
                </div>
            ) : (
                <p>The page you are looking for does not exist.</p>
            )}
        </div>
    );
}

export default ProfileHome;