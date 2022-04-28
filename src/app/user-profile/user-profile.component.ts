import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import components
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favorites: any[] = [];
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
  }

  getUser(): void {
    let user = localStorage.getItem('Username');
    console.log(user);
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favorites = res.filter((movie: any) => {
        return this.user.Favorites.includes(movie._id)
      });
      console.log(this.favorites);
      return this.favorites;
    })
  }

  removeFavorite(MovieId: string, Title: string): void {
    this.fetchApiData.deleteFavorite(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${Title} has been removed from your favorites`,
        'OK',
        {
          duration: 3000,
        }
      );
      window.location.reload();
      this.ngOnInit();
    });
    return this.getFavorites();
  }

  // this function will fetch the movies from the FetchApiDataService service via getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string, born: string, died: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Born: born,
        Died: died,
      },
      width: '500px'
    });
  }

  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

}