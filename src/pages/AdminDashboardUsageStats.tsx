import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from '../styles/adminDashboardUsageStats.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function AdminDashboardUsageStats() {
    const data = [
        { label: 'Undergraduate (Non-ME)', value: 206, color: '#0088FE' },
        { label: 'Undergraduate (ME)', value: 152, color: '#00C49F' },
        { label: 'Graduate', value: 74, color: '#FFBB28' },
    ];

    const settings = {
        margin: { right: 50 },
        width: 500,
        height: 500,
        hideLegend: false,
    };

    return (
        <div className={styles.container} >
            <h2 className={styles["main-heading"]}>Weekly Highlights</h2>
            <div className={styles.highlights}>
                <div className={styles.highlight}>
                    <p>Most used machine<br /><span className={styles.emphasis}>Sewing Machine</span></p>
                </div>
                <div className={styles.highlight}>
                    <p>Total Space Usage Time<br /><span className={styles.emphasis}>1,478.5 hrs</span></p>
                </div>
                <div className={styles.highlight}>
                    <p>Total Space Users<br /><span className={styles.emphasis}>432</span></p>
                </div>
            </div>
            <div className={styles.charts}>
                <div>
                    <div className={styles["chart-top-info"]}>
                        <h2>Equipment Monthly Usage Hours</h2>
                        <button type="button" className={styles["selected-equipment"]}>
                            CNC Mill
                            <KeyboardArrowDownIcon />
                        </button>
                    </div>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 7, 8, 11, 12, 13, 15, 17, 18] }]}
                        series={[
                            {
                            data: [2, 5.5, 20, 78.2, 115.3, 162.1, 200, 340, 370, 480, 562, 672],
                            },
                        ]}
                        height={500}
                    />
                </div>
                <div>
                    <h2>User Distribution</h2>
                    <PieChart
                        series={[{ innerRadius: 125, outerRadius: 200, data, arcLabel: 'value' }]}
                        {...settings}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardUsageStats;