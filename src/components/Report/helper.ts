
import { auth, transport } from "constants/RouteMiddlePath";

export const reportList = [
    {
        id: "report-1",
        reportName: "Driver Report Master",
        url: `${transport}/drivers/download/`,
        filter: {},
        requireFilter:false,
        generatedOn: "22-02-2023 10:00 AM",
        fromDate: "06-02-2023 02:00 PM",
        toDate: "20-02-2023 05:00PM"
    },
    {
        id: "report-2",
        reportName: "Vehicle Report Master",
        url: `${transport}/vehicles/download/`,
        filter: {},
        requireFilter:false,
        generatedOn: "21-02-2023 01:00 PM",
        fromDate: "01-02-2023 06:00 PM",
        toDate: "21-02-2023 06:00PM"
    }
]