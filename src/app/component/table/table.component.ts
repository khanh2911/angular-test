import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/Model/Customer';
import { MasterService } from 'src/app/_services/master.service';
import { UserService } from 'src/app/_services/user.service';

import { PopupComponent } from '../popup/popup.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  customerlist !: Customer[];
  dataSource: any;
  displayedColumns: string[] = ["code", "name", "email", "phone", "status", "action"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: MasterService,
    private us: UserService,
    private dialog: MatDialog) {
    this.loadcustomer();
  }


  loadcustomer() {
    this.service.GetCustomer()
      .subscribe((data: any) => {
        this.customerlist = data;
        this.dataSource = new MatTableDataSource<Customer>(this.customerlist);
        this.dataSource.paginator = this.paginatior;
        this.dataSource.sort = this.sort;
      });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  Openpopup(code: any, title: any) {
    var _popup = this.dialog.open(PopupComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      // console.log(item)
      this.loadcustomer();
    })
  }
  addcustomer(){
    this.Openpopup(0, 'Add Customer');
  }

  editcustomer(code: any) {
    this.Openpopup(code, 'Edit Customer');
  }

  openDialog(code:any, name: any): void {
    this.dialog.open(DialogAnimationsDialog, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      //truyền thuộc tính sang DialogAnimationsDialog
      data: {
        code: code,
        name: name,
        tableComponent: this
      }
    });
  }
}

//component hiển thông báo khi xóa
@Component({
  selector: 'dialog-animations-dialog',
  templateUrl: 'dialog.component.html',
  styles:[`
  .red-heading {
    color: red;
  }
  `]

})
export class DialogAnimationsDialog {
  name:any;
  //khai báo constructor để nhận tham số data và lưu nó trong một thuộc tính data
  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogAnimationsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.name = this.data.name;
  }
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  //khi đồng ý xóa sẽ lấy dữ liệu truyền từ openDialog và gọi hàm DeleteCustomer để xóa
  accept() {
    const code = this.data.code;
    const tableComponent = this.data.tableComponent;
    tableComponent.service.DeleteCustomer(code).subscribe(() => {
      tableComponent.loadcustomer();
      this.toastr.success(`Delete customer ${this.data.name} success`);
    });
  }
}

