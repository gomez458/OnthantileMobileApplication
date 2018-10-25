import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { GetService } from '../../providers/get-service';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-task-schedule',
  templateUrl: 'task-schedule.html',
})

export class TaskSchedulePage {
  public staffDetails = {};
  public userDetails : any;
  public resposeData: any;
  public feedbackData: any;
    public taskdata : any;
    public scheduleitem :{};
    public completedtasks :{};
    public staffdata: any;

    public shiftID : any;
    public schedule: boolean;
    public tasks: boolean;

    private scheduleheader = {"title":""};
    private tasksheader = {"title":""};

  userPostData = {"OnthantileStaff_staffID":"", "token":"", "shiftID":""};
  taskrequest = {"idstafftasks":""};


  item: string = "tasks";

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthService, public GetService: GetService,public alertCtrl: AlertController,) {

    const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;
      

      this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
   this.userPostData.token = this.userDetails.token;

   this.getCompletetasks();
   this.getSchedule();
  this.getFeed();



   
  }

  //Page Refresher
    doRefresh(refresher) {
    //console.log('Begin async operation', refresher);

    setTimeout(() => {
     // console.log('Async operation ended');
      refresher.complete();
    }, 1000); 

    this.getCompletetasks();
    this.getSchedule();
    this.getFeed();
    
    
    //this.formatTitle();
  }

  formatTasktitle(tasks){
    if(tasks = false){
      this.tasksheader.title = "No tasks today";
   }
   else {
      this.tasksheader.title = "Outstanding Tasks";
   }
  }

   formatScheduletitle(schedule){

   if(schedule = false ){
    this.scheduleheader.title = "No schedule";
 }
 else {
    this.scheduleheader.title = "Today's Schedule";
 }
  }

  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    } 

//Gets the task feed for each staff 
    getFeed(){
      this.authService.postData(this.userPostData, "taskfeed").then((result) =>{
        this.resposeData = result;
        if(this.resposeData.feedData){
        this.taskdata = this.resposeData.feedData;
        console.log(this.taskdata);
        this.formatTasktitle(this.schedule = true);
      }
      else{
        console.log("No schedule!");
        this.formatTasktitle(this.schedule = false);
      }
        }, (err) => {
          //Connection failed message
        });
      }

      getCompletetasks(){
        this.authService.postData(this.userPostData, "completeTasks").then((result2) =>{
          this.feedbackData = result2;
          console.log(this.feedbackData);
         if(this.feedbackData.CompleteData){
            this.completedtasks = this.feedbackData.CompleteData;
            console.log(this.completedtasks);
            //localStorage.setItem('completedtasks', JSON.stringify(this.resposeData) );
          }
              }, (err) => {
                //Connection failed message
              });
      }

      Completetask(task){
        var T = task;
        let alert = this.alertCtrl.create({
          title: 'Please Comfirm',
          subTitle: 'Are you sure you want to mark this task as complete?',
          message: 'Task: ' + task.taskDescription,
          buttons: [{
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
        {
            text: 'Accept',
            handler: data => {
              console.log('Cancel clicked');
             this.markTask(T);
            }
          },]

        });
    
        alert.present();

      }

      viewCompletedTask(Ts){
        var Task = Ts;
        let alert = this.alertCtrl.create({
          message: Task.taskDescription + ' Completed at ' + Task.timeCompleted,  
          buttons: [{
            text: 'Dismiss',
            handler: date =>{
              console.log('Cancel Clicked');
            }
          }]
        });
        alert.present();
      }


      markTask(T){
        console.log(T);
        this.taskrequest.idstafftasks= T.idstafftasks;
        this.GetService.postgetData(this.taskrequest, "markTaskComplete").then((result) =>{
          this.resposeData = result;
          console.log(this.resposeData);
          if(this.resposeData){
            let alert = this.alertCtrl.create({
              title: 'Success',
              subTitle: 'Task Completed!',
              message: 'Task: ' + T.taskDescription,
              buttons: [{
                text: 'Dimiss',
                handler: data => {
                  console.log('Cancel clicked');
                  this.getCompletetasks();
                  this.getSchedule();
                  this.getFeed();
                }
              }
            ]
            });
            alert.present();
          }
        });
      }
          
//Gets the task feed for each staff 
    getSchedule(){
   this.GetService.postgetData(this.userPostData, "getschedule").then((result1) =>{
    this.resposeData = result1;
    console.log(this.resposeData);

    if(this.resposeData.scheduleData){
    this.scheduleitem = this.resposeData.scheduleData;
    console.log("getschedule: ", this.scheduleitem);
    localStorage.setItem('scheduleitem', JSON.stringify(this.resposeData) );
    this.userPostData.shiftID = this.resposeData.idothantileShifts;
    console.log(this.userPostData);
    this.formatScheduletitle(this.schedule = true);
    }
    else{
      this.formatScheduletitle(this.schedule = false);
    }
    }, (err) => {
      //Connection failed message
    });
    //const sData = JSON.parse(localStorage.getItem('scheduleitem'));
  }
}