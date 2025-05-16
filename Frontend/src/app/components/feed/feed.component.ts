import { Component, OnInit } from '@angular/core';
import { FeedServiceService } from 'src/app/Service/feed-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
// posts = []
  // posts = [
  //   {
  //     id:1,
  //     userImage: '../../assets/user-1.jpg',
  //     username: 'Test User',
  //     content: "Hello every one",
  //     contentImage:"",
  //     likes: 10,
  //     comments: 2,
  //   },
  //   {
  //     id:2,
  //     userImage: '../../assets/user2.jpg',
  //     username: 'Another User',
  //     content: "I hate Angular",
  //     contentImage:"",
  //     likes: 5,
  //     comments: 1,
  //   },
  // ];


  // comments=[
  //   {
  //     text:"how are u",
  //     username:"ahmed",
  //     userImage:"",
  //   },
  //   {
  //     text:"miss u, body",
  //     username:"tarek",
  //     userImage:""
  //   }
  // ]

  posts: any = [];

  constructor(private feedService: FeedServiceService) {}

  ngOnInit(): void {
      this.getPosts();
  }

  getPosts() {
    this.feedService.getPosts().subscribe(
      response =>{
       this.posts = response;
       console.log(response);
      }
    )
  }

  receiveData(data: any) {
    this.posts = data; 
    
  }
  


  
}
