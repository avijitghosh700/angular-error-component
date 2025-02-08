import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorDetails, Book } from '../interfaces';
import { tap } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly errorService: ErrorService,
  ) {}

  getAuthors() {
    return this.http.get<AuthorDetails[]>('http://localhost:3000/authors').pipe(
      tap({
        error: (error) => {
          this.errorService.setErrorMessage(
            error.status === 404 ? 'ERR005' : 'ERR004',
          );
        },
      }),
    );
  }

  getAuthor(id: string) {
    return this.http
      .get<AuthorDetails>(`http://localhost:3000/authors/${id}`)
      .pipe(
        tap({
          error: (error) => {
            this.errorService.setErrorMessage(
              error.status === 404 ? 'ERR005' : 'ERR004',
            );
          },
        }),
      );
  }

  getBooks() {
    return this.http.get<Book[]>('http://localhost:3000/books').pipe(
      tap({
        error: (error) => {
          this.errorService.setErrorMessage(
            error.status === 404 ? 'ERR005' : 'ERR004',
          );
        },
      }),
    );
  }

  getBook(id: string) {
    return this.http.get<Book>(`http://localhost:3000/books/${id}`).pipe(
      tap({
        error: (error) => {
          this.errorService.setErrorMessage(
            error.status === 404 ? 'ERR005' : 'ERR004',
          );
        },
      }),
    );
  }
}
