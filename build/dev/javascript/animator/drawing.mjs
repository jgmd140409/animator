//# sourceMappingURL=drawing.mjs.map
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $errors from "./errors.mjs";
import { BadDrawing, EvalError$PathLimit$const } from "./errors.mjs";
import * as $evaluator from "./evaluator.mjs";
import { VData, VInt, VList } from "./evaluator.mjs";
import {
  Ok,
  Error,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
} from "./gleam.mjs";
import * as $limits from "./limits.mjs";
import * as $shape from "./shape.mjs";
import {
  Arc,
  Circle,
  Color,
  ColorLine,
  Curve,
  Fade,
  Line,
  Paint,
  Path,
  Point,
  Polygon,
  Spiral,
} from "./shape.mjs";

function clamp_channel(channel) {
  let $ = channel < 0;
  if ($) {
    return 0;
  } else {
    let $1 = channel > 255;
    if ($1) {
      return 255;
    } else {
      return channel;
    }
  }
}

function to_color(v) {
  if (v instanceof VData) {
    let $ = v.fields;
    if ($ instanceof $Empty) {
      return new Error(new BadDrawing("expected an Rgb color"));
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return new Error(new BadDrawing("expected an Rgb color"));
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          return new Error(new BadDrawing("expected an Rgb color"));
        } else if ($2.tail instanceof $Empty) {
          let $3 = $.head;
          if ($3 instanceof VInt) {
            let $4 = $1.head;
            if ($4 instanceof VInt) {
              let $5 = $2.head;
              if ($5 instanceof VInt) {
                let $6 = v.tag;
                if ($6 === "Rgb") {
                  let r = $3[0];
                  let g = $4[0];
                  let b = $5[0];
                  return new Ok(
                    new Color(
                      clamp_channel(r),
                      clamp_channel(g),
                      clamp_channel(b),
                    ),
                  );
                } else if ($6 === "RGB") {
                  let r = $3[0];
                  let g = $4[0];
                  let b = $5[0];
                  return new Ok(
                    new Color(
                      clamp_channel(r),
                      clamp_channel(g),
                      clamp_channel(b),
                    ),
                  );
                } else {
                  return new Error(new BadDrawing("expected an Rgb color"));
                }
              } else {
                return new Error(new BadDrawing("expected an Rgb color"));
              }
            } else {
              return new Error(new BadDrawing("expected an Rgb color"));
            }
          } else {
            return new Error(new BadDrawing("expected an Rgb color"));
          }
        } else {
          return new Error(new BadDrawing("expected an Rgb color"));
        }
      }
    }
  } else {
    return new Error(new BadDrawing("expected an Rgb color"));
  }
}

function to_point(v) {
  if (v instanceof VData) {
    let $ = v.fields;
    if ($ instanceof $Empty) {
      return new Error(new BadDrawing("expected a Point"));
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return new Error(new BadDrawing("expected a Point"));
      } else if ($1.tail instanceof $Empty) {
        let $2 = $.head;
        if ($2 instanceof VInt) {
          let $3 = $1.head;
          if ($3 instanceof VInt && v.tag === "Point") {
            let x = $2[0];
            let y = $3[0];
            return new Ok(new Point($int.to_float(x), $int.to_float(y)));
          } else {
            return new Error(new BadDrawing("expected a Point"));
          }
        } else {
          return new Error(new BadDrawing("expected a Point"));
        }
      } else {
        return new Error(new BadDrawing("expected a Point"));
      }
    }
  } else {
    return new Error(new BadDrawing("expected a Point"));
  }
}

function to_shape(v) {
  if (v instanceof VData) {
    let $ = v.fields;
    if ($ instanceof $Empty) {
      return new Error(
        new BadDrawing("a Path's shape must be a recognized shape"),
      );
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let $2 = $.head;
        if ($2 instanceof VList && v.tag === "Polygon") {
          let vertices = $2[0];
          return $result.try$(
            $list.try_map(vertices, to_point),
            (points) => { return new Ok(new Polygon(points)); },
          );
        } else {
          return new Error(
            new BadDrawing("a Path's shape must be a recognized shape"),
          );
        }
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          let $3 = v.tag;
          if ($3 === "Line") {
            let start = $.head;
            let end = $1.head;
            return $result.try$(
              to_point(start),
              (a) => {
                return $result.try$(
                  to_point(end),
                  (b) => { return new Ok(new Line(a, b)); },
                );
              },
            );
          } else if ($3 === "Circle") {
            let $4 = $1.head;
            if ($4 instanceof VInt) {
              let center = $.head;
              let radius = $4[0];
              return $result.try$(
                to_point(center),
                (c) => { return new Ok(new Circle(c, $int.to_float(radius))); },
              );
            } else {
              return new Error(
                new BadDrawing("a Path's shape must be a recognized shape"),
              );
            }
          } else if ($3 === "Paint") {
            let shape = $.head;
            let color = $1.head;
            return $result.try$(
              to_shape(shape),
              (s) => {
                return $result.try$(
                  to_color(color),
                  (c) => { return new Ok(new Paint(s, c)); },
                );
              },
            );
          } else {
            return new Error(
              new BadDrawing("a Path's shape must be a recognized shape"),
            );
          }
        } else {
          let $3 = $2.tail;
          if ($3 instanceof $Empty) {
            let $4 = v.tag;
            if ($4 === "ColorLine") {
              let start = $.head;
              let end = $1.head;
              let color = $2.head;
              return $result.try$(
                to_point(start),
                (a) => {
                  return $result.try$(
                    to_point(end),
                    (b) => {
                      return $result.try$(
                        to_color(color),
                        (c) => { return new Ok(new ColorLine(a, b, c)); },
                      );
                    },
                  );
                },
              );
            } else if ($4 === "Curve") {
              let start = $.head;
              let control = $1.head;
              let end = $2.head;
              return $result.try$(
                to_point(start),
                (a) => {
                  return $result.try$(
                    to_point(control),
                    (handle) => {
                      return $result.try$(
                        to_point(end),
                        (b) => { return new Ok(new Curve(a, handle, b)); },
                      );
                    },
                  );
                },
              );
            } else if ($4 === "Fade") {
              let shape = $.head;
              let from = $1.head;
              let to = $2.head;
              return $result.try$(
                to_shape(shape),
                (s) => {
                  return $result.try$(
                    to_color(from),
                    (a) => {
                      return $result.try$(
                        to_color(to),
                        (b) => { return new Ok(new Fade(s, a, b)); },
                      );
                    },
                  );
                },
              );
            } else {
              return new Error(
                new BadDrawing("a Path's shape must be a recognized shape"),
              );
            }
          } else if ($3.tail instanceof $Empty) {
            let $4 = $1.head;
            if ($4 instanceof VInt) {
              let $5 = $2.head;
              if ($5 instanceof VInt) {
                let $6 = $3.head;
                if ($6 instanceof VInt) {
                  let $7 = v.tag;
                  if ($7 === "Arc") {
                    let center = $.head;
                    let radius = $4[0];
                    let start_deg = $5[0];
                    let sweep = $6[0];
                    return $result.try$(
                      to_point(center),
                      (c) => {
                        return new Ok(
                          new Arc(
                            c,
                            $int.to_float(radius),
                            $int.to_float(start_deg),
                            $int.to_float(sweep),
                          ),
                        );
                      },
                    );
                  } else if ($7 === "Spiral") {
                    let center = $.head;
                    let turns = $4[0];
                    let inner = $5[0];
                    let outer = $6[0];
                    return $result.try$(
                      to_point(center),
                      (c) => {
                        return new Ok(
                          new Spiral(
                            c,
                            $int.to_float(turns),
                            $int.to_float(inner),
                            $int.to_float(outer),
                          ),
                        );
                      },
                    );
                  } else {
                    return new Error(
                      new BadDrawing(
                        "a Path's shape must be a recognized shape",
                      ),
                    );
                  }
                } else {
                  return new Error(
                    new BadDrawing("a Path's shape must be a recognized shape"),
                  );
                }
              } else {
                return new Error(
                  new BadDrawing("a Path's shape must be a recognized shape"),
                );
              }
            } else {
              return new Error(
                new BadDrawing("a Path's shape must be a recognized shape"),
              );
            }
          } else {
            return new Error(
              new BadDrawing("a Path's shape must be a recognized shape"),
            );
          }
        }
      }
    }
  } else {
    return new Error(
      new BadDrawing("a Path's shape must be a recognized shape"),
    );
  }
}

function to_path(v) {
  if (v instanceof VData) {
    let $ = v.fields;
    if ($ instanceof $Empty) {
      return new Error(new BadDrawing("some element is not a well-formed path"));
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return new Error(
          new BadDrawing("some element is not a well-formed path"),
        );
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          return new Error(
            new BadDrawing("some element is not a well-formed path"),
          );
        } else {
          let $3 = $2.tail;
          if ($3 instanceof $Empty) {
            return new Error(
              new BadDrawing("some element is not a well-formed path"),
            );
          } else if ($3.tail instanceof $Empty) {
            let $4 = $1.head;
            if ($4 instanceof VInt) {
              let $5 = $2.head;
              if ($5 instanceof VInt) {
                let $6 = $3.head;
                if ($6 instanceof VInt && v.tag === "Path") {
                  let shape = $.head;
                  let start = $4[0];
                  let end = $5[0];
                  let thickness = $6[0];
                  return $result.try$(
                    to_shape(shape),
                    (s) => {
                      return new Ok(
                        new Path(
                          s,
                          $int.to_float(start),
                          $int.to_float(end),
                          $int.to_float(thickness),
                        ),
                      );
                    },
                  );
                } else {
                  return new Error(
                    new BadDrawing("some element is not a well-formed path"),
                  );
                }
              } else {
                return new Error(
                  new BadDrawing("some element is not a well-formed path"),
                );
              }
            } else {
              return new Error(
                new BadDrawing("some element is not a well-formed path"),
              );
            }
          } else {
            return new Error(
              new BadDrawing("some element is not a well-formed path"),
            );
          }
        }
      }
    }
  } else {
    return new Error(new BadDrawing("some element is not a well-formed path"));
  }
}

/**
 * Call the program's draw function on shape_slider, returning its list of
 * paths or the evaluation error, so the app can show failures.
 */
export function try_draw(shape_slider, global) {
  let $ = $evaluator.run(
    "draw",
    listPrepend(new VInt(shape_slider), $List$Empty$const),
    global,
  );
  if ($ instanceof Ok) {
    let $1 = $[0];
    if ($1 instanceof VList) {
      let items = $1[0];
      let $2 = $list.length(items) > $limits.path_limit;
      if ($2) {
        return new Error(EvalError$PathLimit$const);
      } else {
        return $list.try_map(items, to_path);
      }
    } else {
      return new Error(new BadDrawing("return value of draw is not a list"));
    }
  } else {
    return $;
  }
}
