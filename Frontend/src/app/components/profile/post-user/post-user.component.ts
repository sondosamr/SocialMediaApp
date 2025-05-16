import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileComponent } from '../../profile/profile.component';
import { FeedServiceService } from 'src/app/Service/feed-service.service';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent {

  constructor(private feedService: FeedServiceService) { }

  @Input() user_id:number=8;

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

  @Output() deletePostEmitter = new EventEmitter<number>();  // Emit id of the post to be deleted

  // comments = [
  //   {
  //     text: "how are u",
  //     username: "ahmed",
  //     userImage: "../../../../assets/user 3.png",
  //   },
  //   {
  //     text: "miss u, body",
  //     username: "tarek",
  //     userImage: "../../../../assets/user4.png"
  //   }
  // ];

  comments: any = [];

  like: boolean = false;
  comment: boolean = false;

  hitLike(): void {
    this.like = !this.like;

    if (this.like)
      this.post.likes++;
    else
      this.post.likes--;
  }
  
  hitComment():void{
    this.comment=!this.comment;
    console.log(this.post.post_id)

    this.feedService.getComment(this.post.post_id.toFixed()).subscribe(res=>{this.comments=res;console.log(res)});
  }


  commentINP: string = "";
  addComment(): void {

    if (this.commentINP == "")
      return;

    const comment_budy ={
      text:this.commentINP,
      user_id:this.user_id,
      post_id:this.post.post_id
    };

    

    this.feedService.postComment(comment_budy).subscribe(res=>console.log(res))


    this.post.comments++;

    this.comments.push({
      text_comment: this.commentINP,
      user_name: "name",
      user_photo: "name"
    });

    this.commentINP = "";
  }

  toggleDropdown(post: any) {
    post.isDropdownOpen = !post.isDropdownOpen;
  }

  editPost(post: any) {
    post.isEditing = true;
    post.isDropdownOpen = false;
  }

  savePost(post: any) {
    post.isEditing = false;
  }

  deletePost(post: any): void {
    // Emit the post id to the parent to remove it from the posts array
    this.deletePostEmitter.emit(post.id);
  }
}
