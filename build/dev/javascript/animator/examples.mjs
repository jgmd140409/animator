//# sourceMappingURL=examples.mjs.map
import { List$Empty$const as $List$Empty$const, prepend as listPrepend } from "./gleam.mjs";

export const all = /* @__PURE__ */ listPrepend(
  [
    "fan",
    "fn draw(shape_slider: Int) -> List(Path) {\n  fan(30, Point(-200, -200))\n}\n\nfn fan(n: Int, start: Point) -> List(Path) {\n  case n > 0 {\n    True -> [Path(Line(start, Point(n * 10, 200)), 0, 30, 3), ..fan(n - 1, start)]\n    False -> []\n  }\n}\n",
  ],
  listPrepend(
    [
      "square_spiral",
      "fn draw(shape_slider: Int) -> List(Path) {\n  let turns = 20 + shape_slider / 4\n  spiral(Point(0, 0), Point(1, 0), 0, turns)\n}\n\nfn spiral(p: Point, d: Point, i: Int, n: Int) -> List(Path) {\n  case i == n {\n    True -> []\n    False -> {\n      let len = { i / 2 + 1 } * 24\n      let q = Point(p.x + d.x * len, p.y + d.y * len)\n      [\n        Path(Line(p, q), i * 3, i * 3 + 3, 3),\n        ..spiral(q, Point(0 - d.y, d.x), i + 1, n)\n      ]\n    }\n  }\n}\n",
    ],
    listPrepend(
      [
        "string_art",
        "fn draw(shape_slider: Int) -> List(Path) {\n  let n = 8 + shape_slider / 10\n  list.flatten([\n    quadrant(1, 1, n, 0),\n    quadrant(-1, 1, n, n + 1),\n    quadrant(-1, -1, n, { n + 1 } * 2),\n    quadrant(1, -1, n, { n + 1 } * 3),\n  ])\n}\n\nfn quadrant(sx: Int, sy: Int, n: Int, base: Int) -> List(Path) {\n  strings(0, sx, sy, n, base)\n}\n\nfn strings(i: Int, sx: Int, sy: Int, n: Int, base: Int) -> List(Path) {\n  case i > n {\n    True -> []\n    False -> {\n      let a = Point(sx * 420 * i / n, 0)\n      let b = Point(0, sy * 420 * { n - i } / n)\n      let t = { base + i } * 2\n      [Path(Line(a, b), t, t + 8, 2), ..strings(i + 1, sx, sy, n, base)]\n    }\n  }\n}\n",
      ],
      listPrepend(
        [
          "tree",
          "fn draw(shape_slider: Int) -> List(Path) {\n  let depth = 4 + shape_slider / 20\n  branch(Point(0, 420), Point(0, -220), 0, depth)\n}\n\nfn branch(p: Point, d: Point, level: Int, depth: Int) -> List(Path) {\n  case level == depth {\n    True -> []\n    False -> {\n      let q = Point(p.x + d.x, p.y + d.y)\n      let left = Point({ d.x - d.y } / 2, { d.y + d.x } / 2)\n      let right = Point({ d.x + d.y } / 2, { d.y - d.x } / 2)\n      [\n        Path(Line(p, q), level * 4, level * 4 + 4, depth - level),\n        ..list.append(\n          branch(q, left, level + 1, depth),\n          branch(q, right, level + 1, depth),\n        )\n      ]\n    }\n  }\n}\n",
        ],
        listPrepend(
          [
            "solar_system",
            "fn draw(shape_slider: Int) -> List(Path) {\n  let count = 3 + shape_slider / 20\n  list.append([\n    Path(Paint(Circle(Point(0, 0), 22), gold()), 0, 6, 8),\n    Path(Paint(Circle(Point(0, 0), 36), coral()), 0, 8, 3),\n  ], orbits(1, count))\n}\n\nfn orbits(i: Int, n: Int) -> List(Path) {\n  case i > n {\n    True -> []\n    False -> {\n      let radius = 70 + i * 52\n      let tint = planet(i)\n      list.append([\n        Path(Paint(Circle(Point(0, 0), radius), tint), i * 2, i * 2 + 16, 2),\n        Path(Fade(Arc(Point(0, 0), radius, 20, 280), tint, ivory()), i * 2 + 4, i * 2 + 28, 4),\n      ], orbits(i + 1, n))\n    }\n  }\n}\n\nfn planet(i: Int) -> Rgb {\n  case i % 4 {\n    0 -> sky()\n    1 -> lime()\n    2 -> rose()\n    _ -> violet()\n  }\n}\n",
          ],
          listPrepend(
            [
              "flower",
              "fn draw(shape_slider: Int) -> List(Path) {\n  let petals = 6 + shape_slider / 12\n  flower(0, petals)\n}\n\nfn flower(i: Int, n: Int) -> List(Path) {\n  case i == n {\n    True -> []\n    False -> {\n      let deg = i * 360 / n\n      let tip = orbit(Point(0, 0), 230, deg)\n      let left = orbit(Point(0, 0), 90, deg - 28)\n      let right = orbit(Point(0, 0), 90, deg + 28)\n      let tint = mix(rose(), gold(), i * 100 / n)\n      list.append([\n        Path(Fade(Curve(Point(0, 0), left, tip), tint, ivory()), i * 2, i * 2 + 10, 3),\n        Path(Fade(Curve(tip, right, Point(0, 0)), gold(), tint), i * 2, i * 2 + 10, 3),\n      ], flower(i + 1, n))\n    }\n  }\n}\n",
            ],
            listPrepend(
              [
                "twin_spiral",
                "fn draw(shape_slider: Int) -> List(Path) {\n  let turns = 2 + shape_slider / 25\n  [\n    Path(Fade(Spiral(Point(0, 0), turns, 12, 340), violet(), cyan()), 0, 36, 3),\n    Path(Fade(Spiral(Point(0, 0), 0 - turns, 20, 280), coral(), gold()), 2, 40, 2),\n    Path(Paint(Circle(Point(0, 0), 16), ivory()), 0, 6, 4),\n  ]\n}\n",
              ],
              listPrepend(
                [
                  "path_arena",
                  "fn draw(shape_slider: Int) -> List(Path) {\n  let cells = 2 + shape_slider / 34\n  list.append(h_bars(0, cells), v_bars(0, cells))\n}\n\nfn h_bars(row: Int, cells: Int) -> List(Path) {\n  case row > cells {\n    True -> []\n    False -> list.append(h_seg(row, 0, cells), h_bars(row + 1, cells))\n  }\n}\n\nfn h_seg(row: Int, col: Int, cells: Int) -> List(Path) {\n  case col >= cells {\n    True -> []\n    False -> {\n      let x = 0 - 200 + col * 400 / cells\n      let y = 0 - 200 + row * 400 / cells\n      let x2 = 0 - 200 + { col + 1 } * 400 / cells\n      [\n        Path(ColorLine(Point(x, y), Point(x2, y), row_color(row)), row, row + 8, 5),\n        ..h_seg(row, col + 1, cells)\n      ]\n    }\n  }\n}\n\nfn v_bars(col: Int, cells: Int) -> List(Path) {\n  case col > cells {\n    True -> []\n    False -> list.append(v_seg(col, 0, cells), v_bars(col + 1, cells))\n  }\n}\n\nfn v_seg(col: Int, row: Int, cells: Int) -> List(Path) {\n  case row >= cells {\n    True -> []\n    False -> {\n      let x = 0 - 200 + col * 400 / cells\n      let y = 0 - 200 + row * 400 / cells\n      let y2 = 0 - 200 + { row + 1 } * 400 / cells\n      [\n        Path(ColorLine(Point(x, y), Point(x, y2), col_color(col)), col, col + 8, 5),\n        ..v_seg(col, row + 1, cells)\n      ]\n    }\n  }\n}\n\nfn row_color(i: Int) -> Rgb {\n  case i % 4 {\n    0 -> red()\n    1 -> orange()\n    2 -> yellow()\n    _ -> green()\n  }\n}\n\nfn col_color(i: Int) -> Rgb {\n  case i % 4 {\n    0 -> blue()\n    1 -> purple()\n    2 -> white()\n    _ -> RGB(80, 220, 210)\n  }\n}\n",
                ],
                listPrepend(
                  [
                    "rainbow_geometry",
                    "fn draw(shape_slider: Int) -> List(Path) {\n  let radius = 50 + shape_slider\n  [\n    Path(ColorLine(Point(-280, 0), Point(280, 0), red()), 0, 8, 6),\n    Path(Paint(Circle(Point(0, 0), radius), blue()), 2, 12, 4),\n    Path(Paint(Circle(Point(0, 0), radius + 46), green()), 4, 14, 4),\n    Path(Paint(Arc(Point(0, 0), radius + 96, 20, 260), yellow()), 6, 18, 5),\n    Path(Paint(Circle(Point(-150, -70), 34), purple()), 8, 14, 4),\n    Path(Paint(Circle(Point(150, 80), 34), orange()), 8, 14, 4),\n    Path(ColorLine(Point(0, -220), Point(0, 220), white()), 10, 18, 3),\n  ]\n}\n",
                  ],
                  listPrepend(
                    [
                      "color_gallery",
                      "fn draw(shape_slider: Int) -> List(Path) {\n  let spread = 28 + shape_slider / 5\n  [\n    Path(ColorLine(Point(-300, 0 - spread * 3), Point(300, 0 - spread * 3), red()), 0, 6, 6),\n    Path(ColorLine(Point(-300, 0 - spread * 2), Point(300, 0 - spread * 2), orange()), 2, 8, 6),\n    Path(ColorLine(Point(-300, 0 - spread), Point(300, 0 - spread), yellow()), 4, 10, 6),\n    Path(ColorLine(Point(-300, 0), Point(300, 0), green()), 6, 12, 6),\n    Path(ColorLine(Point(-300, spread), Point(300, spread), blue()), 8, 14, 6),\n    Path(ColorLine(Point(-300, spread * 2), Point(300, spread * 2), purple()), 10, 16, 6),\n    Path(ColorLine(Point(-300, spread * 3), Point(300, spread * 3), white()), 12, 18, 6),\n    Path(ColorLine(Point(0, -240), Point(0, 240), RGB(255, 40, 140)), 14, 22, 4),\n  ]\n}\n",
                    ],
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
);
