import { describe, it, expect } from "vitest";
import { calculateCartCount, calculateCartTotal } from "./cart";

describe("cart calculations", () => {
  const items = [
    { id: 1, price: 2500, quantity: 2 },
    { id: 2, price: 1000, quantity: 3 },
  ];

  it("totals price times quantity across all items", () => {
    expect(calculateCartTotal(items)).toBe(8000);
  });

  it("counts every unit, not just distinct products", () => {
    expect(calculateCartCount(items)).toBe(5);
  });

  it("returns 0 for an empty cart", () => {
    expect(calculateCartTotal([])).toBe(0);
    expect(calculateCartCount([])).toBe(0);
  });
});
