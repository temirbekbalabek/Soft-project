import { Component, OnInit } from '@angular/core';
import {IClient, IFeedback} from '../models/model';
import {Router} from '@angular/router';
import {ProviderService} from '../service/provider.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: IFeedback[] = [];
  clientsId: number[] = [];
  clients: IClient[] = [];
  client: IClient;
  comment = '';
  constructor(private router: Router, private provider: ProviderService) { }

  ngOnInit() {
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
