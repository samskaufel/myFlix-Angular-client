/**
 * The MovieDescription component renders a dialog containing the movie desription when user clicks on 
 * the button
 * @module MovieDescriptionComponent
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.scss']
})
export class MovieDescriptionComponent implements OnInit {

  /**
   * The data passed to the Movie Description dialog is injected into the constructor
   * using MAT_DIALOG_DATA and is then available to the view.
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
