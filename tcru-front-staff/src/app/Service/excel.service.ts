import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  async downlondExcel(){
    const header = ["id", "fristname", "lastname", "address", "phonenumber", "username", "password"];

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Customers");

    const headerRow = worksheet.addRow(header);

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      fs.saveAs(blob, "Customers.xlsx");
    });
  };
}
