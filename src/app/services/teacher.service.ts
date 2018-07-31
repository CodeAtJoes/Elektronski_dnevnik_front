import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Teacher} from '../models/Teacher';
import { environment } from '../../environments/environment';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private teacheriUrl = environment.apiBaseUrl + '/teachers';
  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }

    getTeacher(id: number): Observable<Teacher> {
      return this.httpClient
        .get<Teacher>(this.teacheriUrl + '/' + id, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Učitan nastavnik sa id "${a.id}"`)),
          catchError(this.handleError<Teacher>('getTeacher')));
    }

    getTeacheri(): Observable<Teacher[]> {
      return this.httpClient
        .get<Teacher[]>(this.teacheriUrl, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Učitani nastavnici`)),
          catchError(this.handleError<Teacher[]>('getTeacheri', [])));
    }

    addTeacher(teacher: Teacher): Observable<Teacher> {
      return this.httpClient
        .post<Teacher>(this.teacheriUrl, teacher, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Dodat nastavnik sa id "${a.id}"`)),
          catchError(this.handleError<Teacher>('addTeacher')));
    }

    updateTeacher(teacher: Teacher): Observable<Teacher> {
      return this.httpClient
        .put<Teacher>(this.teacheriUrl + '/' + teacher.id, teacher, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Izmenjen nastavnik sa id "${a.id}"`)),
          catchError(this.handleError<Teacher>('updateTeacher')));
    }

    searchTeacheri(term: string): Observable<Teacher[]> {
      if (!term.trim()) {
        return this.getTeacheri();
      }

      return this.httpClient
        .get<Teacher[]>(`${this.teacheriUrl}?prezime=${term}`, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Nadjeni nastavnici sa prezimenom "${term}"`)),
          catchError(this.handleError<Teacher[]>('searchTeacheri', []))
      );
    }

    deleteTeacher(teacher: Teacher): Observable<any> {
      return this.httpClient.delete<any>(`${this.teacheriUrl}/${teacher.id}`,
       {headers: this.authService.getHeaders()}).pipe(
         tap(_ => this.log(`deleted teacher id=${teacher.id}`)),
      catchError(this.handleError<Teacher>('deleteTeacher'))) 
    }

    changePassword(oldPassword: string, newPassword: string): Observable<any> {
      return this.httpClient
        .put<Teacher>(
          `${this.teacheriUrl}/changePassword/${localStorage.getItem(
            "id"
          )}?oldPassword=${oldPassword}&newPassword=${newPassword}`,{},
          { headers: this.authService.getHeaders() }
        )
        .pipe(
          tap(a => this.log(`Izmenjen nastavnik sa id "${a.id}"`)),
          catchError(this.handleError<Teacher>("updateTeacher"))
        );
    }

    getTimetables(id: string): Observable<any> {
      return this.httpClient
        .get<any>(this.teacheriUrl + "/getTimetables/" + id, {
          headers: this.authService.getHeaders()
        })
        .pipe(
          catchError(this.handleError<Teacher>("getTimetables"))
        );
    }

    getStudentMarks(id: string): Observable<any> {
      return this.httpClient
        .get<any>(this.teacheriUrl + "/getStudentMarks/" + id, {
          headers: this.authService.getHeaders()
        })
        .pipe(
          catchError(this.handleError<Teacher>("StudentMarks"))
        );
    }
    

    private log(message: string) {
      this.messageService.add('TeacherService: ' + message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

}

