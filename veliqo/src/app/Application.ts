import { User } from "./User";

export interface Application {
    id: number,
    coverageType: string,
    dependents: string,
    marriageStatus: string,
    applicationStatus: string,
    appliedDate: Date,
    approvedDate: Date,
    admin: User,
    applicant: User
}