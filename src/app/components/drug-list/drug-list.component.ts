import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Drug } from 'src/app/drug';
import { MatPaginator } from '@angular/material/paginator';
import { DrugService } from 'src/app/drug.service';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.scss']
})

export class DrugListComponent implements OnInit {

  dataSource: MatTableDataSource<Drug>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  DrugData: any = [];
  displayedColumns: any[] = [
    '$key',
    'drug_name',
    'directions',
    'times'
  ];

  constructor(private drugApi: DrugService) {
    this.drugApi.GetDrugList()
      .snapshotChanges().subscribe(drugs => {
        drugs.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.DrugData.push(a as Drug)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.DrugData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      })
  }

  /* Delete */
  deleteDrug(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.drugApi.DeleteDrug(e.$key)
    }
  }

  ngOnInit(): void {
  }

}
