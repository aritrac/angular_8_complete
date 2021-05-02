import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root'
// })
export class LoggingService {
    lastlog: string;

    printLog(message: string){
        console.log("current message:" + message);
        console.log("previous message:" + this.lastlog);
        this.lastlog = message;
    }
}