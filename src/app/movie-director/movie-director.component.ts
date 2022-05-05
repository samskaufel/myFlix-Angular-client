/**
 * The MovieDirector component renders the movie director dialog when the user clicks the button
 * @module MovieDirectorComponent
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  /**
   * The data passed to the Movie Director dialog is injected into the constructor
   * using MAT_DIALOG_DATA and is then available to the view.
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Born: string,
      Died: string,
    }
  ) { }

  ngOnInit(): void {
  }

}
