import { Component, OnInit } from '@angular/core';

import { Shape } from './shape';
import { ShapeService } from './shape.service';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {
  shapes: Shape[];

  constructor(private shapeService: ShapeService) { }

  ngOnInit() {
    this.getShapes();
  }

  getShapes(): void {
    this.shapeService.getShapes()
    .subscribe(shapes => this.shapes = shapes);
  }

}
