import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeedComponent } from '../feed.component';
import { ProfileComponent } from '../../profile/profile.component';
import { FeedServiceService } from 'src/app/Service/feed-service.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  text: string = '';
  imageUrl:string='';
  imgFile: any;
  @Input() posts:any ;
  @Output() dataEmitter = new EventEmitter();

  constructor(private feedService:FeedServiceService ) { }

  sendDataToParent() {
    this.dataEmitter.emit(this.posts);
  }

  post():void{
    if (!this.text && !this.imageUrl)
      return;

    this.posts.push({
      text_post: this.text,
      img_url: this.imageUrl,
      user_photo: "photo",
      user_name: "name",
      likes: 0,
      comments: 0,
    })
    this.sendDataToParent();
    const postBody = new FormData();
    postBody.append('text', this.text);
    postBody.append('file', this.imgFile);
    postBody.append('user_id', '3');
    this.feedService.postPosts(postBody).subscribe(
      res => console.log(res) );
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
      this.imgFile = input.files[0]; 
      const reader = new FileReader(); 
      reader.onload = () => {
        this.imageUrl = reader.result as string; 
      };
      reader.readAsDataURL(this.imgFile); 
    }
  }
  removePhoto() {
    this.imageUrl = '';
  }
}