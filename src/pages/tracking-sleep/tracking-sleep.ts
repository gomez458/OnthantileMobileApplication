import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GetService } from '../../providers/get-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { TrackingPage } from '../../pages/tracking/tracking';
import { ListPage } from '../../pages/list/list';
import { BabyProfilePage } from '../../pages/baby-profile/baby-profile'; 


@Component({
  selector: 'page-tracking-sleep',
  templateUrl: 'tracking-sleep.html',
})
export class TrackingSleep {
    
    isiOS: boolean = true;

     //Child Selection Parameters
     private param;
     selectparam : string = "Sleep" ;
     public childbadge : any;

    public userDetails : any;
    public resposeData: any;
    public babydata : any;
    public staffdata: any;
    babyid = {"idBabyProfile":""};
    userPostData = {"OnthantileStaff_staffID":"", "token":""};
    ChildSleep = {"BabyProfile_idBabyProfile":"", "sleeptime":"", "waketime":"", "Date":"", "OnthantileStaff_staffID":""};
    
  
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public authService: AuthService, public GetService: GetService){

    this.childbadge = "child";
    this.isiOS = platform.is('ios');
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
    this.userPostData.token = this.userDetails.token;
    this.param = navParams.get("childparam");
    this.getchild();

    if(this.param != null){
      this.babyid.idBabyProfile = this.param.idBabyProfile;
      console.log(this.babyid);
      this.childbadge = this.param;
   }else{
     console.log("No child selected erorr!!");
   }
  }

//page pushes
  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }

    trackchild(){
      this.navCtrl.push(ListPage, {
        request : this.selectparam,
      });
      console.log(this.selectparam);
    }

    Pass(entry) {
      if(entry.Date == ""){ entry.Date = new Date(); }      
      
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Sleep Time Recorded: ' + entry.sleeptime + ' - ' + entry.waketime + ' on ' + entry.Date ,
        buttons: ['OK']
      });
      alert.present();
    }
  
    Fail() {
      let alert = this.alertCtrl.create({
        title: 'Incomplete Form!',
        subTitle: 'Please fill in all fields and Remember to select a child first',
        buttons: ['Cancel']
      });
      alert.present();
    }


 

//Gets the child details
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

  Sleep(){
    this.ChildSleep.BabyProfile_idBabyProfile = this.babyid.idBabyProfile;
    this.ChildSleep.OnthantileStaff_staffID = this.userPostData.OnthantileStaff_staffID;
    if(this.ChildSleep.BabyProfile_idBabyProfile  && this.ChildSleep.sleeptime && this.ChildSleep.waketime){
      this.authService.postData(this.ChildSleep, "recordsleep").then((input) =>{
        this.resposeData = input;
        this.Pass(this.ChildSleep);
        console.log(this.resposeData);
      });
    }
   else {
     this.Fail();
    }
    
  }

  viewchild(){
    console.log(this.childbadge);
    if(this.childbadge != 'child'){
      this.navCtrl.push(BabyProfilePage,{
        childparam : this.childbadge,
      });
    }
    else if (this.childbadge == 'child'){
      this.Error();
    }
  }

  Error() {
    let alert = this.alertCtrl.create({
      title: 'Attention',
      subTitle: 'Please select a child first',
      buttons: ['Cancel']
    });

    alert.present();
  }

}