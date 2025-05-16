import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ProfileService } from 'src/app/Service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
   id:number=4;
   backgroundImageUrl: string = '../../../assets/stock-vector-social-media-minimalist-seamless-pattern-internet-messenger-background-vector-illustration-1169160this.id07.jpg';  
   profileImageUrl: string = '../../../assets/WhatsApp Image 2024-12-23 at 15.20.25_47a9cede.jpg';        
   username: string = 'Jinx Rae';  

  constructor(private profService:ProfileService) { }

  isDropdownOpen: boolean = false; 
  isBackgroundDropdownOpen: boolean = false;
  viewAs : boolean = false;

  toggleViewAs() {
    this.viewAs = !this.viewAs;
  }

 
  followersCount: number = 4;
  followingCount: number = 6;
  followButtonText: string = 'Follow';  


  // posts = [
    // {
    //   id:1,
    //   userImage: '../../../assets/WhatsApp Image 2024-12-2this.id at 15.20.25_47a9cede.jpg',
    //   username: 'Jinx Rae',
    //   content: "Hello every one",
    //   contentImage:"",
    //   likes: 10,
    //   comments: 2,
    //   isDropdownOpen: false, 
    //   isEditing: false,
    // },
    // {
    //   id:2,
    //   userImage: '../../../assets/WhatsApp Image 2024-12-2this.id at 15.20.25_47a9cede.jpg',
    //   username: 'Jinx Rae',
    //   content: "My first post !",
    //   contentImage:"",
    //   likes: 5,
    //   comments: 1,
    //   isDropdownOpen: false, 
    //   isEditing: false,
    // },
  // ];
  posts:any[]=[];
  userData:any;

  ngOnInit(): void {
    this.profService.getMyPosts(this.id).subscribe((data)=>{
      this.posts=data;
    })

    this.profService.getProfileDetails(this.id).subscribe((data)=>{this.userData = data;})

    this.profService.getProfile(this.id).subscribe((data)=>{
      this.username = data.user_name;
      this.profileImageUrl = data.user_photo;
      this.backgroundImageUrl = data.user_BG;
      this.followersCount = data.followers_num;
      this.followingCount = data.following_num;
      
    })
  }
  deletePost(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
  }

  comments=[
    {
      text:"how are u",
      username:"ahmed",
      userImage:"",
    },
    {
      text:"miss u, body",
      username:"tarek",
      userImage:""
    }
  ]

  receiveData(data: any) {
    this.posts = data; 
    
  } 
  
  // background pic funcs
  toggleBackgroundDropdown() {
    this.isBackgroundDropdownOpen = !this.isBackgroundDropdownOpen;
  }

  editBackground() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', this.id.toString());
        this.profService.uploadBackgroundImage(formData).subscribe((data)=>{
          console.log(data);
        })
        reader.onload = () => {
          this.backgroundImageUrl = reader.result as string;  
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
    this.isBackgroundDropdownOpen = false;
  }
  deleteBackground() {
    this.backgroundImageUrl = ''; 
    this.isBackgroundDropdownOpen = false; 
  }

  // profile pic funcs
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  editProfilePicture() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', this.id.toString());
        this.profService.uploadProfileImage(formData).subscribe((data)=>{
          console.log(data);
        });
        reader.onload = () => {
          this.profileImageUrl = reader.result as string;  
        };
        
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
    this.isDropdownOpen = false;
  }
  deleteProfilePicture() {
    this.profileImageUrl = '../../../assets/istockphoto-1this.id00845620-612x612.jpg'; 
    this.isDropdownOpen = false; 
  }

  // follow func
  follow() {
    if (this.followButtonText === 'Follow') {
      this.followButtonText = 'Unfollow';  
      this.followersCount++;  
    } else {
      this.followButtonText = 'Follow';  
      this.followersCount--;  
    }
  }

  // Info button
  showPopup: boolean = false;


  togglePopup(): void {
    this.showPopup = !this.showPopup;
  }
}
