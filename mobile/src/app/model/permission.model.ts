export type PermissionNames =
    "Manage Expense Booking" |
    "Manage Configuration" ;

export type PermissionValues =
    "expensebooking.manage" |
    "approvedbooking.manage" |
    "configuration.manage" ;

export class Permission {

    public static readonly manageExpenseBooking: PermissionValues = "expensebooking.manage";
    public static readonly manageExpenseApproved: PermissionValues = "approvedbooking.manage";

    public static readonly manageConfiguration: PermissionValues = "configuration.manage";

    
    constructor(name?: PermissionNames, value?: PermissionValues, groupName?: string, description?: string) {
        this.name = name;
        this.value = value;
        this.groupName = groupName;
        this.description = description;
    }

    public name: PermissionNames;
    public value: PermissionValues;
    public groupName: string;
    public description: string;
}
