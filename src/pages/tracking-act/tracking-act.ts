import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { GetService } from '../../providers/get-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { ListPage } from '../../pages/list/list';
import { BabyProfilePage } from '../../pages/baby-profile/baby-profile'; 


@Component({
  selector: 'page-tracking-act',
  templateUrl: 'tracking-act.html',
})
export class TrackingAct {
    
    isiOS: boolean = true;

    //Child Selection Parameters
    private param;
    selectparam : string = "Activity" 
    public childbadge : any;

    public userDetails : any;
    public resposeData: any;
    public babydata : any;
    public staffdata: any;
    
    babyid = {"idBabyProfile":""};
    ChildActivity = {"BabyProfile_idBabyProfile":"", "comment":"", "activityStatus":"","activity":"","time":"","date":"","OnthantileStaff_staffID":""};    
    userPostData = {"OnthantileStaff_staffID":"", "token":""};

  
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
  
  goBack(){
    this.navCtrl.pop();
  }

//page pushes
  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
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

  trackchild(){
    this.navCtrl.push(ListPage, {
      request : this.selectparam,
    });
    console.log(this.selectparam);
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

  Activity(){
    this.ChildActivity.OnthantileStaff_staffID = this.userPostData.OnthantileStaff_staffID;
    this.ChildActivity.BabyProfile_idBabyProfile = this.babyid.idBabyProfile;
    if(this.ChildActivity.activity && this.ChildActivity.activityStatus && this.ChildActivity.comment){
      console.log(this.ChildActivity);
      this.authService.postData(this.ChildActivity , "recordactivity").then((input) =>{
      this.resposeData = input;
      this.Pass(this.ChildActivity);
        console.log(this.resposeData);
      });
      
    }
   else {
     this.Fail();
      }
    }

      Pass(entry) {
        if(entry.date == ""){ entry.date = new Date(); }
        //if (entry.time == ""){ entry.time = new Date(); }
        
        let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: 'Activity Record Added : ' + entry.activity + ', ' + entry.activityStatus + ', ' + entry.comment + ' on ' + entry.date +  ' for ' + this.childbadge.firstName + ' ' + this.childbadge.lastName,
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

      Error() {
        let alert = this.alertCtrl.create({
          title: 'Attention',
          subTitle: 'Please select a child first',
          buttons: ['Cancel']
        });
    
        alert.present();
      }

}