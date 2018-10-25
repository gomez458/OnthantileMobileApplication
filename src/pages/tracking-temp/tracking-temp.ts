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
  selector: 'page-tracking-temp',
  templateUrl: 'tracking-temp.html',
})
export class TrackingTemp {
    
    isiOS: boolean = true;

    item: string ;

    private param;
    private pageparam;
    selectparam : string = "pick" ; 
    selectpage : String = "Temperature";
    public userDetails : any;
    public resposeData: any;
    public babydata : any;
    public staffdata: any;
    public child: any;

    public childbadge : any;

    public babyid = {"idBabyProfile":""};
    userPostData = {"OnthantileStaff_staffID":"", "token":""};
    ChildTemperature = {"BabyProfile_idBabyProfile":"","babyTemperature":"", "date":"", "time":"", "OnthantileStaff_staffID":"" };
    ChildHeight= {"BabyProfile_idBabyProfile":"", "babyheight":"", "date":"", "OnthantileStaff_staffID":""};
    ChildWeight= {"BabyProfile_idBabyProfile":"", "weight":"", "date":"", "OnthantileStaff_staffID":""};
    

  
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public authService: AuthService, public GetService: GetService){

    this.item = "Temperature";

    this.childbadge = "child";
    this.isiOS = platform.is('ios');
  const data = JSON.parse(localStorage.getItem('userData'));
  this.userDetails = data.userData;

   this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
   this.userPostData.token = this.userDetails.token;
    
   this.param = navParams.get("childparam");
   this.pageparam = navParams.get("into");


   if(this.param != null){
     this.babyid.idBabyProfile = this.param.idBabyProfile;
     console.log(this.babyid);
     this.childbadge = this.param;
  }else{
    console.log("No child selected");
  }

  if(this.pageparam != null){
    this.item = this.pageparam;
  }

    this.getchild();
  }

  //Pushes to babylist view
  trackchild(pagenumber){
    if(pagenumber == 1){
      this.selectpage = "Temperature"
    }

    if(pagenumber == 2){
      this.selectpage = "Weight"
    }

    if(pagenumber == 3){
      this.selectpage = "Height"     
    }
    
    this.navCtrl.push(ListPage, {
      request : this.selectparam,
      page: this.selectpage
    });
    console.log(this.selectparam, this.selectpage);
  }

//page pushes
  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }

  selectchild(child){
    console.log(this.child.idBabyProfile);
    this.ChildTemperature.BabyProfile_idBabyProfile = this.child.idBabyProfile;
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


 doPassAlert(pass) {
  var nowDate;
  if(this.ChildHeight.date == ""){ nowDate = new Date(); } else{nowDate = this.ChildHeight.date}
  if(this.ChildTemperature.date == ""){ nowDate = new Date(); } else{nowDate = this.ChildTemperature.date} 
  if(this.ChildWeight.date == ""){ nowDate = new Date(); } else {nowDate = this.ChildWeight.date}      
  
  
   if(pass==1){
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Temperature Record Added: ' + this.ChildTemperature.babyTemperature + '°C ' + 'on ' + nowDate,
      buttons: ['OK']
    });
    alert.present();
  }
  if(pass==2){
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Height Record Added: ' + this.ChildHeight.babyheight + 'cm on ' + nowDate,
      buttons: ['OK']
    });
    alert.present();
  }
  if(pass==3){
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Weight Record Added: ' + this.ChildWeight.weight + 'Kg on ' + nowDate,
      buttons: ['OK']
    });
    alert.present();
  }
    

  }

  doFailAlert() {
    let alert = this.alertCtrl.create({
      title: 'Incomplete Form!',
      subTitle: 'Please fill in all fields and Remember to select a child first',
      buttons: ['Cancel']
    });

    alert.present();
  }

  Temperature(){
    this.ChildTemperature.BabyProfile_idBabyProfile = this.babyid.idBabyProfile;
    this.ChildTemperature.OnthantileStaff_staffID = this.userPostData.OnthantileStaff_staffID;
    if(this.ChildTemperature.babyTemperature  && this.ChildTemperature.BabyProfile_idBabyProfile){
      console.log(this.ChildTemperature );
      this.authService.postData(this.ChildTemperature , "recordtemp").then((input) =>{
        this.resposeData = input;
        this.doPassAlert(1);
        console.log(this.resposeData);
      });
    }
   else {
     this.doFailAlert();
    }
    
  }

  Height(){
    this.ChildHeight.BabyProfile_idBabyProfile = this.babyid.idBabyProfile;
    this.ChildHeight.OnthantileStaff_staffID = this.userPostData.OnthantileStaff_staffID;
    if(this.ChildHeight.babyheight &&  this.ChildHeight.BabyProfile_idBabyProfile){
      console.log(this.ChildHeight);
      this.authService.postData(this.ChildHeight , "recordheight").then((input) =>{
        this.resposeData = input;
        this.doPassAlert(2);
        console.log(this.resposeData);
      });
    }
   else {
     this.doFailAlert();
    }
  }

    Weight(){
      this.ChildWeight.BabyProfile_idBabyProfile = this.babyid.idBabyProfile;
      this.ChildWeight.OnthantileStaff_staffID = this.userPostData.OnthantileStaff_staffID;
      if(this.ChildWeight.weight  && this.ChildWeight.BabyProfile_idBabyProfile){
        console.log(this.ChildWeight);
        this.authService.postData(this.ChildWeight , "recordweight").then((input) =>{
          this.resposeData = input;
          this.doPassAlert(3);
          console.log(this.resposeData);
        });
      }
     else {
       this.doFailAlert();
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