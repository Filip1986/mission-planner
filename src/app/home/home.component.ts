import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  panelOpenState = false;
}
