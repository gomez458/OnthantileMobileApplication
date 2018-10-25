import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { GetService } from '../../providers/get-service';
import { AlertController } from 'ionic-angular';
import { BabyProfilePage } from '../../pages/baby-profile/baby-profile'; 
import { ListPage } from '../../pages/list/list';

/**
 * Generated class for the AnomalyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anomaly',
  templateUrl: 'anomaly.html',
})
export class AnomalyPage {

  isiOS: boolean = true;

  private param;
  public childbadge : any;
  selectparam : string = "Anomaly" 
  
  
  public userDetails : any;
  public resposeData: any;
  babyid = {"idBabyProfile":""};  
  userPostData = {"OnthantileStaff_staffID":"", "token":""};
  Anomaly = {"BabyProfile_idBabyProfile":"","anomalyCategory":"","description":"","date":"","time":"","comments":"", "OnthantileStaff_staffID":""};
  

  constructor(platform: Platform,public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, public authService: AuthService, public GetService: GetService) {

    this.childbadge = "child";
    this.isiOS = platform.is('ios');
    const Udata = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = Udata.userData;

    this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
     this.userPostData.token = this.userDetails.token;
     this.param = navParams.get("childparam");

     if(this.param != null){
      this.babyid.idBabyProfile = this.param.idBabyProfile;
      console.log(this.babyid);
      this.childbadge = this.param;
   }else{
     console.log("No child selected erorr!!");
   }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnomalyPage');
  }
  
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

    recordAnomaly(){
      this.Anomaly.BabyProfile_idBabyProfile = this.babyid.idBabyProfile;
      this.Anomaly.OnthantileStaff_staffID = this.userPostData.OnthantileStaff_staffID;
      if(this.Anomaly.anomalyCategory && this.Anomaly.BabyProfile_idBabyProfile && this.Anomaly.comments  && this.Anomaly.description ){
        console.log(this.Anomaly);
        this.authService.postData(this.Anomaly, "recordanomaly").then((input) =>{
          this.resposeData = input;
          this.Pass(this.Anomaly);
          console.log(input);
        });
      }
      else{
        this.Fail();
      }
    }

    Pass(entry) {
      if(entry.date == ""){ entry.date = new Date(); }      
      let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Anomaly Record Added : ' + entry.anomalyCategory + ', ' + entry.description + ', ' + entry.comments + ' on ' + entry.date + ' for ' + this.childbadge.firstName + ' ' + this.childbadge.lastName,
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


}
