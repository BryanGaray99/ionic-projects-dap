import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

    /**
   * Retrieves the user's repositories using an HTTP GET request in order of creation
   *
   * @return {Observable<any>} the observable of the HTTP GET request
   */
  getUserRepos(): Observable<any> {
    const url = `${this.apiUrl}/user/repos?sort=created`;
    return this.http.get(url);
  }

    /**
   * Retrieves user information from the API.
   *
   * @return {Observable<any>} the observable for the user information
   */
  getUserInfo(): Observable<any> {
    return this.http.get(this.apiUrl + "/user");
  }
}
