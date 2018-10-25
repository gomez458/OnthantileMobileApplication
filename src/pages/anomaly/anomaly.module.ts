import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnomalyPage } from './anomaly';

@NgModule({
  declarations: [
    AnomalyPage,
  ],
  imports: [
    IonicPageModule.forChild(AnomalyPage),
  ],
})
export class AnomalyPageModule {}
