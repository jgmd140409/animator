//# sourceMappingURL=data.mjs.map
import * as $json from "../gleam_json/gleam/json.mjs";
import * as $decode from "../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import {
  storageGet as storage_get,
  storageSet as storage_set,
  promptDrawingName as prompt_drawing_name,
} from "./data_ffi.mjs";
import * as $examples from "./examples.mjs";
import {
  Ok,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
} from "./gleam.mjs";

export { prompt_drawing_name, storage_get, storage_set };

export class Drawing extends $CustomType {
  constructor(name, source) {
    super();
    this.name = name;
    this.source = source;
  }
}
export const Drawing$Drawing = (name, source) => new Drawing(name, source);
export const Drawing$isDrawing = (value) => value instanceof Drawing;
export const Drawing$Drawing$name = (value) => value.name;
export const Drawing$Drawing$0 = (value) => value.name;
export const Drawing$Drawing$source = (value) => value.source;
export const Drawing$Drawing$1 = (value) => value.source;

export class Library extends $CustomType {
  constructor(selected, drawings) {
    super();
    this.selected = selected;
    this.drawings = drawings;
  }
}
export const Library$Library = (selected, drawings) =>
  new Library(selected, drawings);
export const Library$isLibrary = (value) => value instanceof Library;
export const Library$Library$selected = (value) => value.selected;
export const Library$Library$0 = (value) => value.selected;
export const Library$Library$drawings = (value) => value.drawings;
export const Library$Library$1 = (value) => value.drawings;

const library_key = "animator.library";

function first_name(drawings) {
  if (drawings instanceof $Empty) {
    return "";
  } else {
    let drawing = drawings.head;
    return drawing.name;
  }
}

/**
 * The drawings a browser with nothing saved starts from.
 */
export function from_examples() {
  let drawings = $list.map(
    $examples.all,
    (example) => {
      let name = example[0];
      let source = example[1];
      return new Drawing(name, source);
    },
  );
  return new Library(first_name(drawings), drawings);
}

export function find_drawing(drawings, name) {
  return $list.find(drawings, (drawing) => { return drawing.name === name; });
}

function normalize(library) {
  let $ = library.drawings;
  if ($ instanceof $Empty) {
    return from_examples();
  } else {
    let $1 = find_drawing(library.drawings, library.selected);
    if ($1 instanceof Ok) {
      return library;
    } else {
      return new Library(first_name(library.drawings), library.drawings);
    }
  }
}

function add_missing_examples(library) {
  let extras = $list.filter(
    from_examples().drawings,
    (example) => {
      let $ = find_drawing(library.drawings, example.name);
      if ($ instanceof Ok) {
        return false;
      } else {
        return true;
      }
    },
  );
  return new Library(library.selected, $list.append(library.drawings, extras));
}

function drawing_decoder() {
  return $decode.field(
    "name",
    $decode.string,
    (name) => {
      return $decode.field(
        "source",
        $decode.string,
        (source) => { return $decode.success(new Drawing(name, source)); },
      );
    },
  );
}

function library_decoder() {
  return $decode.field(
    "selected",
    $decode.string,
    (selected) => {
      return $decode.field(
        "drawings",
        $decode.list(drawing_decoder()),
        (drawings) => {
          return $decode.success(new Library(selected, drawings));
        },
      );
    },
  );
}

/**
 * Restore the library. A missing or unreadable save falls back to the examples.
 */
export function load_library() {
  let $ = storage_get(library_key);
  if ($ instanceof Ok) {
    let raw = $[0];
    let $1 = $json.parse(raw, library_decoder());
    if ($1 instanceof Ok) {
      let library = $1[0];
      return add_missing_examples(normalize(library));
    } else {
      return from_examples();
    }
  } else {
    return from_examples();
  }
}

function encode(selected, drawings) {
  let _pipe = $json.object(
    listPrepend(
      ["selected", $json.string(selected)],
      listPrepend(
        [
          "drawings",
          $json.array(
            drawings,
            (drawing) => {
              return $json.object(
                listPrepend(
                  ["name", $json.string(drawing.name)],
                  listPrepend(
                    ["source", $json.string(drawing.source)],
                    $List$Empty$const,
                  ),
                ),
              );
            },
          ),
        ],
        $List$Empty$const,
      ),
    ),
  );
  return $json.to_string(_pipe);
}

/**
 * Persist the library and which drawing is open.
 */
export function save_library(selected, drawings) {
  return storage_set(library_key, encode(selected, drawings));
}

/**
 * Replace one drawing's source and leave every other drawing untouched.
 */
export function replace_source(drawings, name, source) {
  return $list.map(
    drawings,
    (drawing) => {
      let $ = drawing.name === name;
      if ($) {
        return new Drawing(drawing.name, source);
      } else {
        return drawing;
      }
    },
  );
}
