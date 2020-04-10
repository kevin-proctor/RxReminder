import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { DrugService } from './../../drug.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Time {
  name: string;
}

@Component({
  selector: 'app-add-drug',
  templateUrl: './add-drug.component.html',
  styleUrls: ['./add-drug.component.scss']
})
export class AddDrugComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  timeArray: Time[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetDrugForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  drugForm: FormGroup;

  ngOnInit() {
    this.drugApi.GetDrugList();
    this.submitDrugForm();
  }

  constructor(
    public fb: FormBuilder,
    private drugApi: DrugService
  ) { }

  /* Remove dynamic times */
  remove(time: Time): void {
    const index = this.timeArray.indexOf(time);
    if (index >= 0) {
      this.timeArray.splice(index, 1);
    }
  }

  /* Reactive drug form */
  submitDrugForm() {
    this.drugForm = this.fb.group({
      drug_name: ['', [Validators.required]],
      directions: ['', [Validators.required]]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.drugForm.controls[controlName].hasError(errorName);
  }

  /* Add dynamic times */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add time
    if ((value || '').trim() && this.timeArray.length < 5) {
      this.timeArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Reset form */
  resetForm() {
    this.timeArray = [];
    this.drugForm.reset();
    Object.keys(this.drugForm.controls).forEach(key => {
      this.drugForm.controls[key].setErrors(null)
    });
  }

  /* Submit drug */
  submitDrug() {
    if (this.drugForm.valid){
      this.drugApi.AddDrug(this.drugForm.value)
      this.resetForm();
    }
  }


}
