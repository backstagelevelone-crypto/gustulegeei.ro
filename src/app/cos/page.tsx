"use client";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useProductCatalog } from "@/lib/useProductCatalog";
import { useCart } from "@/context/CartContext";
import { calculateShipping, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/shipping";

const money = (value: number) => new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(value);
const priceNumber = (price: string) => Number(price.replace(/[^0-9,]/g, "").replace(",", ".")) || 0;

export default function CartPage() {
  const { items, setQuantity, remove } = useCart();
  const products = useProductCatalog();
  const lines = items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? { ...item, product, price: priceNumber(product.price) } : null;
  }).filter((line): line is NonNullable<typeof line> => Boolean(line));
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return <>
    <Navbar />
    <main className="store-page">
      <div className="container store-wrap">
        <Link href="/#produse" className="store-back"><ArrowLeft size={17}/> Înapoi la produse</Link>
        <div className="store-heading"><div className="kicker">Coșul tău</div><h1>Produsele alese</h1><p>Verifică produsele și cantitățile înainte de finalizarea comenzii.</p></div>
        {!lines.length ? <div className="empty-cart"><ShoppingBag size={42}/><h2>Coșul este gol</h2><p>Adaugă produse grecești și revino aici pentru a plasa comanda.</p><Link href="/#produse" className="btn btn-primary">Descoperă produsele</Link></div> :
          <div className="cart-layout">
            <div className="cart-lines">{lines.map(({ product, quantity, price }) => <article className="cart-line" key={product.id}>
              <img src={product.image} alt={product.name}/>
              <div className="cart-line-info"><span className="product-cat">{product.category}</span><h2>{product.name}</h2><strong>{money(price)}</strong>
                <div className="quantity-control"><button aria-label="Scade cantitatea" onClick={() => setQuantity(product.id, quantity - 1)}><Minus size={15}/></button><span>{quantity}</span><button aria-label="Crește cantitatea" onClick={() => setQuantity(product.id, quantity + 1)}><Plus size={15}/></button></div>
              </div>
              <div className="cart-line-end"><strong>{money(price * quantity)}</strong><button className="remove-btn" onClick={() => remove(product.id)}><Trash2 size={16}/> Șterge</button></div>
            </article>)}</div>
            <aside className="cart-summary"><h2>Sumar comandă</h2><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Transport</span><strong>{shipping === 0 ? "Gratuit" : money(shipping)}</strong></div><div className="summary-total"><span>Total de plată</span><strong>{money(total)}</strong></div><p>{shipping === 0 ? "Ai obținut transport gratuit pentru comanda ta!" : `Transportul este ${money(SHIPPING_FEE)}. Mai adaugă produse de ${money(remainingForFreeShipping)} pentru transport gratuit de la ${money(FREE_SHIPPING_THRESHOLD)}.`}</p><Link href="/checkout" className="btn btn-primary checkout-btn">Continuă către checkout</Link></aside>
          </div>}
      </div>
    </main>
  </>;
}
