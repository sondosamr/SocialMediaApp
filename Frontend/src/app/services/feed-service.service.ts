import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeedServiceService {

  private getpost: String ="http://localhost:8080/api/posts"
  private postingPost: String ="http://localhost:8080/api/posting"
  private getcomment: String = "http://localhost:8080/api/comments"
  private postcomment: String = "http://localhost:8080/api/addComment"

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.getpost}`);
  }

  postPosts(post: any): Observable<any> {
    return this.http.post<any>(`${this.postingPost}`, post);
  }

  getComment(id:String):Observable<any>{
    return this.http.get<any>(`${this.getcomment}/${id}`)
  }

  postComment(comment: any): Observable<any> {
    return this.http.post<any>(`${this.postcomment}`, comment);
  }

}
