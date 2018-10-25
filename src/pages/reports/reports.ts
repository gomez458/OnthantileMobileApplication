import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { GetService } from '../../providers/get-service';


@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {

  public staffDetails = {};

  public RecordActivity :any;
  public RecordAnomaly: any;
  public RecordHeight: any;
  public RecordMeal: any;
  public RecordNappy: any;
  public RecordSleepTime : any;
  public RecordTemperature: any;
  public RecordWeight: any;
  public RecordMedication: any;


  public userDetails : any;
  public resposeData: any;
  userPostData = {"OnthantileStaff_staffID":"", "token":""};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,  public GetService: GetService,private alertCtrl: AlertController) {
  
  //this.presentAlert();
  const data = JSON.parse(localStorage.getItem('userData'));
  this.userDetails = data.userData;
  

  this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
  this.userPostData.token = this.userDetails.token;
  
  this.getRecord();
  this.getAnomaly();
  this.getHeight();
  this.getMeal();
  this.getMedication();
  this.getNappy();
  this.getSleep();
  this.getWeight();
  this.getTemperature();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 1500); 
    this.getRecord();
    this.getAnomaly();
    this.getHeight();
    this.getMeal();
    this.getMedication();
    this.getNappy();
    this.getSleep();
    this.getWeight();
    this.getTemperature();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Not Available',
      subTitle: 'Reports Page Not Available',
      buttons: ['Dismiss']
    });
    alert.present();
    this.navCtrl.pop();
  }

  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }

    getRecord() {
      this.authService.postData(this.userPostData, "getActivity").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordActivity){
      this.RecordActivity = this.resposeData.RecordActivity;
      console.log(this.RecordActivity);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }

    getAnomaly() {
      this.authService.postData(this.userPostData, "getAnomaly").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordAnomaly){
      this.RecordAnomaly = this.resposeData.RecordAnomaly;
      console.log(this.RecordAnomaly);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }

    getHeight() {
      this.authService.postData(this.userPostData, "getHeight").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordHeight){
      this.RecordHeight = this.resposeData.RecordHeight;
      console.log(this.RecordHeight);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }

    getMeal() {
      this.authService.postData(this.userPostData, "getMeal").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordMeal){
      this.RecordMeal = this.resposeData.RecordMeal;
      console.log(this.RecordMeal);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }

    getNappy() {
      this.authService.postData(this.userPostData, "getNappyChange").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordNappy){
      this.RecordNappy = this.resposeData.RecordNappy;
      console.log(this.RecordNappy);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }

    getSleep() {
      this.authService.postData(this.userPostData, "getSleepTime").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordSleepTime){
      this.RecordSleepTime = this.resposeData.RecordSleepTime;
      console.log(this.RecordSleepTime);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }

    getTemperature() {
      this.authService.postData(this.userPostData, "getTemperature").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordTemperature){
      this.RecordTemperature = this.resposeData.RecordTemperature;
      console.log(this.RecordTemperature);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }
    getWeight() {
      this.authService.postData(this.userPostData, "getWeight").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordWeight){
      this.RecordWeight = this.resposeData.RecordWeight;
      console.log(this.RecordWeight);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }
    getMedication() {
      this.authService.postData(this.userPostData, "getTakenMedication").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.RecordMedication){
      this.RecordMedication = this.resposeData.RecordMedication;
      console.log(this.RecordMedication);
      //localStorage.setItem('RecordData', JSON.stringify(this.resposeData) );
      }
    else{
      console.log("No access");
    }
      
      }, (err) => {
        //Connection failed message
      });
    }
}
