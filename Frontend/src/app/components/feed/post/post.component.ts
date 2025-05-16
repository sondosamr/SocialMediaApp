import { Component, Input } from '@angular/core';
import { ProfileComponent } from '../../profile/profile.component';
import { FeedServiceService } from 'src/app/Service/feed-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  

  constructor(private feedService:FeedServiceService){}

  @Input() post:{
    post_id: number;
    user_photo: string;
    user_name: string;
    text_post: string;
    img_url: string;
    likes: number;
    comments: number;
  } ={
    post_id:0,
    user_photo: '',
    user_name: '',
    text_post: "",
    img_url:"",
    likes: 0,
    comments: 0
  };
 

  
  comments:any=[]
  

  like:boolean = false;
  comment:boolean = false;

  hitComment():void{
    this.comment=!this.comment;
    console.log(this.post.post_id)

    this.feedService.getComment(this.post.post_id.toFixed()).subscribe(res=>{this.comments=res;console.log(res)});
  }


  hitLike():void{
    this.like = !this.like

   if(this.like)
     this.post.likes++;
  else
    this.post.likes--;
  }

  commentINP:string = "";
  addComment():void{
    
    if(this.commentINP == "")
      return;

    const comment_budy ={
      text:this.commentINP,
      user_id:3,
      post_id:this.post.post_id
    };

    this.feedService.postComment(comment_budy).subscribe(res=>console.log(res))

    this.post.comments++;


    this.comments.push({
      text_comment:this.commentINP,
      user_name:"name",
      user_photo:"photo"
      }
    );     
    this.commentINP = ""; 
  }

}
