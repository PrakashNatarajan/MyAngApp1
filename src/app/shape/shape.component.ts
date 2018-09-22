import { Component, OnInit } from '@angular/core';

import { Shape, Color } from './shape';
import { ShapeService } from './shape.service';
import { SocketService } from '../socketservice';

/*
//Disabling the Jquery
//Uncomment at "scripts": [] in angular.json to Enable
declare var jquery:any;
declare var $ :any;
*/

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  multiShapes: Shape[][];
  multiColors: Color[][];
  sessionUsrId: number;
  selectedClrId: number;

  constructor(private shapeService: ShapeService, private socketService: SocketService) { }

  ngOnInit() {
    this.getShapes();
    this.getColors();
    this.sessionUsrId = 5;
    localStorage.setItem("sessionUsrId", String(this.sessionUsrId));
    //localStorage.getItem("sessionUsrId");
    this.socketService.connectWebSocket(this.sessionUsrId);
  }

  getShapes(): void {
    this.shapeService.getShapes()
    .subscribe(multiShapes => this.multiShapes = multiShapes);
  }

  getColors(): void {
    this.shapeService.getColors()
    .subscribe(multiColors => this.multiColors = multiColors);
  }

  selectColor(color: Color): void {
    this.selectedClrId = color.id
    //console.log(this.selectedClrId)
  }

  changeColor(shape: Shape): void {
    console.log(localStorage.getItem("sessionUsrId"))
    this.socketService.sendGraphicsDetails(this.sessionUsrId, shape.shape_id, this.selectedClrId);
  }

}
