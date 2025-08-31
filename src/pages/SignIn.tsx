import supabase from '../lib/supabase';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/signUpIn.module.css';
import Loading from './Loading';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // const { setProfile } = useContext(AppContext);

    // Function for signing the user in
    const signInUser = async () => {
        try {
            setLoading(true);

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                throw new Error("Failed to sign in user");
            }
        }
        catch (e) {
            console.error(e);
            setErrorMessage("Login failed. Please check your credentials and try again.");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            {
                loading ? <Loading /> :
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h1>Sign In</h1>
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
                        <Link to="/signup" className={styles.redirect}>Need to create an account? Sign up here.</Link>
                    </div>
                </div>
            }
        </>
    );
}

export default SignIn;