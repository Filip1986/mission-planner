import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';

export interface PeriodicElement {
  position: number;
  name: string;
  x: string;
  y: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent {
  displayedColumns = ['position', 'name', 'x', 'y'];
  dataSource = [...ELEMENT_DATA];
  savedDataSource: PeriodicElement[] | undefined;
  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  myForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private _snackBar: MatSnackBar,
    private _localStorageService: LocalStorageService
    ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      x: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      y: [null, [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

    this.savedDataSource = this._localStorageService.getData('dataSource');

    if(this.savedDataSource) {
      this.dataSource = this.savedDataSource;
    }
  }

  onSubmit() {
    if(this.myForm.valid) {
      this.dataSource.push({
        position: this.dataSource.length,
        ...this.myForm.value
      });
      this._localStorageService.saveData('dataSource', this.dataSource);
      this.table.renderRows();
    } else {
      this._snackBar.open('The form is not valid!', 'Close', {duration: 2000});
    }
  }
}
