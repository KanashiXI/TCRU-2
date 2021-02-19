import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CustomersService } from '../../service/customers.service';


@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent {

  private CustomersService: CustomersService;
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

  constructor(private Customer: CustomersService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,) { }

  ngOnInit() {

    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    })
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
    if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true)
    event.preventDefault()
    let submittedData = formImport.value
    this.fileUploadSub = this.Customer.fileUpload(
      this.fileToUpload,
      submittedData, 
    ).subscribe(
      event => this.handleProgress(event),
      error => {
        console.log("server error"),
        this.toastr.error('ลบล้มข้อมูลสินค้าเหลว!');
      });
  }

  onFileChange(files: FileList) {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
    console.log("file input has changed. The file is")
  }

  // import(): void {
  //   console.log('import ' + this.fileToUpload.name);
  // }import { CustomersService } from './../../Services/customers.service';


  // ngOnInit(): void { }

}
