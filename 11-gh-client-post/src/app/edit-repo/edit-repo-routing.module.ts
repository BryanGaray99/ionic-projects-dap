import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRepoPage } from './edit-repo.page';

const routes: Routes = [
  {
    path: '',
    component: EditRepoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRepoPageRoutingModule {}
