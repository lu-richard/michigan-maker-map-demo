import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import type { NavbarData } from '../types/types';
import { AppContext } from '../pages/App';
import { useState, useEffect, useContext } from 'react';

const useNavbarData = () => {
    const [profile, setProfile] = useState<NavbarData | null>(null);
    const [profilePhoto, setProfilePhoto] = useState("https://njbzosjkwbqlnhieyvug.supabase.co/storage/v1/object/public/profile-photos/default_pfp.png");
    const { session } = useContext(AppContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase.from('profiles').select('first_name, last_name, image_url').eq('user_id', session!.user.id).single();

                if (error) {
                    throw new Error(`${error}`);
                }

                setProfile(data);

                if (data["image_url"]) {
                    const { data: image } = supabase
                        .storage
                        .from('profile-photos')
                        .getPublicUrl(data["image_url"]);
                    
                    setProfilePhoto(image.publicUrl);
                }
            }
            catch (e) {
                console.error(e);
            }
        };

        fetchProfile();
    }, []);

    return { profile, profilePhoto, session };
};

function Navbar() {
    const { profile, profilePhoto, session } = useNavbarData();

    const signOutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw new Error("Failed to sign out user")
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    
    return (
        <>
            {
                profile &&
                <div className={styles["navbar"]}>
                    <div className={styles["logo"]}>
                        <h1>Michigan Maker Map</h1>
                        <h3>University of Michigan</h3>
                    </div>
                    <div className={styles.tabs}>
                        <Link to='map' className={styles.tab}>Map</Link>
                        <Link to='makerspaces' className={styles.tab}>Find a Makerspace</Link>
                        <Link to='equipment' className={styles.tab}>Find an Equipment</Link>
                        <Link to='dashboard' className={styles.tab}>My Dashboard</Link>
                        <Link to='askmaizey' className={styles.tab}>Ask MAIZEY</Link>
                        <Link to='blog' className={styles.tab}>Blog</Link>
                    </div>
                    <div className={styles.profile}>
                        <img src={profilePhoto} className={styles["profile-photo"]} />
                        <p>{profile["first_name"]} {profile["last_name"]}</p>
                        <p className={styles["profile-email"]}>{session!.user.email}</p>
                        <button type="button" onClick={signOutUser}>Sign Out</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Navbar;