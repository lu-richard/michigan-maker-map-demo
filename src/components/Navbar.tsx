import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import type { NavbarData } from '../types/types';
import { AppContext } from '../pages/App';
import { useState, useEffect, useContext, useRef } from 'react';
import BlockM from '../assets/svgs/Block_M-Hex.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
    const findButtonRef = useRef<HTMLButtonElement>(null);
    const trainingButtonRef = useRef<HTMLButtonElement>(null);

    const toggleDropdown = (ref: React.RefObject<HTMLButtonElement | null>) => {
        ref.current?.classList.toggle(styles.active);
    };

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
                    <div className={styles.logo}>
                        <img src={BlockM} className={styles["logo-image"]} />
                        <h1 className={styles["logo-heading"]}>| Michigan Maker Map</h1>
                    </div>
                    <div className={styles.tabs}>
                        <div className={styles.tab}>
                            <button type="button" ref={findButtonRef} className={styles["tab-button"]} onClick={() => toggleDropdown(findButtonRef)}>
                                Find
                                <KeyboardArrowDownIcon className={styles.expand} />
                                <KeyboardArrowUpIcon className={styles.collapse} />
                            </button>
                            <div className={styles["hover-line"]}></div>
                            <div className={styles.dropdown}>
                                <Link to='map' className={styles["dropdown-option"]} onClick={() => toggleDropdown(findButtonRef)}>Makerspace Map</Link>
                                <Link to='makerspaces' className={styles["dropdown-option"]} onClick={() => toggleDropdown(findButtonRef)}>Search Makerspaces</Link>
                                <Link to='equipment' className={styles["dropdown-option"]} onClick={() => toggleDropdown(findButtonRef)}>Search Equipment</Link>
                            </div>
                        </div>
                        <div className={styles.tab}>
                            <button type="button" ref={trainingButtonRef} className={styles["tab-button"]} onClick={() => toggleDropdown(trainingButtonRef)}>
                                Training
                                <KeyboardArrowDownIcon className={styles.expand} />
                                <KeyboardArrowUpIcon className={styles.collapse} />
                            </button>
                            <div className={styles["hover-line"]}></div>
                            <div className={styles.dropdown}>
                                <Link to='dashboard' className={styles["dropdown-option"]} onClick={() => toggleDropdown(trainingButtonRef)}>My Dashboard</Link>
                            </div>
                        </div>
                        <div className={styles.tab}>
                            <Link to='askmaizey' className={styles["tab-link"]}>Ask MAIZEY</Link>
                            <div className={styles["hover-line"]}></div>
                        </div>
                        <div className={styles.tab}>
                            <Link to='blog' className={styles["tab-link"]}>Community</Link>
                            <div className={styles["hover-line"]}></div>
                        </div>
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