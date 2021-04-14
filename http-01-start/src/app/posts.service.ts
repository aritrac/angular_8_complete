import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from "./post.model";
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({providedIn:'root'}) //This can also be written in the providers array of the app.module.ts
export class PostsService{
    error = new Subject<string>();

    constructor(private http: HttpClient) {} //Inject http service into this service

    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content}
        this.http
        .post<{name: string}>('https://ng-complete-guide-90aad-default-rtdb.firebaseio.com/posts.json'
        ,postData)
        .subscribe(responseData => {
      console.log(responseData)
    },error => {
        this.error.next(error.message);
    });
    }

    fetchPosts(){
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print','pretty');
        return this.http
            .get<{[key:string]: Post}>('https://ng-complete-guide-90aad-default-rtdb.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({
                    'Custom-Header':'Hello'
                }),
                params: searchParams
            })
            .pipe(map(responseData => {
                const postsArray: Post[] = [];
                for(const key in responseData){
                    if(responseData.hasOwnProperty(key))
                    postsArray.push({...responseData[key], id: key}); //The spread operator ... takes out the key value pair from the object
                }
                return postsArray;
            }),
            catchError(errorRes => {
                //send to analytics server
                return throwError(errorRes);
            }));
    }

    deletePosts(){
        return this.http.delete('https://ng-complete-guide-90aad-default-rtdb.firebaseio.com/posts.json');
    }
}