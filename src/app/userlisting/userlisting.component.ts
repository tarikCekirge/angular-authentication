import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatePopupComponent } from '../components/update-popup/update-popup.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-userlisting',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatSortModule],
  templateUrl: './userlisting.component.html',
  styleUrl: './userlisting.component.scss'
})
export class UserlistingComponent implements OnInit, AfterViewInit {
  service = inject(AuthService);
  dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: any;
  userList: any;
  displayedColumns: string[] = ['username', 'name', 'email', 'role', 'status', 'action'];


  ngOnInit() { }

  ngAfterViewInit() {
    this.loadUser()

  }

  loadUser() {
    this.service.getAll().subscribe(res => {
      this.userList = res
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  updateUser(id: number) {
    const popup = this.dialog.open(UpdatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '30%',
      data: {
        userId: id
      }
    })
    popup.afterClosed().subscribe(res => {
      this.loadUser();
    })
  }

  openDialog() { }

}
