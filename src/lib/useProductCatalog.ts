"use client";
import { useEffect, useState } from "react";
import { products as demoProducts } from "@/data/products";
import type { Product } from "@/data/products";

export function useProductCatalog() {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  useEffect(() => {
    let active = true;
    fetch("/api/products")
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (active && Array.isArray(data) && data.length) setProducts(data); })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  return products;
}
