import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { InstructorService } from './../../../Service/instructorService.service';
import { InstructionInterface } from './../interface/instructionInterface';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-showInstruction',
  templateUrl: './showInstruction.component.html',
  styleUrls: ['./showInstruction.component.scss']
})
export class ShowInstructionComponent implements OnInit {

  dataSource: InstructionInterface[];
  errorMessage: String;
  dataForm: InstructionInterface;

  constructor(
    private InstructorService: InstructorService,
  ) { }

  ngOnInit() {
    this.InstructorService.getInstruction().subscribe(
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
        this.InstructorService.deleteInstruction(data).subscribe()
        Swal.fire(
          'ลบข้อมูลเรียบร้อย',
          '',
          'success',
        )
        this.ngOnInit() 
      } else if (result.dismiss === Swal.DismissReason.cancel) { }
    }) 
  }

  onClickSubmit(data) {
    this.InstructorService.nextMessage(data);
    localStorage.setItem("instruction_id", data);
  }

}
