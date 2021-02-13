import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsSignedInGuard } from './guards/is-signed-in.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [ IsSignedInGuard ]
  },
  {
    path: 'user-details/:id',
    loadChildren: () => import('./pages/user-details/user-details.module').then( m => m.UserDetailsPageModule),
    canActivate: [ IsSignedInGuard ]
  },
  {
    path: 'insert-user',
    loadChildren: () => import('./pages/insert-user/insert-user.module').then( m => m.InsertUserPageModule),
    canActivate: [ IsSignedInGuard ]
  },
  {
    path: 'update-user/:id',
    loadChildren: () => import('./pages/update-user/update-user.module').then( m => m.UpdateUserPageModule),
    canActivate: [ IsSignedInGuard ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
