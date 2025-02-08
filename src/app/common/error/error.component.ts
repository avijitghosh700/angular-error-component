import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorService } from '../../shared/services/error.service';

@Component({
  selector: 'error',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  errorCode = input<string>();
  errorMessage = input.required<string>();

  private readonly errorService = inject(ErrorService);

  closeError() {
    this.errorService.clearErrorMessage();
  }
}
