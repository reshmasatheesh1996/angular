import { Component, OnInit } from '@angular/core';
import {RankingService} from '../service/ranking.service';
import { DatePipe, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Student } from '../model/student';
import { Ranking } from '../model/ranking';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  Entry_View:boolean=true; 
  filter:string;
  page:number=1;

  studentName:string="";
  namerank:boolean=false;
  constructor(private rankingService:RankingService) { }

ngOnInit(): void {
  this.rankingService.getAllDStudents();
  this.rankingService.geAllDTORankings();
}

Create_New(){
  this.Entry_View=false;
  this.namerank=true;
}

//reset form
resetForm(form:NgForm){
  if(form !=null){
    form.resetForm();
  }
}
//Submit form
onSubmit(form:NgForm){
  console.log(form.value);
  let addId=this.rankingService.formData.applicationCode;

  //insert or update check condition
  if(addId == 0 || addId==null){
    this.insertRecord(form);
  }else{
    //Update
  this.updateRecord(form);
  }
}

//Insert method
insertRecord(form:NgForm){
  this.rankingService.insertRanking(form.value).subscribe(
    result =>{
      debugger
      this.resetForm(form);
     // this.toastr.success("Inserted Succesfully","Scholarship Management v2022");
    }
  );
  window.location.reload();
}

//update methd
updateRecord(form:NgForm){
    this.rankingService.updateRanking(form.value).subscribe(
      result =>{
        console.log(result);
        this.resetForm(form);
        //this.toastr.success("Updated Succesfully","Scholarship Management v2022");
      }
    );
    window.location.reload();
}

  //deleteEmployee
  deleteRanking(id:number){
    if(confirm('Are you sure want to delete this record?')){
      this.rankingService.deleteRanking(id).subscribe(response=>{
        this.rankingService.getAllRankings();
        
      },
      error=>{
        console.log(error)
      }
      )
    }
  }

  editRanking(ranking:Ranking)
  {
    this.Entry_View=false;

    //changing date format
    var datePipe = new DatePipe("en-Uk");
    let formatedDate: any=datePipe.transform(ranking.approvedDate,'yyyy-MM-dd')
    ranking.approvedDate=formatedDate;

      this.rankingService.formData=Object.assign({},ranking);
      debugger
      this.studentName=this.rankingService.formData.studentName;
      this.namerank=false;
  }

}
