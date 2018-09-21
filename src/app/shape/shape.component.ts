import { Component, OnInit } from '@angular/core';

import { Shape, Color } from './shape';
import { ShapeService } from './shape.service';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  multiShapes: Shape[][];
  multiColors: Color[][];

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

}
