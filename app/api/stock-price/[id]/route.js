import { NextResponse } from "next/server";

import stock from "@/data/stock-price";

//api/stock-price/****id****

export async function GET(request, { params }) {
  const id = params.id;
  const selectedStock = {
    ...stock[id],
    key: id,
  };
  return NextResponse.json(selectedStock);
}
