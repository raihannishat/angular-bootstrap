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

  createEmployee(){
    this.employeeModel.name = this.formValue.value.name;
    this.employeeModel.phone = this.formValue.value.phone;
    this.employeeModel.address = this.formValue.value.address;
    
    this.employeeService.postEmployee(this.employeeModel)
      .subscribe(res => {
        console.log(res);
        alert('Employee add successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      })
  }

  readEmployee(){
    this.employeeService.getEmployee().subscribe(res => {
      this.employees = res;
    })
  }
}
