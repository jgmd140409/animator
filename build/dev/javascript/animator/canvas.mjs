// The canvas animation loop. The renderer is kept out of Lustre's virtual DOM:
// Gleam computes the full curve of every path once (whenever the code or
// `shape_slider` changes) and pushes it here via `setDrawing`. A single
// requestAnimationFrame loop owns the clock and, each frame, reveals a growing
// prefix of the precomputed points straight to the 2D context. So per frame
// there is no geometry work and no vdom diffing — just canvas strokes — which
// is what lets many paths animate at high frames per second.
//
// Values cross the Gleam/JS boundary directly — no JSON: a Gleam record arrives
// as an object with named fields, and a Gleam list is iterable.


let canvas = null;
let ctx = null;
// { paths: [{ pts: Float64Array [x0,y0,...], thickness, color, start, end }] }
let drawing = null;
let rate = 1; // a multiple of normal speed; negative plays the drawing backward
let clock = 0; // the drawing's time, in tenths of a second, in [0, endClock]
let lastTs = 0;
let running = false;
let framesWithoutCanvas = 0;
// Path Runner draws on top of the paths inside this same frame, and may
// advance the game from it. A null listener means drawing mode.
let actors = null;
let frameListener = null;

const TENTHS_PER_SECOND = 10;
// How many frames (about 10 seconds' worth) to wait for the canvas to appear
// before reporting that it hasn't.
const MAX_FRAMES_WITHOUT_CANVAS = 600;

// Replace the drawing being animated. `pathList` is the List(RenderPath) built
// by render.gleam; each path's points are packed into a flat Float64Array so
// the per-frame draw loop touches only contiguous numbers.
export function setDrawing(pathList) {
  const paths = [];
  for (const p of pathList) {
    const flat = [];
    for (const q of p.points) flat.push(q.x, q.y);
    paths.push({
      pts: new Float64Array(flat),
      thickness: p.thickness,
      color: p.color,
      start: p.start,
      end: p.end,
    });
  }
  // Keep the current clock across drawing swaps: dragging the shape slider on an
  // already-finished drawing shows the new shape complete, rather than restarting.
  // `endClock` is the moment the last path finishes drawing, past which the frame
  // loop holds time still (see frame).
  drawing = { paths, endClock: drawingEndClock(paths) };
  if (!running) {
    running = true;
    lastTs = performance.now();
    requestAnimationFrame(frame);
  }
}

// The clock at which every path has fully drawn — the largest per-path finish
// time (u = 1). A path finishes at its `end` time, or right at `start` when it
// has no positive duration (end ≤ start, an instant path). An empty drawing
// has nothing to finish, so time runs on unbounded (Infinity).
function drawingEndClock(paths) {
  let end = Infinity;
  for (const p of paths) {
    const finish = Math.max(p.start, p.end);
    end = end === Infinity ? finish : Math.max(end, finish);
  }
  return end;
}

export function setSpeed(r) {
  rate = r;
}

// Jump the animation back to the start (empty canvas).
export function resetClock() {
  clock = 0;
}

export function setActors(scene) {
  actors = scene;
}

export function clearActors() {
  actors = null;
}

export function setFrameListener(fn) {
  frameListener = fn;
}

export function clearFrameListener() {
  frameListener = null;
}

// Directions currently held, by name ("left", "right", "up", "down").
const heldKeys = new Set();
// The last direction pressed. It is remembered after the key is released so a
// quick tap still takes the next turn, like a buffered move.
let lastAim = { x: 0, y: 0 };

// Physical key positions, so WASD works on any keyboard layout.
function direction(event) {
  switch (event.code) {
    case "ArrowLeft":
    case "KeyA":
      return "left";
    case "ArrowRight":
    case "KeyD":
      return "right";
    case "ArrowUp":
    case "KeyW":
      return "up";
    case "ArrowDown":
    case "KeyS":
      return "down";
  }
  switch ((event.key || "").toLowerCase()) {
    case "arrowleft":
    case "a":
      return "left";
    case "arrowright":
    case "d":
      return "right";
    case "arrowup":
    case "w":
      return "up";
    case "arrowdown":
    case "s":
      return "down";
  }
  return null;
}

function heldAim() {
  let x = 0;
  let y = 0;
  if (heldKeys.has("left")) x -= 1;
  if (heldKeys.has("right")) x += 1;
  if (heldKeys.has("up")) y -= 1;
  if (heldKeys.has("down")) y += 1;
  return { x, y };
}

// A held direction is sent at full strength, which can turn the runner around.
// A remembered direction is sent at half strength: enough to choose the next
// turn, but not enough to reverse.
function currentAim() {
  const aim = heldAim();
  if (aim.x !== 0 || aim.y !== 0) return aim;
  return { x: lastAim.x * 0.5, y: lastAim.y * 0.5 };
}

let keyDown = null;
let keyUp = null;
let blurred = null;

export function watchKeys(onAim) {
  clearKeys();
  keyDown = (event) => {
    const dir = direction(event);
    if (!dir) return;
    event.preventDefault();
    heldKeys.add(dir);
    const aim = heldAim();
    if (aim.x !== 0 || aim.y !== 0) lastAim = aim;
    const sent = currentAim();
    onAim(sent.x, sent.y);
  };
  keyUp = (event) => {
    const dir = direction(event);
    if (!dir) return;
    heldKeys.delete(dir);
    const sent = currentAim();
    onAim(sent.x, sent.y);
  };
  blurred = () => {
    heldKeys.clear();
    const sent = currentAim();
    onAim(sent.x, sent.y);
  };
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  window.addEventListener("blur", blurred);
}

export function clearKeys() {
  if (keyDown) window.removeEventListener("keydown", keyDown);
  if (keyUp) window.removeEventListener("keyup", keyUp);
  if (blurred) window.removeEventListener("blur", blurred);
  keyDown = null;
  keyUp = null;
  blurred = null;
  heldKeys.clear();
  lastAim = { x: 0, y: 0 };
}

function frame(ts) {
  // Cap dt so a backgrounded/paused tab can't jump the clock far ahead.
  const dt = Math.min((ts - lastTs) / 1000, 0.1);
  lastTs = ts;
  if (frameListener) frameListener(dt);
  // The clock runs forward, each path drawing in over its window and then
  // staying; there is no loop back to an empty canvas. It is bounded at both
  // ends: reverse rewinds only as far as the start (0), and forward stops the
  // instant the last path has fully drawn (endClock), so time never runs on past
  // a finished drawing.
  clock += dt * rate * TENTHS_PER_SECOND;
  clock = clamp(clock, 0, drawing.endClock);
  render();
  requestAnimationFrame(frame);
}

// Match the backing store to the element's CSS size (× device pixel ratio) so
// the drawing stays crisp; only touched when the size actually changes.
function ensureSize() {
  const dpr = window.devicePixelRatio || 1;
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
    canvas.width = w;
    canvas.height = h;
  }
}

// Find the page's canvas, which Lustre can add to the page after the first drawing
// arrives. Returns whether it is there.
function findCanvas() {
  const el = document.getElementById("animation-canvas");
  if (!el) {
    framesWithoutCanvas += 1;
    if (framesWithoutCanvas === MAX_FRAMES_WITHOUT_CANVAS) {
      console.error('The page has no <canvas id="animation-canvas"> element to draw on.');
    }
    return false;
  }
  if (el !== canvas) {
    canvas = el;
    ctx = canvas.getContext("2d");
  }
  return true;
}

function render() {
  if (!findCanvas()) return;
  ensureSize();
  const w = canvas.width;
  const h = canvas.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);
  // Draw functions work in a 0..1000 world centred on the origin: scale it to
  // fill the canvas and translate (0, 0) to the middle, so positive coordinates
  // run toward the bottom-right corner.
  ctx.setTransform(w / 1000, 0, 0, h / 1000, w / 2, h / 2);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const p of drawing.paths) {
    // Each path is revealed by a parameter u ∈ [0, 1] that advances at a steady
    // rate. A path is complete once u reaches 1.
    const u = penU(p);
    // `u` clamps to 0 both before a path starts and at the very instant it
    // does, so it can't tell "not yet" from "just begun". Gate on the start
    // time instead, so a just-begun path is shown at rest at u = 0
    // rather than staying hidden until the clock advances.
    if (clock >= p.start) {
      drawUpToU(p, u);
    }
  }
  if (actors) drawActors(actors);
}

function gleamItems(list) {
  const items = [];
  for (let cell = list; cell && Object.hasOwn(cell, "head"); cell = cell.tail) {
    items.push(cell.head);
  }
  return items;
}

function drawActors(scene) {
  for (const gem of gleamItems(scene.gems)) {
    ctx.beginPath();
    ctx.arc(gem.x, gem.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd27a";
    ctx.fill();
  }
  for (const enemy of gleamItems(scene.enemies)) {
    ctx.beginPath();
    if (enemy.kind === 0) {
      ctx.moveTo(enemy.x, enemy.y - 12);
      ctx.lineTo(enemy.x + 10, enemy.y);
      ctx.lineTo(enemy.x, enemy.y + 12);
      ctx.lineTo(enemy.x - 10, enemy.y);
    } else {
      ctx.moveTo(enemy.x, enemy.y - 13);
      ctx.lineTo(enemy.x + 11, enemy.y + 9);
      ctx.lineTo(enemy.x - 11, enemy.y + 9);
    }
    ctx.closePath();
    ctx.fillStyle = enemy.kind === 0 ? "#ff5d73" : "#ff9a3c";
    ctx.fill();
  }
  const player = scene.player;
  ctx.beginPath();
  ctx.arc(player.x, player.y, 9, 0, Math.PI * 2);
  ctx.fillStyle = scene.hurt ? "#ffb4c0" : "#f4f7ff";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#3ad6e0";
  ctx.stroke();
}

// How much of a path is revealed now: its parameter u ∈ [0, 1], advancing
// linearly from its start time to its end time — 0 before it starts, 1 once
// done. A path with no positive duration (end ≤ start) appears complete the
// moment it starts.
function penU(p) {
  const duration = p.end - p.start;
  if (duration <= 0) return clock >= p.start ? 1 : 0;
  const u = (clock - p.start) / duration;
  return u < 0 ? 0 : u > 1 ? 1 : u;
}

function clamp(x, lo, hi) {
  return x < lo ? lo : x > hi ? hi : x;
}

// Stroke the first `u` fraction of a path's polyline, interpolating the final
// partial segment so the curve reveals smoothly rather than a vertex at a time.
function drawUpToU(p, u) {
  const pts = p.pts;
  const count = pts.length / 2;
  if (count < 2) return;
  const segs = count - 1;
  const f = u * segs;
  const k = Math.min(segs, Math.floor(f));
  ctx.beginPath();
  ctx.moveTo(pts[0], pts[1]);
  for (let i = 1; i <= k; i++) ctx.lineTo(pts[2 * i], pts[2 * i + 1]);
  const frac = f - k;
  if (k < segs && frac > 0) {
    const ax = pts[2 * k];
    const ay = pts[2 * k + 1];
    const bx = pts[2 * k + 2];
    const by = pts[2 * k + 3];
    ctx.lineTo(ax + (bx - ax) * frac, ay + (by - ay) * frac);
  }
  ctx.lineWidth = p.thickness;
  ctx.strokeStyle = p.color;
  ctx.stroke();
}

