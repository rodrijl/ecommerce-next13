import { NextResponse } from "next/server";

import stock from "@/data/stock-price";

export async function GET(request) {
  return NextResponse.json(stock);
}
