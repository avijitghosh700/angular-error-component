import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../shared/interfaces';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { AsyncPipe } from '@angular/common';
import { ErrorComponent } from '../../common/error/error.component';
import { ErrorService } from '../../shared/services/error.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    ErrorComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private readonly apiService = inject(ApiService);
  private readonly errorService = inject(ErrorService);

  errorMessage$ = this.errorService.errorMessage$;

  dataSource$: Observable<Book[]> = this.apiService.getBooks();
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'year',
    'genre',
    'actions',
  ];
}
