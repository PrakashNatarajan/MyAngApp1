import { Component, OnInit } from '@angular/core';

import { Shape, Color } from './shape';
import { ShapeService } from './shape.service';

//
//Disabling the Jquery
// Uncomment at "scripts": [] in angular.json to Enable
//declare var jquery:any;
//declare var $ :any;
//

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  multiShapes: Shape[][];
  multiColors: Color[][];
  sessionUsrId: 1;
  selectedClrId: number;

  constructor(private shapeService: ShapeService) { }

  ngOnInit() {
    this.getShapes();
    this.getColors();
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
    console.log("Before selectedClrId")
    console.log(this.selectedClrId)
    this.selectedClrId = color.id
    console.log("After selectedClrId")
    console.log(this.selectedClrId)
  }

  changeColor(shape: Shape): void {
    console.log("selectedClrId")
    console.log(this.selectedClrId)
    console.log("After shapeId")
    console.log(shape.shape_id)  
  }

}
