import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-new-design',
  templateUrl: './add-new-design.component.html',
  styleUrls: ['./add-new-design.component.css']
})

export class AddNewDesignComponent implements OnInit {
  @ViewChild('file', {static: false}) file: ElementRef<HTMLInputElement>;
  public value: string[];
  fruits: string[] = ['Lemon', 'Lime'];
  profileForm = this.fb.group({
    designTitle: ['', Validators.required],
    designDescription: ['', Validators.required],
    pic: ['', Validators.required],
    tagsvalue: ['', Validators.required, ValidateChips(this.fruits)]
  });
  pictures = [];
  base64 = [];
  exampleData = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFruits: Observable<string[]>;
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput', {static: false}) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  constructor(private fb: FormBuilder) {
    this.filteredFruits = this.profileForm.get('tagsvalue').valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
   }

  onSubmit() {
    this.profileForm.value.pictures = this.pictures;
    console.log(this.profileForm.value);
  }

  onselect() {
    const file: HTMLInputElement = this.file.nativeElement;
    if (file.files[0]) {
      this.pictures.push(file.files[0]);
      console.log(this.pictures);
      this.readPicture(file.files[0]);
    }
  }

  readPicture(File: File) {
    const self = this;
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(File);
    fileReader.onload = x => {
      self.base64.push(fileReader.result);
      console.log(x);
    };
  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.profileForm.get('tagsvalue').setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.profileForm.get('tagsvalue').setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit() {
  }

}

export function ValidateChips(tags: Array<string>): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return tags.length > 0 ? {ValidateChips: {value: tags}} : null;
  };
}
