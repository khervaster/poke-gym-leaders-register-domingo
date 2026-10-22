import { Injectable, inject, signal} from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Service } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GymLeaderService {

    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:3000/api/gym'

    leaderList = signal<any[]>([]);

    fetchLeader() {
        this.http.get<any[]>(this.apiUrl).subscribe((data: any[]) => this.leaderList.set(data));
           
    }



}
