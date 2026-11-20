export const FREE_SHIPPING_THRESHOLD = 400;
export const SHIPPING_FEE = 69;

export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}
