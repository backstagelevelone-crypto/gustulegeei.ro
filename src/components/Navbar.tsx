"use client";
import {useState} from "react";
import {Menu,X,ShoppingBag} from "lucide-react";
import {NAV_LINKS} from "@/lib/constants";
export default function Navbar(){
 const [open,setOpen]=useState(false);
 return <header className="nav">
  <div className="container nav-inner">
   <a href="/" className="brand"><img src="/logo.png" alt="gustulegeei.ro"/></a>
   <nav className="navlinks">{NAV_LINKS.map(x=><a key={x.href} href={x.href}>{x.label}</a>)}</nav>
   <a className="cta" href="#produse"><ShoppingBag size={17}/> Vezi produsele</a>
   <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Meniu">{open?<X/>:<Menu/>}</button>
  </div>
  <div className={"mobile-nav "+(open?"open":"")}>{NAV_LINKS.map(x=><a key={x.href} href={x.href} onClick={()=>setOpen(false)}>{x.label}</a>)}<a className="cta" href="#produse" onClick={()=>setOpen(false)}>Vezi produsele</a></div>
 </header>
}
