import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errors: Record<string, string> | null = null;
  private readonly http = inject(HttpClient);
  private readonly destroy$: Subject<void> = new Subject();
  private readonly _errorMessage$ = new BehaviorSubject<string | null>(null);
  errorMessage$ = this._errorMessage$.asObservable();

  private getErrors() {
    return this.http
      .get<Record<string, string>>('http://localhost:3000/errors')
      .pipe(takeUntil(this.destroy$));
  }

  setErrorMessage(code: string) {
    if (!this.errors) {
      this.getErrors().subscribe((errors) => {
        this.errors = errors;
        this._errorMessage$.next(this.errors[code] || 'An error occurred');
      });
      return;
    }

    this.destroy$.next();
    this.destroy$.complete();
    this._errorMessage$.next(this.errors[code] || 'An error occurred');
  }

  clearErrorMessage() {
    this.destroy$.next();
    this.destroy$.complete();
    this._errorMessage$.next(null);
  }
}
