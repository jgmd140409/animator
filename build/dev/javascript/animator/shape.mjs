//# sourceMappingURL=shape.mjs.map
import { CustomType as $CustomType } from "./gleam.mjs";

export class Point extends $CustomType {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}
export const Point$Point = (x, y) => new Point(x, y);
export const Point$isPoint = (value) => value instanceof Point;
export const Point$Point$x = (value) => value.x;
export const Point$Point$0 = (value) => value.x;
export const Point$Point$y = (value) => value.y;
export const Point$Point$1 = (value) => value.y;

export class Color extends $CustomType {
  constructor(r, g, b) {
    super();
    this.r = r;
    this.g = g;
    this.b = b;
  }
}
export const Color$Color = (r, g, b) => new Color(r, g, b);
export const Color$isColor = (value) => value instanceof Color;
export const Color$Color$r = (value) => value.r;
export const Color$Color$0 = (value) => value.r;
export const Color$Color$g = (value) => value.g;
export const Color$Color$1 = (value) => value.g;
export const Color$Color$b = (value) => value.b;
export const Color$Color$2 = (value) => value.b;

export class Line extends $CustomType {
  constructor(start, end) {
    super();
    this.start = start;
    this.end = end;
  }
}
export const Shape$Line = (start, end) => new Line(start, end);
export const Shape$isLine = (value) => value instanceof Line;
export const Shape$Line$start = (value) => value.start;
export const Shape$Line$0 = (value) => value.start;
export const Shape$Line$end = (value) => value.end;
export const Shape$Line$1 = (value) => value.end;

export class Circle extends $CustomType {
  constructor(center, radius) {
    super();
    this.center = center;
    this.radius = radius;
  }
}
export const Shape$Circle = (center, radius) => new Circle(center, radius);
export const Shape$isCircle = (value) => value instanceof Circle;
export const Shape$Circle$center = (value) => value.center;
export const Shape$Circle$0 = (value) => value.center;
export const Shape$Circle$radius = (value) => value.radius;
export const Shape$Circle$1 = (value) => value.radius;

export class Arc extends $CustomType {
  constructor(center, radius, start_deg, sweep_deg) {
    super();
    this.center = center;
    this.radius = radius;
    this.start_deg = start_deg;
    this.sweep_deg = sweep_deg;
  }
}
export const Shape$Arc = (center, radius, start_deg, sweep_deg) =>
  new Arc(center, radius, start_deg, sweep_deg);
export const Shape$isArc = (value) => value instanceof Arc;
export const Shape$Arc$center = (value) => value.center;
export const Shape$Arc$0 = (value) => value.center;
export const Shape$Arc$radius = (value) => value.radius;
export const Shape$Arc$1 = (value) => value.radius;
export const Shape$Arc$start_deg = (value) => value.start_deg;
export const Shape$Arc$2 = (value) => value.start_deg;
export const Shape$Arc$sweep_deg = (value) => value.sweep_deg;
export const Shape$Arc$3 = (value) => value.sweep_deg;

export class Curve extends $CustomType {
  constructor(start, control, end) {
    super();
    this.start = start;
    this.control = control;
    this.end = end;
  }
}
export const Shape$Curve = (start, control, end) =>
  new Curve(start, control, end);
export const Shape$isCurve = (value) => value instanceof Curve;
export const Shape$Curve$start = (value) => value.start;
export const Shape$Curve$0 = (value) => value.start;
export const Shape$Curve$control = (value) => value.control;
export const Shape$Curve$1 = (value) => value.control;
export const Shape$Curve$end = (value) => value.end;
export const Shape$Curve$2 = (value) => value.end;

export class Polygon extends $CustomType {
  constructor(vertices) {
    super();
    this.vertices = vertices;
  }
}
export const Shape$Polygon = (vertices) => new Polygon(vertices);
export const Shape$isPolygon = (value) => value instanceof Polygon;
export const Shape$Polygon$vertices = (value) => value.vertices;
export const Shape$Polygon$0 = (value) => value.vertices;

export class Spiral extends $CustomType {
  constructor(center, turns, inner, outer) {
    super();
    this.center = center;
    this.turns = turns;
    this.inner = inner;
    this.outer = outer;
  }
}
export const Shape$Spiral = (center, turns, inner, outer) =>
  new Spiral(center, turns, inner, outer);
export const Shape$isSpiral = (value) => value instanceof Spiral;
export const Shape$Spiral$center = (value) => value.center;
export const Shape$Spiral$0 = (value) => value.center;
export const Shape$Spiral$turns = (value) => value.turns;
export const Shape$Spiral$1 = (value) => value.turns;
export const Shape$Spiral$inner = (value) => value.inner;
export const Shape$Spiral$2 = (value) => value.inner;
export const Shape$Spiral$outer = (value) => value.outer;
export const Shape$Spiral$3 = (value) => value.outer;

export class Paint extends $CustomType {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }
}
export const Shape$Paint = (shape, color) => new Paint(shape, color);
export const Shape$isPaint = (value) => value instanceof Paint;
export const Shape$Paint$shape = (value) => value.shape;
export const Shape$Paint$0 = (value) => value.shape;
export const Shape$Paint$color = (value) => value.color;
export const Shape$Paint$1 = (value) => value.color;

export class Fade extends $CustomType {
  constructor(shape, from, to) {
    super();
    this.shape = shape;
    this.from = from;
    this.to = to;
  }
}
export const Shape$Fade = (shape, from, to) => new Fade(shape, from, to);
export const Shape$isFade = (value) => value instanceof Fade;
export const Shape$Fade$shape = (value) => value.shape;
export const Shape$Fade$0 = (value) => value.shape;
export const Shape$Fade$from = (value) => value.from;
export const Shape$Fade$1 = (value) => value.from;
export const Shape$Fade$to = (value) => value.to;
export const Shape$Fade$2 = (value) => value.to;

export class Path extends $CustomType {
  constructor(shape, start, end, thickness) {
    super();
    this.shape = shape;
    this.start = start;
    this.end = end;
    this.thickness = thickness;
  }
}
export const Path$Path = (shape, start, end, thickness) =>
  new Path(shape, start, end, thickness);
export const Path$isPath = (value) => value instanceof Path;
export const Path$Path$shape = (value) => value.shape;
export const Path$Path$0 = (value) => value.shape;
export const Path$Path$start = (value) => value.start;
export const Path$Path$1 = (value) => value.start;
export const Path$Path$end = (value) => value.end;
export const Path$Path$2 = (value) => value.end;
export const Path$Path$thickness = (value) => value.thickness;
export const Path$Path$3 = (value) => value.thickness;
