import { Teacher } from "./Teacher";

export class Timetable {
    id: number;
    active: boolean;
    qualification: {
        id:number;
        teacher: Teacher;
    }

}