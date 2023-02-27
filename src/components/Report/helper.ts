
import { auth, transport } from "constants/RouteMiddlePath";

export const reportList = [
    {
        id: "report-1",
        reportName: "Driver Duty Hour Report - Deepak",
        url: `${transport}/drivers/9ee49b1b-ca91-4b06-946d-df4c3e4559d2/history-download/`,
        filter: { since: "2023-02-01", until: "2023-02-26" },
        requireFilter: true,
        generatedOn: "27-02-2023 02:00 PM",
        fromDate: "01-02-2023 06:00 PM",
        toDate: "27-02-2023 02:00PM"
    },
    {
        id: "report-2",
        reportName: "Driver Report Master",
        url: `${transport}/drivers/download/`,
        filter: {},
        requireFilter: false,
        generatedOn: "22-02-2023 10:00 AM",
        fromDate: "06-02-2023 02:00 PM",
        toDate: "20-02-2023 05:00PM"
    },
    {
        id: "report-3",
        reportName: "Vehicle Report Master",
        url: `${transport}/vehicles/download/`,
        filter: {},
        requireFilter: false,
        generatedOn: "21-02-2023 01:00 PM",
        fromDate: "01-02-2023 06:00 PM",
        toDate: "21-02-2023 06:00PM"
    },
    {
        id: "report-4",
        reportName: "Driver Duty Hour Report - Sandeep",
        url: `${transport}/drivers/ec3364de-db5f-4a38-9a84-98eeb114e3cd/history-download/`,
        filter: { since: "2023-02-02", until: "2023-02-20" },
        requireFilter: true,
        generatedOn: "20-02-2023 02:00 PM",
        fromDate: "01-02-2023 06:00 PM",
        toDate: "20-02-2023 02:00PM"
    },
    {
        id: "report-5",
        reportName: "Vehicle Report Master",
        url: `${transport}/vehicles/download/`,
        filter: {},
        requireFilter: false,
        generatedOn: "18-02-2023 01:00 PM",
        fromDate: "01-02-2023 06:00 PM",
        toDate: "16-02-2023 06:00PM"
    },
]