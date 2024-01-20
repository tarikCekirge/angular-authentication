import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { SnackBarService } from '../shared/snack-bar.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {

  }

  private formBuilder = inject(FormBuilder);
  private service = inject(AuthService);
  private snack = inject(SnackBarService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);




  registerForm = this.fb.group({
    id: this.formBuilder.control('', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ])),
    name: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.compose([
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ])),
    email: this.formBuilder.control('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control(''),
    isActive: this.formBuilder.control(false),
  })

  proceedRegisteration() {
    if (this.registerForm.valid) {
      this.service.proceedRegister(this.registerForm.getRawValue()).subscribe(res => {
        this.snack.info('Erişim Etkinleştirme için lütfen Admin ile iletişime geçin', 'Tamam')
        this.router.navigate(['/login'], { relativeTo: this.route });
      })
    } else {
      this.snack.info('Geçersiz Bilgi', 'Tamam')
    }
  }

}
