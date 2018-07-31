import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { MessageService } from "./message.service";
import { AuthService } from "./auth.service";
import { Parent } from "src/app/models/Parent";

@Injectable({
  providedIn: "root"
})
export class ParentService {
  private parentiUrl = environment.apiBaseUrl + "/parents";
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  getParent(id: number): Observable<Parent> {
    return this.httpClient
      .get<Parent>(this.parentiUrl + "/" + id, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(a => this.log(`Učitan roditelj sa id "${a.id}"`)),
        catchError(this.handleError<Parent>("getParent"))
      );
  }

  getParenti(): Observable<Parent[]> {
    return this.httpClient
      .get<Parent[]>(this.parentiUrl, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(_ => this.log(`Učitani roditeljii`)),
        catchError(this.handleError<Parent[]>("getParenti", []))
      );
  }

  addParent(parent: Parent): Observable<Parent> {
    return this.httpClient
      .post<Parent>(this.parentiUrl, parent, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(a => this.log(`Dodat roditelj sa id "${a.id}"`)),
        catchError(this.handleError<Parent>("addParent"))
      );
  }

  updateParent(parent: Parent): Observable<Parent> {
    return this.httpClient
      .put<Parent>(this.parentiUrl + "/" + parent.id, parent, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(a => this.log(`Izmenjen roditelj sa id "${a.id}"`)),
        catchError(this.handleError<Parent>("updateParent"))
      );
  }

  searchParenti(term: string): Observable<Parent[]> {
    if (!term.trim()) {
      return this.getParenti();
    }

    return this.httpClient
      .get<Parent[]>(`${this.parentiUrl}?prezime=${term}`, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(_ => this.log(`Nadjeni roditelji sa prezimenom "${term}"`)),
        catchError(this.handleError<Parent[]>("searchParenti", []))
      );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.httpClient
      .put<Parent>(
        `${this.parentiUrl}/changePassword/${localStorage.getItem(
          "id"
        )}?oldPassword=${oldPassword}&newPassword=${newPassword}`,
        {},
        { headers: this.authService.getHeaders() }
      )
      .pipe(
        tap(a => this.log(`Izmenjen roditelj sa id "${a.id}"`)),
        catchError(this.handleError<Parent>("updateParent"))
      );
  }

  deleteParent(parent: Parent): Observable<any> {
    return this.httpClient.delete<any>(`${this.parentiUrl}/${parent.id}`, {headers: this.authService.getHeaders()}).pipe(tap(_ => this.log(`deleted parent id=${parent.id}`)),
    catchError(this.handleError<Parent>('deleteParent'))) 
  }

  getChildren(id: string): Observable<any> {
    return this.httpClient
      .get<any>(this.parentiUrl + "/getChildren/" + id, {
        headers: this.authService.getHeaders()
      })
      .pipe(
        tap(a => this.log(`Učitana deca roditelja sa id "${a.id}"`)),
        catchError(this.handleError<Parent>("getChildren"))
      );
  }

  private log(message: string) {
    this.messageService.add("ParentService: " + message);
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
