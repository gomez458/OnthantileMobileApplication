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
  selector: 'page-tracking-nappy',
  templateUrl: 'tracking-nappy.html',
})
export class TrackingNappy {
    
    isiOS: boolean = true;

    //Child Selection Parameters
    private param;
    selectparam : string = "Nappy" ;
    public childbadge : any;

    public userDetails : any;
    public resposeData: any;
    public babydata : any;
    public staffdata: any;
    babyid = {"idBabyProfile":""};
    userPostData = {"OnthantileStaff_staffID":"", "token":""};
    ChildNappy = {"BabyProfile_idBabyProfile":"","nappyWet":"", "NappyDirty":"", "nappyChangeTime":"", "date":"", "OnthantileStaff_staffID":""};

    //Nappy Check boxes
    check = {
      wet : true,
      dirty: false
    }
    
  
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

  Pass(entry) {
    if(entry.date == ""){ entry.date = new Date(); }      
    
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Nappy Change Recorded on ' + entry.nappyChangeTime + ' ' + entry.date,
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

  Nappy(){
    this.ChildNappy.BabyProfile_idBabyProfile = this.babyid.idBabyProfile;
    this.ChildNappy.OnthantileStaff_staffID = this.userPostData.OnthantileStaff_staffID;
    if(this.check.wet == true){
      this.ChildNappy.nappyWet = "1";}
    else{
      this.ChildNappy.nappyWet = "0";}
    if(this.check.dirty == true){
      this.ChildNappy.NappyDirty = "1";}
    else{
      this.ChildNappy.NappyDirty = "0"; }
    if(this.ChildNappy.BabyProfile_idBabyProfile  && this.ChildNappy.NappyDirty && this.ChildNappy.nappyWet){
      this.authService.postData(this.ChildNappy, "recordnappy").then((input) =>{
        this.resposeData = input;
        this.Pass(this.ChildNappy);
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