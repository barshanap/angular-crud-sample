import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  myForm!: FormGroup;
  isBookAdded = false;
  submitted = false;

  constructor(private booksService: BooksService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  get f() {
    return this.myForm.controls;
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid, form.value); // true or false
    this.submitted = true;
    if (form.invalid) {
      return;
    }
    const data = {
      title: form.value.name,
      description: form.value.description,
    };
    this.booksService.create(data).subscribe({
      next: (response) => {
        console.log(response);
        this.isBookAdded = true;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('complete'),
    });
  }

  onReset(): void {
    this.submitted = false;
    this.myForm.reset();
  }


  newBook(): void {
    this.isBookAdded = false;
    this.submitted = false;
    this.myForm.reset();
  }
}
