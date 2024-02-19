import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ELEMENT_DATA } from '../planner/planner.component';
import { MatTableModule } from '@angular/material/table';
import { LocalStorageService } from '../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule, 
    MatIconModule, 
    MatTableModule,
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements AfterViewInit {
  @ViewChild('myPlayerCanvas') myPlayerCanvas!: ElementRef<HTMLCanvasElement>;

  canvas: HTMLCanvasElement| undefined = undefined;
  canvasContext: CanvasRenderingContext2D | null = null;

  startAnimationTime: number | undefined = undefined;
  stepAnimationDuration: number = 1000; // ms
  nrOfAnimationSteps: number = 0;
  currentStep: number = 0;

  dataSource = [...ELEMENT_DATA];
  displayedColumns = ['position', 'name'];

  constructor(
    private _localStorageService: LocalStorageService, 
    private _snackBar: MatSnackBar
  ) {
    this.dataSource = this._localStorageService.getData('dataSource') || [];
    this.nrOfAnimationSteps = this.dataSource.length-1;
  }
  
  ngAfterViewInit() {
    if(this.canInteractWithAnimation) {
      this.canvas = this.myPlayerCanvas.nativeElement;
      this.canvasContext = this.canvas.getContext('2d');

      this.drawPointsAndLines();
      this.drawRobot(this.dataSource[0].x - 10, this.dataSource[0].y - 10);
    }
  }

  get canInteractWithAnimation() {
    return this.dataSource.length > 1;
  }

  drawPointsAndLines(){ 
    if(this.canvasContext) {
      this.canvasContext.fillStyle = 'red';
      let prevPoint = null;

      for (let data of this.dataSource) {
        const x = data.x;
        const y = data.y;

        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, 5, 0, 2 * Math.PI);
        this.canvasContext.fill();

        if (prevPoint) {
          const prevX = prevPoint.x;
          const prevY = prevPoint.y;

          this.canvasContext.beginPath();
          this.canvasContext.moveTo(prevX, prevY);
          this.canvasContext.lineTo(x, y);
          this.canvasContext.stroke();
        }

        prevPoint = data;
      }
    }
  }

  drawRobot(x: number, y: number) {
    const icon = new Image();
    icon.src = 'assets/images/robot.png';
  
    if (icon.complete && this.canvasContext) {
      this.canvasContext.drawImage(icon, x, y, 20, 20);
    } else {
      icon.onload = () => {
        if(this.canvasContext) {
          this.canvasContext.drawImage(icon, x, y, 20, 20);
        }
      };
    }
  }

  animateRobot(currentTime: number) {
    if(!this.startAnimationTime) {
      this.startAnimationTime = currentTime;
    }

    const elapsedTime = currentTime - this.startAnimationTime;
    const progress = Math.min(elapsedTime/this.stepAnimationDuration, 1);
  
    if(this.canvas && this.canvasContext) {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.canvasContext.fillStyle = 'red';
      let prevPoint = null;

      for (let data of this.dataSource) {
        const x = data.x;
        const y = data.y;

        this.canvasContext.beginPath();
        this.canvasContext.arc(x, y, 5, 0, 2 * Math.PI);
        this.canvasContext.fill();

        if (prevPoint) {
          const prevX = prevPoint.x;
          const prevY = prevPoint.y;

          this.canvasContext.beginPath();
          this.canvasContext.moveTo(prevX, prevY);
          this.canvasContext.lineTo(x, y);
          this.canvasContext.stroke();
        }

        prevPoint = data;
      }
        
      if(this.currentStep < this.nrOfAnimationSteps) {
        var currentX = this.dataSource[this.currentStep].x + (this.dataSource[this.currentStep + 1].x - this.dataSource[this.currentStep].x) * progress - 10;
        var currentY = this.dataSource[this.currentStep].y + (this.dataSource[this.currentStep + 1].y - this.dataSource[this.currentStep].y) * progress - 10;

        this.drawRobot(currentX, currentY);
      } else {
        this.drawRobot((this.dataSource[this.nrOfAnimationSteps].x-10), (this.dataSource[this.nrOfAnimationSteps].y-10));
      }

      if(progress < 1) {
        requestAnimationFrame((time) => this.animateRobot(time));
      } else {
        if(this.currentStep < this.nrOfAnimationSteps) {
          this.currentStep++
          this.startAnimationTime = undefined;
          requestAnimationFrame((time) => this.animateRobot(time));
        } 
      }
    }
  }
 
  animate() {
    requestAnimationFrame((time) => this.animateRobot(time));
  }

  pause() {
    this._snackBar.open('Animation pause - not implemented', 'Close', {duration: 2000});
  }
}
