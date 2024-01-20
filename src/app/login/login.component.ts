import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SnackBarService } from '../shared/snack-bar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, MatButtonModule, RouterLink],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    sessionStorage.clear()
  }

  private formBuilder = inject(FormBuilder);
  private service = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private snack = inject(SnackBarService);

  userData: any;

  loginForm = this.fb.group({
    userName: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  })

  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getByCode(this.loginForm.value.userName).subscribe(res => {
        this.userData = res;
        if (this.userData.password === this.loginForm.value.password) {
          if (this.userData.isActive) {
            const userCredentials = {
              userId: this.userData.id,
              userName: this.userData.name,
              userRole: this.userData.role,
              expirationTime: new Date().getTime() + 60 * 60 * 1000 // 1 saat (60 dakika x 60 saniye x 1000 milisaniye)

            };
            sessionStorage.setItem('userCredentials', JSON.stringify(userCredentials));
            this.router.navigate([''], { relativeTo: this.route });

          } else {
            this.snack.info('Yönetici ile iletişime Geçin', 'Tamam')
          }
        } else {
          this.snack.info('Hatalı Bilgi', 'Tamam')
        }

      })

    }
  }

}

