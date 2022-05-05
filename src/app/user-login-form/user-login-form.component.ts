/**
 * The UserLoginForm component renders a card containing a log-in form for existing users
 * to submit their credentials
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// imports routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {

  /**
   * userCredentials values are fetched from the credentials input into the login form 
   * that are bound using the ngModel directive
   */
  @Input() userCredentials = { Username: '', Password: '' };
  // Called when creating an instance of the class
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * This function sends the form inputs to the backend.
   * Sends a request to the API for jwt token and user data
   * then stores the user's data in local storage
   * User is then routed to the 'movies' view and confirms successful login
   * with snackBar message
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // This will close the modal on success
        this.snackBar.open('Logged In Successfully', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
