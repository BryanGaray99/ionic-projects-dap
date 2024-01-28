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
    const url = `${this.apiUrl}/user/repos?sort=created&per_page=15`;
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

  /**
   * Endpoint for creating a new repository
   * @param formData
   * @returns
   */
  createRepository(formData: any): Observable<any> {
    const url = `${this.apiUrl}/user/repos`;
    return this.http.post(url, formData);
  }

    /**
   * Elimina un repositorio por su nombre.
   * @param {string} owner - El propietario del repositorio.
   * @param {string} repo - El nombre del repositorio.
   * @return {Observable<any>} - Observable que representa la respuesta de la solicitud HTTP.
   */
    deleteRepository(owner: string, repo: string): Observable<any> {
      const url = `${this.apiUrl}/repos/${owner}/${repo}`;
      return this.http.delete(url);
    }
}
