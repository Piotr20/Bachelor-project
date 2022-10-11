export type NormalWorkingDay = {
    id?: string;
    employeeID?: string;
    employeeInitials?: string;
    weekday?: number;
    name?: string;
    workingHours: number;
    employeeFirstName?: string;
    employeeLastName?: string;
};

export type NormalWorkingWeek = NormalWorkingDay[];
