import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private classUrl = environment.apiBaseUrl + '/classes';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  getClass(): Observable<any> {
    return this.httpClient
      .get<any>(this.classUrl, {headers: this.authService.getHeaders()})
      
  }
}
