import { LineChart } from '@mui/x-charts/LineChart';
import styles from '../styles/adminDashboardUsageStats.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function AdminDashboardUsageStats() {
    return (
        <div className={styles.container} >
            <h2 className={styles["main-heading"]}>Weekly Highlights</h2>
            <div className={styles.highlights}>
                <div className={styles.highlight}>
                    <p>Most used machine<br /><span className={styles.emphasis}>Sewing Machine</span></p>
                </div>
                <div className={styles.highlight}>
                    <p>Total Space Usage Time<br /><span className={styles.emphasis}>143.5 hrs</span></p>
                </div>
                <div className={styles.highlight}>
                    <p>Total Space Users<br /><span className={styles.emphasis}>432</span></p>
                </div>
            </div>
            <div className={styles["chart-top-info"]}>
                <h2>Individual Equipment Usage Breakdown</h2>
                <button type="button" className={styles["selected-equipment"]}>
                    CNC Mill
                    <KeyboardArrowDownIcon />
                </button>
            </div>
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 7, 8, 11, 12, 13, 15, 17, 18] }]}
                series={[
                    {
                    data: [2, 5.5, 20, 78.2, 115.3, 162.1, 427.2, 613.9, 842.4, 1124.7, 1453.6, 2351.8],
                    },
                ]}
                height={500}
            />
        </div>
    );
}

export default AdminDashboardUsageStats;