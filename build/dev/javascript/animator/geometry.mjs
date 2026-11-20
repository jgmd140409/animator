//# sourceMappingURL=geometry.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import { Ok } from "./gleam.mjs";

const pi = 3.141592653589793;

const tau = 6.283185307179586;

function wrap(radians) {
  let $ = $float.modulo(radians, tau);
  if ($ instanceof Ok) {
    let turned = $[0];
    let $1 = turned > pi;
    if ($1) {
      return turned - tau;
    } else {
      return turned;
    }
  } else {
    return 0.0;
  }
}

function sin_rad(x) {
  let x2 = x * x;
  let t0 = x;
  let t1 = ((t0 * x2)) / 6.0;
  let t2 = ((t1 * x2)) / 20.0;
  let t3 = ((t2 * x2)) / 42.0;
  let t4 = ((t3 * x2)) / 72.0;
  let t5 = ((t4 * x2)) / 110.0;
  let t6 = ((t5 * x2)) / 156.0;
  let t7 = ((t6 * x2)) / 210.0;
  return ((((((t0 - t1) + t2) - t3) + t4) - t5) + t6) - t7;
}

/**
 * Cosine of an angle in degrees. Positive degrees run clockwise on the canvas,
 * because the canvas y axis grows downward.
 */
export function cos_deg(degrees) {
  return sin_rad(wrap((((degrees * pi)) / 180.0) + (pi / 2.0)));
}

/**
 * Sine of an angle in degrees, with the same clockwise convention as cos_deg.
 */
export function sin_deg(degrees) {
  return sin_rad(wrap(((degrees * pi)) / 180.0));
}
