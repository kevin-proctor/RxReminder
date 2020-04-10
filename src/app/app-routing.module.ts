import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDrugComponent } from './components/add-drug/add-drug.component';
import { EditDrugComponent } from './components/edit-drug/edit-drug.component';
import { DrugListComponent } from './components/drug-list/drug-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-drug' },
  { path: 'add-drug', component: AddDrugComponent },
  { path: 'edit-drug', component: EditDrugComponent },
  { path: 'drug-list', component: DrugListComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
