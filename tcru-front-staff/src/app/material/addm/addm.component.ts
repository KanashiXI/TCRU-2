
import { HttpClient } from '@angular/common/http';
import { Materialinterface } from '../../interfaces/materialinterface';
import { MeterialserviceService } from '../../service/meterialservice.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Material } from '../../models/Material.model';
// import { reverse } from 'dns';

@Component({
  selector: 'app-addm',
  templateUrl: './addm.component.html',
  styleUrls: ['./addm.component.css']
})
export class AddmComponent {

  materialList: any[]=[];
  imageDirectoyPath:any = 'http://127.0.0.1:5000/public/image/';
  searchText: string;
  Search: string;
  materialMessage: string;
  dataArr: any;
  page:any = 1;
  limit: any = 5;
  skip: any;
  categoryArr:any;
  totalCount: any;
  Materials = new Material();
  data: any;
  form: FormGroup;
  MaterialCategory: any;
  constructor(private fb: FormBuilder, private http: HttpClient,
    private MeterialService: MeterialserviceService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    ) {

  }
  ngOnInit(): void {
    this.getMeterial();
    this.getData();
    this.getcategory();
  }
  createForm() {
    this.form = this.fb.group({
      // material_id: ['', [Validators.required]],
      material_name: ['', [Validators.required], ],
      weight: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      image: ['', [Validators.required]],
      unit_count_id: ['', [Validators.required]],
      scale: ['', [Validators.required]],
      critical: ['', [Validators.required]],
    });
  }
  getMeterial()
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
    this.MeterialService.getData1(requestObj).subscribe((res:any)=>{
      this.spinner.hide();
      this.dataArr=res.data;
      this.totalCount = res.totalRecord;
    })
  }
  getcategory() {
    this.MeterialService.getcategory().subscribe(res => {
      this.categoryArr = res;
      console.log(this.categoryArr)
    })
  }

  getData() {
    this.MeterialService.getData().subscribe(res => {
      this.data = res;
      console.log(this.data)
    })
  }
  getMeterialService(event) {
    var obj = {
      category_id: event.target.value

    }
    let x = obj.category_id
    if (x != "") {
      
        this.MeterialService.MaterialCategory(obj).subscribe(res => {
          this.MaterialCategory = res;
          console.log(obj)

      });
    } else
    {
      this.MeterialService.getData().subscribe(res => {
        this.MaterialCategory = res;
        console.log(x)
      
      });
    }
    console.log(this.category_id)
  }

  deleteMaterial(id){
    if (confirm('คุณต้องการลบหรือไม่ ?') === true)
    this.MeterialService.deleteMaterial(id).subscribe(result => {
      this.getMeterial();
      this.spinner.show();
      this.toastr.success('ลบข้อมูลวัตถุดิบสำเร็จ!'); 
      console.log(id);
    },
    err => {
    this.toastr.error('ลบล้มข้อมูลวัตถุดิบเหลว!');
    this.spinner.show();
    console.log(err);
    });
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
get category_id() {
  return this.form.get('category_id')
}
get image() {
  return this.form.get('image')
}
get scale() {
  return this.form.get('scale')
}
get unit_count_id() {
  return this.form.get('unit_count_id')
}
get critical() {
  return this.form.get('critical')
}



}
  
