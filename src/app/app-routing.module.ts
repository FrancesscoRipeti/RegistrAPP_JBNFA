import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'welcomealum',
    loadChildren: () => import('./pages/welcomealum/welcomealum.module').then( m => m.WelcomealumPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./pages/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
