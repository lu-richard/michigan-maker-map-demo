import DashboardNavBar from '../components/DashboardNavBar';
import styles from '../styles/dashboard.module.css';
import { useAppContext } from '../context/AppContext';

//     const useDashboardData = () => {
//     const [profile, setProfile] = useState<DashboardData | null>(null);
//     const { session } = useAppContext();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             const userId = session?.user?.id;
//             if (!userId) return; // don't run until session exists

//             // Try sessionStorage cache first (one cache entry per user)
//             try {
//                 const cached = sessionStorage.getItem(`profile:${userId}`);
//                 if (cached) {
//                     setProfile(JSON.parse(cached));
//                     return;
//                 }
//             } catch {
//                 // ignore sessionStorage errors and continue to fetch
//             }

//             try {
//                 const { data, error } = await supabase
//                   .from('profiles')
//                   .select('first_name, last_name')
//                   .eq('user_id', userId)
//                   .single();

//                 if (error) {
//                     throw new Error(`${error}`);
//                 }

//                 setProfile(data);

//                 // store in sessionStorage so future mounts don't re-fetch
//                 try {
//                     sessionStorage.setItem(`profile:${userId}`, JSON.stringify(data));
//                 } catch {
//                     // ignore storage errors
//                 }
//             }
//             catch (e) {
//                 console.error(e);
//             }
//         };

//         fetchProfile();
//     }, [session?.user?.id]);

//     return { profile, session };
// };

function MakerProfile() {
    // const context = useContext(AppContext);
    // console.log('App context in Dashboard:', context);
    // const { profile } = context ?? {};
    // console.log('Profile data:', profile);

    const { profile } = useAppContext();
    return (
        <>
            <DashboardNavBar />
            <div className={styles.container}>
                <h1 className={styles.header}>Welcome Back, {profile?.first_name ? profile.first_name : 'User'}!</h1>
                <div className={styles.section}>
                    <h2>Stats</h2>
                    {/* write a suggestions engine for this */}
                </div>
                <div className={styles.section}>
                    <h2>Completed Trainings</h2>
                </div>
                <div className={styles.section}>
                    <h2>Eligible Trainings</h2>
                    {/* write a suggestions engine for this */}
                </div>
                <div className={styles.section}>
                    <h2>Notifications</h2>
                    {/* write a suggestions engine for this */}
                </div>
                <div className={styles.section}>
                    <h2>Issue Reports</h2>
                    {/* write a suggestions engine for this */}
                </div>
            </div>
        </>
    );
}

export default MakerProfile;