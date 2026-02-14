import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function AdminDashboardUsageStatsEquipment() {
    const semesterXAxis = ["F24", "W25", "F25", "W26", "F26"];
    const dayXAxis = ['2/1', '2/2', '2/3', '2/4', '2/5', '2/6', '2/7'];

    return (
        <div className="relative mt-4">
            <div className="absolute -top-14 right-0">
                <p className="inline mr-4">Viewing stats for:</p>
                <button className="py-2 px-4 rounded-md bg-neutral-100 border border-neutral-300">CNC Mill</button>
            </div>
            <div className="grid grid-cols-6 grid-row-2 gap-4 mb-20">
                <div className="h-[35rem] relative px-6 pb-6 pt-4 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-3 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm">Tool Usage Per Semester</h4>
                    <LineChart
                        xAxis={[{ scaleType: "point", data: semesterXAxis, label: "Semester" }]}
                        yAxis={[{ min: 0, label: "Hours" }]}
                        series={[
                            {
                                showMark: false,
                                curve: "linear",
                                data: [754, 963, 842, 1103, 643],
                            },
                        ]}
                    />
                    {/* <p className="font-[Arial] absolute bottom-4 right-6 text-sm">2026</p> */}
                </div>
                <div className="h-[35rem] relative px-6 pb-6 pt-4 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-3 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm">Tool Usage Per Day</h4>
                    <BarChart
                        xAxis={[{ data: dayXAxis, label: "Day" }]}
                        series={[
                            {
                                data: [5, 6, 4.5, 7, 6.5, 4, 5.5],
                                label: "Hours"
                            },
                        ]}
                    />
                    <p className="font-[Arial] absolute bottom-4 right-6 text-sm">2026</p>
                </div>
                <div className="h-[25rem] relative px-6 pt-6 pb-16 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-2 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm mb-4">User Status Distribution</h4>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 65, label: 'User' },
                                    { id: 1, value: 15, label: 'Trainee' },
                                    { id: 2, value: 10, label: 'Mentor' },
                                    { id: 3, value: 10, label: 'Operator' },
                                ],
                                outerRadius: 125
                            },
                        ]}
                    />
                </div>
                <div className="h-[25rem] relative px-6 pt-6 pb-16 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-2 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm mb-4">Issue Reports Per Semester</h4>
                    <BarChart
                        xAxis={[{ data: semesterXAxis, label: "Semester" }]}
                        series={[{ data: [2, 1, 0, 1, 0], label: "# of Reports" }]}
                    />
                </div>
                <div className="h-[25rem] relative px-6 pt-6 pb-16 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-2 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm mb-4">Eligible Users Over Time</h4>
                    <LineChart
                        xAxis={[
                            {
                                scaleType: "linear",
                                data: Array.from({ length: 100 }, (_, i) => i),
                                min: 0,
                                max: 99,
                                label: "Semester",
                                tickInterval: [0, 20, 40, 60, 80],
                                valueFormatter: (value) => {
                                    return semesterXAxis[value] ?? "";
                                },
                            },
                        ]}
                        yAxis={[{ min: 0, label: "# of Eligible Users" }]}
                        series={[
                            {
                                showMark: false,
                                curve: "linear",
                                data:
                                    [3, 5, 7, 9, 9, 10, 11, 11, 12, 12, 13, 16, 16, 17, 19, 20, 20, 21, 25, 26, 27, 28, 29, 32, 33, 34, 34, 35, 36, 39, 39, 39, 41, 42, 43, 45, 45, 47, 49, 49, 51, 51, 55, 55, 58, 59, 59, 62, 62, 63, 64, 66, 68, 69, 69, 69, 71, 72, 74, 74, 77, 77, 78, 78, 79, 79, 80, 84, 84, 84, 90, 91, 92, 92, 92, 93, 96, 99, 100, 100, 101, 101, 101, 102, 104, 107, 109, 109, 112, 113, 113, 113, 114, 114, 116, 117, 120, 122, 122, 123],
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardUsageStatsEquipment;