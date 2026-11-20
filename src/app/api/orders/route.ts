
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type CheckoutBody = {
  paymentMethod?: string;
};

export async function POST(request: NextRequest) {
  let body: CheckoutBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Cerere invalidă." },
      { status: 400 }
    );
  }

  if (body.paymentMethod !== "card") {
    return NextResponse.json(
      {
        error: "Plata ramburs nu este acceptată. Alege plata online cu cardul."
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      error: "Plata online cu cardul nu este încă activată. Te rugăm să revii după configurarea procesatorului de plăți."
    },
    { status: 503 }
  );
}
