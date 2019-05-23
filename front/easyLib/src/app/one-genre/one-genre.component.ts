import { Component, OnInit } from '@angular/core';
import {IBook, ICategory} from '../models/model';
import { ProviderService } from '../service/provider.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-one-genre',
  templateUrl: './one-genre.component.html',
  styleUrls: ['./one-genre.component.css']
})
export class OneGenreComponent implements OnInit {
  public selectedCategory: ICategory;
  public selectedCategoryBooks: IBook[] = [];
  public selectedBook: IBook;
  constructor(private router: Router, private provider: ProviderService) {}

  ngOnInit() {
    this.selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));
    localStorage.removeItem('selectedBook');
    this.selectedCategoryBooks = JSON.parse(localStorage.getItem('selectedCategoryBook'));
  }
  getBookDetail(book: IBook) {
    this.provider.getSelectedBook(book).then( res => {
      this.selectedBook = res;
      console.log(this.selectedBook);
      localStorage.setItem('selectedBook', JSON.stringify(this.selectedBook));
      this.router.navigateByUrl('book');
    });
  }
}
