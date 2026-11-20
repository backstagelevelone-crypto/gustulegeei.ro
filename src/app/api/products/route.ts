import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { products as demoProducts } from "@/data/products";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json(demoProducts);
  const { data, error } = await supabase
    .from("products")
    .select("id,name,category,price,description,image,active")
    .eq("active", true)
    .order("id");
  if (error || !data) return NextResponse.json(demoProducts);
  return NextResponse.json(data.map((product: { id: number; name: string; category: string; price: number | string; description: string; image: string; active: boolean }) => ({
    ...product,
    price: `${Number(product.price).toFixed(2).replace(".", ",")} lei`,
  })));
}
