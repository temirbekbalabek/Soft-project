import { Component, OnInit } from '@angular/core';
import {IBook, ICart, IClient, IFeedback} from '../models/model';
import {ProviderService} from '../service/provider.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  public selectedBook: IBook;
  public recommendedBooks: IBook[] = [];
  public carts: ICart[] = [];
  public cart: ICart;
  public client: IClient;
  feedbacks: IFeedback[] = [];
  clientsId: number[] = [];
  clients: IClient[] = [];
  comment = '';
  constructor(
    private router: Router,
    private provider: ProviderService) { }

  ngOnInit() {
    this.selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
    this.provider.getBooks().then( res => {
      this.recommendedBooks = res.filter(a => a.category.name === this.selectedBook.category.name).filter(b =>
      b.id !== this.selectedBook.id
      );
    });
    this.client = JSON.parse(localStorage.getItem('client'));
    this.provider.getCartList().then( res => {
      this.carts = res;
      console.log(this.carts);
      for (const a of this.carts) {
        if (a.client.id === this.client.id) {
          this.cart = a;
          console.log('asdfasdf');
          break;
        }
      }
    });
    this.provider.getFeedback(JSON.parse(localStorage.getItem('selectedBook'))).then( res => {
      this.feedbacks = res;
      for (const a of this.feedbacks) {
        this.clientsId.push(a.client_id);
      }
      for ( const b of this.clientsId) {
        this.provider.getClient(b).then(r => {
          this.clients.push(r);
        });
      }
      // console.log(this.clients);
    });
  }
  goToCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.router.navigateByUrl('cart');
  }
  addToCart(book: IBook) {
    // console.log(book.id);
    console.log(this.cart);
    this.cart.books.push(book.id);
    this.provider.addToCart(this.cart.id, this.cart.books, this.client).then(res => {
      console.log('Book added to the cart');
    });
  }
  getBookDetail(book: IBook) {
      localStorage.setItem('selectedBook', JSON.stringify(book));
      localStorage.setItem('recommendedBookClicked', 'true');
      this.router.navigateByUrl('');
  }
  sendFeedback() {
    this.client = JSON.parse(localStorage.getItem('client'));
    const token = localStorage.getItem('token');
    if (token) {
      alert(`Admins shouldn't leave any comments`);
    }
    if (this.client) {
      if (this.comment !== '') {
        this.provider.sendFeedback(this.comment).then( res => {
          alert('Thank you for your comment!');
        });
      } else {
        alert('Sorry, you can not leave an empty feedback');
      }
    }
    if (!this.client && !token) {
      alert('Sorry, you should login to the current gym');
    }
  }
}
