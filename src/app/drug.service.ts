import { Injectable } from '@angular/core';
import { Drug } from './drug';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class DrugService {
  drugsRef: AngularFireList<any>;
  drugRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  /* Create drug */
  AddDrug(drug: Drug){
    this.drugsRef.push({
      drug_name: drug.drug_name,
      directions: drug.directions,
      // times: drug.times
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  GetDrug(id: string){
    this.drugRef = this.db.object('drugs-list/' + id);
    return this.drugRef;
  }

  /* Get drug list */
  GetDrugList() {
    this.drugsRef = this.db.list('drugs-list');
    return this.drugsRef;
  }

  /* Update drug */
  UpdateDrug(id, drug: Drug) {
    this.drugRef.update({
      drug_name: drug.drug_name,
      directions: drug.directions,
      // times: drug.times
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete drug */
  DeleteDrug(id: string) {
    this.drugRef = this.db.object('drug-list/' + id);
    this.drugRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  //Error management
  private errorMgmt(error) {
    console.log(error)
  }
}
