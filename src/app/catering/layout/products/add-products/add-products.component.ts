import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../user/service/notification.service";
import {ProductService} from "../../../service/product.service";
import {TagService} from "../../../service/tag.service";
import {Tag} from "../../../models/tag";
import {map, Observable, startWith} from 'rxjs';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";

;

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  public addForm: FormGroup | any;
  isDataLoadedTags = false;
  tags: Tag[] = []

  separatorKeysCodes: number[] = [ENTER, COMMA];
  formControl = new FormControl('');
  filteredTags: Observable<string[]> | any;
  selectedTags: string[] = [];
  tagsFromServer: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | any;


  constructor(private dialogRef: MatDialogRef<AddProductsComponent>,
              private fb: FormBuilder,
              private notification: NotificationService,
              private productService: ProductService,
              private tagService: TagService) {
  }

  ngOnInit(): void {
    this.addForm = this.createAddForm();
    this.tagService.findAllTags()
      .subscribe(data => {
        for (let i = 0; i < data.length; i++)
          this.tagsFromServer.push(data[i].name)
        this.isDataLoadedTags = true
      }, error => this.notification.showSnackBar(
        "При получении существующих тегов произошла ошибка"
      ))
    this.filteredTags = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  createAddForm(): FormGroup {
    return this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        expirationDate: ['', Validators.compose([Validators.required])]
      }
    )
  }

  submit(): void {
    for (let i = 0; i < this.selectedTags.length; i++)
      this.tags.push({name: this.selectedTags[i]})
    this.productService.create({
      name: this.addForm.value.name,
      expirationDate: this.addForm.value.expirationDate,
      tags: this.tags
    })
      .subscribe(() => {
        this.notification.showSnackBar("Добавлен")
        this.addForm = this.createAddForm();
        this.selectedTags = []
      }, error => this.notification.showSnackBar("Произошла ошибка при добавлении продукта"))
  }

  closeDialog() {
    this.dialogRef.close()
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedTags.push(value);
    }

    event.chipInput!.clear();

    this.formControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedTags.indexOf(fruit);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.tagsFromServer.filter(tag => tag.toLowerCase().includes(filterValue));
  }

}
