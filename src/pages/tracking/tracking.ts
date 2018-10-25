import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GetService } from '../../providers/get-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { TrackingTemp } from '../../pages/tracking-temp/tracking-temp';
import { TrackingNappy } from '../../pages/tracking-nappy/tracking-nappy';
import { TrackingMed } from '../../pages/tracking-med/tracking-med';
import { TrackingAct } from '../../pages/tracking-act/tracking-act';
import { TrackingSleep } from '../../pages/tracking-sleep/tracking-sleep';
import { TrackingMeal } from '../../pages/tracking-meal/tracking-meal';
import { AnomalyPage } from '../../pages/anomaly/anomaly';


@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

    item: string = "record";
    
    isiOS: boolean = true;

    public userDetails : any;
    public resposeData: any;
    public staffdata: any;
    userPostData = {"OnthantileStaff_staffID":"", "token":""};

  
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public GetService: GetService){

    this.isiOS = platform.is('ios');
  const data = JSON.parse(localStorage.getItem('userData'));
  this.userDetails = data.userData;

   this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
   this.userPostData.token = this.userDetails.token;


    this.getstaff();
  }

//page pushes
  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }
    gotoSleepView(){
      this.navCtrl.push(TrackingSleep);
    }
    gotoMealView(){
      this.navCtrl.push(TrackingMeal);
    }

     gotoTempView(params){
    this.navCtrl.push(TrackingTemp);
    }

     gotoNappyView(params){
    this.navCtrl.push(TrackingNappy);
    }

    gotoMedView(params){
      this.navCtrl.push(TrackingMed);
      }

    gotoActView(params){
        this.navCtrl.push(TrackingAct);
        }

    gotoAnomalyView(params){
          this.navCtrl.push(AnomalyPage);
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


  

 

}