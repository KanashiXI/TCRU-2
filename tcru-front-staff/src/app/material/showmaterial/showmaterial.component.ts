import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MeterialserviceService } from 'src/app/service/meterialservice.service';
import { ToastrService } from 'ngx-toastr';
import { Material } from '../../models/Material.model';
import { uniquematerial_nameValidator } from 'src/app/Service/unique-material-name-validator.directive';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-showmaterial',
  templateUrl: './showmaterial.component.html',
  styleUrls: ['./showmaterial.component.css']
})
export class ShowmaterialComponent implements OnInit {

  dataArr: any;
  form: FormGroup;
  files: any;
  id: any;
  Materials = new Material();
  date: any;
  categoryArr: any;
  category: any;
  page: any = 1;
  limit: any = 5;
  skip: any;
  totalCount: any;
  constructor(private fb: FormBuilder, private http: HttpClient,
    private MeterialService: MeterialserviceService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
  }


  ngOnInit(): void {
    this.getMeterial();
    this.getcategory();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      material_id: ['', [Validators.required]],
      material_name: ['', [Validators.required], uniquematerial_nameValidator(this.MeterialService)],
      weight: ['', [Validators.required]],
      price: ['', [Validators.required]],
      img: ['', [Validators.required]],
    });
  }
  getMeterial() {
    // this.spinner.show();
    if (this.page == 1) {
      this.skip = 0;
    } else {
      this.skip = (this.page - 1) * this.limit;
    }
    var requestObj = {
      'limit': this.limit,
      'skip': this.skip
    }
    this.MeterialService.getData1(requestObj).subscribe((res: any) => {
      this.spinner.hide();
      this.dataArr = res.data;
      this.totalCount = res.totalRecord;
    })
  }
  getcategory() {
    this.MeterialService.getcategory().subscribe(res => {
      this.categoryArr = res;
    })
  }
  insertData() {
    if (confirm('คุณต้องการเพิ่มข้อมูลหรือไม่ ?') === true) {
      if (this.form.invalid) {
        return;
      } else {
        let formdata = new FormData();
        formdata.append("file", this.files, this.files.name);
        formdata.append("data", JSON.stringify(this.Materials));
        this.MeterialService.addMaterialtData(formdata).subscribe(res => {
          this.getMeterial();
          this.toastr.success('เพิ่มข้อมูลวัตถุดิบสำเร็จ!');
        }
          ,
          err => {
            this.toastr.error('เพิ่มข้อมูลวัตถุดิบล้มเหลว!');
            console.log(err);
          });
      }

    }
  }

  // getcategory() {
  //   this.MeterialService.getcategory().subscribe(res=>{
  //          this.categoryArr = res;
  //   })
  // }

  imageUpload(event) {
    this.files = event.target.files[0];
    console.log(this.files)
  }
  get material_name() {
    return this.form.get('material_name')
  }
  get weight() {
    return this.form.get('weight')
  }
  get material_id() {
    return this.form.get('material_id')
  }
  get price() {
    return this.form.get('price')
  }
  get img() {
    return this.form.get('img')
  }


}
