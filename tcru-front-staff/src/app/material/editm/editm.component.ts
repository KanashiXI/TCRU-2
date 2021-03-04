// import { isPropsValidTester } from '@fullcalendar/core/validation';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MeterialserviceService } from '../../service/meterialservice.service';
import { HttpClient } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
import { Material } from '../../models/Material.model';

@Component({
  selector: 'app-editm',
  templateUrl: './editm.component.html',
  styleUrls: ['./editm.component.css']
})
export class EditmComponent implements OnInit {

  id: any;
  Materials=new Material();
  date: any;
  files: any;


  constructor(private http: HttpClient,
    private MeterialService: MeterialserviceService,
    // private toastr: ToastrService,
    private route:ActivatedRoute) { 
    

  }

  ngOnInit() {
    this.id=this.route.snapshot.params.id;
    this.getData();
  }

getData(){
  this.MeterialService.geteditmaterial(this.id).subscribe(res=>{
    this.date = res;
    this.Materials = this.date;
  })
}
imageUpload(event){
  this.files = event.target.files[0];
  console.log(this.files)
}

editMaterial(){
  if (confirm('คุณต้องการแก้ไขหรือไม่ ?') === true) {
  this.MeterialService.editMaterial(this.id,this.Materials).subscribe(res=>{
    // this.toastr.success('แก้ไขสำเร็จ!');
  },
    err => {
    // this.toastr.error('แก้ไขล้มเหลว!');
    console.log(err);
  });
}
}
}
