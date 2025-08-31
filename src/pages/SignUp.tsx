import supabase from "../lib/supabase";
import { useState, useContext } from "react";
import styles from '../styles/signUpIn.module.css';
import { AppContext } from "./App";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [uniqname, setUniqname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // const { setSession } = useContext(AppContext);

    // Funtion for signing a new user up
    const signUpUser = async () => {
        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        uniqname,
                    }
                }
            });

            if (error) {
                throw new Error(`${error}`);
            }

            // setSession!(data.session);
        }
        catch (e) {
            console.error(e);
            setErrorMessage("Sign up failed. Please check your account does not already exist and try again.");
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
                        <h1>Sign Up</h1>
                        <div className={styles.question}>
                            <p>U-M Email</p>
                            <input type="email" value={email} placeholder="name@umich.edu" className={styles["text-field"]} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className={styles.question}>
                            <p>Password</p>
                            <input type="password" value={password} placeholder="Your Password" className={styles["text-field"]} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className={styles.question}>
                            <p>First Name</p>
                            <input type="text" value={firstName} placeholder="Jane" className={styles["text-field"]} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className={styles.question}>
                            <p>Last Name</p>
                            <input type="text" value={lastName} placeholder="Doe" className={styles["text-field"]} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className={styles.question}>
                            <p>U-M Uniqname</p>
                            <input type="text" value={uniqname} placeholder="janedoe" className={styles["text-field"]} onChange={(e) => setUniqname(e.target.value)} />
                        </div>
                        <button type="button" className={styles["submit-button"]} onClick={signUpUser}>Sign Up</button>
                        <p className={styles["error-message"]}>{errorMessage}</p>
                        <Link to="/signin" className={styles.redirect}>Already have an account? Sign in here.</Link>
                    </div>
                </div>
            }
        </>
    ); 
}

export default SignUp;