import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SnackBarService } from '../../shared/snack-bar.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update-popup',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatRadioModule, ReactiveFormsModule, MatButtonModule, RouterLink, MatSelectModule, MatCheckboxModule, MatDialogModule],
  templateUrl: './update-popup.component.html',
  styleUrl: './update-popup.component.scss'
})
export class UpdatePopupComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private service = inject(AuthService);
  private snack = inject(SnackBarService);
  private router = inject(Router)
  private route = inject(ActivatedRoute);
  private injectData = inject(MAT_DIALOG_DATA);
  dialog = inject(MatDialog);

  roleList: any;
  editedData: any

  ngOnInit(): void {
    this.service.getAllRole().subscribe(res => {
      this.roleList = res
    })
    if (this.injectData != null && this.injectData != '') {
      this.service.getByCode(this.injectData.userId).subscribe(res => {
        this.editedData = res
        this.updateForm.setValue(
          {
            id: this.editedData.id,
            name: this.editedData.name,
            password: this.editedData.password,
            email: this.editedData.email,
            gender: this.editedData.gender,
            role: this.editedData.role,
            isActive: this.editedData.isActive
          }
        )
      })
    } else {
      console.log('Yok')
    }
  }

  updateForm = this.formBuilder.group({
    id: this.formBuilder.control(''),
    name: this.formBuilder.control(''),
    password: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    gender: this.formBuilder.control('male'),
    role: this.formBuilder.control('', Validators.required),
    isActive: this.formBuilder.control(false),
  })


  updateUser() {
    if (this.updateForm.valid) {
      this.service.updateUser(this.updateForm.value.id, this.updateForm.value).subscribe(res => {
        this.dialog.closeAll()
        this.snack.info('Üye Güncellendi.', 'Tamam')

      })
    } else {
      this.snack.info('Lütfen Kullanıcı Rolü Seçiniz', 'Tamam')
    }
  }


}
