//# sourceMappingURL=render.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import {
  setDrawing as set_drawing,
  setSpeed as set_speed,
  resetClock as reset_clock,
} from "./canvas.mjs";
import * as $geometry from "./geometry.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  divideFloat,
  divideInt,
} from "./gleam.mjs";
import * as $shape from "./shape.mjs";
import { Arc, Circle, Color, Curve, Fade, Line, Paint, Point, Polygon, Spiral } from "./shape.mjs";

export { reset_clock, set_drawing, set_speed };

export class RenderPath extends $CustomType {
  constructor(points, thickness, color, start, end) {
    super();
    this.points = points;
    this.thickness = thickness;
    this.color = color;
    this.start = start;
    this.end = end;
  }
}
export const RenderPath$RenderPath = (points, thickness, color, start, end) =>
  new RenderPath(points, thickness, color, start, end);
export const RenderPath$isRenderPath = (value) => value instanceof RenderPath;
export const RenderPath$RenderPath$points = (value) => value.points;
export const RenderPath$RenderPath$0 = (value) => value.points;
export const RenderPath$RenderPath$thickness = (value) => value.thickness;
export const RenderPath$RenderPath$1 = (value) => value.thickness;
export const RenderPath$RenderPath$color = (value) => value.color;
export const RenderPath$RenderPath$2 = (value) => value.color;
export const RenderPath$RenderPath$start = (value) => value.start;
export const RenderPath$RenderPath$3 = (value) => value.start;
export const RenderPath$RenderPath$end = (value) => value.end;
export const RenderPath$RenderPath$4 = (value) => value.end;

class Palette extends $CustomType {}
const Ink$Palette$const = new Palette();

class Solid extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

class Gradient extends $CustomType {
  constructor($0, $1) {
    super();
    this[0] = $0;
    this[1] = $1;
  }
}

function digit(n) {
  if (n === 10) {
    return "a";
  } else if (n === 11) {
    return "b";
  } else if (n === 12) {
    return "c";
  } else if (n === 13) {
    return "d";
  } else if (n === 14) {
    return "e";
  } else if (n === 15) {
    return "f";
  } else {
    return $int.to_string(n);
  }
}

function byte(channel) {
  let _block;
  let $ = channel < 0;
  if ($) {
    _block = 0;
  } else {
    let $1 = channel > 255;
    if ($1) {
      _block = 255;
    } else {
      _block = channel;
    }
  }
  let channel$1 = _block;
  return digit(globalThis.Math.trunc(channel$1 / 16)) + digit(channel$1 % 16);
}

function hex(color) {
  return (("#" + byte(color.r)) + byte(color.g)) + byte(color.b);
}

function stroke(points, color, start, end, thickness) {
  return new RenderPath(points, thickness, color, start, end);
}

function slice_time(start, end, index, count) {
  let span = end - start;
  let $ = (span <= 0.0) || (count <= 1);
  if ($) {
    return [start, end];
  } else {
    let i = $int.to_float(index);
    let n = $int.to_float(count);
    return [
      start + (divideFloat((span * i), n)),
      start + (divideFloat((span * (i + 1.0)), n)),
    ];
  }
}

function mix_channel(from, to, t) {
  return $float.round($int.to_float(from) + ($int.to_float(to - from) * t));
}

function mix_color(from, to, index, count) {
  let _block;
  let $ = count <= 1;
  if ($) {
    _block = 1;
  } else {
    _block = count - 1;
  }
  let denom = _block;
  let t = divideFloat($int.to_float(index), $int.to_float(denom));
  return new Color(
    mix_channel(from.r, to.r, t),
    mix_channel(from.g, to.g, t),
    mix_channel(from.b, to.b, t),
  );
}

function segments_of(points) {
  if (points instanceof $Empty) {
    return $List$Empty$const;
  } else {
    let $ = points.tail;
    if ($ instanceof $Empty) {
      return $List$Empty$const;
    } else {
      let a = points.head;
      let b = $.head;
      let rest = $.tail;
      return listPrepend([a, b], segments_of(listPrepend(b, rest)));
    }
  }
}

function lerp_point(a, b, t) {
  return new Point(a.x + ((b.x - a.x) * t), a.y + ((b.y - a.y) * t));
}

function lerp_from(loop$a, loop$b, loop$parts, loop$i, loop$acc) {
  while (true) {
    let a = loop$a;
    let b = loop$b;
    let parts = loop$parts;
    let i = loop$i;
    let acc = loop$acc;
    let $ = i >= parts;
    if ($) {
      return $list.reverse(acc);
    } else {
      let t = divideFloat($int.to_float(i), $int.to_float(parts));
      loop$a = a;
      loop$b = b;
      loop$parts = parts;
      loop$i = i + 1;
      loop$acc = listPrepend(lerp_point(a, b, t), acc);
    }
  }
}

function lerp_open(a, b, parts) {
  return lerp_from(a, b, parts, 0, $List$Empty$const);
}

function subdivide(points, parts) {
  if (points instanceof $Empty) {
    return points;
  } else {
    let $ = points.tail;
    if ($ instanceof $Empty) {
      return points;
    } else {
      let a = points.head;
      let b = $.head;
      let rest = $.tail;
      return $list.append(
        lerp_open(a, b, parts),
        subdivide(listPrepend(b, rest), parts),
      );
    }
  }
}

function ensure_detail(points, min_segments) {
  let segments = $list.length(points) - 1;
  let $ = segments >= min_segments;
  if ($) {
    return points;
  } else {
    return subdivide(
      points,
      (divideInt(min_segments, $int.max(segments, 1))) + 1,
    );
  }
}

function fade(points, from, to, start, end, thickness) {
  let detailed = ensure_detail(points, 8);
  let segments = segments_of(detailed);
  let count = $list.length(segments);
  return $list.index_map(
    segments,
    (pair, index) => {
      let a = pair[0];
      let b = pair[1];
      let color = mix_color(from, to, index, count);
      let $ = slice_time(start, end, index, count);
      let seg_start = $[0];
      let seg_end = $[1];
      return stroke(
        listPrepend(a, listPrepend(b, $List$Empty$const)),
        hex(color),
        seg_start,
        seg_end,
        thickness,
      );
    },
  );
}

function polar(center, radius, degrees) {
  return new Point(
    center.x + (radius * $geometry.cos_deg(degrees)),
    center.y + (radius * $geometry.sin_deg(degrees)),
  );
}

function collect_from(loop$i, loop$to, loop$point_at, loop$acc) {
  while (true) {
    let i = loop$i;
    let to = loop$to;
    let point_at = loop$point_at;
    let acc = loop$acc;
    let $ = i > to;
    if ($) {
      return $list.reverse(acc);
    } else {
      loop$i = i + 1;
      loop$to = to;
      loop$point_at = point_at;
      loop$acc = listPrepend(point_at(i), acc);
    }
  }
}

function collect(from, to, point_at) {
  return collect_from(from, to, point_at, $List$Empty$const);
}

function spiral_points(center, turns, inner, outer) {
  let winds = $float.absolute_value(turns);
  let $ = winds <= 0.0;
  if ($) {
    return $List$Empty$const;
  } else {
    let steps = $float.round(winds * 36.0);
    let _block;
    let $1 = steps < 24;
    if ($1) {
      _block = 24;
    } else {
      let $2 = steps > 360;
      if ($2) {
        _block = 360;
      } else {
        _block = steps;
      }
    }
    let steps$1 = _block;
    return collect(
      0,
      steps$1,
      (i) => {
        let t = divideFloat($int.to_float(i), $int.to_float(steps$1));
        return polar(center, inner + ((outer - inner) * t), (turns * 360.0) * t);
      },
    );
  }
}

function close_polygon(vertices) {
  if (vertices instanceof $Empty) {
    return $List$Empty$const;
  } else if (vertices.tail instanceof $Empty) {
    return $List$Empty$const;
  } else {
    let first = vertices.head;
    let $ = $list.last(vertices);
    if ($ instanceof Ok) {
      let last = $[0];
      let $1 = (last.x === first.x) && (last.y === first.y);
      if ($1) {
        return vertices;
      } else {
        return $list.append(vertices, listPrepend(first, $List$Empty$const));
      }
    } else {
      return vertices;
    }
  }
}

function curve_points(start, control, end, steps) {
  return collect(
    0,
    steps,
    (i) => {
      let t = divideFloat($int.to_float(i), $int.to_float(steps));
      let u = 1.0 - t;
      return new Point(
        (((u * u) * start.x) + (((2.0 * u) * t) * control.x)) + ((t * t) * end.x),
        (((u * u) * start.y) + (((2.0 * u) * t) * control.y)) + ((t * t) * end.y),
      );
    },
  );
}

function arc_steps(sweep) {
  let magnitude = $float.absolute_value(sweep);
  let steps = $float.round(magnitude / 8.0);
  let $ = steps < 2;
  if ($) {
    return 2;
  } else {
    let $1 = steps > 72;
    if ($1) {
      return 72;
    } else {
      return steps;
    }
  }
}

function arc_points(center, radius, start_deg, sweep, steps) {
  let radius$1 = $float.absolute_value(radius);
  let $ = (radius$1 <= 0.0) || (sweep === 0.0);
  if ($) {
    return $List$Empty$const;
  } else {
    return collect(
      0,
      steps,
      (i) => {
        let t = divideFloat($int.to_float(i), $int.to_float(steps));
        return polar(center, radius$1, start_deg + (sweep * t));
      },
    );
  }
}

function sample(loop$shape) {
  while (true) {
    let shape = loop$shape;
    if (shape instanceof Line) {
      let a = shape.start;
      let b = shape.end;
      return listPrepend(a, listPrepend(b, $List$Empty$const));
    } else if (shape instanceof Circle) {
      let center = shape.center;
      let radius = shape.radius;
      return arc_points(center, radius, 0.0, 360.0, 48);
    } else if (shape instanceof Arc) {
      let center = shape.center;
      let radius = shape.radius;
      let start_deg = shape.start_deg;
      let sweep = shape.sweep_deg;
      return arc_points(center, radius, start_deg, sweep, arc_steps(sweep));
    } else if (shape instanceof Curve) {
      let start = shape.start;
      let control = shape.control;
      let end = shape.end;
      return curve_points(start, control, end, 16);
    } else if (shape instanceof Polygon) {
      let vertices = shape.vertices;
      return close_polygon(vertices);
    } else if (shape instanceof Spiral) {
      let center = shape.center;
      let turns = shape.turns;
      let inner = shape.inner;
      let outer = shape.outer;
      return spiral_points(center, turns, inner, outer);
    } else if (shape instanceof Paint) {
      let inner = shape.shape;
      loop$shape = inner;
    } else {
      let inner = shape.shape;
      loop$shape = inner;
    }
  }
}

function geometry_of(loop$shape) {
  while (true) {
    let shape = loop$shape;
    if (shape instanceof Paint) {
      let inner = shape.shape;
      loop$shape = inner;
    } else if (shape instanceof Fade) {
      let inner = shape.shape;
      loop$shape = inner;
    } else {
      return shape;
    }
  }
}

function look(shape) {
  if (shape instanceof Paint) {
    let inner = shape.shape;
    let color = shape.color;
    return [geometry_of(inner), new Solid(color)];
  } else if (shape instanceof Fade) {
    let inner = shape.shape;
    let from = shape.from;
    let to = shape.to;
    return [geometry_of(inner), new Gradient(from, to)];
  } else {
    let other = shape;
    return [other, Ink$Palette$const];
  }
}

/**
 * Every stroke the canvas should draw for one path. Uncolored shapes use
 * `fallback`. Paint replaces it. Fade splits the polyline into timed pieces
 * so the color changes as the pen moves.
 */
export function render_strokes(path, fallback) {
  let $ = look(path.shape);
  let geometry = $[0];
  let ink = $[1];
  let $1 = sample(geometry);
  if ($1 instanceof $Empty) {
    return $List$Empty$const;
  } else if ($1.tail instanceof $Empty) {
    return $List$Empty$const;
  } else {
    let points = $1;
    if (ink instanceof Palette) {
      return listPrepend(
        stroke(points, fallback, path.start, path.end, path.thickness),
        $List$Empty$const,
      );
    } else if (ink instanceof Solid) {
      let color = ink[0];
      return listPrepend(
        stroke(points, hex(color), path.start, path.end, path.thickness),
        $List$Empty$const,
      );
    } else {
      let from = ink[0];
      let to = ink[1];
      return fade(points, from, to, path.start, path.end, path.thickness);
    }
  }
}

/**
 * One stroke for a path. A plain line is the two endpoints in `color`. A
 * painted or faded shape uses the program's color for the first stroke only;
 * `render_strokes` is what expands a fade into the full sequence.
 */
export function render_path(path, color) {
  let $ = render_strokes(path, color);
  if ($ instanceof $Empty) {
    return new RenderPath(
      $List$Empty$const,
      path.thickness,
      color,
      path.start,
      path.end,
    );
  } else {
    let first = $.head;
    return first;
  }
}
