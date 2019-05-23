import { Component, OnInit } from '@angular/core';
import {IBook, ICart} from "../models/model";
import {Router} from "@angular/router";
import {ProviderService} from "../service/provider.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cart: ICart;
  public books: IBook[] = [];
  public cartBooks: IBook[] = [];
  constructor(
    private router: Router,
    private provider: ProviderService
  ) { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.provider.getBooks().then(res => {
      this.books = res;
      this.b();
    });
  }
  b() {
    for (const book of this.books) {
      if (this.cart.books.find(id => id === book.id)) {
        this.cartBooks.push(book);
        console.log(book);
      }
    }
  }
  makeAnOrder() {
    alert('Thank you for your order, our operators will call you in 10 minute, please wait...');
    this.router.navigateByUrl('');
  }
}
