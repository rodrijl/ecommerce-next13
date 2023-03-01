import { NextResponse } from "next/server";

import stock from "@/data/stock-price";

//api/stock-price/****id****

export async function GET(request, { params }) {
  const id = params.id;
  let selectedStock = Object.keys(stock).map((key) => {
    let ar = stock[key];
    ar.key = key;
    return ar;
  });
  selectedStock = selectedStock.find((x) => x.key.toString() === id);
  return NextResponse.json(selectedStock);
}
