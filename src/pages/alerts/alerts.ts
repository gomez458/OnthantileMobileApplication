import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { GetService } from '../../providers/get-service';


@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html'
})
export class AlertsPage {

    public userDetails : any;
    public resposeData: any;
      public alertdata : any;
      private alertsTitle = {"title":""};
    userPostData = {"OnthantileStaff_staffID":"", "token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,  public GetService: GetService) {
    const Udata = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = Udata.userData;

    this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
   this.userPostData.token = this.userDetails.token;

   this.getalert();
   this.formatAlertTitle();
    } 
       
    goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }

     doRefresh(refresher) {
    console.log('BEgin async operation', refresher);
    this.getalert();

    setTimeout(() => {
      console.log('Async operation ended');
      refresher.complete();
    }, 1000);
    
  }

    formatAlertTitle(){
      if(this.alertdata > 0){
        this.alertsTitle.title = "Alerts";
      }
      else{
        this.alertsTitle.title = "No Alerts";
      }
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
