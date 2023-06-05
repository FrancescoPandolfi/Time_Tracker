import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'auth',
        loadComponent: () => import('./core/auth/auth.component').then(m => m.AuthComponent)
    }
];
