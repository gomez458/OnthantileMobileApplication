import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GetService } from '../../providers/get-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { TrackingPage } from '../../pages/tracking/tracking';


@Component({
  selector: 'page-tracking-med',
  templateUrl: 'tracking-med.html',
})
export class TrackingMed {
    
    isiOS: boolean = true;

    //Child Selection Parameters
    private param;
    private selectparam : string = "pick" ;

    
    public userDetails : any;
    public resposeData: any;
    public babydata : any;
    //public childbadge : any;
    public staffdata: any;
    public childprescriptions : any;
   // private childinput : any;
    

    babyid = {"idBabyProfile":""};
    userPostData = {"OnthantileStaff_staffID":"", "token":""};
    Med = { "comment":"", "mediciationTakenFk":"", "medicineTaken":"", "quantity":"", "metric":"", "admissionTime":"","OnthantileStaff_staffID":""};


  
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public authService: AuthService, public GetService: GetService){

    //this.presentAlert();
   
   // this.childbadge = "child";
    this.isiOS = platform.is('ios');
    const data = JSON.parse(localStorage.getItem('userData'));
  
    this.userDetails = data.userData;

    this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
    this.userPostData.token = this.userDetails.token;
    this.getchild();
    this.getPrescript();
    

    if(this.param != null){
      this.babyid.idBabyProfile = this.param.idBabyProfile;
      console.log(this.babyid);
      //this.childbadge = this.param;
    }
    else{
     console.log("Useless function");
    }
  }

//page pushes
  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }

    /* presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'Not Available',
        subTitle: 'Medication Page Still Under Construction',
        buttons: ['Dismiss']
      });
      alert.present();
      this.navCtrl.pop();
    } */

getPrescript(){
  this.GetService.postgetData(this.userPostData, "getprescription").then((result) =>{
    this.resposeData = result;
    if(this.resposeData.Prescriptions){
      this.childprescriptions = this.resposeData.Prescriptions;
      console.log(this.childprescriptions);
      localStorage.setItem('childprescriptions', JSON.stringify(this.childprescriptions));
    }
  }, (err) => {
    //ERROR
  });
}


 

//Gets the child detailsyy

  getchild(){
    this.GetService.postgetData(this.userPostData, "getchild").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.childData){
        this.babydata = this.resposeData.childData;
        console.log(this.babydata);
      }
  }, (err) => {
    //ERROR
  });
  }

  recordmed(item, comment, time){
    if(comment != ""){
      this.Med.comment = comment;
    }
    else{
      this.Med.comment = "No comment";
    }
    
    
  
    this.Med.mediciationTakenFk = item.idBabyProfile;
    this.Med.OnthantileStaff_staffID= this.userPostData.OnthantileStaff_staffID;
    this.Med.admissionTime = time;
    this.Med.medicineTaken = item.medicine;
    this.Med.metric = item.metric;
    this.Med.quantity = item.quantity;
    

    if(this.Med.mediciationTakenFk != null){
      this.GetService.postgetData(this.Med, "recordmed").then((result)=>{
        this.resposeData = result;
        console.log(this.resposeData);
        if(this.resposeData){
          this.passrecord(this.Med);
        }
        else{
          this.failrecord();
        }
      });
    }
    else {
      this.failrecord();
    }
  }

  failrecord(){
    let prompt = this.alertCtrl.create({
      title:'Error',
      message: "An Error Occured. Please Try again",
      buttons:[
        {
          text: 'Dismiss',
          handler:data=>{
            console.log('Cancel clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  passrecord(entry){
    if(entry.admissionTime == ""){ entry.admissionTime = new Date(); }            
    let prompt = this.alertCtrl.create({
      title:'Success',
      message: "Medication Intake Recorded! : " + entry.comment + " " + "at " + entry.admissionTime,
      buttons:[
        {
          text: 'Dismiss',
          handler:data=>{
            console.log('Cancel clicked');
          }
        }
      ]
    });
    prompt.present()
  }

  doRefresh(refresher) {
    console.log('BEgin async operation', refresher);
    this.getPrescript();

    setTimeout(() => {
      console.log('Async operation ended');
      refresher.complete();
    }, 1000);
    
  }


  promptmed(item){
    let prompt = this.alertCtrl.create({
      title: 'Add Medication intake',
      message: "Accepting this entitles to a child taking their required medication",
      inputs: [
        {
          name: 'Comment',
          placeholder: 'Any Comment? Leave blank if required*'
        },
        {
          name: 'time',
          placeholder: 'Time',
          type: 'datetime-local',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');

          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            //set the comment
            //var child = childID.Babyprofile_idBabyProfile;
            this.recordmed( item, data.Comment, data.time);
          }
        }
      ]
    });
    prompt.present();
  
  }



}