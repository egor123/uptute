import { Items as I, Item } from "../types";

export class Items implements I {
  private _arr: Item[] = [];

  get arr() {
    return this._arr;
  }

  constructor() {
    this._arr = [
      { price: "price_1LIRxmGR1ZOj2dmhlpIJfcnE" },
      { price: "price_1LIRyMGR1ZOj2dmh6uCi0i0m" },
    ];
  }
}
