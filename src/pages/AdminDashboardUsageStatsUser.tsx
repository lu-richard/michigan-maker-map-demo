import { LineChart } from '@mui/x-charts/LineChart';
// import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function AdminDashboardUsageStatsUser() {
    const semesterXAxis = ["F24", "W25", "F25", "W26", "F26"];
    const dayXAxis = ['2/1', '2/2', '2/3', '2/4', '2/5', '2/6', '2/7'];

    return (
        <div className="relative mt-4">
            <div className="absolute -top-14 right-0">
                <p className="inline mr-4">Viewing stats for:</p>
                <button className="py-2 px-4 rounded-md bg-neutral-100 border border-neutral-300">johndoe</button>
            </div>
            <div className="grid grid-cols-6 grid-row-2 gap-4 mb-20">
                <div className="h-[35rem] relative px-6 pb-6 pt-4 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-3 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm">Student - Facility Usage Per Semester</h4>
                    <LineChart
                        xAxis={[{ scaleType: "point", data: semesterXAxis, label: "Semester" }]}
                        yAxis={[{ min: 0, label: "Hours" }]}
                        series={[
                            {
                                showMark: false,
                                curve: "linear",
                                data: [32, 43, 51, 23, 37],
                            },
                        ]}
                    />
                </div>
                <div className="h-[35rem] relative px-6 pb-6 pt-4 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-3 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm">Student - Facility Usage Per Day</h4>
                    <BarChart
                        xAxis={[{ data: dayXAxis, label: "Day" }]}
                        series={[
                            {
                                data: [1, 0, 0, 1.5, 0.5, 0, 1],
                                label: "Hours"
                            },
                        ]}
                    />
                    <p className="font-[Arial] absolute bottom-4 right-6 text-sm">2026</p>
                </div>
                <div className="h-[35rem] relative px-6 pb-6 pt-4 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-3 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm">Student - Tool Usage Per Semester</h4>
                    <LineChart
                        xAxis={[{ scaleType: "point", data: semesterXAxis, label: "Semester" }]}
                        yAxis={[{ min: 0, label: "Hours" }]}
                        series={[
                            {
                                showMark: false,
                                curve: "linear",
                                data: [2, 3, 1, 0, 2],
                            },
                        ]}
                    />
                </div>
                <div className="h-[35rem] relative px-6 pb-6 pt-4 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-3 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm">Student - Tool Usage Per Day</h4>
                    <BarChart
                        xAxis={[{ data: dayXAxis, label: "Day" }]}
                        series={[
                            {
                                data: [0, 0, 0, 0, 1, 0, 0],
                                label: "Hours"
                            },
                        ]}
                    />
                    <p className="font-[Arial] absolute bottom-4 right-6 text-sm">2026</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardUsageStatsUser;