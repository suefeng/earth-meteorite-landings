// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { executeQuery } from "@/infrastructure/utilities/db";
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);
  const meteorite_id = searchParams.get("meteorite_id");
  const user_id = searchParams.get("user_id");

  if (!meteorite_id || !user_id) {
    return new NextResponse(
      JSON.stringify({
        error: `favorite page not found for meteorite id ${meteorite_id} and user id ${user_id}`,
      }),
      {
        status: 404,
      }
    );
  } else {
    try {
      const checkExistence = await executeQuery({
        query:
          "SELECT id FROM meteorite_favorites WHERE meteorite_id = ? AND user_id = ?",
        values: [meteorite_id, user_id],
      });

      if (!!checkExistence) {
        const id = checkExistence.id || checkExistence[0].id;
        if (!id) {
          return new NextResponse(
            JSON.stringify({
              error: `this favorite is not found`,
            }),
            {
              status: 400,
            }
          );
        }
        const data = await executeQuery({
          query: "DELETE FROM meteorite_favorites WHERE id = ?",
          values: [id],
        });
        if (!!data) {
          return new NextResponse(
            JSON.stringify({
              message: `successfully deleted favorite meteorite id ${meteorite_id}`,
            }),
            { status: 200 }
          );
        } else {
          return new NextResponse(JSON.stringify({ error: "page not found" }), {
            status: 404,
          });
        }
      } else {
        return new NextResponse(
          JSON.stringify({
            error: `this favorite is not found`,
          }),
          {
            status: 400,
          }
        );
      }
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: String(error) }), {
        status: 500,
      });
    }
  }
}
