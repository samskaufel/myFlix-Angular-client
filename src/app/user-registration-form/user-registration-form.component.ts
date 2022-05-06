/**
 * The UserRegistrationFormComponent renders a card containing a registration form for new users
 * to submit a profile
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
// this import will be used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// this import brings in the API calls we created 
import { FetchApiDataService } from '../fetch-api-data.service';
// import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * userData values are populated by form inputs in the user-registration-form template that
   * are bound using the ngModel directive
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: ''};
  // Called when creating an instance of the class
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

   /**
   * Invokes the userRegistration method on the fetchApiData service, with the userData from the form,
   * in order to register the user. Successful registration closes the form and logs user in, routing them to "/movies". 
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      console.log(result)
      // logic for a successful user registration goes here (to be implemented)
      this.dialogRef.close(); // This will close the modal on success
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
