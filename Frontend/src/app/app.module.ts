import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './components/feed/feed.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostComponent } from './components/feed/post/post.component';
import { FormsModule } from '@angular/forms';
import { CreatePostComponent } from './components/feed/create-post/create-post.component';
import { PostUserComponent } from './components/profile/post-user/post-user.component';
import { CreatePostUserComponent } from './components/profile/create-post-user/create-post-user.component';
import { InfoComponent } from './components/profile/info/info.component';
import { FeedServiceService } from './Service/feed-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileService } from './Service/profile.service';
import { AuthService } from './Service/auth-services';



@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    PostComponent,
    CreatePostComponent,
    PostUserComponent,
    CreatePostUserComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [FeedServiceService,ProfileService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
