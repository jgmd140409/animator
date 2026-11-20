//# sourceMappingURL=builtins.mjs.map
import * as $dict from "../gleam_stdlib/gleam/dict.mjs";
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $errors from "./errors.mjs";
import { TypeError } from "./errors.mjs";
import * as $evaluator from "./evaluator.mjs";
import { Builtin, VBool, VData, VFunc, VInt, VList, apply } from "./evaluator.mjs";
import * as $geometry from "./geometry.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  remainderInt,
  divideInt,
} from "./gleam.mjs";
import * as $limits from "./limits.mjs";
import * as $mutable_dict from "./mutable_dict.mjs";

function expects(name, what) {
  return new Error(new TypeError((name + " expects ") + what));
}

function builtin(name, num_args, run) {
  return [name, new VFunc(new Builtin(name, num_args, run))];
}

function list_builtins() {
  return listPrepend(
    builtin(
      "list.map",
      2,
      (args) => {
        if (args instanceof $Empty) {
          return expects("list.map", "a list and a function");
        } else {
          let $ = args.tail;
          if ($ instanceof $Empty) {
            return expects("list.map", "a list and a function");
          } else if ($.tail instanceof $Empty) {
            let $1 = args.head;
            if ($1 instanceof VList) {
              let f = $.head;
              let xs = $1[0];
              return $result.map(
                $list.try_map(
                  xs,
                  (x) => { return apply(f, listPrepend(x, $List$Empty$const)); },
                ),
                (var0) => { return new VList(var0); },
              );
            } else {
              return expects("list.map", "a list and a function");
            }
          } else {
            return expects("list.map", "a list and a function");
          }
        }
      },
    ),
    listPrepend(
      builtin(
        "list.filter",
        2,
        (args) => {
          if (args instanceof $Empty) {
            return expects("list.filter", "a list and a function");
          } else {
            let $ = args.tail;
            if ($ instanceof $Empty) {
              return expects("list.filter", "a list and a function");
            } else if ($.tail instanceof $Empty) {
              let $1 = args.head;
              if ($1 instanceof VList) {
                let keep = $.head;
                let xs = $1[0];
                return $result.map(
                  $list.try_fold(
                    xs,
                    $List$Empty$const,
                    (acc, x) => {
                      let $2 = apply(keep, listPrepend(x, $List$Empty$const));
                      if ($2 instanceof Ok) {
                        let $3 = $2[0];
                        if ($3 instanceof VBool) {
                          if ($3[0]) {
                            return new Ok(listPrepend(x, acc));
                          } else {
                            return new Ok(acc);
                          }
                        } else {
                          return new Error(
                            new TypeError(
                              "list.filter's function must return True or False",
                            ),
                          );
                        }
                      } else {
                        return $2;
                      }
                    },
                  ),
                  (kept) => { return new VList($list.reverse(kept)); },
                );
              } else {
                return expects("list.filter", "a list and a function");
              }
            } else {
              return expects("list.filter", "a list and a function");
            }
          }
        },
      ),
      listPrepend(
        builtin(
          "list.append",
          2,
          (args) => {
            if (args instanceof $Empty) {
              return expects("list.append", "two lists");
            } else {
              let $ = args.tail;
              if ($ instanceof $Empty) {
                return expects("list.append", "two lists");
              } else if ($.tail instanceof $Empty) {
                let $1 = args.head;
                if ($1 instanceof VList) {
                  let $2 = $.head;
                  if ($2 instanceof VList) {
                    let xs = $1[0];
                    let ys = $2[0];
                    $limits.charge($list.length(xs));
                    return new Ok(new VList($list.append(xs, ys)));
                  } else {
                    return expects("list.append", "two lists");
                  }
                } else {
                  return expects("list.append", "two lists");
                }
              } else {
                return expects("list.append", "two lists");
              }
            }
          },
        ),
        listPrepend(
          builtin(
            "list.length",
            1,
            (args) => {
              if (args instanceof $Empty) {
                return expects("list.length", "a list");
              } else if (args.tail instanceof $Empty) {
                let $ = args.head;
                if ($ instanceof VList) {
                  let xs = $[0];
                  let length = $list.length(xs);
                  $limits.charge(length);
                  return new Ok(new VInt(length));
                } else {
                  return expects("list.length", "a list");
                }
              } else {
                return expects("list.length", "a list");
              }
            },
          ),
          listPrepend(
            builtin(
              "list.flatten",
              1,
              (args) => {
                if (args instanceof $Empty) {
                  return expects("list.flatten", "a list of lists");
                } else if (args.tail instanceof $Empty) {
                  let $ = args.head;
                  if ($ instanceof VList) {
                    let xss = $[0];
                    return $result.try$(
                      $list.try_map(
                        xss,
                        (xs) => {
                          if (xs instanceof VList) {
                            let elements = xs[0];
                            return new Ok(elements);
                          } else {
                            return expects("list.flatten", "a list");
                          }
                        },
                      ),
                      (lists) => {
                        let total = $list.fold(
                          lists,
                          0,
                          (n, l) => { return n + $list.length(l); },
                        );
                        $limits.charge($list.length(lists) + total);
                        return new Ok(new VList($list.flatten(lists)));
                      },
                    );
                  } else {
                    return expects("list.flatten", "a list of lists");
                  }
                } else {
                  return expects("list.flatten", "a list of lists");
                }
              },
            ),
            $List$Empty$const,
          ),
        ),
      ),
    ),
  );
}

function constructors() {
  return $list.map(
    $evaluator.constructors,
    (entry) => {
      let tag = entry[0];
      let fields = entry[1];
      return builtin(
        tag,
        $list.length(fields),
        (args) => { return new Ok(new VData(tag, args)); },
      );
    },
  );
}

function rgb_value(r, g, b) {
  return new VData(
    "Rgb",
    listPrepend(
      new VInt(r),
      listPrepend(new VInt(g), listPrepend(new VInt(b), $List$Empty$const)),
    ),
  );
}

function color_value(name, r, g, b) {
  return builtin(
    name,
    0,
    (args) => {
      if (args instanceof $Empty) {
        return new Ok(rgb_value(r, g, b));
      } else {
        return expects(name, "no arguments");
      }
    },
  );
}

function mix_channel(from, to, t) {
  return from + (globalThis.Math.trunc(((to - from) * t) / 100));
}

function read_rgb(value) {
  if (value instanceof VData) {
    let $ = value.fields;
    if ($ instanceof $Empty) {
      return new Error(undefined);
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return new Error(undefined);
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          return new Error(undefined);
        } else if ($2.tail instanceof $Empty) {
          let $3 = $.head;
          if ($3 instanceof VInt) {
            let $4 = $1.head;
            if ($4 instanceof VInt) {
              let $5 = $2.head;
              if ($5 instanceof VInt && value.tag === "Rgb") {
                let r = $3[0];
                let g = $4[0];
                let b = $5[0];
                return new Ok([r, g, b]);
              } else {
                return new Error(undefined);
              }
            } else {
              return new Error(undefined);
            }
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      }
    }
  } else {
    return new Error(undefined);
  }
}

function builtin_mix(args) {
  if (args instanceof $Empty) {
    return expects("mix", "two Rgb colors and an int from 0 to 100");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("mix", "two Rgb colors and an int from 0 to 100");
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return expects("mix", "two Rgb colors and an int from 0 to 100");
      } else if ($1.tail instanceof $Empty) {
        let $2 = $1.head;
        if ($2 instanceof VInt) {
          let a = args.head;
          let b = $.head;
          let t = $2[0];
          let $3 = read_rgb(a);
          let $4 = read_rgb(b);
          if ($3 instanceof Ok && $4 instanceof Ok) {
            let ar = $3[0][0];
            let ag = $3[0][1];
            let ab = $3[0][2];
            let br = $4[0][0];
            let bg = $4[0][1];
            let bb = $4[0][2];
            let _block;
            let $5 = t < 0;
            if ($5) {
              _block = 0;
            } else {
              let $6 = t > 100;
              if ($6) {
                _block = 100;
              } else {
                _block = t;
              }
            }
            let t$1 = _block;
            return new Ok(
              rgb_value(
                mix_channel(ar, br, t$1),
                mix_channel(ag, bg, t$1),
                mix_channel(ab, bb, t$1),
              ),
            );
          } else {
            return expects("mix", "two Rgb colors and an int from 0 to 100");
          }
        } else {
          return expects("mix", "two Rgb colors and an int from 0 to 100");
        }
      } else {
        return expects("mix", "two Rgb colors and an int from 0 to 100");
      }
    }
  }
}

function point_value(x, y) {
  return new VData(
    "Point",
    listPrepend(new VInt(x), listPrepend(new VInt(y), $List$Empty$const)),
  );
}

function polar_offset(radius, degrees) {
  let distance = $int.to_float(radius);
  let angle = $int.to_float(degrees);
  return [
    $float.round(distance * $geometry.cos_deg(angle)),
    $float.round(distance * $geometry.sin_deg(angle)),
  ];
}

function ngon_points(
  loop$x,
  loop$y,
  loop$radius,
  loop$sides,
  loop$rotation,
  loop$i,
  loop$acc
) {
  while (true) {
    let x = loop$x;
    let y = loop$y;
    let radius = loop$radius;
    let sides = loop$sides;
    let rotation = loop$rotation;
    let i = loop$i;
    let acc = loop$acc;
    let $ = i >= sides;
    if ($) {
      return $list.reverse(acc);
    } else {
      let degrees = rotation + (divideInt(i * 360, sides));
      let $1 = polar_offset(radius, degrees);
      let dx = $1[0];
      let dy = $1[1];
      loop$x = x;
      loop$y = y;
      loop$radius = radius;
      loop$sides = sides;
      loop$rotation = rotation;
      loop$i = i + 1;
      loop$acc = listPrepend(point_value(x + dx, y + dy), acc);
    }
  }
}

function read_point(value) {
  if (value instanceof VData) {
    let $ = value.fields;
    if ($ instanceof $Empty) {
      return new Error(undefined);
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return new Error(undefined);
      } else if ($1.tail instanceof $Empty) {
        let $2 = $.head;
        if ($2 instanceof VInt) {
          let $3 = $1.head;
          if ($3 instanceof VInt && value.tag === "Point") {
            let x = $2[0];
            let y = $3[0];
            return new Ok([x, y]);
          } else {
            return new Error(undefined);
          }
        } else {
          return new Error(undefined);
        }
      } else {
        return new Error(undefined);
      }
    }
  } else {
    return new Error(undefined);
  }
}

function builtin_ngon(args) {
  if (args instanceof $Empty) {
    return expects("ngon", "a Point, a radius, a side count, and degrees");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("ngon", "a Point, a radius, a side count, and degrees");
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return expects("ngon", "a Point, a radius, a side count, and degrees");
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          return expects("ngon", "a Point, a radius, a side count, and degrees");
        } else if ($2.tail instanceof $Empty) {
          let $3 = $.head;
          if ($3 instanceof VInt) {
            let $4 = $1.head;
            if ($4 instanceof VInt) {
              let $5 = $2.head;
              if ($5 instanceof VInt) {
                let center = args.head;
                let radius = $3[0];
                let sides = $4[0];
                let rotation = $5[0];
                let $6 = read_point(center);
                if ($6 instanceof Ok) {
                  let x = $6[0][0];
                  let y = $6[0][1];
                  let $7 = sides < 3;
                  if ($7) {
                    return new Error(
                      new TypeError("ngon expects at least 3 sides"),
                    );
                  } else {
                    let _block;
                    let $8 = sides > 64;
                    if ($8) {
                      _block = 64;
                    } else {
                      _block = sides;
                    }
                    let count = _block;
                    $limits.charge(count);
                    return new Ok(
                      new VData(
                        "Polygon",
                        listPrepend(
                          new VList(
                            ngon_points(
                              x,
                              y,
                              radius,
                              count,
                              rotation,
                              0,
                              $List$Empty$const,
                            ),
                          ),
                          $List$Empty$const,
                        ),
                      ),
                    );
                  }
                } else {
                  return expects(
                    "ngon",
                    "a Point, a radius, a side count, and degrees",
                  );
                }
              } else {
                return expects(
                  "ngon",
                  "a Point, a radius, a side count, and degrees",
                );
              }
            } else {
              return expects(
                "ngon",
                "a Point, a radius, a side count, and degrees",
              );
            }
          } else {
            return expects(
              "ngon",
              "a Point, a radius, a side count, and degrees",
            );
          }
        } else {
          return expects("ngon", "a Point, a radius, a side count, and degrees");
        }
      }
    }
  }
}

function builtin_rotate(args) {
  if (args instanceof $Empty) {
    return expects("rotate", "a Point, an origin Point, and degrees");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("rotate", "a Point, an origin Point, and degrees");
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return expects("rotate", "a Point, an origin Point, and degrees");
      } else if ($1.tail instanceof $Empty) {
        let $2 = $1.head;
        if ($2 instanceof VInt) {
          let point = args.head;
          let origin = $.head;
          let degrees = $2[0];
          let $3 = read_point(point);
          let $4 = read_point(origin);
          if ($3 instanceof Ok && $4 instanceof Ok) {
            let x = $3[0][0];
            let y = $3[0][1];
            let ox = $4[0][0];
            let oy = $4[0][1];
            let c = $geometry.cos_deg($int.to_float(degrees));
            let s = $geometry.sin_deg($int.to_float(degrees));
            let vx = $int.to_float(x - ox);
            let vy = $int.to_float(y - oy);
            return new Ok(
              point_value(
                ox + $float.round((vx * c) - (vy * s)),
                oy + $float.round((vx * s) + (vy * c)),
              ),
            );
          } else {
            return expects("rotate", "a Point, an origin Point, and degrees");
          }
        } else {
          return expects("rotate", "a Point, an origin Point, and degrees");
        }
      } else {
        return expects("rotate", "a Point, an origin Point, and degrees");
      }
    }
  }
}

function builtin_orbit(args) {
  if (args instanceof $Empty) {
    return expects("orbit", "a Point, a radius, and degrees");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("orbit", "a Point, a radius, and degrees");
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        return expects("orbit", "a Point, a radius, and degrees");
      } else if ($1.tail instanceof $Empty) {
        let $2 = $.head;
        if ($2 instanceof VInt) {
          let $3 = $1.head;
          if ($3 instanceof VInt) {
            let center = args.head;
            let radius = $2[0];
            let degrees = $3[0];
            let $4 = read_point(center);
            if ($4 instanceof Ok) {
              let x = $4[0][0];
              let y = $4[0][1];
              let $5 = polar_offset(radius, degrees);
              let dx = $5[0];
              let dy = $5[1];
              return new Ok(point_value(x + dx, y + dy));
            } else {
              return expects("orbit", "a Point, a radius, and degrees");
            }
          } else {
            return expects("orbit", "a Point, a radius, and degrees");
          }
        } else {
          return expects("orbit", "a Point, a radius, and degrees");
        }
      } else {
        return expects("orbit", "a Point, a radius, and degrees");
      }
    }
  }
}

function studio_builtins() {
  return toList([
    builtin("orbit", 3, builtin_orbit),
    builtin("rotate", 3, builtin_rotate),
    builtin("ngon", 4, builtin_ngon),
    builtin("mix", 3, builtin_mix),
    color_value("gold", 226, 179, 64),
    color_value("rose", 232, 104, 128),
    color_value("violet", 176, 132, 232),
    color_value("cyan", 96, 210, 214),
    color_value("lime", 166, 214, 112),
    color_value("sky", 120, 176, 240),
    color_value("coral", 240, 140, 96),
    color_value("ivory", 236, 228, 206),
  ]);
}

function int_cmp(name, op) {
  return builtin(
    name,
    2,
    (args) => {
      if (args instanceof $Empty) {
        return expects(name, "two ints");
      } else {
        let $ = args.tail;
        if ($ instanceof $Empty) {
          return expects(name, "two ints");
        } else if ($.tail instanceof $Empty) {
          let $1 = args.head;
          if ($1 instanceof VInt) {
            let $2 = $.head;
            if ($2 instanceof VInt) {
              let x = $1[0];
              let y = $2[0];
              return new Ok(new VBool(op(x, y)));
            } else {
              return expects(name, "two ints");
            }
          } else {
            return expects(name, "two ints");
          }
        } else {
          return expects(name, "two ints");
        }
      }
    },
  );
}

function int_op(name, op) {
  return builtin(
    name,
    2,
    (args) => {
      if (args instanceof $Empty) {
        return expects(name, "two ints");
      } else {
        let $ = args.tail;
        if ($ instanceof $Empty) {
          return expects(name, "two ints");
        } else if ($.tail instanceof $Empty) {
          let $1 = args.head;
          if ($1 instanceof VInt) {
            let $2 = $.head;
            if ($2 instanceof VInt) {
              let x = $1[0];
              let y = $2[0];
              return new Ok(new VInt(op(x, y)));
            } else {
              return expects(name, "two ints");
            }
          } else {
            return expects(name, "two ints");
          }
        } else {
          return expects(name, "two ints");
        }
      }
    },
  );
}

function bool_op(name, op) {
  return builtin(
    name,
    2,
    (args) => {
      if (args instanceof $Empty) {
        return expects(name, "two Bools");
      } else {
        let $ = args.tail;
        if ($ instanceof $Empty) {
          return expects(name, "two Bools");
        } else if ($.tail instanceof $Empty) {
          let $1 = args.head;
          if ($1 instanceof VBool) {
            let $2 = $.head;
            if ($2 instanceof VBool) {
              let x = $1[0];
              let y = $2[0];
              return new Ok(new VBool(op(x, y)));
            } else {
              return expects(name, "two Bools");
            }
          } else {
            return expects(name, "two Bools");
          }
        } else {
          return expects(name, "two Bools");
        }
      }
    },
  );
}

function value_equal_lists(loop$xs, loop$ys) {
  while (true) {
    let xs = loop$xs;
    let ys = loop$ys;
    if (xs instanceof $Empty) {
      if (ys instanceof $Empty) {
        return new Ok(true);
      } else {
        return new Ok(false);
      }
    } else if (ys instanceof $Empty) {
      return new Ok(false);
    } else {
      let x = xs.head;
      let rx = xs.tail;
      let y = ys.head;
      let ry = ys.tail;
      let $ = value_equal(x, y);
      if ($ instanceof Ok && $[0]) {
        loop$xs = rx;
        loop$ys = ry;
      } else {
        return $;
      }
    }
  }
}

function value_equal(a, b) {
  $limits.charge(1);
  if (a instanceof VBool && b instanceof VBool) {
    let x = a[0];
    let y = b[0];
    return new Ok(x === y);
  } else if (a instanceof VInt && b instanceof VInt) {
    let x = a[0];
    let y = b[0];
    return new Ok(x === y);
  } else if (a instanceof VList && b instanceof VList) {
    let xs = a[0];
    let ys = b[0];
    return value_equal_lists(xs, ys);
  } else if (a instanceof VData && b instanceof VData) {
    let t1 = a.tag;
    let xs = a.fields;
    let t2 = b.tag;
    let ys = b.fields;
    let $ = t1 === t2;
    if ($) {
      return value_equal_lists(xs, ys);
    } else {
      return new Ok(false);
    }
  } else {
    return new Ok(false);
  }
}

function builtin_not_eq(args) {
  if (args instanceof $Empty) {
    return expects("!=", "two values");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("!=", "two values");
    } else if ($.tail instanceof $Empty) {
      let a = args.head;
      let b = $.head;
      return $result.map(
        value_equal(a, b),
        (equal) => { return new VBool(!equal); },
      );
    } else {
      return expects("!=", "two values");
    }
  }
}

function builtin_eq(args) {
  if (args instanceof $Empty) {
    return expects("==", "two values");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("==", "two values");
    } else if ($.tail instanceof $Empty) {
      let a = args.head;
      let b = $.head;
      return $result.map(
        value_equal(a, b),
        (var0) => { return new VBool(var0); },
      );
    } else {
      return expects("==", "two values");
    }
  }
}

function builtin_abs(args) {
  if (args instanceof $Empty) {
    return expects("abs", "one int");
  } else if (args.tail instanceof $Empty) {
    let $ = args.head;
    if ($ instanceof VInt) {
      let n = $[0];
      return new Ok(new VInt($int.absolute_value(n)));
    } else {
      return expects("abs", "one int");
    }
  } else {
    return expects("abs", "one int");
  }
}

function builtin_random(args) {
  if (args instanceof $Empty) {
    return expects("random", "two ints");
  } else {
    let $ = args.tail;
    if ($ instanceof $Empty) {
      return expects("random", "two ints");
    } else if ($.tail instanceof $Empty) {
      let $1 = args.head;
      if ($1 instanceof VInt) {
        let $2 = $.head;
        if ($2 instanceof VInt) {
          let min = $1[0];
          let max = $2[0];
          let $3 = max <= min;
          if ($3) {
            return new Ok(new VInt(min));
          } else {
            return new Ok(
              new VInt(
                min + $float.truncate(
                  $float.random() * $int.to_float(max - min),
                ),
              ),
            );
          }
        } else {
          return expects("random", "two ints");
        }
      } else {
        return expects("random", "two ints");
      }
    } else {
      return expects("random", "two ints");
    }
  }
}

function builtins() {
  return $dict.from_list(
    listPrepend(
      builtin("random", 2, builtin_random),
      listPrepend(
        builtin("abs", 1, builtin_abs),
        listPrepend(
          builtin("==", 2, builtin_eq),
          listPrepend(
            builtin("!=", 2, builtin_not_eq),
            listPrepend(
              bool_op("&&", (x, y) => { return x && y; }),
              listPrepend(
                bool_op("||", (x, y) => { return x || y; }),
                listPrepend(
                  int_op("+", (x, y) => { return x + y; }),
                  listPrepend(
                    int_op("-", (x, y) => { return x - y; }),
                    listPrepend(
                      int_op("*", (x, y) => { return x * y; }),
                      listPrepend(
                        int_op("/", (x, y) => { return divideInt(x, y); }),
                        listPrepend(
                          int_op("%", (x, y) => { return remainderInt(x, y); }),
                          listPrepend(
                            int_cmp("<", (x, y) => { return x < y; }),
                            listPrepend(
                              int_cmp(">", (x, y) => { return x > y; }),
                              listPrepend(
                                int_cmp("<=", (x, y) => { return x <= y; }),
                                listPrepend(
                                  int_cmp(">=", (x, y) => { return x >= y; }),
                                  $list.flatten(
                                    listPrepend(
                                      studio_builtins(),
                                      listPrepend(
                                        constructors(),
                                        listPrepend(
                                          list_builtins(),
                                          $List$Empty$const,
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

/**
 * A new global frame that binds the built-ins, ready for
 * parser.parse_program to add a program's functions.
 */
export function global_frame() {
  let frame = $mutable_dict.new$();
  let bind = (name, value) => {
    return $mutable_dict.insert(frame, name, value);
  };
  $dict.each(builtins(), bind);
  return frame;
}
