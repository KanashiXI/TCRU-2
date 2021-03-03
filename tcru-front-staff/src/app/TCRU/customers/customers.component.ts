import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { CustomersService } from '../../Service/customers.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCustomerComponent } from '../dialog-customer/dialog-customer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { NgxSpinnerService } from "ngx-spinner";

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements AfterViewInit {

  private files: File[] = [];
  private router: Router;
  private uploadRoute: string = 'api/Customers';

  @ViewChild('labelImport')
  labelImport: ElementRef;
  formImport: FormGroup;
  fileToUpload: File = null;
  fileUploadSub: any;
  uploadingProgressing: boolean = false;
  uploadProgress: number = 0;
  uploadComplete: boolean = false;
  serverResponse: any;

  customersList: any[];
  customer_id: string;
  customersMessage: string;
  fileName = 'Customers.xlsx';
  searchText: string;
  term: string;
  filterTerm: string;
  page:any = 1;
  limit: any = 10;
  skip: any;
  categoryArr:any;
  totalCount: any;
  dataArr: any;

  constructor(private http: HttpClient,
    private Customers: CustomersService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,) { }

    openDialog(){
      let dialogRef = this.dialog.open(DialogCustomerComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  displayedColumns: string[] = ['id', 'fritsname', 'lastname', 'address', 'phonenumber'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCustomers()
    {
      this.spinner.show();
      if(this.page == 1){
          this.skip = 0;
      } else{
          this.skip = (this.page-1) * this.limit;
      }
      var requestObj = {
             'limit': this.limit,
             'skip':  this.skip
             
      }
      this.Customers.getData1(requestObj).subscribe((res:any)=>{
        this.spinner.hide();
        this.dataArr=res.data;
        this.totalCount = res.totalRecord;
      })
    }

  // getCustomer()
  // {
  //   this.Customers.getData1().subscribe(res=> {
  //     this.dataArr = res;
  //   })
  // }

}