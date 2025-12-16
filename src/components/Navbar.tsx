import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import { useAppContext } from '../context/AppContext';
import { useState, useEffect, useRef } from 'react';
import Logo from '../assets/pngs/logo.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// const useNavbarData = () => {
//     const [profile, setProfile] = useState<NavbarData | null>(null);
//     const [profilePhoto, setProfilePhoto] = useState("https://njbzosjkwbqlnhieyvug.supabase.co/storage/v1/object/public/profile-photos/default_pfp.png");
//     const { session } = useAppContext();

//     useEffect(() => {
//         const fetchProfilePhoto = () => {
//             if (profile!["image_url"]) {
//                 const { data: image } = supabase
//                     .storage
//                     .from('profile-photos')
//                     .getPublicUrl(profile!["image_url"]);
                
//                 setProfilePhoto(image.publicUrl);
//             }
//         };

//         fetchProfilePhoto();
//     }, []);

//     return { profile, profilePhoto };
// };

function Navbar() {
    const { profile } = useAppContext();
    const [profilePhoto, setProfilePhoto] = useState("https://njbzosjkwbqlnhieyvug.supabase.co/storage/v1/object/public/profile-photos/default_pfp.png");

    const findButtonRef = useRef<HTMLButtonElement>(null);
    const profilePhotoImgRef = useRef<HTMLImageElement>(null);
    const profileDetailPath = `/profile-detail/${profile!["user_id"]}`;

    const toggleDropdown = (ref: React.RefObject<HTMLButtonElement | HTMLImageElement | null>) => {
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

    useEffect(() => {
        const fetchProfilePhoto = () => {
            if (profile!["image_url"]) {
                const { data: image } = supabase
                    .storage
                    .from('profile-photos')
                    .getPublicUrl(profile!["image_url"]);
                
                setProfilePhoto(image.publicUrl);
            }
        };

        fetchProfilePhoto();
    }, []);
    
    return (
        <div className={styles["navbar"]}>
            <Link to='/' className={styles.logo}>
                {/* <img src={BlockM} className={styles["logo-image"]} />
                <h1 className={styles["logo-heading"]}>| Make Michigan</h1> */}
                <img src={Logo} className={styles["logo-image"]} />
            </Link>
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
                    <Link to='dashboard' className={styles["tab-link"]}>Training</Link>
                    <div className={styles["hover-line"]}></div>
                </div>
                <div className={styles.tab}>
                    <Link to='admindashboard' className={styles["tab-link"]}>Admin Dashboard</Link>
                    <div className={styles["hover-line"]}></div>
                </div>
                <div className={styles.tab}>
                    <Link to='askmaizey' className={styles["tab-link"]}>Ask MAIZEY</Link>
                    <div className={styles["hover-line"]}></div>
                </div>
                <div className={styles.tab}>
                    <Link to='blog' className={styles["tab-link"]}>Community</Link>
                    <div className={styles["hover-line"]}></div>
                </div>
                <div className={styles.tab}>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScFpee0rI46Xj1YNfye96hyqpbYxS8xYetnc2skQxjjheX99g/viewform" target="_blank" className={styles["tab-link"]}>Report an Issue</a>
                    <div className={styles["hover-line"]}></div>
                </div>
            </div>
            <div className={styles.profile}>
                <img src={profilePhoto} ref={profilePhotoImgRef} className={styles["profile-photo"]} onClick={() => toggleDropdown(profilePhotoImgRef)} />
                <div className={styles.dropdown}>
                    <div className={styles["dropdown-profile"]}>
                        <Link to={profileDetailPath}>
                            <img src={profilePhoto} className={styles["profile-photo"]} />
                        </Link>
                        <p className={styles["profile-name"]}>{profile!["first_name"]} {profile!["middle_initial"] && profile!["middle_initial"] + ". "}{profile!["last_name"]}</p>
                        <p className={styles["profile-email"]}>{profile!.uniqname}@umich.edu</p>
                        <button type="button" className={styles["sign-out-button"]} onClick={signOutUser}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;