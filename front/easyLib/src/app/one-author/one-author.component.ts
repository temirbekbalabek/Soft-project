import { Component, OnInit } from '@angular/core';
import {IAuthor, IBook, ICategory} from '../models/model';
import {ProviderService} from '../service/provider.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-one-author',
  templateUrl: './one-author.component.html',
  styleUrls: ['./one-author.component.css']
})
export class OneAuthorComponent implements OnInit {
  public selectedBook: IBook;
  public selAuthor: IAuthor;
  constructor(
    private router: Router,
    private provider: ProviderService) { }
  public selectedAuthorBooks: IBook[] = [];
  ngOnInit() {
    this.selAuthor = JSON.parse(localStorage.getItem('selectedAuthor'));
    localStorage.removeItem('selectedBook');
    this.selectedAuthorBooks = JSON.parse(localStorage.getItem('selectedAuthorBook'));
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
