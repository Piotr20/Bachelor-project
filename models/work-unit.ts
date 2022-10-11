export type WorkUnit = {
    id?: string;
    employeeID?: string;
    employeeInitials?: string;
    taskId?: string;
    customerId?: string;
    regHours?: number;
    date: string | number | Date;
};

export type WorkDay = {
    date: string | number | Date;
    day:
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday";
    totalRegHours: number;
};

export type WorkUnits = WorkUnit[];
