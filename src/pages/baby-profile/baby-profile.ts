import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ProfileViewPage } from '../../pages/profile-view/profile-view';
import { GetService } from '../../providers/get-service';
import { ListPage } from '../../pages/list/list';


@Component({
  selector: 'page-baby-profile',
  templateUrl: 'baby-profile.html'
})

export class BabyProfilePage {
      private param; 
      public babyprofile : any;   
      public responseData : any;
      public childPostData = {"idBabyProfile":""};

constructor(public navCtrl: NavController,public navParams: NavParams,public authService: AuthService, public GetService: GetService) {
        this.param = navParams.get("childparam");
        this.childPostData.idBabyProfile = this.param.idBabyProfile;
        console.log(this.childPostData);
        this.childprofile();
  }


  goToProfileView(params){
    if (!params) params = {};
    this.navCtrl.push(ProfileViewPage);
    }


  childprofile(){
    this.authService.postData(this.childPostData, "childprofile").then((result)=>{
      this.responseData = result;
      if(this.responseData.BabyProfile){    
        this.babyprofile = this.responseData.BabyProfile;
        localStorage.setItem('BabyProfile', JSON.stringify(this.responseData) )
        console.log(this.babyprofile); 
        const child = JSON.parse(localStorage.getItem('BabyProfile'));
      }
    },
      (err) => {
        console.log("No Access !! ");
    });
  }



}