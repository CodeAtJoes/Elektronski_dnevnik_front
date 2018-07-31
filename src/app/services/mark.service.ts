import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';
import { Mark } from '../models/Mark';
import { MarkDto } from '../models/MarkDto';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private markiUrl = environment.apiBaseUrl + '/marks';
  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService) { }

    getMark(id: number): Observable<any> {
      return this.httpClient
        .get<any>(this.markiUrl + '/' + id, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Učitana ocena sa id "${a.id}"`)),
          catchError(this.handleError<any>('getMark')));
    }

    

    addMark(mark: MarkDto): Observable<MarkDto> {
      return this.httpClient
        .post<MarkDto>(this.markiUrl, mark, {headers: this.authService.getHeaders()})
        .pipe(
          
          catchError(this.handleError<any>('addMark')));
    }

    updateMark(mark: Mark): Observable<Mark> {
      return this.httpClient
        .put<Mark>(this.markiUrl + '/front/' + mark.id, mark, {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Izmenjena ocena sa id "${a.id}"`)),
          catchError(this.handleError<Mark>('updateMark')));
    }

    deleteMark(mark: Mark): Observable<any> {
      return this.httpClient.delete<any>(`${this.markiUrl}/${mark.id}`,
       {headers: this.authService.getHeaders()}).pipe(
         tap(_ => this.log(`deleted mark id=${mark.id}`)),
      catchError(this.handleError<Mark>('deleteMark'))) 
    }
    postFinal(stId: string, ttId:string): Observable<any> {
      console.log(stId);
      console.log(ttId);
      return this.httpClient
        .post<any>(`${this.markiUrl}/makeFinal/studentId/${stId}/timetableId/${ttId}`, {"bla":"bla"},
         {headers: this.authService.getHeaders()})
        .pipe(
          tap(a => this.log(`Dodata ocena sa id "${a.id}"`)),
          catchError(this.handleError<any>('postFinal')));
    }

    
    private log(message: string) {
      this.messageService.add('MarkService: ' + message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

}
