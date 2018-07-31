import { EUserRole } from './euser-role.enum';

export class Student {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    userRole: EUserRole;
}