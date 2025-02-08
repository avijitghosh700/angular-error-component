import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { ErrorService } from '../../shared/services/error.service';
import { ErrorComponent } from '../../common/error/error.component';
import { Book } from '../../shared/interfaces';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [MatCardModule, ErrorComponent, AsyncPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly errorService = inject(ErrorService);
  private readonly destroy$ = new Subject<void>();

  errorMessage$ = this.errorService.errorMessage$;
  bookId: string = this.route.snapshot.params['id'];
  book: Book | null = null;

  ngOnInit() {
    this.apiService
      .getBook(this.bookId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((books) => {
        this.book = books ?? null;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.errorService.clearErrorMessage();
  }
}
