import { useContext, useState, useEffect } from "react";
import { AppContext } from "./App";
import styles from '../styles/adminDashboardHome.module.css';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import PeopleIcon from '@mui/icons-material/People';
import type { IssueReportCardData } from "../types/types";
import supabase from "../lib/supabase";
import Loading from "./Loading";
import IssueReportCard from "../components/IssueReportCard";

function AdminDashboardHome() {
    const { profile } = useContext(AppContext);
    const [issueReports, setIssueReports] = useState<IssueReportCardData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssueReports = async () => {
            try {
                const { data, error } = await supabase.from('view_issue_report_cards').select();

                if (error) {
                    throw new Error(error.message);
                }

                setIssueReports(data);
            }
            catch (e) {
                console.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchIssueReports();
    }, []);

    return (
        <>
            {
                loading ? <Loading /> :
                <>
                    <div className={styles.container}>
                        <h1 className={styles.greeting}>Welcome back, {profile!["first_name"]}!</h1>
                        {/* <div className={styles["main-content"]}> */}
                            <section className={styles["latest-notifications"]}>
                                <h2 className={styles["section-heading"]}>Latest Notifications</h2>
                                {issueReports.map((issueReportCard) => <IssueReportCard key={issueReportCard["issue_report_id"]} issueReportCard={issueReportCard} />)}
                            </section>
                            {/* <section>
                                <div className={styles["design-lab-usage-top"]}>
                                    <h2 className={`${styles["section-heading"]} ${styles.inline}`}>Design Lab Usage</h2>
                                    <button type="button" className={styles.timeframe}>
                                        Weekly
                                        <KeyboardArrowDownIcon />
                                    </button>
                                </div>
                                <div className={styles["design-lab-usage-content"]}>
                                    <div className={styles["chart-top-info"]}>
                                        <div className={styles["design-lab-usage-num-students"]}>
                                            <PeopleIcon />
                                            <p>145 people</p>
                                        </div>
                                        <div className={styles["design-lab-usage-num-students"]}>
                                            <PeopleIcon />
                                            <p>145 people</p>
                                        </div>
                                    </div>
                                    <div className={styles.chart}></div>
                                </div>
                            </section> */}
                        {/* </div> */}
                    </div>
                </>
            }
        </>
    );
}

export default AdminDashboardHome;