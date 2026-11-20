
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { calculateShipping } from "@/lib/shipping";

export const runtime = "nodejs";

type CheckoutBody = {
  customer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    county?: string;
    city?: string;
    postalCode?: string;
    address?: string;
    notes?: string;
  };
  items?: {
    productId: number;
    quantity: number;
  }[];
  paymentMethod?: string;
};

const clean = (value: unknown, max = 180) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json(
      { error: "Magazinul nu este configurat. Lipsesc variabilele Supabase." },
      { status: 503 }
    );
  }

  let body: CheckoutBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Cerere invalidă." },
      { status: 400 }
    );
  }

  const customer = {
    first_name: clean(body.customer?.firstName, 80),
    last_name: clean(body.customer?.lastName, 80),
    email: clean(body.customer?.email, 180).toLowerCase(),
    phone: clean(body.customer?.phone, 40),
    county: clean(body.customer?.county, 100),
    city: clean(body.customer?.city, 100),
    postal_code: clean(body.customer?.postalCode, 20),
    address: clean(body.customer?.address, 250),
    notes: clean(body.customer?.notes, 500),
  };

  if (
    !customer.first_name ||
    !customer.last_name ||
    !/^\S+@\S+\.\S+$/.test(customer.email) ||
    !customer.phone ||
    !customer.county ||
    !customer.city ||
    !customer.address
  ) {
    return NextResponse.json(
      { error: "Completează toate datele obligatorii și un email valid." },
      { status: 400 }
    );
  }

  if (body.paymentMethod !== "card") {
    return NextResponse.json(
      { error: "Plata ramburs nu este acceptată." },
      { status: 400 }
    );
  }

  // Plata online nu este încă activată.
  return NextResponse.json(
    {
      error:
        "Plata online cu cardul nu este încă activată. Revino după configurarea procesatorului de plăți.",
    },
    { status: 503 }
  );

  const rawItems: { productId: number; quantity: number }[] =
    body.items ?? [];

  const items = rawItems
    .filter(
      (item) =>
        Number.isInteger(item?.productId) &&
        Number.isInteger(item?.quantity) &&
        item.quantity > 0 &&
        item.quantity <= 99
    )
    .slice(0, 30);

  if (!items.length || items.length !== rawItems.length) {
    return NextResponse.json(
      { error: "Coșul este gol sau conține cantități invalide." },
      { status: 400 }
    );
  }

  const quantities = new Map<number, number>();

  for (const item of items) {
    quantities.set(
      item.productId,
      (quantities.get(item.productId) ?? 0) + item.quantity
    );
  }

  const ids = [...quantities.keys()];

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id,name,price,active,stock_quantity")
    .in("id", ids)
    .eq("active", true);

  if (productsError || !products || products.length !== ids.length) {
    return NextResponse.json(
      { error: "Unele produse nu mai sunt disponibile." },
      { status: 409 }
    );
  }

  type ProductRow = {
    id: number;
    name: string;
    price: number | string;
    stock_quantity: number | null;
  };

  const productRows = products as ProductRow[];

  const productMap = new Map<number, ProductRow>(
    productRows.map((product) => [Number(product.id), product])
  );

  let subtotal = 0;

  const orderItems: {
    product_id: number;
    product_name: string;
    unit_price: number;
    quantity: number;
    line_total: number;
  }[] = [];

  for (const [productId, quantity] of quantities.entries()) {
    const product = productMap.get(productId);

    if (!product) {
      return NextResponse.json(
        { error: "Produs indisponibil." },
        { status: 409 }
      );
    }

    if (
      product.stock_quantity !== null &&
      product.stock_quantity < quantity
    ) {
      return NextResponse.json(
        { error: `Stoc insuficient pentru ${product.name}.` },
        { status: 409 }
      );
    }

    const unitPrice = Number(product.price);

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      return NextResponse.json(
        { error: "Preț invalid în catalog." },
        { status: 500 }
      );
    }

    subtotal += unitPrice * quantity;

    orderItems.push({
      product_id: productId,
      product_name: product.name,
      unit_price: unitPrice,
      quantity,
      line_total: Number((unitPrice * quantity).toFixed(2)),
    });
  }

  subtotal = Number(subtotal.toFixed(2));

  const shipping = calculateShipping(subtotal);
  const total = Number((subtotal + shipping).toFixed(2));
  const orderNumber = `GGE-${randomUUID().slice(0, 8).toUpperCase()}`;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      ...customer,
      payment_method: "card",
      payment_status: "unpaid",
      order_status: "new",
      subtotal,
      shipping,
      total,
      currency: "RON",
    })
    .select("id,order_number")
    .single();

  if (orderError || !order) {
    return NextResponse.json(
      { error: "Nu am putut salva comanda." },
      { status: 500 }
    );
  }

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(
      orderItems.map((item) => ({
        ...item,
        order_id: order.id,
      }))
    );

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);

    return NextResponse.json(
      { error: "Nu am putut salva produsele comenzii." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      orderId: order.id,
      orderNumber: order.order_number,
      total,
      paymentMethod: "card",
    },
    { status: 201 }
  );
}
