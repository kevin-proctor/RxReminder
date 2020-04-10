import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DrugService } from 'src/app/drug.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Time {
  name: string;
}

@Component({
  selector: 'app-edit-drug',
  templateUrl: './edit-drug.component.html',
  styleUrls: ['./edit-drug.component.scss']
})

export class EditDrugComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  // timeArray: Time[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeyCodes: number[] = [ENTER, COMMA];
  editDrugForm: FormGroup;

  ngOnInit() {
    this.updateDrugForm();
  }
  
  constructor(
    public fb: FormBuilder,
    private location: Location,
    private drugApi: DrugService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.drugApi.GetDrug(id).valueChanges().subscribe(data => {
      // this.timeArray = data.times;
      this.editDrugForm.setValue(data);
    })
  }

  /* Update form */
  updateDrugForm(){
    this.editDrugForm = this.fb.group({
      drug_name: ['', [Validators.required]],
      directions: ['', [Validators.required]],
      // times: ['']
    })
  }

  /* Add Time */
  // add(event: MatChipInputEvent): void {
  //   var input: any = event.input;
  //   var value: any = event.value;
  //   // Add time
  //   if ((value || '').trim() && this.timeArray.length < 5) {
  //     this.timeArray.push({name: value.trim()});
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  /* Remove time */
  // remove(time: any): void {
  //   const index = this.timeArray.indexOf(time);
  //   if (index >= 0) {
  //     this.timeArray.splice(index, 1);
  //   }
  // }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editDrugForm.controls[controlName].hasError(errorName);
  }

  /* Go to previous page */
  goBack(){
    this.location.back();
  }

  /* Submit Drug */
  updateDrug() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you want to update?')){
      this.drugApi.UpdateDrug(id, this.editDrugForm.value);
      this.router.navigate(['drug-list']);
    }
  }


}
