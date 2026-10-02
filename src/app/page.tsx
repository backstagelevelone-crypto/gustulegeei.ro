"use client";
import {useState} from "react";
import {ShoppingBag,Truck,ShieldCheck,HeartHandshake,ArrowRight,ChevronRight} from "lucide-react";
import Navbar from "@/components/Navbar";
import {products} from "@/data/products";

export default function Home(){
 const [cart,setCart]=useState<number[]>([]);
 const add=(id:number)=>setCart(c=>[...c,id]);
 return <>
  <Navbar/>
  <main>
   <section className="hero">
    <div className="container hero-inner">
      <div className="hero-copy">
       <div className="eyebrow"><span className="dot"/> Gustul autentic al Greciei</div>
       <h1>Grecia la tine <span>acasă.</span></h1>
       <p>Produse grecești alese cu grijă: ulei de măsline, măsline Kalamata, feta, miere, condimente și specialități grecești.</p>
       <div className="hero-actions"><a href="#produse" className="btn btn-primary">Vezi produsele <ArrowRight size={17}/></a><a href="#livrare" className="btn btn-secondary">Livrare în România</a></div>
       <div className="hero-trust"><span><b>✓</b> Produse grecești</span><span><b>✓</b> Ambalare atentă</span><span><b>✓</b> Comandă simplă</span></div>
      </div>
      <div className="hero-visual"><img src="/hero-grecia.png" alt="Coș cu produse grecești, ulei de măsline, măsline și brânzeturi"/></div>
    </div>
   </section>

   <section id="despre" className="section intro">
    <div className="container intro-grid">
      <div><div className="kicker">Bine ai venit</div><h2>Gustul Greciei, ales pentru masa ta.</h2></div>
      <p>Descoperă produse inspirate din bucătăria grecească și din tradițiile grecești. Construim treptat un catalog de produse autentice, cu informații clare și comandă simplă.</p>
    </div>
    <div className="container features">
      <div className="feature"><div className="icon">🫒</div><h3>Produse grecești</h3><p>Uleiuri, măsline, brânzeturi, miere și specialități.</p></div>
      <div className="feature"><div className="icon">🇬🇷</div><h3>Inspirație din Grecia</h3><p>Selecții cu specific egeean și gust autentic.</p></div>
      <div className="feature"><div className="icon">📦</div><h3>Ambalare atentă</h3><p>Pregătim produsele cu grijă pentru transport.</p></div>
      <div className="feature"><div className="icon">💬</div><h3>Comandă ușoară</h3><p>Găsești produsele și informațiile esențiale rapid.</p></div>
    </div>
   </section>

   <section id="categorii" className="section alt categories">
    <div className="container"><div className="section-head"><div><div className="kicker">Categorii</div><h2>Arome pentru fiecare masă.</h2></div><p>O structură simplă, construită pentru un magazin alimentar grecesc.</p></div>
     <div className="category-grid">{[["🫒","Ulei de măsline"],["🫙","Măsline"],["🧀","Brânzeturi"],["🍯","Miere"],["🌿","Condimente"],["🍰","Dulciuri & specialități"]].map(([icon,name])=><a href="#produse" className="category" key={name}><span>{icon}</span><div><strong>{name}</strong><small>Descoperă selecția</small></div><ChevronRight size={19}/></a>)}</div>
    </div>
   </section>

   <section id="produse" className="section">
    <div className="container"><div className="section-head"><div><div className="kicker">Produse</div><h2>Preferatele Greciei.</h2></div><p>Catalog demonstrativ pentru această versiune. Produsele reale pot fi importate ulterior din catalogul furnizorului.</p></div>
     <div className="products">{products.map(p=><article className="product" key={p.id}><img className="product-img" src={p.image} alt={p.name}/><div className="product-body"><div className="product-cat">{p.category}</div><h3>{p.name}</h3><p>{p.description}</p><div className="price">{p.price}</div><button className="product-btn" onClick={()=>add(p.id)}>Adaugă în coș</button></div></article>)}</div>
    </div>
   </section>

   <section id="comanda" className="section order-section"><div className="container split"><div><div className="kicker">Comandă</div><h2>Tu alegi. Noi pregătim.</h2><p>Comanda este gândită să fie simplă: alegi produsele, le adaugi în coș și apoi stabilim detaliile de livrare. În versiunea finală putem conecta plata online și procesarea automată a comenzilor.</p><a className="btn btn-primary" href="#produse">Începe cumpărăturile <ArrowRight size={17}/></a></div><div className="info-card"><h3>Ai nevoie de un produs anume?</h3><p>Trimite-ne denumirea sau fotografia produsului și îl putem adăuga în catalog când avem disponibilitatea furnizorului.</p></div></div></section>

   <section id="livrare" className="section alt"><div className="container"><div className="section-head"><div><div className="kicker">Livrare</div><h2>Din Grecia, până la ușa ta.</h2></div><p>Detaliile finale de transport vor fi configurate după stabilirea curierului și a regulilor de livrare.</p></div><div className="features"><div className="feature"><Truck className="icon" color="var(--blue)"/><h3>Livrare la adresă</h3><p>Comenzile sunt pregătite pentru expediere către adresa indicată.</p></div><div className="feature"><ShieldCheck className="icon" color="var(--green)"/><h3>Ambalare sigură</h3><p>Produsele sunt pregătite cu atenție pentru transport.</p></div><div className="feature"><HeartHandshake className="icon" color="var(--blue)"/><h3>Suport</h3><p>Te ajutăm cu disponibilitatea și detaliile comenzilor.</p></div></div></div></section>

   <section id="promotii" className="section promo"><div className="container promo-box"><div><div className="kicker">Promoții</div><h2>Descoperă gusturi noi.</h2><p>Zona este pregătită pentru oferte, pachete și produse sezoniere atunci când catalogul real este disponibil.</p></div><a className="btn btn-secondary" href="#produse">Vezi produsele</a></div></section>

   <section id="recenzii" className="section"><div className="container"><div className="section-head"><div><div className="kicker">Recenzii</div><h2>Părerea clienților contează.</h2></div><p>După lansare, aici vor putea fi afișate recenziile reale ale clienților.</p></div><div className="reviews"><div className="review"><div className="stars">★★★★★</div><p>„Uleiul de măsline a fost foarte aromat și livrarea rapidă.”</p><strong>Client verificat</strong></div><div className="review"><div className="stars">★★★★★</div><p>„Măslinele Kalamata sunt exact genul de produs pe care îl căutam.”</p><strong>Client verificat</strong></div><div className="review"><div className="stars">★★★★★</div><p>„Site simplu, produse interesante și comunicare foarte bună.”</p><strong>Client verificat</strong></div></div></div></section>
  </main>
  <footer className="footer"><div className="container"><div className="footer-grid"><div><img src="/logo.png" alt="gustulegeei.ro" className="footer-logo"/><p>Gustul autentic al Greciei, cu produse pentru masa de zi cu zi.</p></div><div><h3>Navigare</h3><p><a href="#produse">Produse</a><br/><a href="#categorii">Categorii</a><br/><a href="#livrare">Livrare</a></p></div><div><h3>gustulegeei.ro</h3><p>Produse grecești<br/>Selecție grecească<br/>Comenzi și informații</p></div></div><div className="footer-bottom">© 2026 gustulegeei.ro · Toate drepturile rezervate.</div></div></footer>
  <button className="cart" aria-label="Coș"><ShoppingBag/><span className="cart-count">{cart.length}</span></button>
 </>
}
