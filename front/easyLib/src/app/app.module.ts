import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ProviderService } from './service/provider.service';
import { AuthInterceptor } from './AuthInterceptor';
import { FormsModule} from '@angular/forms';
import { OneGenreComponent } from './one-genre/one-genre.component';
import { OneAuthorComponent } from './one-author/one-author.component';
import { SignComponent } from './sign/sign.component';
import { BookComponent } from './book/book.component';
import { CartComponent } from './cart/cart.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    OneGenreComponent,
    OneAuthorComponent,
    SignComponent,
    BookComponent,
    CartComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProviderService,
    <ClassProvider> {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
