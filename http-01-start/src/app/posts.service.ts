import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from "./post.model";
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from "rxjs";

@Injectable({providedIn:'root'}) //This can also be written in the providers array of the app.module.ts
export class PostsService{
    error = new Subject<string>();

    constructor(private http: HttpClient) {} //Inject http service into this service

    createAndStorePost(title: string, content: string){
        const postData: Post = {title: title, content: content}
        this.http
        .post<{name: string}>('https://ng-complete-guide-90aad-default-rtdb.firebaseio.com/posts.json'
        ,postData,
        {
            observe: 'response' //with observe we can change the kind of data we get back by asking angular to give us exactly what we need, if we need just the body then we pass body, if we need the full response then we pass response here.
        })
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
        return this.http.delete('https://ng-complete-guide-90aad-default-rtdb.firebaseio.com/posts.json',
        {
            observe: 'events'
        }).pipe(tap(event => {
            console.log(event)
            if(event.type === HttpEventType.Sent){
                //do some user notification to tell the user the request was sent
            }
            if(event.type === HttpEventType.Response){
                console.log(event.body);
            }
        }));
    }
}