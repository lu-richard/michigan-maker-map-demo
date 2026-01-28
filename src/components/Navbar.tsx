// import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import { useAppContext } from '../context/AppContext';
import { useState, useEffect, useRef } from 'react';
import Logo from '../assets/pngs/logo.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

    const [tabOpen, setTabOpen] = useState<number | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);

    // const toggleDropdown = (ref: React.RefObject<HTMLButtonElement | HTMLImageElement | null>) => {
    //     ref.current?.classList.toggle(styles.active);
    // };

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
        <div className="flex justify-space-between items-center pt-4 pr-12 pb-6 pl-16 bg-navy-blue text-[#fff]">
            <Link to='/' className="flex justify-center items-center">
                <img src={Logo} className="w-100" />
            </Link>
            <div className="self-end mr-12 flex justify-center items-center">
                <div className="relative group mx-8">
                    <button type="button" ref={findButtonRef} className="flex justify-center items-center" onClick={() => setTabOpen(0)}>
                        Find
                        <KeyboardArrowDownIcon className={`transition-transform ${tabOpen === 0 ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`absolute bottom-0 left-0  h-0.5 ${tabOpen === 0 ? "w-full bg-main-bg" : "w-0 bg-maize transition-all group-hover:w-full"}`}></div>
                    <div className={`absolute top-full left-0 mt-2 w-48 bg-white text-slate-900 shadow-xl rounded-lg py-2 z-2 ${tabOpen === 0 ? "block" : "hidden"}`}>
                        <Link to='map' className="block text-text py-2 px-4">Makerspace Map</Link>
                        <Link to='makerspaces' className="block text-text py-2 px-4">Search Makerspaces</Link>
                        <Link to='equipment' className="block text-text py-2 px-4">Search Equipment</Link>
                    </div>
                </div>
                <div className="relative group mx-8" onClick={() => setTabOpen(1)}>
                    <Link to='dashboard' className="text-[#fff]">Training</Link>
                    <div className={`absolute bottom-0 left-0  h-0.5 ${tabOpen === 1 ? "w-full bg-main-bg" : "w-0 bg-maize transition-all group-hover:w-full"}`}></div>
                </div>
                <div className="relative group mx-8" onClick={() => setTabOpen(2)}>
                    <Link to='admindashboard' className="text-[#fff]">Admin Dashboard</Link>
                    <div className={`absolute bottom-0 left-0  h-0.5 ${tabOpen === 2 ? "w-full bg-main-bg" : "w-0 bg-maize transition-all group-hover:w-full"}`}></div>
                </div>
                <div className="relative group mx-8" onClick={() => setTabOpen(3)}>
                    <Link to='askmaizey' className="text-[#fff]">Ask MAIZEY</Link>
                    <div className={`absolute bottom-0 left-0  h-0.5 ${tabOpen === 3 ? "w-full bg-main-bg" : "w-0 bg-maize transition-all group-hover:w-full"}`}></div>
                </div>
                <div className="relative group mx-8" onClick={() => setTabOpen(4)}>
                    <Link to='blog' className="text-[#fff]">Community</Link>
                    <div className={`absolute bottom-0 left-0  h-0.5 ${tabOpen === 4 ? "w-full bg-main-bg" : "w-0 bg-maize transition-all group-hover:w-full"}`}></div>
                </div>
                <div className="relative group mx-8" onClick={() => setTabOpen(5)}>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScFpee0rI46Xj1YNfye96hyqpbYxS8xYetnc2skQxjjheX99g/viewform" target="_blank" className="text-[#fff]">Report an Issue</a>
                    <div className={`absolute bottom-0 left-0  h-0.5 ${tabOpen === 5 ? "w-full bg-main-bg" : "w-0 bg-maize transition-all group-hover:w-full"}`}></div>
                </div>
            </div>
            <div className="relative">
                <div className="w-20 [clip-path:circle(35%)]" onClick={() => setProfileOpen((isProfileOpen) => !isProfileOpen)}>
                    <img src={profilePhoto} ref={profilePhotoImgRef} />
                </div>
                <div className={`absolute bg-main-bg text-text shadow-2xl rounded-2xl overflow-hidden -left-15 z-3 ${profileOpen ? 'max-h-none' : 'max-h-0'}`}>
                    <div className="flex flex-col justify-center items-center py-8 px-8">
                        <Link to={profileDetailPath}>
                            <img src={profilePhoto} className="w-20 [clip-path:circle(35%)]" />
                        </Link>
                        <p className="mt-1 font-medium text-5">{profile!["first_name"]} {profile!["middle_initial"] && profile!["middle_initial"] + ". "}{profile!["last_name"]}</p>
                        <p className="font-light text-[0.9rem] mb-1">{profile!.uniqname}@umich.edu</p>
                        <button type="button" className="bg-arb-blue px-4 py-3 rounded-3xl mt-4" onClick={signOutUser}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;