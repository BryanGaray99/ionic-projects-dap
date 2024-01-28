import { Component, OnInit } from '@angular/core';
import { IonItem,IonLabel,IonInput,IonButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports: [IonItem,IonLabel,IonInput,IonButton],
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
