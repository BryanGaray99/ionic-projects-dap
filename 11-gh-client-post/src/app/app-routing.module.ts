import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/**
 * Configuration of the application's routes.
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',  // Redirect to the home page by default
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'edit-repository',
    loadChildren: () => import('./edit-repo/edit-repo.module').then(m => m.EditRepoPageModule)
  }
];

// NgModule decorator for the AppRoutingModule class
@NgModule({
  // Import the RouterModule and configure it with the defined routes
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  // Export the configured RouterModule to make it available for other modules
  exports: [RouterModule]
})
export class AppRoutingModule {}
