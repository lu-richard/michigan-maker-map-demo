import supabase from '../lib/supabase';
import { useState } from 'react';
import styles from '../styles/signIn.module.css';
import { useOutletContext, useNavigate } from 'react-router-dom';
import type { OutletContext } from '../types/types';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setSession }: OutletContext = useOutletContext();
    const navigate = useNavigate();

    // Function for signing the user in
    const signInUser = async () => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                throw new Error("Failed to sign in user");
            }

            setSession(data.session);
            navigate('/');
        }
        catch (e) {
            console.error(e);
            setErrorMessage("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Sign Into M3</h1>
                <div className={styles.question}>
                    <p>U-M Email</p>
                    <input type="email" value={email} placeholder="name@umich.edu" className={styles["text-field"]} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.question}>
                    <p>Password</p>
                    <input type="password" value={password} placeholder="Your Password" className={styles["text-field"]} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" className={styles["submit-button"]} onClick={signInUser}>Sign In</button>
                <p className={styles["error-message"]}>{errorMessage}</p>
            </div>
        </div>
    );
}

export default SignIn;