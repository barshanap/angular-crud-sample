import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  currentBook: any;
  message = '';

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getBook(this.route.snapshot.paramMap.get('id'));
  }

  getBook(id: string | null): void {
    this.booksService.getItem(id).subscribe({
      next: (book: null) => {
        this.currentBook = book;
        console.log(book);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('complete'),
    });
  }

  updateBook(): void {
    this.booksService.update(this.currentBook.id, this.currentBook).subscribe({
      next: (response) => {
        console.log(response);
        this.message = 'The product was updated!';
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.info('complete');
        this._snackBar.open('Updated Sucessfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }

  deleteBook(): void {
    this.booksService.delete(this.currentBook.id).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/books']);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.info('complete');
        this._snackBar.open('Deleted Sucessfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }
}
