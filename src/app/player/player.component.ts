import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ELEMENT_DATA } from '../planner/planner.component';
import { MatTableModule } from '@angular/material/table';
import { LocalStorageService } from '../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatTableModule,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements AfterViewInit {
  @ViewChild('myPlayerCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;

  dataSource = [...ELEMENT_DATA];
  displayedColumns = ['position', 'name'];

  constructor(private _localStorageService: LocalStorageService, private _snackBar: MatSnackBar,) {
    this.dataSource = this._localStorageService.getData('dataSource') || [];
  }
  
  ngAfterViewInit() {
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
  
    if(ctx) {
      ctx.fillStyle = 'red';
      let prevPoint = null;

      for (let data of this.dataSource) {
        const x = data.x;
        const y = data.y;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();

        if (prevPoint) {
          const prevX = prevPoint.x;
          const prevY = prevPoint.y;

          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        prevPoint = data;
      }

      const icon = new Image();
      icon.src = 'assets/images/robot.png';
      icon.onload = () => {
        ctx.drawImage(icon, (this.dataSource[0].x-10), (this.dataSource[0].y-10), 20, 20);
      }
    }
  }

  animate() {
    this._snackBar.open('Animation start - not implemented', 'Close', {duration: 2000});
  }

  pause() {
    this._snackBar.open('Animation pause ', 'Close', {duration: 2000});
  }
}
