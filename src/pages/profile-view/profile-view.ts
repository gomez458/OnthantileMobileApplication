import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProfileEditPage } from '../../pages/profile-edit/profile-edit';
import { LoginPage } from '../../pages/login/login';
import { GetService } from '../../providers/get-service';

@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html',
})
export class ProfileViewPage{
  public userDetails : any;
  public staffDetails = {};
  public resposeData: any;
  userPostData = {"OnthantileStaff_staffID":"", "token":""};

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public alertCtrl: AlertController,public loadingCtrl: LoadingController,  public authService: AuthService, public GetService: GetService) {
    const data = JSON.parse(localStorage.getItem('userData'));
      this.userDetails = data.userData;

      this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
   this.userPostData.token = this.userDetails.token;

   this.getstaff();

  }

    //Push to profile page
  	goToProfileEdit(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileEditPage);
    }  

    //PAge Refresher
    doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation ended');
      refresher.complete();
    }, 1000); 
  }
  //Gets the staff details
  getstaff(){
    this.GetService.postgetData(this.userPostData, "getstaff").then((result) =>{
      this.resposeData = result;
      if(this.resposeData.staffData){
        this.staffDetails = this.resposeData.staffData;
        console.log(this.staffDetails);
        localStorage.setItem('staffData', JSON.stringify(this.resposeData) )
      }
  }, (err) => {
    //ERROR
  });
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  logout(){

    let prompt = this.alertCtrl.create({
      title: '',
      message: "Logout? ",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          role: 'Agree',
          handler: data => {
                let loader = this.loadingCtrl.create({
          content: "Loging out...Please wait",
          duration: 500
        });

        loader.present();
        localStorage.clear();
        this.navCtrl.setRoot(LoginPage);
        this.presentToast("Logged Out");
                console.log('Saved clicked');


          }
        }
      ]
    });
    prompt.present();


  }
  

}