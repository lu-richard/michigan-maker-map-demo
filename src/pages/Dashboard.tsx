import DashboardNavBar from '../components/DashboardNavBar';
import styles from '../styles/dashboard.module.css';
import type { DashboardData } from '../types/types';
import supabase from '../lib/supabase';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from './App';

    const useDashboardData = () => {
    const [profile, setProfile] = useState<DashboardData | null>(null);
    const { session } = useContext(AppContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase.from('profiles').select('first_name, last_name').eq('user_id', session!.user.id).single();

                if (error) {
                    throw new Error(`${error}`);
                }

                setProfile(data);

            }
            catch (e) {
                console.error(e);
            }
        };

        fetchProfile();
    }, []);

    return { profile, session };
};

function Dashboard() {
    // const context = useContext(AppContext);
    // console.log('App context in Dashboard:', context);
    // const { profile } = context ?? {};
    // console.log('Profile data:', profile);

    const { profile } = useDashboardData();
    return (
        <>
            <DashboardNavBar />
            <div className={styles.container}>
                <h1 className={styles.header}>Welcome Back, {profile?.first_name ? profile.first_name : 'User'}!</h1>
                <div className={styles.section}>
                    <h2>Completed Trainings</h2>
                </div>
                <div className={styles.section}>
                    <h2>Suggested Trainings</h2>
                    {/* write a suggestions engine for this */}
                </div>
            </div>
        </>
    );
}

export default Dashboard;