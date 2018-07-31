import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Admin} from '../models/Admin';
import { environment } from '../../environments/environment';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminiUrl = environment.apiBaseUrl + '/admins';
  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }

    getAdmin(id: number): Observable<Admin> {
      return this.httpClient
        .get<Admin>(this.adminiUrl + '/' + id, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Učitan admin sa id "${a.id}"`)),
          catchError(this.handleError<Admin>('getAdmin')));
    }

    getAdmini(): Observable<Admin[]> {
      return this.httpClient
        .get<Admin[]>(this.adminiUrl, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Učitani admini`)),
          catchError(this.handleError<Admin[]>('getAdmini', [])));
    }

    addAdmin(admin: Admin): Observable<Admin> {
      return this.httpClient
        .post<Admin>(this.adminiUrl, admin, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Dodat admin sa id "${a.id}"`)),
          catchError(this.handleError<Admin>('addAdmin')));
    }

    updateAdmin(admin: Admin): Observable<Admin> {
      return this.httpClient
        .put<Admin>(this.adminiUrl + '/' + admin.id, admin, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Izmenjen admin sa id "${a.id}"`)),
          catchError(this.handleError<Admin>('updateAdmin')));
    }
    deleteAdmin(admin: Admin): Observable<any> {
      return this.httpClient.delete<any>(`${this.adminiUrl}/${admin.id}`,
       {headers: this.authService.getHeaders()}).pipe(
         tap(_ => this.log(`deleted admin id=${admin.id}`)),
      catchError(this.handleError<Admin>('deleteAdmin'))) 
    }

    searchAdmini(term: string): Observable<Admin[]> {
      if (!term.trim()) {
        return this.getAdmini();
      }

      return this.httpClient
        .get<Admin[]>(`${this.adminiUrl}?prezime=${term}`, {headers: this.authService.getHeaders()})
        .pipe(
          tap(_ => this.log(`Nadjeni admini sa prezimenom "${term}"`)),
          catchError(this.handleError<Admin[]>('searchAdmini', []))
      );
    }

    changePassword(oldPassword: string, newPassword: string): Observable<any> {
      return this.httpClient
        .put<Admin>(
          `${this.adminiUrl}/changePassword/${localStorage.getItem(
            "id"
          )}?oldPassword=${oldPassword}&newPassword=${newPassword}`,{},
          { headers: this.authService.getHeaders() }
        )
        .pipe(
          tap(a => this.log(`Izmenjen admin sa id "${a.id}"`)),
          catchError(this.handleError<Admin>("updateAdmin"))
        );
    }

    private log(message: string) {
      this.messageService.add('AdminService: ' + message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

}
