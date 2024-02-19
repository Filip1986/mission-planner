import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  gotoRepo() {
    window.open('https://github.com/Filip1986/mission-planner', '_blank');
  }
}
