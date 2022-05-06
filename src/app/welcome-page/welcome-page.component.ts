/**
 * The WelcomePageComponent is the main page that a user to directed to where they have
 * the choice of logging in or registering
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';
// imported components
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  /**
   * Sets MatDialog as a property on the component class
   * used to create dialogs for the registration and login forms.
   * @param dialog 
   */
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  // These functions will open the dialog when the buttons are clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
