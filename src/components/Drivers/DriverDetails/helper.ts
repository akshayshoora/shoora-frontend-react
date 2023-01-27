export const driverLicenseInfo = [
    {
        id: "license_number",
        keyName: "license_number",
        labelName: "License Number"
    },
    {
        id: "state",
        keyName: "state",
        labelName: "State",
    },
    {
        id: "name",
        keyName: "name",
        labelName: "Name",
    },
    {
        id: "permanent_address",
        keyName: "permanent_address",
        labelName: "Permanent Address",
    },
    {
        id: "permanent_zip",
        keyName: "permanent_zip",
        labelName: "Permanent Zip",
    },
    {
        id: "temporary_address",
        keyName: "temporary_address",
        labelName: "Temporary Address",
    },
    {
        id: "temporary_zip",
        keyName: "temporary_zip",
        labelName: "Temporary Zip",
    },
    {
        id: "citizenship",
        keyName: "citizenship",
        labelName: "Citizenship",
    },
    {
        id: "ola_name",
        keyName: "ola_name",
        labelName: "OLA Name",
    },
    {
        id: "ola_code",
        keyName: "ola_code",
        labelName: "OLA Code",
    },
    {
        id: "gender",
        keyName: "gender",
        labelName: "Gender",
    },
    {
        id: "father_or_husband_name",
        keyName: "father_or_husband_name",
        labelName: "Father/Husband Name",
    },
    {
        id: "dob",
        keyName: "dob",
        labelName: "DOB",
    },
    {
        id: "doe",
        keyName: "doe",
        labelName: "DOE",
    },
    {
        id: "transport_doe",
        keyName: "transport_doe",
        labelName: "Transport DOE",
    },
    {
        id: "doi",
        keyName: "doi",
        labelName: "DOI",
    },
    {
        id: "transport_doi",
        keyName: "transport_doi",
        labelName: "Transport DOI",
    },
    {
        id: "blood_group",
        keyName: "blood_group",
        labelName: "Blood Group",
    },
    {
        id: "vehicle_classes",
        keyName: "vehicle_classes",
        labelName: "Vehicle Classes",
    }
]


export function getDatesInRange(startDate: any, endDate: any) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}