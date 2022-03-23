import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseTypesComponent } from './choose-types/choose-types.component';
import { UserNameComponent } from './user-name/user-name.component';

const routes: Routes = [
  {
    path: '',
    component: UserNameComponent
  },
  {
    path:'types',
    component: ChooseTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
