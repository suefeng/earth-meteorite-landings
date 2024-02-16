// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MeteoriteType } from "@/domain/entities/meteorite";
import { executeQuery } from "@/infrastructure/utilities/db";
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getCachedData } from "@/infrastructure/utilities/requests";
import { NASA_URL } from "@/infrastructure/consts";

type Data = MeteoriteType | { error: string } | {};

export async function GET(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "earthling";

  try {
    const data = await executeQuery({
      query:
        "SELECT mf.meteorite_id FROM meteorite_favorites mf join users u on mf.user_id = u.id where u.username = ?",
      values: [username],
    });
    if (!!data && data.length > 0) {
      const dataIds = data.map(
        (item: { meteorite_id: number }) => item.meteorite_id
      );
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const nasaData = await getCachedData(NASA_URL, options);
      const filteredData = nasaData.filter((item: MeteoriteType) =>
        dataIds.includes(Number(item.id))
      );

      return new NextResponse(JSON.stringify(filteredData), { status: 200 });
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
