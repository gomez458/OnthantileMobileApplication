import { Component } from '@angular/core';
import { NavController, NavParams, MenuController  } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { AlertController } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"userName":"","passwordHash":""};
  dummypassword = {"passwordHash":""}; //NOT USED AT ALL, IGNORE!!

  constructor(private menu: MenuController,public navCtrl: NavController,public authService: AuthService, public navParams: NavParams,public loadingCtrl: LoadingController,private toastCtrl: ToastController,public alertCtrl: AlertController) {

    const Udata = JSON.parse(localStorage.getItem('userData'));
    if(Udata != null){
      let loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: "Please wait",
        duration: 1000
      });
      loader.present();
      this.navCtrl.setRoot(HomePage);
      this.presentToast("Welcome back " + Udata.userData.userName);
      loader.dismiss();
    }
  }

  login(){

    let loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Authenticating...",
      duration: 1500
    });
    loader.present();

    if(this.userData.userName && this.userData.passwordHash){
      this.authService.postData(this.userData, "login").then((result) => {
      this.responseData = result;
      console.log(this.responseData);
    if(this.responseData.userData){
    localStorage.setItem('userData', JSON.stringify(this.responseData) )

    
    
    this.presentToast("Welcome");
    this.navCtrl.setRoot(HomePage);
    loader.dismiss();
    
  }
    else{
      this.presentToast("Incorrect Password or User Name");
      loader.dismiss();
    }
  }, (err) => {
    //Connection failed
    this.presentAlert();
    loader.dismiss();
  });
}
else{
  this.presentToast("Incorrect Password or User Name");
  loader.dismiss();
}
  }

  forgotpassword(){
    this.presentToast("Contact your administrator ^ _ ^ ");
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Network Error',
      subTitle: 'Could not Connect. Try again later..',
      buttons: ['Dismiss']
    });
    alert.present();

  }


  logout(){
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
    }

    ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }

  gotoHome(){
    this.navCtrl.setRoot(HomePage);
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 500
    });
    loader.present();
    
    this.presentToast("Welcome");
  }

}



