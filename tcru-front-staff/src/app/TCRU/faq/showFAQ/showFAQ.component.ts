import { Component, OnInit } from '@angular/core';
import { FaqService } from './../../../Service/faqService.service';
import { FaqInterface } from './../interface/faqInterface';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-showFAQ',
  templateUrl: './showFAQ.component.html',
  styleUrls: ['./showFAQ.component.scss']
})
export class ShowFAQComponent implements OnInit {

  dataSource: FaqInterface[];
  errorMessage: String;
  dataForm: FaqInterface;

  constructor(
    private FaqService: FaqService,

  ) { }

  ngOnInit() {
    this.FaqService.getFaq().subscribe(
      res => {
        this.dataSource = res;
      },
      error => this.errorMessage = <any>error
    )
  }

  onClickDelete(data) {
    Swal.fire({
      title: 'คุณต้องการลบข้อมูลนี้ ใช่ หรือ ไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then((result) => {
      if (result.value) {
        this.FaqService.deleteFaq(data).subscribe()
        Swal.fire(
          'ลบข้อมูลเรียบร้อย',
          '',
          'success',
        )
        this.ngOnInit() 
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    }) 
  }

}
