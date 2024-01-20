import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then((mod) => mod.RegisterComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then((mod) => mod.LoginComponent)
    },
    {
        path: 'user',
        loadComponent: () => import('./userlisting/userlisting.component').then((mod) => mod.UserlistingComponent),
        canActivate: [AuthGuard]
    },
];
