import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Subject, takeUntil } from 'rxjs';
import { IError } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errors: IError[] | null = null;
  private readonly http = inject(HttpClient);
  private readonly destroy$: Subject<void> = new Subject();
  private readonly _errorMessage$ = new BehaviorSubject<string | null>(null);
  errorMessage$ = this._errorMessage$.asObservable();

  private getErrors() {
    return this.http
      .get<IError[]>('http://localhost:3000/errors')
      .pipe(takeUntil(this.destroy$));
  }

  setErrorMessage(code: string) {
    if (!this.errors) {
      this.getErrors().subscribe((errors) => {
        this.errors = errors;
        this._errorMessage$.next(
          this.getMessageByCode(code, this.errors) || 'An error occurred',
        );
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      return;
    }

    this.destroy$.next();
    this.destroy$.complete();
    this._errorMessage$.next(
      this.getMessageByCode(code, this.errors) || 'An error occurred',
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearErrorMessage() {
    this.destroy$.next();
    this.destroy$.complete();
    this._errorMessage$.next(null);
  }

  getMessageByCode(code: string, errors: IError[]) {
    return errors.find((error) => error.errorCode.includes(code))?.errorMessage;
  }
}
