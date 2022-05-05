/**
 * The UserProfileComponent renders the 'profile' view where user can view their 
 * credentials, update their credentials, view their favorite movies list, and delete their
 * account
 * @module UserProfileComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import components
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userString: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userString);

  @Input() userData = { 
    Username: this.user.Username, 
    Email: this.user.Email, 
    Password: '', 
    Birthday: this.user.Birthday
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  /**
   * This getUser lifecycle hook  method is called when Angular is done creating the component
   * so that the data can be used to populate the template 
   */
  ngOnInit(): void {
    this.getUser();
    console.log(this.userData);
  }

  /**
   * Invokes the getUser method on the fetchApiData service and populates the user object 
   * with the response
   */
  getUser(): void {
    const Username = localStorage.getItem('Username');
    if (Username) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  /**
   * Takes userData from the form and invokes editUserProfile method on the fetchApiData 
   * service to update the user object and save to localStorage
   */
  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Your profile was updated sucessfully', 'OK', {
        duration: 3000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  /**
   * This function deletes the user's data from the API and clears localStorage
   * redirects user to the 'welcome' view and gives user a confirmation message 
   * with snackBar 
   */
  deleteUser(): void {
    if (confirm('Delete your profile?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        this.snackBar.open(`${this.user.Username} has successfully been deleted`, 'OK', {
          duration: 3000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }

}