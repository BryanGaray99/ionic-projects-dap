import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRepoPageRoutingModule } from './edit-repo-routing.module';

import { EditRepoPage } from './edit-repo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRepoPageRoutingModule
  ],
  declarations: [EditRepoPage]
})
export class EditRepoPageModule {}
