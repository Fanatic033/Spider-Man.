import { NextRequest, NextResponse } from "next/server";

const API_TOKEN = "64edd833ba09ec21a0e64709343fc21a";
const BASE_URL = `https://superheroapi.com/api/${API_TOKEN}`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    console.log(`Fetching superhero data for: ${query}`);

    const response = await fetch(`${BASE_URL}/search/${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching superhero data:", error);
    return NextResponse.json(
      { error: "Failed to fetch superhero data" },
      { status: 500 }
    );
  }
}
