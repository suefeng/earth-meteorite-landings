// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { MedeoriteType } from '@/domain/entities/medeorite';
import { executeQuery } from '@/infrastructure/utilities/db';
export const dynamic = 'force-dynamic';
import {NextRequest, NextResponse} from 'next/server';

type Data = MedeoriteType | { error: string } | {};

export async function GET(request: NextRequest, response: NextResponse) {

  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'earthling';

  async function getData() {
    const response = await fetch("https://data.nasa.gov/resource/y77d-th95.json");
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    if (!response.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
  
    return response.json();
  }

  try {
    const data = await executeQuery({
      query: 'SELECT mf.medeorite_id FROM medeorite_favorites mf join users u on mf.user_id = u.id where u.username = ?',
      values: [username],
    });
    if (!!data && data.length > 0) {
      const dataIds = data.map((item: { medeorite_id: number }) => item.medeorite_id);
      const nasaData = await getData();
      const filteredData = nasaData.filter((item: MedeoriteType) => dataIds.includes(Number(item.id)) );

      return new NextResponse(
        JSON.stringify(filteredData),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: 'page not found' }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: String(error) }),
      { status: 500 }
    );
  }
};
