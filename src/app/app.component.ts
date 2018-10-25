import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


//default generated pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

//my pages
import { TrackingPage } from '../pages/tracking/tracking';
import { TrackingTemp } from '../pages/tracking-temp/tracking-temp';

import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { BabyProfilePage } from '../pages/baby-profile/baby-profile'; 
import { LoginPage } from '../pages/login/login';
import { TaskSchedulePage } from '../pages/task-schedule/task-schedule';
import { AlertsPage } from '../pages/alerts/alerts';
import { ReportsPage } from '../pages/reports/reports';
import { TrackingNappy } from '../pages/tracking-nappy/tracking-nappy';
import { TrackingMed } from '../pages/tracking-med/tracking-med';
import { TrackingMeal } from '../pages/tracking-meal/tracking-meal';
import { TrackingAct } from '../pages/tracking-act/tracking-act';
import { TrackingSleep } from '../pages/tracking-sleep/tracking-sleep';
import { AnomalyPage } from '../pages/anomaly/anomaly';

//my services
import { AuthService } from '../providers/auth-service';
import { GetService } from '../providers/get-service';

import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  //public userDetails : any;

  @ViewChild(Nav) navCtrl: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  notifications: any[] = [];
  isiOS: boolean = true;
  onexit: boolean = false;
    public userDetails : any;
    public dummyDetails = {"userName":"SuperUser"};
    public childData: any;
    public resposeData: any;
    public dataSet : any;
    public staffDetails = {};
    userPostData = {"OnthantileStaff_staffID":"", "token":""};

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController, public authService: AuthService, public GetService: GetService, public loadingCtrl: LoadingController,private toastCtrl: ToastController) {
   
    platform.ready().then(()=>{
      platform.registerBackButtonAction(()=>this.myHandlerFunction(this.onexit));
    });
 
    


    this.initializeApp();
    this.platform = platform;     

   this.isiOS = platform.is('ios');

  const Udata = JSON.parse(localStorage.getItem('userData'));

  if(Udata != null){
    this.userDetails = Udata.userData;
    this.userPostData.OnthantileStaff_staffID = this.userDetails.OnthantileStaff_staffID;
    this.userPostData.token = this.userDetails.token; 
  }
  else{
    //Do nothing
    console.log("No connection!!");
    this.userDetails = this.dummyDetails;

  }

  
  

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Tracking', component: TrackingPage },
      { title: 'Tracking-Temp', component: TrackingTemp },
      { title: 'Tracking-Nappy', component: TrackingNappy },
      { title: 'Tracking-Med', component: TrackingMed },
      { title: 'Tracking-Meal', component: TrackingMeal },
      { title: 'Tracking-Act', component: TrackingAct },      
      { title: 'Tracking-Sleep', component: TrackingSleep },            
      { title: 'Profileview', component: ProfileViewPage },
      { title: 'ProfileEdit', component: ProfileEditPage },
      { title: 'BabyProfile', component: BabyProfilePage },
      { title: 'TaskSchedule', component: TaskSchedulePage},
      { title: 'Alerts', component: AlertsPage},
      { title: 'Reports', component: ReportsPage},
      { title: 'Anomaly', component: AnomalyPage}      
    ];

    
  }

  myHandlerFunction(onexit){
    //create comfirm alert
    if(this.onexit == false){
      let toast = this.toastCtrl.create({
       message: "Press Again to Confirm Exit",
      duration: 3000
     });
     toast.present(); 
     this.onexit = true;
    }
    else {
      let toast = this.toastCtrl.create({
        message: "This works!!",
       duration: 3000
      });
      toast.present();
      this.onexit = true; 
    }

     }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page.component);
  }

   goToHome(params){
    if (!params) params = {};
    this.navCtrl.setRoot(HomePage);
  } goToTracking(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TrackingPage);
  } goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProfileViewPage);
  } goToProfileEdit(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProfileEditPage);
  } goToScheduleView(params){
    if(!params) params = {};
    this.navCtrl.setRoot(TaskSchedulePage);
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
        localStorage.clear();
                console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  

  exitApp() {
    let prompt = this.alertCtrl.create({
      title: '',
      message: "Exit app? ",
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
            console.log('Saved clicked');
            //localStorage.clear();
            this.platform.exitApp();

          }
        }
      ]
    });
    prompt.present();
  }

   presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  doRefresh(refresher) {
    console.log('BEgin async operation', refresher);
      
    setTimeout(() => {
      console.log('Async operation ended');
      refresher.complete();
    }, 1000);
    
  }


  /* Gets the staff details 
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
  } */



  

  
  
 
}
