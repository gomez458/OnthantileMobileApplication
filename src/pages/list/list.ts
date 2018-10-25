import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { GetService } from '../../providers/get-service';
import { BabyProfilePage } from '../../pages/baby-profile/baby-profile'; 
import { TrackingTemp } from '../../pages/tracking-temp/tracking-temp';
import { TrackingAct } from '../../pages/tracking-act/tracking-act';
import { TrackingNappy } from '../../pages/tracking-nappy/tracking-nappy';
import { TrackingMed } from '../../pages/tracking-med/tracking-med';
import { TrackingMeal } from '../../pages/tracking-meal/tracking-meal';
import { TrackingSleep } from '../../pages/tracking-sleep/tracking-sleep';
import { AnomalyPage } from '../../pages/anomaly/anomaly';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private param;
  private pageparam;
  public userDetails : any;
  public resposeData: any;
  childselect : String = "view";
  pageselect : String = "";
  public babydata : any;
  public modifiedbabydata: any;
  public childData : any;
  private childinput : any;

 
  public resultData: any;
  public childprofile : any;
  userPostData = {"OnthantileStaff_staffID":"", "token":""};

  //selectedItem: any;
  //icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService,  public GetService: GetService) {
    const Udata = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = Udata.userData;
    this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
   this.userPostData.token = this.userDetails.token;


   this.param = navParams.get("request");
   if(this.param != null){
    this.childselect = this.param;
   }

   this.pageparam = navParams.get("page");
   if(this.pageparam != null){
    this.pageselect = this.pageparam;
   }
      this.getchild();
      this.initializeItems();
    } 
       
    goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }

    goToBabyProfileView(input){

      this.childinput = input;

      if(this.childselect == "view"){
        this.navCtrl.push(BabyProfilePage, {
          childparam : this.childinput,
        });
      }

      if(this.childselect == "pick"){
            this.navCtrl.setRoot(TrackingTemp,{
              childparam : this.childinput,
              into : this.pageselect
            }, {animate: true, direction: 'forward'});
          } 
          
          if(this.childselect == "Activity"){
              this.navCtrl.setRoot(TrackingAct,{
                childparam : this.childinput,
              }, {animate: true, direction: 'forward'});
            } 

            if(this.childselect == "Meal"){
              this.navCtrl.setRoot(TrackingMeal,{
                childparam : this.childinput,
              }, {animate: true, direction: 'forward'});
            } 

            if(this.childselect == "Sleep"){
              this.navCtrl.setRoot(TrackingSleep,{
                childparam : this.childinput,
              }, {animate: true, direction: 'forward'});
            } 

            if(this.childselect == "Med"){
              this.navCtrl.setRoot(TrackingMed,{
                childparam : this.childinput,
              }, {animate: true, direction: 'forward'});
            } 

            if(this.childselect == "Nappy"){
              this.navCtrl.setRoot(TrackingNappy,{
                childparam : this.childinput,
              }, {animate: true, direction: 'forward'});
            }

            if(this.childselect == "Anomaly"){
              this.navCtrl.setRoot(AnomalyPage,{
                childparam : this.childinput,
              }, {animate: true, direction: 'forward'});
            }

    }


//Gets the child details
  getchild(){
    
    this.GetService.postgetData(this.userPostData, "getchild").then((result) =>{
    this.resposeData = result;
      if(this.resposeData.childData){
        this.babydata = this.resposeData.childData;
        console.log(this.babydata);
        this.initializeItems();
      }
  }, (err) => {
    //ERROR
  });
  } 


  doRefresh(refresher) {
  console.log('Begin async operation', refresher);
  setTimeout(() => {
      console.log('Async operation ended');
      refresher.complete();
    }, 1000);
  this.getchild();
    
  }

  initializeItems(): void {
    this.modifiedbabydata = this.babydata;
  }

  //SEARCH BAR - https://javebratt.com/searchbar-firebase/
  getChildren(searchbar){
    
     this.initializeItems();
     var q = searchbar.srcElement.value;
     if(!q){
       return;
     }
     this.modifiedbabydata = this.modifiedbabydata.filter((v) => {
       if(v.firstName && q){
         if(v.firstName.toLowerCase().indexOf(q.toLowerCase()) > -1 ){
           return true;
         }
         return false;
       }
     });
     console.log(q, this.modifiedbabydata.length);

  }


  
}
