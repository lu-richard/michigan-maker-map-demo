import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function AdminDashboardUsageStatsFacility() {
    const semesterXAxis = ["F24", "W25", "F25", "W26", "F26"];
    const dayXAxis = ['2/1', '2/2', '2/3', '2/4', '2/5', '2/6', '2/7'];

    return (
        <div className="mt-4">
            <div className="grid grid-cols-6 grid-row-2 gap-4 mb-20">
                <div className="h-[35rem] relative px-6 pb-6 pt-4 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-3 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm">Facility Usage Per Semester</h4>
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
                    <h4 className="text-center font-medium text-sm">Facility Usage Per Day</h4>
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
                    <h4 className="text-center font-medium text-sm mb-4">Undergraduate vs. Graduate User Distribution</h4>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 20, label: 'Graduate' },
                                    { id: 1, value: 80, label: 'Undergraduate' },
                                ],
                                outerRadius: 125
                            },
                        ]}
                    />
                </div>
                <div className="h-[25rem] relative px-6 pt-6 pb-16 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-2 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm mb-4">Total Issue Reports Per Semester</h4>
                    <BarChart
                        xAxis={[{ data: semesterXAxis, label: "Semester" }]}
                        series={[{ data: [3, 5, 4, 6, 2], label: "# of Reports" }]}
                    />
                </div>
                <div className="h-[25rem] relative px-6 pt-6 pb-16 bg-main-bg drop-shadow-md rounded-2xl border border-neutral-300 col-span-2 [&_.MuiLineElement-root]:stroke-[1px]">
                    <h4 className="text-center font-medium text-sm mb-4">Total Members Over Time</h4>
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
                        yAxis={[{ min: 0, label: "# of Members" }]}
                        series={[
                            {
                                showMark: false,
                                curve: "linear",
                                data: [
                                    121, 151, 155, 177, 230, 236, 247, 281, 304, 311, 314, 349, 350, 351, 366,
                                    402, 403, 408, 420, 427, 461, 501, 525, 528, 569, 570, 607, 634, 692, 740,
                                    755, 793, 809, 832, 838, 879, 906, 935, 936, 992, 996, 997, 1001, 1003, 1036,
                                    1065, 1079, 1110, 1122, 1177, 1181, 1189, 1209, 1258, 1317, 1317, 1325, 1332,
                                    1368, 1380, 1437, 1468, 1470, 1471, 1502, 1528, 1555, 1556, 1561, 1582, 1596,
                                    1655, 1655, 1685, 1744, 1803, 1845, 1873, 1873, 1914, 1936, 1965, 1990, 1993,
                                    1993, 2054, 2054, 2054, 2066, 2084, 2124, 2136, 2152, 2153, 2172, 2183, 2244,
                                    2299, 2300, 2300
                                ],
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardUsageStatsFacility;