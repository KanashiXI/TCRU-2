import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ShippingService } from '../../Service/shippingService.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reactiveForm: FormGroup;
  dateFrom: string;
  dateTo: string;
  constructor(
    private ShippingService: ShippingService,
  ) { }

  ngOnInit(): void {
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  exportProduct() {
    // this.shSend_date = this.reactiveForm.get('send_date_from').value.format("yyyy-MM-dd");
    this.dateFrom = this.range.controls['start'].value.toLocaleDateString();
    this.dateTo = this.range.controls['end'].value.toLocaleDateString();

    // var formatDateFrom = this.formatDate(this.dateFrom)
    // var formatDateTo = this.formatDate(this.dateTo)
    // var formatDateFrom = this.datePipe.transform(this.dateFrom, "dd/MM/yyyy");
    // var formatDateTo = this.datePipe.transform(this.dateTo, "dd/MM/yyyy");

    this.ShippingService.getProductReport(this.dateFrom, this.dateTo).subscribe(
      blob => this.ShippingService.download(blob, 'product' + this.dateFrom + '-' + this.dateTo + '.xlsx'),

    );


  }
}
