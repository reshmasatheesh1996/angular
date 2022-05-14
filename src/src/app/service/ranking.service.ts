import { Injectable } from '@angular/core';
import { Ranking } from '../model/ranking';
import { HttpClient} from '@angular/common/http';
import {environment} from'src/environments/environment'
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  //declare variables--global
  rankings: Ranking[]; //list of all Rankings
  students: Student[]; //list of all Rankings
  formData: Ranking=new Ranking(); //store date in an Ranking

  constructor(private httpClient:HttpClient) { } //HttpClient

  //get All the Employess or Method for Binding all Rankings
  getAllRankings()
  {
    this.httpClient.get(environment.apiUrl+'/api/rankings')
      .toPromise().then(response =>
        
          this.rankings=response as Ranking[]);
          debugger
  }

  //get a particular Ranking by id
  getRanking(appId: number) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/rankings/'+appId);
  }

  //insert Ranking
  insertRanking(rank: Ranking) :Observable<any>
  {
    return this.httpClient.post(environment.apiUrl+'/api/rankings/',rank);
  }

  //update Ranking
  updateRanking(rank: Ranking) :Observable<any>
  {
    return this.httpClient.put(environment.apiUrl+'/api/rankings/',rank);
  }

  //delete Ranking
  deleteRanking(appId: number) :Observable<any>
  {
    return this.httpClient.delete(environment.apiUrl+'/api/rankings/'+appId);
  }

  //GET Student for dropdownlist
  getAllDStudents(){
    this.httpClient.get(environment.apiUrl+'/api/students')
      .toPromise().then(response =>
        this.students=response as Student[])
  }

  //get All the Employess or Method for Binding all Rankings
  geAllDTORankings()
  {
    this.httpClient.get(environment.apiUrl+'/api/rankingsdt')
      .toPromise().then(response =>        
          this.rankings=response as Ranking[]);
          debugger
  }

}
