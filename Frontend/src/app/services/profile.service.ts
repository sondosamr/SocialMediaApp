import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api'; // رابط الـ API

  constructor(private http: HttpClient) {}

  getProfile(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getprofile/${id}`);
  }
  getProfileDetails(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getprofiledetail/${id}`);
  }

  getMyPosts(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/${id}`);
  }


  sendPostData(postData: any): Observable<any> {
    const endpoint = `${this.apiUrl}/posting`; 
    return this.http.post(endpoint, postData);
  }

  uploadProfileImage(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateprofpic`, data);
  }

  
  uploadBackgroundImage(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateBG`, data);
  }

  // // إرسال صورة البوست
  // uploadPostImage(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('postImage', file, file.name);
  //   return this.http.post(`${this.apiUrl}/upload-post`, formData);
  // }


}
