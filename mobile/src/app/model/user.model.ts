export class User {
    constructor(id?: string, userName?: string, fullName?: string, email?: string, phoneNumber?: string, roles?: string[], type?: string) {

        this.id = id;
        this.userName = userName;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
        this.type = type;
    }


    get friendlyName(): string {
        let name = this.fullName || this.userName;
        return name;
    }
    public id: string;
    public userName: string;
    public fullName: string;
    public email: string;
    public phoneNumber: string;
    public isEnabled: boolean;
    public isLockedOut: boolean;
    public managerId: string;
    public roles: string[];
    public type: string;
}