import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import supabase from '../lib/supabase';

function Navbar({ session }: { session: Session | null }) {
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
            {
                session &&
                <div>
                    <p>{session.user.email}</p>
                    <button type="button" onClick={signOutUser}>Sign Out</button>
                </div>
            }
        </div>
    );
}

export default Navbar;