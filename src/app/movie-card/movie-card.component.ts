import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // variable 'movies' declared as an array
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  // this lifecycle hook is called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
  }

  // this function will fetch the movies from the FetchApiDataService service via getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

}
