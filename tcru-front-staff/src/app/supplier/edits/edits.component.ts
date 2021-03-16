
// import { isPropsValidTester } from '@fullcalendar/core/validation';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/service/supplier.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { supplier } from 'src/app/models/supplier.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edits',
  templateUrl: './edits.component.html',
  styleUrls: ['./edits.component.css']
})
export class EditsComponent implements OnInit {

  id: any;
  supplier=new supplier();
  selectedMaterials:any = [];
  date: any;
  files: any;
  form: FormGroup;
  MaterialsList: any;


  constructor(private fb: FormBuilder,private http: HttpClient,
    private SupplierService: SupplierService,
    private toastr: ToastrService,
    private route:ActivatedRoute) { 
  
  }

  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.getData();
    this.createForm();
    this.getDatamaterial();
  }
  createForm() {
    this.form = this.fb.group({
      // id: ['', [Validators.required]],
      supplier_name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      store_name: ['', [Validators.required]],
    });
  }

// getData(){
//   this.SupplierService.geteditsupplier(this.id).subscribe(res=>{
//     this.date = res;
//     this.supplier = this.date;
//     //  console.log(this.supplier);
//   })
// }
getData(){
  this.SupplierService.geteditsupplier(this.id).subscribe(res=>{
      this.date=res;
      this.supplier=this.date;
      this.selectedMaterials = this.supplier.material_name.split(",");
  })

}
getDatamaterial() {
  this.SupplierService.getDatamaterial().subscribe(res => {
    this.MaterialsList = res;
  })
}
MaterialsChange(event){
  let index = this.selectedMaterials.indexOf(event.target.value);
  if(index == -1){
    this.selectedMaterials.push(event.target.value);
  } else{
    this.selectedMaterials.splice(index,1);
  }
  console.log(this.selectedMaterials)
}
imageUpload(event){
  this.files = event.target.files[0];
  console.log(this.files)
}

editsupplier(){
  if (confirm('คุณต้องการแก้ไขหรือไม่ ?') === true) {
    if (this.form.invalid) {
      return;
    } else {
      this.supplier.material_name = this.selectedMaterials.toString();
  this.SupplierService.editsupplier(this.id,this.supplier).subscribe(res=>{
    this.toastr.success('แก้ไขสำเร็จ!');
  },
    err => {
    this.toastr.error('แก้ไขล้มเหลว!');
    console.log(err);
  });
}
}
}
get supplier_name() {
  return this.form.get('supplier_name')
}
get phone() {
  return this.form.get('phone')
}
get email() {
  return this.form.get('email')
}
get address() {
  return this.form.get('address')
}
get store_name() {
  return this.form.get('store_name')
}}
