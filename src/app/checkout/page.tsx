"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, PackageCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useProductCatalog } from "@/lib/useProductCatalog";
import { useCart } from "@/context/CartContext";
import { calculateShipping, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from "@/lib/shipping";

const money = (value: number) => new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON" }).format(value);
const priceNumber = (price: string) => Number(price.replace(/[^0-9,]/g, "").replace(",", ".")) || 0;

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const products = useProductCatalog();
  const [paymentMethod] = useState<"card">("card");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{orderNumber:string;total:number}|null>(null);
  const lines = items.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? { productId: item.productId, quantity: item.quantity, product, price: priceNumber(product.price) } : null;
  }).filter((line): line is NonNullable<typeof line> => Boolean(line));
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      customer: {
        firstName: form.get("firstName"), lastName: form.get("lastName"), email: form.get("email"),
        phone: form.get("phone"), county: form.get("county"), city: form.get("city"),
        postalCode: form.get("postalCode"), address: form.get("address"), notes: form.get("notes"),
      },
      items: lines.map(({productId, quantity}) => ({productId, quantity})),
      paymentMethod,
    };
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Comanda nu a putut fi trimisă.");
      setSuccess({orderNumber: result.orderNumber, total: result.total});
      clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare. Încearcă din nou.");
    } finally { setBusy(false); }
  }

  return <>
    <Navbar/>
    <main className="store-page"><div className="container store-wrap">
      <Link href="/cos" className="store-back"><ArrowLeft size={17}/> Înapoi la coș</Link>
      {success ? <div className="order-success"><PackageCheck size={54}/><div className="kicker">Comandă înregistrată</div><h1>Mulțumim pentru comandă!</h1><p>Numărul comenzii tale este <strong>{success.orderNumber}</strong>.</p><p>Valoarea produselor: <strong>{money(success.total)}</strong>. Echipa noastră va confirma detaliile de livrare.</p><Link href="/" className="btn btn-primary">Înapoi la magazin</Link></div> :
      <div className="checkout-grid"><section><div className="store-heading"><div className="kicker">Finalizare comandă</div><h1>Date de livrare</h1><p>Completează datele pentru livrarea comenzii în România.</p></div>
        {!lines.length ? <div className="empty-cart"><h2>Nu ai produse în coș</h2><Link href="/#produse" className="btn btn-primary">Alege produse</Link></div> :
        <form className="checkout-form" onSubmit={submit}>
          <div className="form-grid">
            <label>Prenume *<input name="firstName" autoComplete="given-name" required maxLength={80}/></label>
            <label>Nume *<input name="lastName" autoComplete="family-name" required maxLength={80}/></label>
            <label>Email *<input type="email" name="email" autoComplete="email" required maxLength={180}/></label>
            <label>Telefon *<input type="tel" name="phone" autoComplete="tel" required maxLength={40}/></label>
            <label>Județ *<input name="county" autoComplete="address-level1" required maxLength={100}/></label>
            <label>Localitate *<input name="city" autoComplete="address-level2" required maxLength={100}/></label>
            <label>Cod poștal<input name="postalCode" autoComplete="postal-code" maxLength={20}/></label>
            <label className="full-field">Adresă completă *<input name="address" autoComplete="street-address" required maxLength={250} placeholder="Stradă, număr, bloc, scară, apartament"/></label>
            <label className="full-field">Observații pentru comandă<textarea name="notes" rows={3} maxLength={500}/></label>
          </div>
          <fieldset className="payment-options"><legend>Metoda de plată</legend>
            <label className="payment-option payment-disabled"><input type="radio" name="payment" checked={false} disabled/><CreditCard/><span><strong>Plata online cu cardul</strong><small>În curs de activare. Comenzile cu plata ramburs nu mai sunt acceptate.</small></span></label>
          </fieldset>
          <p className="checkout-legal">Plata ramburs la livrare a fost dezactivată. Plata online va putea fi folosită după configurarea și activarea procesatorului de plăți.</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <p className="checkout-legal">Prin trimiterea comenzii confirmi că ai citit <Link href="/termeni-si-conditii">Termenii și condițiile</Link> și <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>.</p>
          <button className="btn btn-primary submit-order" type="submit" disabled>Plata online nu este încă disponibilă</button>
        </form>}
      </section>
      <aside className="cart-summary checkout-summary"><h2>Comanda ta</h2>{lines.map(line=><div className="checkout-item" key={line.productId}><span>{line.product.name} × {line.quantity}</span><strong>{money(line.price * line.quantity)}</strong></div>)}<div className="summary-total"><span>Produse</span><strong>{money(subtotal)}</strong></div><div className="checkout-item"><span>Transport</span><strong>{shipping === 0 ? "Gratuit" : money(shipping)}</strong></div><div className="summary-total"><span>Total de plată</span><strong>{money(total)}</strong></div><p>{shipping === 0 ? "Transport gratuit pentru această comandă." : `Transport ${money(SHIPPING_FEE)}. Transport gratuit pentru comenzile de minimum ${money(FREE_SHIPPING_THRESHOLD)}.`}</p></aside>
      </div>}
    </div></main>
  </>;
}
