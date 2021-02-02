import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emloyeeinterface } from 'src/app/shared/interface/emloyeeinterface';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-showemp',
  templateUrl: './showemp.component.html',
  styleUrls: ['./showemp.component.css']
})
export class ShowempComponent {

  employee: any[] = [];
  constructor(private http: HttpClient) {
    http.get<any[]>('http://127.0.0.1:8000/api/register').subscribe(result => {
      this.employee = result;

      console.log(JSON.stringify(this.employee));

    });
  }


}
