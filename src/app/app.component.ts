import { ChangeDetectionStrategy, Component, DoCheck, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatProgressSpinnerModule, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements DoCheck {

  private router = inject(Router);
  private service = inject(AuthService);
  title: string = 'angular-authentication';
  idAdminUser: boolean = false
  isMenuRequired: boolean = false;
  ngDoCheck() {
    let currentUrl = this.router.url
    if (currentUrl == '/login' || currentUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
    if (this.service.getUserRole() == 'admin') {
      this.idAdminUser = true
    } else {
      this.idAdminUser = false
    }
  }

}
