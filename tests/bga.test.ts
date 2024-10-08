import test from "ava"
import { fp } from "../src/footprinter"
import { AnySoupElement } from "@tscircuit/soup"
import { toPinPositionString } from "./fixtures"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

test("bga footprint", async (t) => {
  const { snapshotSoup } = await getTestFixture(t)
  const soup = fp()
    .bga(8)
    .w("4mm")
    .h("4mm")
    .grid("3x3")
    .missing("center")
    .p(1)
    .soup()
  // 16pins, 4mm x 4mm, 8x8 grid, 1.27mm pitch
  const ps = toPinPositionString(soup)
  t.is(
    ps,
    `
1 : -1.00  1.00
2 :  0.00  1.00
3 :  1.00  1.00
4 : -1.00  0.00
5 :  1.00  0.00
6 : -1.00 -1.00
7 :  0.00 -1.00
8 :  1.00 -1.00
  `.trim(),
  )
  snapshotSoup(soup)
})

test("bga7_w8_h8_grid3x3_p1_missing(center,B1)", async (t) => {
  const soup = fp.string("bga7_w8_h8_grid3x3_p1_missing(center,B1)").soup()
  const ps = toPinPositionString(soup)
  const { snapshotSoup } = await getTestFixture(t)
  t.is(
    ps,
    `
1 : -1.00  1.00
2 :  0.00  1.00
3 :  1.00  1.00
4 :  1.00  0.00
5 : -1.00 -1.00
6 :  0.00 -1.00
7 :  1.00 -1.00
  `.trim(),
  )
  snapshotSoup(soup)
})

test("bga64_w10_h10_grid8x8_p1.27mm", async (t) => {
  const { snapshotSoup } = await getTestFixture(t)
  const soup = fp()
    .bga(64)
    .w("10mm")
    .h("10mm")
    .grid("8x8")
    .missing("center")
    .p(1.27)
    .soup()
  // 16pins, 4mm x 4mm, 8x8 grid, 1.27mm pitch
  const ps = toPinPositionString(soup)
  t.pass()
  snapshotSoup(soup)
})
