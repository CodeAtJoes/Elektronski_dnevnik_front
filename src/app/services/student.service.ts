import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { MessageService } from "./message.service";
import { AuthService } from "./auth.service";
import { SubjectMarks } from "../models/SubjectMarks";
import { Student } from "../models/Student";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  private studentiUrl = environment.apiBaseUrl + "/students";
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  getStudent(id: number): Observable<Student> {
    return this.httpClient
      .get<Student>(this.studentiUrl + "/" + id, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(a => this.log(`Učitan učenik sa id "${a.id}"`)),
        catchError(this.handleError<Student>("getStudent"))
      );
  }

  getStudenti(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(this.studentiUrl, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(_ => this.log(`Učitani učenicii`)),
        catchError(this.handleError<Student[]>("getStudenti", []))
      );
  }

  addStudent(student: Student): Observable<Student> {
    return this.httpClient
      .post<Student>(this.studentiUrl, student, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(a => this.log(`Dodat učenik sa id "${a.id}"`)),
        catchError(this.handleError<Student>("addStudent"))
      );
  }

  updateStudent(student: Student): Observable<Student> {
    return this.httpClient
      .put<Student>(this.studentiUrl + "/" + student.id, student, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(a => this.log(`Izmenjen učenik sa id "${a.id}"`)),
        catchError(this.handleError<Student>("updateStudent"))
      );
  }

  searchStudenti(term: string): Observable<Student[]> {
    if (!term.trim()) {
      return this.getStudenti();
    }

    return this.httpClient
      .get<Student[]>(`${this.studentiUrl}?prezime=${term}`, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(_ => this.log(`Nadjeni učenici sa prezimenom "${term}"`)),
        catchError(this.handleError<Student[]>("searchStudenti", []))
      );
  }

  deleteStudent(student: Student): Observable<any> {
    return this.httpClient.delete<any>(`${this.studentiUrl}/${student.id}`,
     {headers: this.authService.getHeaders()}).pipe(
       tap(_ => this.log(`deleted student id=${student.id}`)),
    catchError(this.handleError<Student>('deleteStudent'))) 
  }

  getSubjectMarks(id: string): Observable<SubjectMarks[]> {
    return this.httpClient
      .get<SubjectMarks[]>(this.studentiUrl + "/subjectMarks/" + id, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(_ => this.log(`Učitani predmeti i ocene`)),
        catchError(this.handleError<SubjectMarks[]>("getSubjectMarks"))
      );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.httpClient
      .put<Student>(
        `${this.studentiUrl}/changePassword/${localStorage.getItem(
          "id"
        )}?oldPassword=${oldPassword}&newPassword=${newPassword}`,{},
        { headers: this.authService.getHeaders() }
      )
      .pipe(
        tap(a => this.log(`Izmenjen učenik sa id "${a.id}"`)),
        catchError(this.handleError<Student>("updateStudent"))
      );
  }

  AddStudentToClass(stId:string,clsId:string): Observable<any> {
    return this.httpClient
      .put<Student>(
        `${this.studentiUrl}/${stId}/class/${clsId}`,{},
        { headers: this.authService.getHeaders() }
      )
      .pipe(
        tap(_ => this.log(`Učenik je upisan u razerd.`)),
        catchError(this.handleError<Student>("updateStudent"))
      );
  }

  private log(message: string) {
    this.messageService.add("StudentService: " + message);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}   
