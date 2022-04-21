import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  books: any;
  currentBook: any;
  currentIndex = -1;
  searchTitle = '';

  constructor(
    private booksService: BooksService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  // Get list
  getAllBooks(): void {
    this.booksService.list().subscribe({
      next: (books: any) => {
        console.log(books);
        this.books = books;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('complete'),
    });
  }

  // Delete action
  deleteBook(id: number) {
    this.booksService.delete(id).subscribe({
      next: (response) => {
        console.log(response);
        this.getAllBooks();
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

  // Search items
  searchByTitle(): void {
    this.booksService.filterByTitle(this.searchTitle).subscribe({
      next: (books) => {
        console.log(books);
        this.books = books;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.info('complete'),
    });
  }
}
