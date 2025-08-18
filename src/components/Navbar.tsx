import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabase';
import { AppContext } from '../pages/App';
import { useState, useEffect, useContext } from 'react';

const useProfileData = () => {
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const { session } = useContext(AppContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data, error } = await supabase.from('profiles').select('first_name, last_name').eq('user_id', session!.user.id).single();

                if (error) {
                    throw new Error(`${error}`);
                }

                setFirstName(data.first_name);
                setLastName(data.last_name);
            }
            catch (e) {
                console.error(e);
            }
        };

        fetchProfile();
    }, []);

    return { firstName, lastName, session };
};

function Navbar() {
    const { firstName, lastName, session } = useProfileData();

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
            <div>
                { firstName && lastName && <p>{firstName} {lastName}</p> }
                <p>{session!.user.email}</p>
                <button type="button" onClick={signOutUser}>Sign Out</button>
            </div>
        </div>
    );
}

export default Navbar;