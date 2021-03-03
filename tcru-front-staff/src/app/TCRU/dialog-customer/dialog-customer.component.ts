import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../Service/customers.service';
import * as _ from 'lodash';
// import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dialog-customer',
  templateUrl: './dialog-customer.component.html',
  styleUrls: ['./dialog-customer.component.css']
})
export class DialogCustomerComponent{

  private files: File[] = [];
  private router: Router;
  private uploadRoute: string = 'http://localhost:5000/api/Customers';

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
    private Customer: CustomersService,
    // private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {

    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    }),

    this.getCustomers();
  }

  ngOnDestroy() {
    if (this.fileUploadSub) {
      this.fileUploadSub.unsubscribe()
    }
  }

  handleProgress(event) {
    if (event.type === HttpEventType.DownloadProgress) {
      this.uploadingProgressing = true
      this.uploadProgress = Math.round(100 * event.loaded / event.total)
    }
    if (event.type === HttpEventType.UploadProgress) {
      this.uploadingProgressing = true
      this.uploadProgress = Math.round(100 * event.loaded / event.total)
    }
    if (event.type === HttpEventType.Response) {
      this.uploadComplete = true
      this.serverResponse = event.body
    }
  }

  handleSubmit(event: any, formImport: FormGroup) {
    event.preventDefault()
    let submittedData = formImport.value

    this.fileUploadSub = this.Customer.fileUpload(
      this.fileToUpload,
      submittedData
    ).subscribe(
      event => this.handleProgress(event),
      error => {
        console.log("server error")
      });
  }

  // handleSubmit(event: any, formImport: FormGroup) {
  //   if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true)
  //     event.preventDefault()
  //   let submittedData = formImport.value
  //   this.fileUploadSub = this.Customer.fileUpload(
  //     this.fileToUpload,
  //     submittedData,
  //   ).subscribe(
  //     event => this.handleProgress(event),
  //     error => {
  //       console.log("server error"),
  //         this.toastr.error('ลบล้มข้อมูลสินค้าเหลว!');
  //     });
  // }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
    console.log("file input has changed. The file is")
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
      this.Customer.getData1(requestObj).subscribe((res:any)=>{
        this.spinner.hide();
        this.dataArr=res.data;
        this.totalCount = res.totalRecord;
      })
    }

  
}
