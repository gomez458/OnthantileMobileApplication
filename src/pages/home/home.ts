import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { TrackingPage } from '../../pages/tracking/tracking';
import { ListPage } from '../../pages/list/list';
import { TaskSchedulePage } from '../../pages/task-schedule/task-schedule';
import { AlertsPage } from '../../pages/alerts/alerts';
import { ReportsPage } from '../../pages/reports/reports';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public userDetails : any;
  public resposeData: any;
  public staffdata: any;
  public alertdata : any;
  userPostData = {"OnthantileStaff_staffID":"", "token":""};


  constructor(private platform: Platform,private menu: MenuController,public authService: AuthService,public navCtrl: NavController,public navParams: NavParams,public alertCtrl: AlertController) {
    
      const Udata = JSON.parse(localStorage.getItem('userData'));
      if(Udata != null){
        this.userDetails = Udata.userData;
      }
      else{
        console.log("No connection!!");
      }  
      
      this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
      //this.userPostData.token = this.userDetails.token;
   
      this.getalert();
       this.getstaff();
  }
  
  doRefresh(refresher) {
    console.log('BEgin async operation', refresher);
    this.getalert();

    setTimeout(() => {
      console.log('Async operation ended');
      refresher.complete();
    }, 1000);
    
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(true, 'menu1');
  }


  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }

    goToTrackingView(params){
    if (!params) params = {};
    this.navCtrl.push(TrackingPage);
    }

    goTobabylistView(params){
    if (!params) params = {};
    this.navCtrl.push(ListPage);
    }

    goToTaskScheduleView(params){
    if (!params) params = {};
    this.navCtrl.push(TaskSchedulePage);
    }

    goToAlertsView(params){
    if (!params) params = {};
    this.navCtrl.push(AlertsPage);
    }

    goToReportsView(params){
    if (!params) params = {};
    this.navCtrl.push(ReportsPage);
    }

     //Gets the staff details
  getstaff(){
    this.authService.postData(this.userPostData, "getstaff").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.staffData){
        this.staffdata = this.resposeData.staffData;
        console.log(this.staffdata);
        localStorage.setItem('staffData', JSON.stringify(this.resposeData) )
      }
  }, (err) => {
    //ERROR
  });
  }

   //Gets the message details
   getalert() {
    this.authService.postData(this.userPostData, "getalert").then((result) =>{
    this.resposeData = result;
    if(this.resposeData.alertData){
    this.alertdata = this.resposeData.alertData;
    console.log(this.alertdata);
    }
  //else{
    //console.log("No access");
  //}
    
   
    }, (err) => {
      //Connection failed message
    });
  }

}
