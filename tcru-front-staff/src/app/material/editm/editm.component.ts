// import { isPropsValidTester } from '@fullcalendar/core/validation';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MeterialserviceService } from '../../service/meterialservice.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Material } from '../../models/Material.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { uniquematerial_nameValidator } from 'src/app/Service/unique-material-name-validator.directive';

@Component({
  selector: 'app-editm',
  templateUrl: './editm.component.html',
  styleUrls: ['./editm.component.css']
})
export class EditmComponent implements OnInit {

  id: any;
  Materials=new Material();
  date: any;
  categoryArr: any;
  files: any;
  form: FormGroup;
  unit_countArr: any;

  constructor(private fb: FormBuilder,private http: HttpClient,
    private MeterialService: MeterialserviceService,
    private toastr: ToastrService,
    private route:ActivatedRoute) { 
  }
  createForm() {
    this.form = this.fb.group({
      material_id: ['', [Validators.required]],
      material_name: ['', [Validators.required], uniquematerial_nameValidator(this.MeterialService)],
      weight: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      image: ['', [Validators.required]],
      unit_count_id: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.getData();
    this.getcategory();
    this.createForm();
    this.getunit_count();
  }
  getcategory() {
    this.MeterialService.getcategory().subscribe(res => {
      this.categoryArr = res;
    })
  }

getData(){
  this.MeterialService.geteditmaterial(this.id).subscribe(res=>{
    this.date = res;
    this.Materials = this.date;
  })
}
imageUpload(event){
  this.files = event.target.files[0];
}
getunit_count() {
  this.MeterialService.getunit_count().subscribe(res => {
    this.unit_countArr = res;
  })
}
editMaterial(){
  if (confirm('คุณต้องการแก้ไขหรือไม่ ?') === true) {
  this.MeterialService.editMaterial(this.id,this.Materials).subscribe(res=>{
    this.toastr.success('แก้ไขสำเร็จ!');
  },
    err => {
    this.toastr.error('แก้ไขล้มเหลว!');
    console.log(err);
  });
}
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
get unit_count_id() {
  return this.form.get('unit_count_id')
}

}
