import { useContext, useState, useEffect } from "react";
import { AppContext } from "./App";
import styles from '../styles/adminDashboard.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PeopleIcon from '@mui/icons-material/People';
import type { IssueReport } from "../types/types";
import supabase from "../lib/supabase";
import Loading from "./Loading";

function AdminDashboard() {
    const { profile } = useContext(AppContext);
    const [issueReports, setIssueReports] = useState<IssueReport[] | null>(null);
    const [labUsageTimeframe, setLabUsageTimeframe] = useState("Weekly");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssueReports = async () => {
            try {
                const { data, error } = await supabase.from('issue_reports').select();

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
                    <div className={styles.navbar}>
                        <div className={styles.tab}>
                            <p className={styles["tab-name"]}>Dashboard</p>
                            <div className={styles["hover-line"]}></div>
                        </div>
                        <div className={styles.tab}>
                            <p className={styles["tab-name"]}>My Tasks</p>
                            <div className={styles["hover-line"]}></div>
                        </div>
                        <div className={styles.tab}>
                            <p className={styles["tab-name"]}>Usage Statistics</p>
                            <div className={styles["hover-line"]}></div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <h1 className={styles.greeting}>Welcome back, {profile!["first_name"]}!</h1>
                        <div className={styles["main-content"]}>
                            <section className={styles["latest-notifications"]}>
                                <h3 className={styles["section-heading"]}>Latest Notifications</h3>
                                {
                                    issueReports?.map((issueReport) =>
                                        <div key={issueReport["issue_report_id"]} className={styles["report-card"]}>
                                            <h4>{issueReport["issue_type"]}</h4>
                                            <p>{issueReport.description}</p>
                                        </div>
                                    )
                                }
                            </section>
                            <section>
                                <div className={styles["design-lab-usage-top"]}>
                                    <h3 className={`${styles["section-heading"]} ${styles.inline}`}>Design Lab Usage</h3>
                                    <button type="button" className={styles.timeframe}>
                                        {labUsageTimeframe}
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
                            </section>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default AdminDashboard;