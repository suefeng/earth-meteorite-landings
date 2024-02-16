// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { executeQuery } from "@/infrastructure/utilities/db";
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const meteorite_id = searchParams.get("meteorite_id");
  const user_id = searchParams.get("user_id");

  if (!meteorite_id || !user_id) {
    return new NextResponse(
      JSON.stringify({
        error: `this favorite page cannot be not found`,
      }),
      {
        status: 404,
      }
    );
  } else {
    try {
      const data = await executeQuery({
        query:
          "INSERT INTO meteorite_favorites (meteorite_id, user_id) VALUES (?, ?)",
        values: [meteorite_id, user_id],
      });
      if (!!data) {
        return new NextResponse(
          JSON.stringify({
            message: `successfully saved favorite meteorite id ${meteorite_id}`,
          }),
          { status: 200 }
        );
      } else {
        return new NextResponse(JSON.stringify({ error: "page not found" }), {
          status: 404,
        });
      }
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: String(error) }), {
        status: 500,
      });
    }
  }
}
