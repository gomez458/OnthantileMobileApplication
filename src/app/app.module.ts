import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

//My Page modules
import { LoginPage } from '../pages/login/login';
import { TrackingPage } from '../pages/tracking/tracking';
import { ProfileViewPage } from '../pages/profile-view/profile-view';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { BabyProfilePage } from '../pages/baby-profile/baby-profile'; 
import { TaskSchedulePage } from '../pages/task-schedule/task-schedule';
import { AlertsPage } from '../pages/alerts/alerts';
import { ReportsPage } from '../pages/reports/reports';
import { TrackingTemp } from '../pages/tracking-temp/tracking-temp';
import { TrackingNappy } from '../pages/tracking-nappy/tracking-nappy';
import { TrackingMed } from '../pages/tracking-med/tracking-med';
import { TrackingMeal } from '../pages/tracking-meal/tracking-meal';
import { TrackingAct } from '../pages/tracking-act/tracking-act';
import { TrackingSleep } from '../pages/tracking-sleep/tracking-sleep';
import { AnomalyPage } from '../pages/anomaly/anomaly';

//my app modules
import { Platform } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { AuthService } from '../providers/auth-service';
import { GetService } from '../providers/get-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    TrackingPage,
    ProfileViewPage,
    ProfileEditPage,
    BabyProfilePage,
    TaskSchedulePage,
    AlertsPage,
    ReportsPage,
    TrackingTemp,
    TrackingMed,
    TrackingNappy,
    TrackingAct,
    TrackingMeal,
    TrackingSleep,
    AnomalyPage,
    LoginPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    TrackingPage,
    ProfileViewPage,
    ProfileEditPage,
    BabyProfilePage,
    TaskSchedulePage,
    AlertsPage,
    ReportsPage,
    TrackingTemp,
    TrackingMed,
    TrackingNappy,
    TrackingAct,
    TrackingMeal,
    TrackingSleep,
    AnomalyPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen, AuthService, GetService, 
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
