import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service'
import { Employee } from '../../services/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  formValue !: FormGroup;
  employeeModel: Employee = new Employee();
  employees: any | undefined;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      phone: [''],
      address: ['']
    })

    this.readEmployee();
  }

  createEmployee() {
    this.employeeModel.name = this.formValue.value.name;
    this.employeeModel.phone = this.formValue.value.phone;
    this.employeeModel.address = this.formValue.value.address;

    this.employeeService.post(this.employeeModel)
      .subscribe(res => {
        alert('Employee add successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.readEmployee();
      })
  }

  readEmployee() {
    this.employeeService.get().subscribe(res => {
      this.employees = res;
    })
  }

  deleteEmployee(data: Employee) {
    this.employeeService.del(data.id).subscribe(res => {
      alert("Employee deleted successfully");
      this.readEmployee();
    })
  }

  onEdit(data: Employee) {
    this.employeeModel.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['phone'].setValue(data.phone);
    this.formValue.controls['address'].setValue(data.address);
  }

  editEmployee() {
    this.employeeModel.name = this.formValue.value.name;
    this.employeeModel.phone = this.formValue.value.phone;
    this.employeeModel.address = this.formValue.value.address;

    this.employeeService.put(this.employeeModel, this.employeeModel.id).subscribe(res => {
      alert("Update successfully");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.readEmployee();
    })
  }
}
