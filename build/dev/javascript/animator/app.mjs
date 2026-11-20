//# sourceMappingURL=app.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attr from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import * as $builtins from "./builtins.mjs";
import * as $data from "./data.mjs";
import * as $drawing from "./drawing.mjs";
import * as $editor from "./editor.mjs";
import * as $errors from "./errors.mjs";
import * as $game from "./game.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  remainderInt,
} from "./gleam.mjs";
import * as $parser from "./parser.mjs";
import * as $render from "./render.mjs";
import * as $shape from "./shape.mjs";

const FILEPATH = "src/app.gleam";

export class Model extends $CustomType {
  constructor(source, code_open, error, shape_slider, speed, paused, drawings, selected, run, game_paused, aim_x, aim_y) {
    super();
    this.source = source;
    this.code_open = code_open;
    this.error = error;
    this.shape_slider = shape_slider;
    this.speed = speed;
    this.paused = paused;
    this.drawings = drawings;
    this.selected = selected;
    this.run = run;
    this.game_paused = game_paused;
    this.aim_x = aim_x;
    this.aim_y = aim_y;
  }
}
export const Model$Model = (source, code_open, error, shape_slider, speed, paused, drawings, selected, run, game_paused, aim_x, aim_y) =>
  new Model(source,
  code_open,
  error,
  shape_slider,
  speed,
  paused,
  drawings,
  selected,
  run,
  game_paused,
  aim_x,
  aim_y);
export const Model$isModel = (value) => value instanceof Model;
export const Model$Model$source = (value) => value.source;
export const Model$Model$0 = (value) => value.source;
export const Model$Model$code_open = (value) => value.code_open;
export const Model$Model$1 = (value) => value.code_open;
export const Model$Model$error = (value) => value.error;
export const Model$Model$2 = (value) => value.error;
export const Model$Model$shape_slider = (value) => value.shape_slider;
export const Model$Model$3 = (value) => value.shape_slider;
export const Model$Model$speed = (value) => value.speed;
export const Model$Model$4 = (value) => value.speed;
export const Model$Model$paused = (value) => value.paused;
export const Model$Model$5 = (value) => value.paused;
export const Model$Model$drawings = (value) => value.drawings;
export const Model$Model$6 = (value) => value.drawings;
export const Model$Model$selected = (value) => value.selected;
export const Model$Model$7 = (value) => value.selected;
export const Model$Model$run = (value) => value.run;
export const Model$Model$8 = (value) => value.run;
export const Model$Model$game_paused = (value) => value.game_paused;
export const Model$Model$9 = (value) => value.game_paused;
export const Model$Model$aim_x = (value) => value.aim_x;
export const Model$Model$10 = (value) => value.aim_x;
export const Model$Model$aim_y = (value) => value.aim_y;
export const Model$Model$11 = (value) => value.aim_y;

export class SetCode extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetCode = ($0) => new SetCode($0);
export const Msg$isSetCode = (value) => value instanceof SetCode;
export const Msg$SetCode$0 = (value) => value[0];

export class SetShape extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetShape = ($0) => new SetShape($0);
export const Msg$isSetShape = (value) => value instanceof SetShape;
export const Msg$SetShape$0 = (value) => value[0];

export class SetSpeed extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetSpeed = ($0) => new SetSpeed($0);
export const Msg$isSetSpeed = (value) => value instanceof SetSpeed;
export const Msg$SetSpeed$0 = (value) => value[0];

export class SelectDrawing extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SelectDrawing = ($0) => new SelectDrawing($0);
export const Msg$isSelectDrawing = (value) => value instanceof SelectDrawing;
export const Msg$SelectDrawing$0 = (value) => value[0];

export class NewDrawing extends $CustomType {}
export const Msg$NewDrawing$const = new NewDrawing();
export const Msg$NewDrawing = () => Msg$NewDrawing$const;
export const Msg$isNewDrawing = (value) => value instanceof NewDrawing;

export class TogglePlay extends $CustomType {}
export const Msg$TogglePlay$const = new TogglePlay();
export const Msg$TogglePlay = () => Msg$TogglePlay$const;
export const Msg$isTogglePlay = (value) => value instanceof TogglePlay;

export class Restart extends $CustomType {}
export const Msg$Restart$const = new Restart();
export const Msg$Restart = () => Msg$Restart$const;
export const Msg$isRestart = (value) => value instanceof Restart;

export class StartGame extends $CustomType {}
export const Msg$StartGame$const = new StartGame();
export const Msg$StartGame = () => Msg$StartGame$const;
export const Msg$isStartGame = (value) => value instanceof StartGame;

export class ExitGame extends $CustomType {}
export const Msg$ExitGame$const = new ExitGame();
export const Msg$ExitGame = () => Msg$ExitGame$const;
export const Msg$isExitGame = (value) => value instanceof ExitGame;

export class RestartRun extends $CustomType {}
export const Msg$RestartRun$const = new RestartRun();
export const Msg$RestartRun = () => Msg$RestartRun$const;
export const Msg$isRestartRun = (value) => value instanceof RestartRun;

export class ToggleRunPause extends $CustomType {}
export const Msg$ToggleRunPause$const = new ToggleRunPause();
export const Msg$ToggleRunPause = () => Msg$ToggleRunPause$const;
export const Msg$isToggleRunPause = (value) => value instanceof ToggleRunPause;

export class GameTick extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$GameTick = ($0) => new GameTick($0);
export const Msg$isGameTick = (value) => value instanceof GameTick;
export const Msg$GameTick$0 = (value) => value[0];

export class Aim extends $CustomType {
  constructor($0, $1) {
    super();
    this[0] = $0;
    this[1] = $1;
  }
}
export const Msg$Aim = ($0, $1) => new Aim($0, $1);
export const Msg$isAim = (value) => value instanceof Aim;
export const Msg$Aim$0 = (value) => value[0];
export const Msg$Aim$1 = (value) => value[1];

export class InsertColor extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$InsertColor = ($0) => new InsertColor($0);
export const Msg$isInsertColor = (value) => value instanceof InsertColor;
export const Msg$InsertColor$0 = (value) => value[0];

export class InsertLine extends $CustomType {}
export const Msg$InsertLine$const = new InsertLine();
export const Msg$InsertLine = () => Msg$InsertLine$const;
export const Msg$isInsertLine = (value) => value instanceof InsertLine;

export class ToggleCode extends $CustomType {}
export const Msg$ToggleCode$const = new ToggleCode();
export const Msg$ToggleCode = () => Msg$ToggleCode$const;
export const Msg$isToggleCode = (value) => value instanceof ToggleCode;

const path_colors = /* @__PURE__ */ listPrepend(
  "#f2e2b6",
  listPrepend(
    "#8fd3ff",
    listPrepend(
      "#d7b3ff",
      listPrepend(
        "#b6e3a8",
        listPrepend(
          "#ffb086",
          listPrepend(
            "#ffd27a",
            listPrepend("#9bb6ff", listPrepend("#ff9aa8", $List$Empty$const)),
          ),
        ),
      ),
    ),
  ),
);

/**
 * A blank drawing that still defines `draw`, so a new name opens as valid code.
 * 
 * @ignore
 */
const new_drawing_source = "fn draw(shape_slider: Int) -> List(Path) {\n  [\n    Path(Line(Point(0 - shape_slider, 0), Point(shape_slider, 0)), 0, 20, 4),\n  ]\n}\n";

/**
 * Your app's public address, once you've deployed it in Problem 13, such as
 * "https://your-username.github.io/animator/".
 */
export const public_url = "https://jgmd140409.github.io/animator/";

/**
 * Set to True if you would like your app's URL included in the course gallery.
 */
export const include_app_in_gallery = false;

/**
 * A link to your video from Problem 14, which anyone with the link can watch.
 */
export const video_url = "";

/**
 * Set to True if you would like your video included in the course gallery.
 */
export const include_video_in_gallery = false;

function source_of(drawings, name) {
  let $ = $data.find_drawing(drawings, name);
  if ($ instanceof Ok) {
    let drawing = $[0];
    return drawing.source;
  } else {
    return "";
  }
}

export function init(_) {
  let library = $data.load_library();
  let source = source_of(library.drawings, library.selected);
  let model = new Model(
    source,
    true,
    "",
    40,
    1.0,
    false,
    library.drawings,
    library.selected,
    $game.Match$Idle$const,
    false,
    0.0,
    0.0,
  );
  return [
    model,
    $effect.batch(
      listPrepend(
        $editor.mount(source, (var0) => { return new SetCode(var0); }),
        listPrepend(
          $effect.from((dispatch) => { return dispatch(new SetCode(source)); }),
          $List$Empty$const,
        ),
      ),
    ),
  ];
}

function run_source(shape_slider, source) {
  let $ = $parser.parse_program(source, $builtins.global_frame());
  if ($ instanceof Ok) {
    let program = $[0];
    let _pipe = $drawing.try_draw(shape_slider, program);
    return $result.map_error(_pipe, $errors.error_message);
  } else {
    return $;
  }
}

function clear_drawing() {
  return $effect.from((_) => { return $render.set_drawing($List$Empty$const); });
}

function playback_rate(model) {
  let $ = model.paused;
  if ($) {
    return 0.0;
  } else {
    return model.speed;
  }
}

function color_at(index) {
  let count = $list.length(path_colors);
  let $ = $list.drop(path_colors, remainderInt(index, count));
  if ($ instanceof $Empty) {
    return "#f2e2b6";
  } else {
    let color = $.head;
    return color;
  }
}

function show_paths(paths, reset, rate) {
  return $effect.from(
    (_) => {
      let rendered = $list.flatten(
        $list.index_map(
          paths,
          (path, index) => {
            return $render.render_strokes(path, color_at(index));
          },
        ),
      );
      if (reset) {
        $render.reset_clock();
      } else {
        undefined;
      }
      $render.set_drawing(rendered);
      return $render.set_speed(rate);
    },
  );
}

function evaluate(model, reset) {
  let $ = run_source(model.shape_slider, model.source);
  if ($ instanceof Ok) {
    let paths = $[0];
    return [
      new Model(
        model.source,
        model.code_open,
        "",
        model.shape_slider,
        model.speed,
        model.paused,
        model.drawings,
        model.selected,
        model.run,
        model.game_paused,
        model.aim_x,
        model.aim_y,
      ),
      show_paths(paths, reset, playback_rate(model)),
    ];
  } else {
    let message = $[0];
    return [
      new Model(
        model.source,
        model.code_open,
        message,
        model.shape_slider,
        model.speed,
        model.paused,
        model.drawings,
        model.selected,
        model.run,
        model.game_paused,
        model.aim_x,
        model.aim_y,
      ),
      clear_drawing(),
    ];
  }
}

function persist(model) {
  return $effect.from(
    (_) => { return $data.save_library(model.selected, model.drawings); },
  );
}

function stop_run() {
  return $effect.from(
    (_) => {
      $game.hide();
      $game.silence();
      return $game.clear_keys();
    },
  );
}

function strokes_of(paths) {
  return $list.flatten(
    $list.index_map(
      paths,
      (path, index) => { return $render.render_strokes(path, color_at(index)); },
    ),
  );
}

function start_run(model) {
  let $ = run_source(model.shape_slider, model.source);
  if ($ instanceof Ok) {
    let paths = $[0];
    let $1 = $game.begin($list.map(paths, $render.network_points));
    if ($1 instanceof $game.Playing) {
      let run = $1[0];
      return [
        new Model(
          model.source,
          model.code_open,
          "",
          model.shape_slider,
          model.speed,
          model.paused,
          model.drawings,
          model.selected,
          new $game.Playing(run),
          false,
          0.0,
          0.0,
        ),
        $effect.batch(
          listPrepend(
            $effect.from(
              (_) => {
                $render.set_drawing($render.finish_now(strokes_of(paths)));
                return $game.show($game.scene(run));
              },
            ),
            listPrepend(
              $effect.from(
                (dispatch) => {
                  return $game.listen(
                    (dt) => { return dispatch(new GameTick(dt)); },
                  );
                },
              ),
              listPrepend(
                $effect.from(
                  (dispatch) => {
                    return $game.watch_keys(
                      (x, y) => { return dispatch(new Aim(x, y)); },
                    );
                  },
                ),
                $List$Empty$const,
              ),
            ),
          ),
        ),
      ];
    } else {
      return [
        new Model(
          model.source,
          model.code_open,
          "This drawing has no path long enough to run on.",
          model.shape_slider,
          model.speed,
          model.paused,
          model.drawings,
          model.selected,
          $game.Match$Idle$const,
          false,
          model.aim_x,
          model.aim_y,
        ),
        stop_run(),
      ];
    }
  } else {
    let message = $[0];
    return [
      new Model(
        model.source,
        model.code_open,
        message,
        model.shape_slider,
        model.speed,
        model.paused,
        model.drawings,
        model.selected,
        $game.Match$Idle$const,
        false,
        model.aim_x,
        model.aim_y,
      ),
      stop_run(),
    ];
  }
}

function clamp_speed(value) {
  let $ = value < -3.0;
  if ($) {
    return -3.0;
  } else {
    let $1 = value > 3.0;
    if ($1) {
      return 3.0;
    } else {
      return value;
    }
  }
}

function parse_speed(raw) {
  let $ = $float.parse(raw);
  if ($ instanceof Ok) {
    return $;
  } else {
    let $1 = $int.parse(raw);
    if ($1 instanceof Ok) {
      let value = $1[0];
      return new Ok($int.to_float(value));
    } else {
      return $1;
    }
  }
}

function clamp_int(value, low, high) {
  let $ = value < low;
  if ($) {
    return low;
  } else {
    let $1 = value > high;
    if ($1) {
      return high;
    } else {
      return value;
    }
  }
}

export function update(model, msg) {
  if (msg instanceof SetCode) {
    let text = msg[0];
    let drawings = $data.replace_source(model.drawings, model.selected, text);
    let next = new Model(
      text,
      model.code_open,
      model.error,
      model.shape_slider,
      model.speed,
      model.paused,
      drawings,
      model.selected,
      model.run,
      model.game_paused,
      model.aim_x,
      model.aim_y,
    );
    let $ = next.run;
    if ($ instanceof $game.Idle) {
      let $1 = evaluate(next, true);
      let next$1 = $1[0];
      let drawn = $1[1];
      return [
        next$1,
        $effect.batch(
          listPrepend(persist(next$1), listPrepend(drawn, $List$Empty$const)),
        ),
      ];
    } else {
      let _block;
      let $1 = run_source(next.shape_slider, text);
      if ($1 instanceof Ok) {
        _block = "";
      } else {
        let message = $1[0];
        _block = message;
      }
      let error = _block;
      return [
        new Model(
          next.source,
          next.code_open,
          error,
          next.shape_slider,
          next.speed,
          next.paused,
          next.drawings,
          next.selected,
          next.run,
          next.game_paused,
          next.aim_x,
          next.aim_y,
        ),
        persist(next),
      ];
    }
  } else if (msg instanceof SetShape) {
    let raw = msg[0];
    let $ = $int.parse(raw);
    if ($ instanceof Ok) {
      let value = $[0];
      let next = new Model(
        model.source,
        model.code_open,
        model.error,
        clamp_int(value, 0, 100),
        model.speed,
        model.paused,
        model.drawings,
        model.selected,
        model.run,
        model.game_paused,
        model.aim_x,
        model.aim_y,
      );
      let $1 = next.run;
      if ($1 instanceof $game.Idle) {
        return evaluate(next, false);
      } else {
        return [next, $effect.none()];
      }
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof SetSpeed) {
    let raw = msg[0];
    let $ = parse_speed(raw);
    if ($ instanceof Ok) {
      let value = $[0];
      let speed = clamp_speed(value);
      let next = new Model(
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        speed,
        model.paused,
        model.drawings,
        model.selected,
        model.run,
        model.game_paused,
        model.aim_x,
        model.aim_y,
      );
      let $1 = next.paused;
      if ($1) {
        return [next, $effect.none()];
      } else {
        return [next, $effect.from((_) => { return $render.set_speed(speed); })];
      }
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof SelectDrawing) {
    let name = msg[0];
    let $ = name === model.selected;
    if ($) {
      return [model, $effect.none()];
    } else {
      let $1 = $data.find_drawing(model.drawings, name);
      if ($1 instanceof Ok) {
        let drawing = $1[0];
        let next = new Model(
          drawing.source,
          model.code_open,
          model.error,
          model.shape_slider,
          model.speed,
          model.paused,
          model.drawings,
          drawing.name,
          $game.Match$Idle$const,
          false,
          model.aim_x,
          model.aim_y,
        );
        let $2 = evaluate(next, true);
        let next$1 = $2[0];
        let drawn = $2[1];
        return [
          next$1,
          $effect.batch(
            listPrepend(
              stop_run(),
              listPrepend(
                $editor.mount(
                  drawing.source,
                  (var0) => { return new SetCode(var0); },
                ),
                listPrepend(
                  persist(next$1),
                  listPrepend(drawn, $List$Empty$const),
                ),
              ),
            ),
          ),
        ];
      } else {
        return [model, $effect.none()];
      }
    }
  } else if (msg instanceof NewDrawing) {
    let name = $string.trim($data.prompt_drawing_name());
    let $ = name === "";
    if ($) {
      return [model, $effect.none()];
    } else {
      let $1 = $data.find_drawing(model.drawings, name);
      if ($1 instanceof Ok) {
        return [
          new Model(
            model.source,
            model.code_open,
            ("A drawing named \"" + name) + "\" already exists.",
            model.shape_slider,
            model.speed,
            model.paused,
            model.drawings,
            model.selected,
            model.run,
            model.game_paused,
            model.aim_x,
            model.aim_y,
          ),
          $effect.none(),
        ];
      } else {
        let drawings = $list.append(
          model.drawings,
          listPrepend(
            new $data.Drawing(name, new_drawing_source),
            $List$Empty$const,
          ),
        );
        let next = new Model(
          new_drawing_source,
          model.code_open,
          model.error,
          model.shape_slider,
          model.speed,
          model.paused,
          drawings,
          name,
          $game.Match$Idle$const,
          false,
          model.aim_x,
          model.aim_y,
        );
        let $2 = evaluate(next, true);
        let next$1 = $2[0];
        let drawn = $2[1];
        return [
          next$1,
          $effect.batch(
            listPrepend(
              stop_run(),
              listPrepend(
                $editor.mount(
                  new_drawing_source,
                  (var0) => { return new SetCode(var0); },
                ),
                listPrepend(
                  persist(next$1),
                  listPrepend(drawn, $List$Empty$const),
                ),
              ),
            ),
          ),
        ];
      }
    }
  } else if (msg instanceof TogglePlay) {
    let $ = model.paused;
    if ($) {
      let _block;
      let $1 = model.speed === 0.0;
      if ($1) {
        _block = 1.0;
      } else {
        _block = model.speed;
      }
      let speed = _block;
      return [
        new Model(
          model.source,
          model.code_open,
          model.error,
          model.shape_slider,
          speed,
          false,
          model.drawings,
          model.selected,
          model.run,
          model.game_paused,
          model.aim_x,
          model.aim_y,
        ),
        $effect.from((_) => { return $render.set_speed(speed); }),
      ];
    } else {
      return [
        new Model(
          model.source,
          model.code_open,
          model.error,
          model.shape_slider,
          model.speed,
          true,
          model.drawings,
          model.selected,
          model.run,
          model.game_paused,
          model.aim_x,
          model.aim_y,
        ),
        $effect.from((_) => { return $render.set_speed(0.0); }),
      ];
    }
  } else if (msg instanceof Restart) {
    let _block;
    let $ = model.speed === 0.0;
    if ($) {
      _block = 1.0;
    } else {
      _block = model.speed;
    }
    let speed = _block;
    return [
      new Model(
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        speed,
        false,
        model.drawings,
        model.selected,
        model.run,
        model.game_paused,
        model.aim_x,
        model.aim_y,
      ),
      $effect.from(
        (_) => {
          $render.reset_clock();
          return $render.set_speed(speed);
        },
      ),
    ];
  } else if (msg instanceof StartGame) {
    return start_run(model);
  } else if (msg instanceof ExitGame) {
    let stopped = new Model(
      model.source,
      model.code_open,
      model.error,
      model.shape_slider,
      model.speed,
      model.paused,
      model.drawings,
      model.selected,
      $game.Match$Idle$const,
      false,
      model.aim_x,
      model.aim_y,
    );
    let $ = evaluate(stopped, true);
    let next = $[0];
    let drawn = $[1];
    return [
      next,
      $effect.batch(
        listPrepend(stop_run(), listPrepend(drawn, $List$Empty$const)),
      ),
    ];
  } else if (msg instanceof RestartRun) {
    return start_run(
      new Model(
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed,
        model.paused,
        model.drawings,
        model.selected,
        $game.Match$Idle$const,
        false,
        model.aim_x,
        model.aim_y,
      ),
    );
  } else if (msg instanceof ToggleRunPause) {
    return [
      new Model(
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed,
        model.paused,
        model.drawings,
        model.selected,
        model.run,
        !model.game_paused,
        model.aim_x,
        model.aim_y,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof GameTick) {
    let dt = msg[0];
    let $ = model.run;
    let $1 = model.game_paused;
    if (!$1 && $ instanceof $game.Playing) {
      let run = $[0];
      let $2 = $game.step(run, dt, model.aim_x, model.aim_y);
      if ($2 instanceof $game.Idle) {
        return [model, $effect.none()];
      } else if ($2 instanceof $game.Playing) {
        let next = $2[0];
        return [
          new Model(
            model.source,
            model.code_open,
            model.error,
            model.shape_slider,
            model.speed,
            model.paused,
            model.drawings,
            model.selected,
            new $game.Playing(next),
            model.game_paused,
            model.aim_x,
            model.aim_y,
          ),
          $effect.from((_) => { return $game.show($game.scene(next)); }),
        ];
      } else {
        let score = $2.score;
        return [
          new Model(
            model.source,
            model.code_open,
            model.error,
            model.shape_slider,
            model.speed,
            model.paused,
            model.drawings,
            model.selected,
            new $game.Over(score),
            model.game_paused,
            model.aim_x,
            model.aim_y,
          ),
          $effect.batch(
            listPrepend(
              $effect.from((_) => { return $game.silence(); }),
              listPrepend(
                $effect.from((_) => { return $game.clear_keys(); }),
                $List$Empty$const,
              ),
            ),
          ),
        ];
      }
    } else {
      return [model, $effect.none()];
    }
  } else if (msg instanceof Aim) {
    let x = msg[0];
    let y = msg[1];
    return [
      new Model(
        model.source,
        model.code_open,
        model.error,
        model.shape_slider,
        model.speed,
        model.paused,
        model.drawings,
        model.selected,
        model.run,
        model.game_paused,
        x,
        y,
      ),
      $effect.none(),
    ];
  } else if (msg instanceof InsertColor) {
    let name = msg[0];
    return [model, $editor.insert(name + "()")];
  } else if (msg instanceof InsertLine) {
    return [
      model,
      $editor.insert(
        "\nPath(ColorLine(Point(0, 0), Point(120, 0), red()), 0, 10, 4)\n",
      ),
    ];
  } else {
    return [
      new Model(
        model.source,
        !model.code_open,
        model.error,
        model.shape_slider,
        model.speed,
        model.paused,
        model.drawings,
        model.selected,
        model.run,
        model.game_paused,
        model.aim_x,
        model.aim_y,
      ),
      $effect.none(),
    ];
  }
}

function format_speed(speed) {
  let tenths = $float.round(speed * 10.0);
  let negative = tenths < 0;
  let mag = $int.absolute_value(tenths);
  let digits = ($int.to_string(globalThis.Math.trunc(mag / 10)) + ".") + $int.to_string(
    mag % 10,
  );
  if (negative) {
    return ("-" + digits) + "×";
  } else {
    return digits + "×";
  }
}

function swatch(name, color) {
  return $html.button(
    listPrepend(
      $attr.class$("swatch"),
      listPrepend(
        $attr.type_("button"),
        listPrepend(
          $attr.attribute("title", ("Insert " + name) + "()"),
          listPrepend(
            $attr.style("background", color),
            listPrepend(
              $event.on_click(new InsertColor(name)),
              $List$Empty$const,
            ),
          ),
        ),
      ),
    ),
    $List$Empty$const,
  );
}

function view_palette() {
  return $html.div(
    listPrepend($attr.class$("palette"), $List$Empty$const),
    listPrepend(
      $html.span(
        listPrepend($attr.class$("control-label"), $List$Empty$const),
        listPrepend($html.text("Colors"), $List$Empty$const),
      ),
      listPrepend(
        swatch("red", "#e64048"),
        listPrepend(
          swatch("blue", "#487ee6"),
          listPrepend(
            swatch("green", "#40ba68"),
            listPrepend(
              swatch("yellow", "#f0ce48"),
              listPrepend(
                swatch("purple", "#a860e0"),
                listPrepend(
                  swatch("orange", "#f08c38"),
                  listPrepend(
                    swatch("white", "#f4f4f8"),
                    listPrepend(
                      swatch("black", "#181820"),
                      listPrepend(
                        $html.button(
                          listPrepend(
                            $attr.class$("icon-btn"),
                            listPrepend(
                              $attr.type_("button"),
                              listPrepend(
                                $attr.attribute(
                                  "title",
                                  "Insert a red ColorLine",
                                ),
                                listPrepend(
                                  $event.on_click(Msg$InsertLine$const),
                                  $List$Empty$const,
                                ),
                              ),
                            ),
                          ),
                          listPrepend(
                            $html.text("Color line"),
                            $List$Empty$const,
                          ),
                        ),
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
  );
}

function format_speed_value(speed) {
  let tenths = $float.round(speed * 10.0);
  let negative = tenths < 0;
  let mag = $int.absolute_value(tenths);
  let digits = ($int.to_string(globalThis.Math.trunc(mag / 10)) + ".") + $int.to_string(
    mag % 10,
  );
  if (negative) {
    return "-" + digits;
  } else {
    return digits;
  }
}

function view_controls(model) {
  let _block;
  let $ = model.paused;
  if ($) {
    _block = "Play";
  } else {
    _block = "Pause";
  }
  let play_label = _block;
  let _block$1;
  let $1 = model.paused;
  if ($1) {
    _block$1 = format_speed(model.speed) + " paused";
  } else {
    _block$1 = format_speed(model.speed);
  }
  let speed_label = _block$1;
  return $html.div(
    listPrepend($attr.class$("control-panel"), $List$Empty$const),
    listPrepend(
      $html.label(
        listPrepend($attr.class$("control"), $List$Empty$const),
        listPrepend(
          $html.span(
            listPrepend($attr.class$("control-label"), $List$Empty$const),
            listPrepend($html.text("Shape"), $List$Empty$const),
          ),
          listPrepend(
            $html.input(
              listPrepend(
                $attr.type_("range"),
                listPrepend(
                  $attr.min("0"),
                  listPrepend(
                    $attr.max("100"),
                    listPrepend(
                      $attr.step("1"),
                      listPrepend(
                        $attr.value($int.to_string(model.shape_slider)),
                        listPrepend(
                          $attr.attribute("data-test-id", "shape-slider"),
                          listPrepend(
                            $event.on_input(
                              (var0) => { return new SetShape(var0); },
                            ),
                            $List$Empty$const,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            listPrepend(
              $html.span(
                listPrepend($attr.class$("control-value"), $List$Empty$const),
                listPrepend(
                  $html.text($int.to_string(model.shape_slider)),
                  $List$Empty$const,
                ),
              ),
              $List$Empty$const,
            ),
          ),
        ),
      ),
      listPrepend(
        $html.label(
          listPrepend($attr.class$("control"), $List$Empty$const),
          listPrepend(
            $html.span(
              listPrepend($attr.class$("control-label"), $List$Empty$const),
              listPrepend($html.text("Speed"), $List$Empty$const),
            ),
            listPrepend(
              $html.input(
                listPrepend(
                  $attr.type_("range"),
                  listPrepend(
                    $attr.min("-3"),
                    listPrepend(
                      $attr.max("3"),
                      listPrepend(
                        $attr.step("0.1"),
                        listPrepend(
                          $attr.value(format_speed_value(model.speed)),
                          listPrepend(
                            $attr.attribute("data-test-id", "speed-slider"),
                            listPrepend(
                              $event.on_input(
                                (var0) => { return new SetSpeed(var0); },
                              ),
                              $List$Empty$const,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              listPrepend(
                $html.span(
                  listPrepend($attr.class$("control-value"), $List$Empty$const),
                  listPrepend($html.text(speed_label), $List$Empty$const),
                ),
                $List$Empty$const,
              ),
            ),
          ),
        ),
        listPrepend(
          $html.button(
            listPrepend(
              $attr.class$("icon-btn"),
              listPrepend(
                $attr.type_("button"),
                listPrepend(
                  $event.on_click(
                    (() => {
                      let $2 = model.run;
                      if ($2 instanceof $game.Idle) {
                        return Msg$StartGame$const;
                      } else {
                        return Msg$ExitGame$const;
                      }
                    })(),
                  ),
                  $List$Empty$const,
                ),
              ),
            ),
            listPrepend(
              $html.text(
                (() => {
                  let $2 = model.run;
                  if ($2 instanceof $game.Idle) {
                    return "Play Game";
                  } else {
                    return "Exit Game";
                  }
                })(),
              ),
              $List$Empty$const,
            ),
          ),
          listPrepend(
            $html.div(
              listPrepend($attr.class$("transport"), $List$Empty$const),
              listPrepend(
                $html.button(
                  listPrepend(
                    $attr.class$("icon-btn"),
                    listPrepend(
                      $attr.type_("button"),
                      listPrepend(
                        $event.on_click(Msg$TogglePlay$const),
                        $List$Empty$const,
                      ),
                    ),
                  ),
                  listPrepend($html.text(play_label), $List$Empty$const),
                ),
                listPrepend(
                  $html.button(
                    listPrepend(
                      $attr.class$("icon-btn"),
                      listPrepend(
                        $attr.type_("button"),
                        listPrepend(
                          $attr.attribute("title", "Play again from the start"),
                          listPrepend(
                            $event.on_click(Msg$Restart$const),
                            $List$Empty$const,
                          ),
                        ),
                      ),
                    ),
                    listPrepend($html.text("Restart"), $List$Empty$const),
                  ),
                  $List$Empty$const,
                ),
              ),
            ),
            listPrepend(view_palette(), $List$Empty$const),
          ),
        ),
      ),
    ),
  );
}

function view_error(model) {
  let $ = model.error;
  if ($ === "") {
    return $element.none();
  } else {
    let message = $;
    return $html.div(
      listPrepend($attr.class$("error-banner"), $List$Empty$const),
      listPrepend($html.text(message), $List$Empty$const),
    );
  }
}

function game_hud(primary, secondary, pause_label, mode) {
  let _block;
  if (mode === "over") {
    _block = $element.none();
  } else {
    _block = $html.button(
      listPrepend(
        $attr.class$("icon-btn"),
        listPrepend(
          $attr.type_("button"),
          listPrepend(
            $event.on_click(Msg$ToggleRunPause$const),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend($html.text(pause_label), $List$Empty$const),
    );
  }
  let pause = _block;
  return $html.div(
    listPrepend($attr.class$("game-hud"), $List$Empty$const),
    listPrepend(
      $html.div(
        listPrepend($attr.class$("game-stat"), $List$Empty$const),
        listPrepend($html.text(primary), $List$Empty$const),
      ),
      listPrepend(
        $html.div(
          listPrepend($attr.class$("game-stat"), $List$Empty$const),
          listPrepend($html.text(secondary), $List$Empty$const),
        ),
        listPrepend(
          $html.div(
            listPrepend($attr.class$("transport"), $List$Empty$const),
            listPrepend(
              pause,
              listPrepend(
                $html.button(
                  listPrepend(
                    $attr.class$("icon-btn"),
                    listPrepend(
                      $attr.type_("button"),
                      listPrepend(
                        $event.on_click(Msg$RestartRun$const),
                        $List$Empty$const,
                      ),
                    ),
                  ),
                  listPrepend($html.text("Restart run"), $List$Empty$const),
                ),
                $List$Empty$const,
              ),
            ),
          ),
          listPrepend(
            $html.p(
              listPrepend($attr.class$("game-help"), $List$Empty$const),
              listPrepend(
                $html.text(
                  "Arrows or WASD ride the paths. Collect gold dots. Avoid the red and orange runners.",
                ),
                $List$Empty$const,
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
    ),
  );
}

function view_game(model) {
  let $ = model.run;
  if ($ instanceof $game.Idle) {
    return $element.none();
  } else if ($ instanceof $game.Playing) {
    let run = $[0];
    return game_hud(
      "Score " + $int.to_string(run.score),
      "Lives " + $int.to_string(run.lives),
      (() => {
        let $1 = model.game_paused;
        if ($1) {
          return "Resume";
        } else {
          return "Pause";
        }
      })(),
      "",
    );
  } else {
    let score = $.score;
    return game_hud(
      "Run over",
      "Score " + $int.to_string(score),
      "Pause",
      "over",
    );
  }
}

function view_reveal_code(model) {
  let $ = model.code_open;
  if ($) {
    return $element.none();
  } else {
    return $html.button(
      listPrepend(
        $attr.class$("icon-btn reveal-code"),
        listPrepend(
          $attr.attribute("title", "Show code"),
          listPrepend($event.on_click(Msg$ToggleCode$const), $List$Empty$const),
        ),
      ),
      listPrepend($html.text("⟩"), $List$Empty$const),
    );
  }
}

function view_anim(model) {
  return $html.div(
    listPrepend($attr.class$("canvas-area"), $List$Empty$const),
    listPrepend(
      view_reveal_code(model),
      listPrepend(
        $html.canvas(
          listPrepend(
            $attr.id("animation-canvas"),
            listPrepend($attr.class$("canvas"), $List$Empty$const),
          ),
        ),
        listPrepend(
          view_game(model),
          listPrepend(
            view_error(model),
            listPrepend(view_controls(model), $List$Empty$const),
          ),
        ),
      ),
    ),
  );
}

function view_library(model) {
  return $html.div(
    listPrepend($attr.class$("library-bar"), $List$Empty$const),
    listPrepend(
      $html.select(
        listPrepend(
          $attr.class$("drawing-select"),
          listPrepend(
            $attr.attribute("data-test-id", "drawing-select"),
            listPrepend(
              $attr.value(model.selected),
              listPrepend(
                $event.on_change((var0) => { return new SelectDrawing(var0); }),
                $List$Empty$const,
              ),
            ),
          ),
        ),
        $list.map(
          model.drawings,
          (drawing) => {
            return $html.option(
              listPrepend(
                $attr.value(drawing.name),
                listPrepend(
                  $attr.selected(drawing.name === model.selected),
                  $List$Empty$const,
                ),
              ),
              drawing.name,
            );
          },
        ),
      ),
      listPrepend(
        $html.button(
          listPrepend(
            $attr.class$("icon-btn"),
            listPrepend(
              $attr.type_("button"),
              listPrepend(
                $attr.attribute("title", "Create a drawing"),
                listPrepend(
                  $event.on_click(Msg$NewDrawing$const),
                  $List$Empty$const,
                ),
              ),
            ),
          ),
          listPrepend($html.text("New"), $List$Empty$const),
        ),
        $List$Empty$const,
      ),
    ),
  );
}

export function view(model) {
  let _block;
  let $ = model.code_open;
  if ($) {
    _block = "app";
  } else {
    _block = "app code-hidden";
  }
  let app_class = _block;
  return $html.div(
    listPrepend($attr.class$(app_class), $List$Empty$const),
    listPrepend(
      $html.div(
        listPrepend($attr.class$("code-col"), $List$Empty$const),
        listPrepend(
          view_library(model),
          listPrepend(
            $editor.view_panel(Msg$ToggleCode$const),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(view_anim(model), $List$Empty$const),
    ),
  );
}

export function main() {
  let app = $lustre.application(init, update, view);
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "app",
      798,
      "main",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 22850,
        end: 22899,
        pattern_start: 22861,
        pattern_end: 22866
      }
    )
  }
  return undefined;
}
