/**
 * The FetchApiDataService class is used to make Http requests to the myFlix Api to retrieve data on movies and
 * users that is used within the app, as well as to register and login users, update their details, and
 * to add or remove movies from their favorites. The class is marked with the Injectable decorator and
 * injected as a dependency to the root component, thereby making the service available to all the other
 * components.
 * @module FetchApiDataService
 */

// Used to provide the service as an injectable dependency to the root app
import { Injectable } from '@angular/core';
// Makes Http requests to the API
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

/**  
 * Declares the api url that will provide data for the client app 
 */
const apiUrl = 'https://myflix-api-project.herokuapp.com/';
/**
 * @Injectable decorator function
 * Decorators augment a piece of code -  usually another function or class
 * decorator tells Angular that this service will be available everywhere (hence the 'root') 
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Injects the HttpClientModule to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(
    private http: HttpClient,
  ) {}

  /**
   * Makes the api call for the user registration endpoint
   * Observable<any> is a TS type cast. HttpClient returns 
   * an observable. This allows you to process events asynchronously
   * @param userData an object with the user's data 
   * @returns an object with all user data in JSON format
   */
  public userRegistration(userData: any): Observable<any> {
    console.log(userData);
    /**
     * Similar to apiUrl/${users} in React
     * Using 'this.http' posts it to the API endpoint and returns the API's response
     * .pipe() combines multiple functions into a single function
     * takes catchError functions as its arguments and returns a new function that runs 
     * the composed functions in sequence
     */
    return this.http
      .post(apiUrl + 'users', userData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs user in by making an API call to the user's login endpoint
   * @param userData (Username, Password)
   * @returns an object with all the user details in JSON format
   */
  public userLogin(userData: any): Observable<any> {
    console.log(userData);
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets a list of all movies by making an API call to the movies endpoint
   * Call requires user authentification via a bearer token
   * @returns an array with all movies in JSON format
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets a single movie by title by making an API call to the movies/Title endpoint
   * Call requires user authentification via a bearer token
   * @returns an object with movie details in JSON format
   */
  getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets details about a director by making an API call to the directors/Name endpoint
   * Call requires user authentification via bearer token
   * @returns an object with details about the director in JSON format
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets a description of the genre by making an API call to the genres/Name endpoint
   * Call requires authentification via bearer token
   * @returns an object with details about the genre in JSON format
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets user details by making an API call to the users/Username endpoint
   * Username is retrieved from localStorage
   * Call requires user authentification via bearer token
   * @returns an object with user information in JSON format
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http
      .get(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a movie object to the current user's profile by making an API call to the users/
   * Username/movies/MovieID endpoint
   * Call requires user authentification via a bearer token
   * @param MovieID
   * @returns an updated user object with the newly added movie object to FavoriteMovies
   */
  addFavoriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .post(apiUrl + `users/${Username}/movies/${MovieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edits user data for current user by making an API call to the users/Username endpoint
   * Username is retrieved from localStorage
   * Call requires user authentification via bearer token
   * @param userData object with updated user data 
   * @returns an object with the updated user data in JSON format
   */
  editUser( userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .put(apiUrl + `users/${Username}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes current user by making an API call to the users/Username endpoint
   * Username is retrieved from localStorage
   * Call requires user authentification via a bearer token
   * @returns deleted user profile
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .delete(apiUrl + `users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Removes movie object from the current user's FavoriteMovies list by making an API call to the users/Username/
   * movies/MovieID endpoint
   * Username id retrieved from localStorage
   * Call requires user authentification via a bearer token
   * @param MovieID the _id of the movie the user wishes to remove from their favorites list
   * @returns an updated user object with the newly removed movie object from FavoriteMovies
   */
  deleteFavoriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .delete(apiUrl + `users/${Username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Takes a request response and returns either the response body or an empty object.
   * @param res The response to an Http request.
   * @returns Either the response or an empty object.
   */
   private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles error responses to Http requests.
   * @param error The HttpErrorResponse returned on the Observable's response stream.
   * @returns An observable that errors with the specified message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
