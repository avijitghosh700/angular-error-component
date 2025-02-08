import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../shared/services/api.service';
import { AuthorDetails } from '../../shared/interfaces';
import { ErrorService } from '../../shared/services/error.service';
import { ErrorComponent } from '../../common/error/error.component';
import { Subject, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-author',
  imports: [MatCardModule, MatChipsModule, ErrorComponent, AsyncPipe],
  templateUrl: './author.component.html',
  styleUrl: './author.component.scss',
})
export class AuthorComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);
  private readonly errorService = inject(ErrorService);
  private readonly destroy$ = new Subject<void>();

  errorMessage$ = this.errorService.errorMessage$;
  authorId: string = this.route.snapshot.params['id'];
  author: AuthorDetails | null = null;

  ngOnInit() {
    this.apiService
      .getAuthor(this.authorId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((authors) => {
        this.author = authors ?? null;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.errorService.clearErrorMessage();
  }
}
