"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return <header className="nav">
    <div className="container nav-inner">
      <div className="brand-block">
        <Link href="/" className="brand"><img src="/logo.png" alt="gustulegeei.ro"/></Link>
        <div className="brand-attribution">
          <span>Un proiect susținut și promovat de</span>
          <a href="https://www.cosram.ro" target="_blank" rel="noopener noreferrer" aria-label="COSRAM AUTO - cosram.ro">
            <img src="/cosram-auto-logo.png" alt="COSRAM AUTO" />
          </a>
        </div>
      </div>
      <nav className="navlinks">{NAV_LINKS.map((x) => <a key={x.href} href={x.href}>{x.label}</a>)}</nav>
      <div className="nav-actions">
        <Link className="nav-cart-link" href="/cos" aria-label={`Coș de cumpărături, ${count} produse`}><ShoppingBag size={18}/><span>Coș</span><b>{count}</b></Link>
        <a className="cta" href="#produse"><ShoppingBag size={17}/> Vezi produsele</a>
      </div>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Meniu">{open ? <X/> : <Menu/>}</button>
    </div>
    <div className={"mobile-nav " + (open ? "open" : "")}>
      {NAV_LINKS.map((x) => <a key={x.href} href={x.href} onClick={() => setOpen(false)}>{x.label}</a>)}
      <Link className="nav-cart-link mobile-cart-link" href="/cos" onClick={() => setOpen(false)}><ShoppingBag size={18}/> Coș ({count})</Link>
      <a className="cta" href="#produse" onClick={() => setOpen(false)}>Vezi produsele</a>
    </div>
  </header>;
}
