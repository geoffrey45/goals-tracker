import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Goals } from '../goals';
import { AlertService } from '../alert-service/alert.service';
import { Quote } from '../quote-class/quote';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  goals = Goals;
  alertService:AlertService;
  quote: Quote;

  toggleDetails(index){
    this.goals[index].show = !this.goals[index].show;
  }

  addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.cdate = new Date(goal.cdate)
    this.goals.push(goal)
  }

  DeleteGoal(isComplete,index){
    if (isComplete){
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)
      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe('The goal has been deleted')
      }
      
    }
  }

  constructor(alertService:AlertService,private http:HttpClient) {
    this.alertService = alertService;
  }

  ngOnInit() {
    interface ApiResponse{
      author: string;
      quote: string;
    }
    this.http.get<ApiResponse>('http://quotes.stormconsultancy.co.uk/random.json').subscribe(data=>{
      this.quote = new Quote(data.author,data.quote)
    })
  }

}
