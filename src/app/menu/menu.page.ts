import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
  standalone: true,
  imports: [IonContent]
})
export class MenuPage {
  constructor(private router: Router) {}

  irParaHome(): void {
    this.router.navigate(['/home']);
  }
}