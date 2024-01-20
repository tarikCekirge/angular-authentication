import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() idAdminUser!: boolean;
  @Input() isMenuRequired!: boolean;
}
