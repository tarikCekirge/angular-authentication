import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor() { }

  private snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  info(text: string, button: string) {
    this.snackBar.open(text, button, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    })
  }
}