import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from 'src/app/_services/master.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive';
  isEdit: boolean = false;
  constructor(
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private buildr: FormBuilder,
    private service: MasterService) {

  }
  // thêm một getter để dễ dàng truy cập các trường của form và kiểm tra trạng thái
  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    this.inputdata = this.data?.title ? this.data : {};
    if (this.inputdata.code > 0) {
      this.isEdit = true;
      this.setpopupdata(this.inputdata.code);
    }
  }

  setpopupdata(code: any) {
    this.service.GetCustomerbycode(code).subscribe(item => {
      this.editdata = item;
      //console.log(item);
      this.myform.setValue({name:this.editdata.name,email:this.editdata.email,phone:this.editdata.phone,
      status:this.editdata.status})
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  // myform = this.buildr.group({
  //   name: this.buildr.control(''),
  //   email: this.buildr.control(''),
  //   phone: this.buildr.control(''),
  //   status: this.buildr.control(true)
  // });
  myform = this.buildr.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    status: [true]
  });

  Saveuser() {
    // Kiểm tra tính hợp lệ của form
    if (this.myform.valid) {
      if (this.isEdit) {
        this.service.UpdateCustomer(this.inputdata.code, this.myform.value).subscribe(res => {
          this.toastr.success(`Update customer success!`);
          this.closepopup();
        });
      } else {
        this.service.Savecustomer(this.myform.value).subscribe(res => {
          this.closepopup();
          this.toastr.success('Add new customer success!');
        });
      }
    } else {
      // Đánh dấu tất cả các trường là đã chạm (touched) để hiển thị lỗi
      this.myform.markAllAsTouched();
    }
  }

}
