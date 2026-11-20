//# sourceMappingURL=game.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import {
  setActors as show,
  clearActors as hide,
  setFrameListener as listen,
  clearFrameListener as silence,
  watchKeys as watch_keys,
  clearKeys as clear_keys,
} from "./canvas.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  remainderInt,
  divideFloat,
} from "./gleam.mjs";
import * as $shape from "./shape.mjs";
import { Point } from "./shape.mjs";

export { clear_keys, hide, listen, show, silence, watch_keys };

export class Edge extends $CustomType {
  constructor(ax, ay, bx, by, length) {
    super();
    this.ax = ax;
    this.ay = ay;
    this.bx = bx;
    this.by = by;
    this.length = length;
  }
}
export const Edge$Edge = (ax, ay, bx, by, length) =>
  new Edge(ax, ay, bx, by, length);
export const Edge$isEdge = (value) => value instanceof Edge;
export const Edge$Edge$ax = (value) => value.ax;
export const Edge$Edge$0 = (value) => value.ax;
export const Edge$Edge$ay = (value) => value.ay;
export const Edge$Edge$1 = (value) => value.ay;
export const Edge$Edge$bx = (value) => value.bx;
export const Edge$Edge$2 = (value) => value.bx;
export const Edge$Edge$by = (value) => value.by;
export const Edge$Edge$3 = (value) => value.by;
export const Edge$Edge$length = (value) => value.length;
export const Edge$Edge$4 = (value) => value.length;

export class Rider extends $CustomType {
  constructor(edge, t, dir) {
    super();
    this.edge = edge;
    this.t = t;
    this.dir = dir;
  }
}
export const Rider$Rider = (edge, t, dir) => new Rider(edge, t, dir);
export const Rider$isRider = (value) => value instanceof Rider;
export const Rider$Rider$edge = (value) => value.edge;
export const Rider$Rider$0 = (value) => value.edge;
export const Rider$Rider$t = (value) => value.t;
export const Rider$Rider$1 = (value) => value.t;
export const Rider$Rider$dir = (value) => value.dir;
export const Rider$Rider$2 = (value) => value.dir;

export class Gem extends $CustomType {
  constructor(edge, t) {
    super();
    this.edge = edge;
    this.t = t;
  }
}
export const Gem$Gem = (edge, t) => new Gem(edge, t);
export const Gem$isGem = (value) => value instanceof Gem;
export const Gem$Gem$edge = (value) => value.edge;
export const Gem$Gem$0 = (value) => value.edge;
export const Gem$Gem$t = (value) => value.t;
export const Gem$Gem$1 = (value) => value.t;

export class Run extends $CustomType {
  constructor(edges, player, enemies, gems, score, lives, elapsed, hurt, meter, hops) {
    super();
    this.edges = edges;
    this.player = player;
    this.enemies = enemies;
    this.gems = gems;
    this.score = score;
    this.lives = lives;
    this.elapsed = elapsed;
    this.hurt = hurt;
    this.meter = meter;
    this.hops = hops;
  }
}
export const Run$Run = (edges, player, enemies, gems, score, lives, elapsed, hurt, meter, hops) =>
  new Run(edges, player, enemies, gems, score, lives, elapsed, hurt, meter, hops);
export const Run$isRun = (value) => value instanceof Run;
export const Run$Run$edges = (value) => value.edges;
export const Run$Run$0 = (value) => value.edges;
export const Run$Run$player = (value) => value.player;
export const Run$Run$1 = (value) => value.player;
export const Run$Run$enemies = (value) => value.enemies;
export const Run$Run$2 = (value) => value.enemies;
export const Run$Run$gems = (value) => value.gems;
export const Run$Run$3 = (value) => value.gems;
export const Run$Run$score = (value) => value.score;
export const Run$Run$4 = (value) => value.score;
export const Run$Run$lives = (value) => value.lives;
export const Run$Run$5 = (value) => value.lives;
export const Run$Run$elapsed = (value) => value.elapsed;
export const Run$Run$6 = (value) => value.elapsed;
export const Run$Run$hurt = (value) => value.hurt;
export const Run$Run$7 = (value) => value.hurt;
export const Run$Run$meter = (value) => value.meter;
export const Run$Run$8 = (value) => value.meter;
export const Run$Run$hops = (value) => value.hops;
export const Run$Run$9 = (value) => value.hops;

export class Idle extends $CustomType {}
export const Match$Idle$const = new Idle();
export const Match$Idle = () => Match$Idle$const;
export const Match$isIdle = (value) => value instanceof Idle;

export class Playing extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Match$Playing = ($0) => new Playing($0);
export const Match$isPlaying = (value) => value instanceof Playing;
export const Match$Playing$0 = (value) => value[0];

export class Over extends $CustomType {
  constructor(score) {
    super();
    this.score = score;
  }
}
export const Match$Over = (score) => new Over(score);
export const Match$isOver = (value) => value instanceof Over;
export const Match$Over$score = (value) => value.score;
export const Match$Over$0 = (value) => value.score;

export class Marker extends $CustomType {
  constructor(x, y, kind) {
    super();
    this.x = x;
    this.y = y;
    this.kind = kind;
  }
}
export const Marker$Marker = (x, y, kind) => new Marker(x, y, kind);
export const Marker$isMarker = (value) => value instanceof Marker;
export const Marker$Marker$x = (value) => value.x;
export const Marker$Marker$0 = (value) => value.x;
export const Marker$Marker$y = (value) => value.y;
export const Marker$Marker$1 = (value) => value.y;
export const Marker$Marker$kind = (value) => value.kind;
export const Marker$Marker$2 = (value) => value.kind;

export class Scene extends $CustomType {
  constructor(player, enemies, gems, hurt) {
    super();
    this.player = player;
    this.enemies = enemies;
    this.gems = gems;
    this.hurt = hurt;
  }
}
export const Scene$Scene = (player, enemies, gems, hurt) =>
  new Scene(player, enemies, gems, hurt);
export const Scene$isScene = (value) => value instanceof Scene;
export const Scene$Scene$player = (value) => value.player;
export const Scene$Scene$0 = (value) => value.player;
export const Scene$Scene$enemies = (value) => value.enemies;
export const Scene$Scene$1 = (value) => value.enemies;
export const Scene$Scene$gems = (value) => value.gems;
export const Scene$Scene$2 = (value) => value.gems;
export const Scene$Scene$hurt = (value) => value.hurt;
export const Scene$Scene$3 = (value) => value.hurt;

class Choice extends $CustomType {
  constructor(edge, dir, dx, dy) {
    super();
    this.edge = edge;
    this.dir = dir;
    this.dx = dx;
    this.dy = dy;
  }
}

const hit_reach = 18.0;

const gem_reach = 14.0;

const join_distance = 10.0;

const player_speed = 120.0;

function gems_on(loop$edges, loop$index, loop$acc) {
  while (true) {
    let edges = loop$edges;
    let index = loop$index;
    let acc = loop$acc;
    if (edges instanceof $Empty) {
      return $list.reverse(acc);
    } else {
      let edge = edges.head;
      let rest = edges.tail;
      let _block;
      let $ = ((index % 2) === 1) && (edge.length > 40.0);
      if ($) {
        _block = listPrepend(new Gem(index, 0.55), acc);
      } else {
        _block = acc;
      }
      let acc$1 = _block;
      loop$edges = rest;
      loop$index = index + 1;
      loop$acc = acc$1;
    }
  }
}

function slot(count, which) {
  let $ = count <= 1;
  if ($) {
    return 0;
  } else {
    return globalThis.Math.trunc((which * (count - 1)) / 2);
  }
}

export function fresh(edges) {
  let count = $list.length(edges);
  return new Run(
    edges,
    new Rider(0, 0.0, 1.0),
    listPrepend(
      new Rider(slot(count, 1), 0.15, -1.0),
      listPrepend(new Rider(slot(count, 2), 0.7, 1.0), $List$Empty$const),
    ),
    gems_on(edges, 0, $List$Empty$const),
    0,
    3,
    0.0,
    1.2,
    0.0,
    listPrepend(0, listPrepend(0, $List$Empty$const)),
  );
}

function hypot(x, y) {
  let $ = $float.square_root((x * x) + (y * y));
  if ($ instanceof Ok) {
    let length = $[0];
    return length;
  } else {
    return 0.0;
  }
}

function make_edge(a, b) {
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  return new Edge(a.x, a.y, b.x, b.y, hypot(dx, dy));
}

function edges_along(loop$points) {
  while (true) {
    let points = loop$points;
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
        let edge = make_edge(a, b);
        let $1 = edge.length > 4.0;
        if ($1) {
          return listPrepend(edge, edges_along(listPrepend(b, rest)));
        } else {
          loop$points = listPrepend(b, rest);
        }
      }
    }
  }
}

export function edges_of(polylines) {
  return $list.flat_map(polylines, edges_along);
}

export function begin(polylines) {
  let edges = edges_of(polylines);
  if (edges instanceof $Empty) {
    return Match$Idle$const;
  } else {
    return new Playing(fresh(edges));
  }
}

function edge_at(edges, index) {
  let $ = $list.drop(edges, index);
  if ($ instanceof $Empty) {
    return new Edge(0.0, 0.0, 1.0, 0.0, 1.0);
  } else {
    let edge = $.head;
    return edge;
  }
}

export function spot(edges, rider) {
  let edge = edge_at(edges, rider.edge);
  let _block;
  let $1 = rider.dir < 0.0;
  if ($1) {
    _block = [edge.bx, edge.by, edge.ax, edge.ay];
  } else {
    _block = [edge.ax, edge.ay, edge.bx, edge.by];
  }
  let $ = _block;
  let x0 = $[0];
  let y0 = $[1];
  let x1 = $[2];
  let y1 = $[3];
  return new Point(x0 + ((x1 - x0) * rider.t), y0 + ((y1 - y0) * rider.t));
}

function bumped(edges, player, enemies) {
  let here = spot(edges, player);
  return $list.any(
    enemies,
    (enemy) => {
      let point = spot(edges, enemy);
      return hypot(point.x - here.x, point.y - here.y) <= hit_reach;
    },
  );
}

function bank(loop$score, loop$meter) {
  while (true) {
    let score = loop$score;
    let meter = loop$meter;
    let $ = meter >= 1.0;
    if ($) {
      loop$score = score + 1;
      loop$meter = meter - 1.0;
    } else {
      return [score, meter];
    }
  }
}

function gems_left(gems) {
  return gems;
}

function take_gems(loop$edges, loop$gems, loop$player, loop$gained) {
  while (true) {
    let edges = loop$edges;
    let gems = loop$gems;
    let player = loop$player;
    let gained = loop$gained;
    let here = spot(edges, player);
    if (gems instanceof $Empty) {
      return [$List$Empty$const, gained];
    } else {
      let gem = gems.head;
      let rest = gems.tail;
      let point = spot(edges, new Rider(gem.edge, gem.t, 1.0));
      let $ = hypot(point.x - here.x, point.y - here.y) <= gem_reach;
      if ($) {
        loop$edges = edges;
        loop$gems = rest;
        loop$player = player;
        loop$gained = gained + 25;
      } else {
        let $1 = take_gems(edges, rest, player, gained);
        let kept = $1[0];
        let more = $1[1];
        return [listPrepend(gem, kept), more];
      }
    }
  }
}

function nth(options, index) {
  let $ = $list.drop(options, index);
  if ($ instanceof $Empty) {
    if (options instanceof $Empty) {
      return new Choice(0, 1.0, 1.0, 0.0);
    } else {
      let choice = options.head;
      return choice;
    }
  } else {
    let choice = $.head;
    return choice;
  }
}

function dot(choice, px, py) {
  return (choice.dx * px) + (choice.dy * py);
}

function best_from(loop$options, loop$px, loop$py, loop$champ, loop$champ_score) {
  while (true) {
    let options = loop$options;
    let px = loop$px;
    let py = loop$py;
    let champ = loop$champ;
    let champ_score = loop$champ_score;
    if (options instanceof $Empty) {
      return champ;
    } else {
      let choice = options.head;
      let rest = options.tail;
      let score = dot(choice, px, py);
      let $ = score > champ_score;
      if ($) {
        loop$options = rest;
        loop$px = px;
        loop$py = py;
        loop$champ = choice;
        loop$champ_score = score;
      } else {
        loop$options = rest;
        loop$px = px;
        loop$py = py;
        loop$champ = champ;
        loop$champ_score = champ_score;
      }
    }
  }
}

function best(options, px, py) {
  if (options instanceof $Empty) {
    return new Choice(0, 1.0, 1.0, 0.0);
  } else {
    let first = options.head;
    let rest = options.tail;
    return best_from(rest, px, py, first, dot(first, px, py));
  }
}

function unit(delta) {
  let dx = delta[0];
  let dy = delta[1];
  let length = hypot(dx, dy);
  let $ = length <= 0.001;
  if ($) {
    return [1.0, 0.0];
  } else {
    return [divideFloat(dx, length), divideFloat(dy, length)];
  }
}

function prefer(aim_x, aim_y, ix, iy) {
  let $ = ((aim_x * aim_x) + (aim_y * aim_y)) > 0.04;
  if ($) {
    return unit([aim_x, aim_y]);
  } else {
    return [ix, iy];
  }
}

function travel_delta(edge, dir) {
  let $ = dir < 0.0;
  if ($) {
    return [edge.ax - edge.bx, edge.ay - edge.by];
  } else {
    return [edge.bx - edge.ax, edge.by - edge.ay];
  }
}

function leave(edge, index, dir) {
  let $ = unit(travel_delta(edge, dir));
  let dx = $[0];
  let dy = $[1];
  return new Choice(index, dir, dx, dy);
}

function near(x, y, at) {
  return hypot(x - at.x, y - at.y) <= join_distance;
}

function junctions(loop$edges, loop$at, loop$index, loop$acc) {
  while (true) {
    let edges = loop$edges;
    let at = loop$at;
    let index = loop$index;
    let acc = loop$acc;
    if (edges instanceof $Empty) {
      return acc;
    } else {
      let edge = edges.head;
      let rest = edges.tail;
      let _block;
      let $ = near(edge.ax, edge.ay, at);
      if ($) {
        _block = listPrepend(leave(edge, index, 1.0), acc);
      } else {
        _block = acc;
      }
      let acc$1 = _block;
      let _block$1;
      let $1 = near(edge.bx, edge.by, at);
      if ($1) {
        _block$1 = listPrepend(leave(edge, index, -1.0), acc$1);
      } else {
        _block$1 = acc$1;
      }
      let acc$2 = _block$1;
      loop$edges = rest;
      loop$at = at;
      loop$index = index + 1;
      loop$acc = acc$2;
    }
  }
}

function drop_reverse(options, edge, dir) {
  let kept = $list.filter(
    options,
    (choice) => { return (choice.edge !== edge) || (choice.dir === dir); },
  );
  if (kept instanceof $Empty) {
    return options;
  } else {
    return kept;
  }
}

function arrival(edge, dir) {
  let $ = dir < 0.0;
  if ($) {
    return new Point(edge.ax, edge.ay);
  } else {
    return new Point(edge.bx, edge.by);
  }
}

function depart(edges, rider, aim_x, aim_y, salt, hops) {
  let edge = edge_at(edges, rider.edge);
  let at = arrival(edge, rider.dir);
  let $ = unit(travel_delta(edge, rider.dir));
  let ix = $[0];
  let iy = $[1];
  let options = drop_reverse(
    junctions(edges, at, 0, $List$Empty$const),
    rider.edge,
    rider.dir,
  );
  if (options instanceof $Empty) {
    return [new Rider(rider.edge, 0.0, 0.0 - rider.dir), 1];
  } else {
    let $1 = prefer(aim_x, aim_y, ix, iy);
    let px = $1[0];
    let py = $1[1];
    let _block;
    let $2 = salt < 0;
    if ($2) {
      _block = best(options, px, py);
    } else {
      _block = nth(options, remainderInt((hops + salt), $list.length(options)));
    }
    let choice = _block;
    return [new Rider(choice.edge, 0.0, choice.dir), 1];
  }
}

function travel(edges, rider, distance, aim_x, aim_y, salt, hops, guard) {
  let $ = (guard > 6) || (distance <= 0.05);
  if ($) {
    return [rider, 0];
  } else {
    let edge = edge_at(edges, rider.edge);
    let room = (1.0 - rider.t) * edge.length;
    let $1 = (distance < room) || (edge.length <= 0.001);
    if ($1) {
      return [
        new Rider(
          rider.edge,
          rider.t + (divideFloat(distance, $float.max(edge.length, 0.001))),
          rider.dir,
        ),
        0,
      ];
    } else {
      let $2 = depart(edges, rider, aim_x, aim_y, salt, hops);
      let next = $2[0];
      let turned = $2[1];
      let $3 = travel(
        edges,
        next,
        distance - room,
        aim_x,
        aim_y,
        salt,
        hops + turned,
        guard + 1,
      );
      let after = $3[0];
      let more = $3[1];
      return [after, turned + more];
    }
  }
}

function move_enemies(
  loop$edges,
  loop$enemies,
  loop$hops,
  loop$distance,
  loop$salt,
  loop$done,
  loop$hop_acc
) {
  while (true) {
    let edges = loop$edges;
    let enemies = loop$enemies;
    let hops = loop$hops;
    let distance = loop$distance;
    let salt = loop$salt;
    let done = loop$done;
    let hop_acc = loop$hop_acc;
    if (enemies instanceof $Empty) {
      return [$list.reverse(done), $list.reverse(hop_acc)];
    } else if (hops instanceof $Empty) {
      let rider = enemies.head;
      let rest = enemies.tail;
      loop$edges = edges;
      loop$enemies = rest;
      loop$hops = $List$Empty$const;
      loop$distance = distance;
      loop$salt = salt + 1;
      loop$done = listPrepend(rider, done);
      loop$hop_acc = hop_acc;
    } else {
      let rider = enemies.head;
      let rest = enemies.tail;
      let hop = hops.head;
      let more = hops.tail;
      let $ = travel(edges, rider, distance, 0.0, 0.0, salt, hop, 0);
      let next = $[0];
      let used = $[1];
      loop$edges = edges;
      loop$enemies = rest;
      loop$hops = more;
      loop$distance = distance;
      loop$salt = salt + 1;
      loop$done = listPrepend(next, done);
      loop$hop_acc = listPrepend(hop + used, hop_acc);
    }
  }
}

function move(edges, rider, distance, aim_x, aim_y, salt, hops) {
  return travel(edges, rider, distance, aim_x, aim_y, salt, hops, 0)[0];
}

export function step(run, dt, aim_x, aim_y) {
  let _block;
  let $ = dt > 0.05;
  if ($) {
    _block = 0.05;
  } else {
    _block = dt;
  }
  let dt$1 = _block;
  let player = move(
    run.edges,
    run.player,
    player_speed * dt$1,
    aim_x,
    aim_y,
    -1,
    0,
  );
  let enemy_speed = $float.min(150.0, 48.0 + (run.elapsed * 2.2));
  let $1 = move_enemies(
    run.edges,
    run.enemies,
    run.hops,
    enemy_speed * dt$1,
    1,
    $List$Empty$const,
    $List$Empty$const,
  );
  let enemies = $1[0];
  let hops = $1[1];
  let $2 = take_gems(run.edges, gems_left(run.gems), player, 0);
  let gems = $2[0];
  let gained = $2[1];
  let $3 = bank(run.score + gained, run.meter + dt$1);
  let score = $3[0];
  let meter = $3[1];
  let _block$1;
  let $4 = (run.hurt - dt$1) > 0.0;
  if ($4) {
    _block$1 = run.hurt - dt$1;
  } else {
    _block$1 = 0.0;
  }
  let hurt = _block$1;
  let hit = (hurt <= 0.0) && bumped(run.edges, player, enemies);
  let _block$2;
  if (hit) {
    _block$2 = run.lives - 1;
  } else {
    _block$2 = run.lives;
  }
  let lives = _block$2;
  let _block$3;
  if (hit) {
    _block$3 = 1.15;
  } else {
    _block$3 = hurt;
  }
  let hurt$1 = _block$3;
  let next = new Run(
    run.edges,
    player,
    enemies,
    gems,
    score,
    lives,
    run.elapsed + dt$1,
    hurt$1,
    meter,
    hops,
  );
  let $5 = lives <= 0;
  if ($5) {
    return new Over(score);
  } else {
    return new Playing(next);
  }
}

function marker(edges, rider, kind) {
  let point = spot(edges, rider);
  return new Marker(point.x, point.y, kind);
}

export function scene(run) {
  return new Scene(
    marker(run.edges, run.player, 0),
    $list.index_map(
      run.enemies,
      (rider, index) => { return marker(run.edges, rider, index); },
    ),
    $list.map(
      run.gems,
      (gem) => {
        let point = spot(run.edges, new Rider(gem.edge, gem.t, 1.0));
        return new Marker(point.x, point.y, 3);
      },
    ),
    run.hurt > 0.0,
  );
}
