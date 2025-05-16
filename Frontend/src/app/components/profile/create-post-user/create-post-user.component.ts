import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedComponent } from '../../feed/feed.component';
import { ProfileComponent } from '../../profile/profile.component';
import { FeedServiceService } from 'src/app/Service/feed-service.service';


@Component({
  selector: 'app-create-post-user',
  templateUrl: './create-post-user.component.html',
  styleUrls: ['./create-post-user.component.css']
})
export class CreatePostUserComponent {
  text: string = '';
  imageUrl:string='';
  file:any;
  user_id:number=8;
  @Input() posts:any;
 
  constructor(private feedService:FeedServiceService) { }

  @Output() dataEmitter = new EventEmitter();

  sendDataToParent() {
    this.dataEmitter.emit(this.posts);
  }

  post():void{
    if (!this.text && !this.imageUrl)
      return;

    const postData = new FormData();
    postData.append('text', this.text);
    postData.append('file', this.imageUrl);
    postData.append('user_id',this.user_id.toString());
    
    this.feedService.postPosts(postData).subscribe(
      res => console.log(res) );

    this.posts.unshift({
      text_post: this.text,
      img_url: this.imageUrl,
      user_photo: "name",
      user_name: "name",
      likes: 0,
      comments: 0,
    })
    this.sendDataToParent();
    this.text = ''; 
    this.imageUrl = '';
    
  }
  uploadPhoto() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click(); 
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
       this.file = input.files[0]; 
      const reader = new FileReader(); 
      reader.onload = () => {
        this.imageUrl = reader.result as string; 
      };
      reader.readAsDataURL(this.file); 
    }
  }
  removePhoto() {
    this.imageUrl = '';
  }

}
