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
              $List$Empty$const,
            ),
          ),
        ),
      ),
    ),
  ),
);
