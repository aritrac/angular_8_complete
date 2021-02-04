import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'}) //either use this syntax or add it to the providers array in the app module
export class UserService {
    //Use Subject instead of EventEmitter in case of cross component communication
    //When using @Output then it is advised to use the EventEmitter instead of Subject
    activatedEmitter = new Subject<boolean>();
}