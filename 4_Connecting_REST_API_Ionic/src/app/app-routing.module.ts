import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Define the routes for the application using the Routes interface from '@angular/router'
const routes: Routes = [
  {
    // Define the default path, which will load the TabsPageModule lazily
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
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
