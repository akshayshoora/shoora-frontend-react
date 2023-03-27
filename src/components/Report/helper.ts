
import { auth, transport } from "constants/RouteMiddlePath";

// export const reportList = [
//     {
//         id: "report-1",
//         reportName: "Driver Duty Hour Report - Sandeep",
//         url: `${transport}/drivers/ec3364de-db5f-4a38-9a84-98eeb114e3cd/history-download/`,
//         filter: { since: "2023-02-20", until: "2023-02-27" },
//         requireFilter: true,
//         generatedOn: "27-02-2023 02:00 PM",
//         fromDate: "20-02-2023 06:00 PM",
//         toDate: "27-02-2023 02:00PM"
//     },
//     {
//         id: "report-2",
//         reportName: "Driver Report Master",
//         url: `${transport}/drivers/download/`,
//         filter: {},
//         requireFilter: false,
//         generatedOn: "26-02-2023 10:00 AM",
//         fromDate: "06-02-2023 02:00 PM",
//         toDate: "26-02-2023 05:00PM"
//     },
//     {
//         id: "report-3",
//         reportName: "Driver Duty Hour Report - Deepak",
//         url: `${transport}/drivers/9ee49b1b-ca91-4b06-946d-df4c3e4559d2/history-download/`,
//         filter: { since: "2023-02-01", until: "2023-02-25" },
//         requireFilter: true,
//         generatedOn: "25-02-2023 02:00 PM",
//         fromDate: "01-02-2023 06:00 PM",
//         toDate: "25-02-2023 02:00PM"
//     },
//     {
//         id: "report-4",
//         reportName: "Vehicle Report Master",
//         url: `${transport}/vehicles/download/`,
//         filter: {},
//         requireFilter: false,
//         generatedOn: "21-02-2023 01:00 PM",
//         fromDate: "01-02-2023 06:00 PM",
//         toDate: "21-02-2023 06:00PM"
//     },
//     {
//         id: "report-5",
//         reportName: "Vehicle Report Master",
//         url: `${transport}/vehicles/download/`,
//         filter: {},
//         requireFilter: false,
//         generatedOn: "18-02-2023 01:00 PM",
//         fromDate: "01-02-2023 06:00 PM",
//         toDate: "16-02-2023 06:00PM"
//     },
// ]

export const reportList = {
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": "1",
            "title": "Vehicle Trip Report - HR38AC3626",
            "start_range": "2023-03-20T00:00:00Z",
            "end_range": "2023-03-27T00:00:00Z",
            "created_at": "2023-03-27T00:00:00Z",
            "file_url": null
        },
        {
            "id": "2",
            "title": "Vehicle Trip Report - HR38AC3626",
            "start_range": "2023-03-26T00:00:00Z",
            "end_range": "2023-03-27T00:00:00Z",
            "created_at": "2023-03-27T00:00:00Z",
            "file_url": "https://shoora-dev-bucket.s3.amazonaws.com/drivers/e8b3e3c8-0e74-4a34-bc51-18faf68392b9.csv"
        }
    ]
}