import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  /**
   * Base API URL from the environment configuration.
   * @type {string}
   * @private
   */
  private apiUrl = environment.apiUrl;

  /**
   * Creates an instance of GithubService.
   * @constructor
   * @param {HttpClient} http - The Angular HTTP client for making requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves the user's repositories using an HTTP GET request in order of creation.
   * An important contribution that I made was the use of the cache parameter in the URL
   * to prevent caching of the response and getting old list of repositories after changes.
   * With the timestamp, the api call is new and will not be cached, retrieving old data.
   * @method
   * @name getUserRepos
   * @public
   * @return {Observable<any>} - The observable of the HTTP GET request.
   */
  getUserRepos(): Observable<any> {
    const timestamp = new Date().getTime();
    const url = `${this.apiUrl}/user/repos?sort=created&per_page=15&cache=${timestamp}`;
    const response = this.http.get(url);
    return response;
  }

  /**
   * Retrieves user information from the API.
   * @method
   * @name getUserInfo
   * @public
   * @return {Observable<any>} - The observable for the user information.
   */
  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }

  /**
   * Endpoint for creating a new repository.
   * @method
   * @name createRepository
   * @public
   * @param {any} formData - The form data for creating a new repository.
   * @return {Observable<any>} - The observable of the HTTP POST request.
   */
  createRepository(formData: any): Observable<any> {
    const url = `${this.apiUrl}/user/repos`;
    return this.http.post(url, formData);
  }

  /**
   * Deletes a repository by its name.
   * @method
   * @name deleteRepository
   * @public
   * @param {string} owner - The owner of the repository.
   * @param {string} repo - The name of the repository.
   * @return {Observable<any>} - Observable representing the HTTP request response.
   */
  deleteRepository(owner: string, repo: string): Observable<any> {
    const url = `${this.apiUrl}/repos/${owner}/${repo}`;
    return this.http.delete(url);
  }
}
