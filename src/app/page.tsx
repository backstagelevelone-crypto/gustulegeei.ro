
"use client";
import {useState} from "react";
import {ShoppingBag,Phone,Truck,ShieldCheck,HeartHandshake,MapPin,Check,ArrowRight} from "lucide-react";
import Navbar from "@/components/Navbar";
import {products} from "@/data/products";
import {SITE} from "@/lib/constants";

export default function Home(){
 const [cart,setCart]=useState<number[]>([]);
 const add=(id:number)=>setCart(c=>[...c,id]);
 return <>
  <Navbar/>
  <main>
   <section className="hero">
    <div className="container hero-grid">
     <div>
      <div className="eyebrow"><span className="dot"/> Gustul Greciei, la tine acasă</div>
      <h1>Produse autentice <span>din Grecia.</span></h1>
      <p>Descoperă gustul Mediteranei prin produse atent alese: ulei de măsline extravirgin, măsline, feta, miere, condimente și specialități grecești.</p>
      <div className="hero-actions"><a href="#stoc" className="btn btn-primary">Descoperă produsele <ArrowRight size={17}/></a><a href="#livrare" className="btn btn-secondary">Cum livrăm</a></div>
      <div className="badges"><span className="badge">🇬🇷 Selecție din Grecia</span><span className="badge">✓ Produse atent alese</span><span className="badge">🚚 Livrare rapidă</span></div>
     </div>
     <div className="hero-card">
      <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85" alt="Produse mediteraneene"/>
      <div className="badges"><span className="badge">Ulei de măsline</span><span className="badge">Kalamata</span><span className="badge">Feta</span></div>
     </div>
    </div>
   </section>

   <section id="servicii" className="section">
    <div className="container">
     <div className="section-head"><div><div className="kicker">Servicii</div><h2>Mai simplu să alegi bine.</h2></div><p>Am păstrat structura clară a site-ului original, dar am transformat-o într-o experiență dedicată produselor grecești.</p></div>
     <div className="features">
      <div className="feature"><div className="icon">🇬🇷</div><h3>Selecție grecească</h3><p>Produse inspirate de gastronomia autentică a Greciei.</p></div>
      <div className="feature"><div className="icon">🫒</div><h3>Ingrediente mediteraneene</h3><p>Uleiuri, măsline, condimente și specialități pentru masa de zi cu zi.</p></div>
      <div className="feature"><div className="icon">📦</div><h3>Ambalare atentă</h3><p>Pregătim comenzile pentru transport în condiții bune.</p></div>
      <div className="feature"><div className="icon">💬</div><h3>Comenzi ușoare</h3><p>Ne poți contacta rapid pentru produse, cantități sau disponibilitate.</p></div>
     </div>
    </div>
   </section>

   <section id="stoc" className="section alt">
    <div className="container">
     <div className="section-head"><div><div className="kicker">Stoc</div><h2>Produse din Grecia</h2></div><p>O selecție de produse de pornire. Catalogul real poate fi înlocuit ulterior cu lista furnizorilor tăi din Grecia.</p></div>
     <div className="products">{products.map(p=><article className="product" key={p.id}><img className="product-img" src={p.image} alt={p.name}/><div className="product-body"><div className="product-cat">{p.category}</div><h3>{p.name}</h3><p>{p.description}</p><div className="price">{p.price}</div><button className="product-btn" onClick={()=>add(p.id)}>Adaugă în coș</button></div></article>)}</div>
    </div>
   </section>

   <section id="buy-back" className="section">
    <div className="container split">
      <div><div className="kicker">Buy-Back</div><h2>Un concept nou, adaptat brandului.</h2><p style={{color:"#64748b",lineHeight:1.7,fontSize:17}}>Păstrăm secțiunea din meniul original și o transformăm într-un program de preluare/recumpărare pentru clienții business și partenerii care doresc să lucreze cu noi.</p><div className="list"><div><span className="check">✓</span><span>Evaluare și discuție individuală</span></div><div><span className="check">✓</span><span>Parteneriate pentru magazine și HoReCa</span></div><div><span className="check">✓</span><span>Comenzi recurente pentru produse grecești</span></div></div></div>
      <div className="info-card"><h3>Gustul Greciei, fără drum până în Grecia.</h3><p>Construim un catalog simplu, modern și ușor de comandat, pornind de la furnizori și produse reale.</p><a className="btn" style={{background:"#fff",color:"var(--blue)",border:0,marginTop:14}} href={`https://wa.me/${SITE.phoneRaw}`}>Vorbește cu noi</a></div>
    </div>
   </section>

   <section id="masini-la-comanda" className="section alt">
    <div className="container split">
      <div className="info-card"><h3>Comandă produse</h3><p>Nu găsești produsul dorit? Trimite-ne denumirea, fotografia sau marca și verificăm disponibilitatea.</p><a className="btn" style={{background:"#fff",color:"var(--blue)",border:0,marginTop:14}} href={`https://wa.me/${SITE.phoneRaw}`}>Solicită un produs</a></div>
      <div><div className="kicker">Comandă</div><h2>Din Grecia, la cererea ta.</h2><p style={{color:"#64748b",lineHeight:1.7,fontSize:17}}>Această secțiune păstrează locul din meniul original pentru comenzile speciale. Putem integra ulterior importul automat al catalogului unui furnizor.</p></div>
    </div>
   </section>

   <section id="livrare" className="section">
    <div className="container">
     <div className="section-head"><div><div className="kicker">Livrare</div><h2>Comanda ta, pregătită cu grijă.</h2></div><p>Livrarea, tarifele și zonele pot fi configurate după regulile reale ale magazinului.</p></div>
     <div className="features">
      <div className="feature"><Truck className="icon" color="var(--blue)"/><h3>Livrare la adresă</h3><p>Expediem comenzile către adresa indicată la plasarea comenzii.</p></div>
      <div className="feature"><ShieldCheck className="icon" color="var(--green)"/><h3>Ambalare sigură</h3><p>Produsele sunt pregătite pentru transport cu atenție la protecție.</p></div>
      <div className="feature"><MapPin className="icon" color="var(--blue)"/><h3>România</h3><p>Configurăm livrarea în funcție de județ, localitate și greutatea coletului.</p></div>
      <div className="feature"><HeartHandshake className="icon" color="var(--green)"/><h3>Suport</h3><p>Îți răspundem pentru disponibilitate, comenzi și întrebări despre produse.</p></div>
     </div>
    </div>
   </section>

   <section id="rate" className="section alt">
    <div className="container split"><div><div className="kicker">Rate</div><h2>Rămâne în meniu, dar îl facem util.</h2><p style={{color:"#64748b",lineHeight:1.7,fontSize:17}}>Secțiunea „Rate” poate deveni o zonă pentru abonamente, comenzi recurente pentru firme sau plata în tranșe, în funcție de modelul comercial ales.</p></div><div className="info-card"><h3>Comenzi recurente</h3><p>Potrivit pentru restaurante, pensiuni, magazine și clienți care cumpără regulat produse grecești.</p><div className="list"><div><span className="check">✓</span><span>Livrare periodică</span></div><div><span className="check">✓</span><span>Liste de produse personalizate</span></div></div></div></div>
   </section>

   <section id="recenzii" className="section">
    <div className="container"><div className="section-head"><div><div className="kicker">Recenzii</div><h2>Primele păreri pot veni aici.</h2></div><p>Zona este pregătită pentru recenziile reale ale clienților după lansare.</p></div>
    <div className="reviews"><div className="review"><div className="stars">★★★★★</div><p>„Uleiul de măsline a fost foarte aromat și livrarea rapidă.”</p><strong>Client verificat</strong></div><div className="review"><div className="stars">★★★★★</div><p>„Măslinele Kalamata sunt exact genul de produs pe care îl căutam.”</p><strong>Client verificat</strong></div><div className="review"><div className="stars">★★★★★</div><p>„Site simplu, produse interesante și comunicare foarte bună.”</p><strong>Client verificat</strong></div></div></div>
   </section>
  </main>

  <footer className="footer"><div className="container"><div className="footer-grid"><div><h3>gustulegeei.ro</h3><p>Produse autentice din Grecia. Ulei de măsline, măsline, feta, miere și specialități mediteraneene.</p></div><div><h3>Contact</h3><p><a href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a><br/><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div><div><h3>Navigare</h3><p><a href="#stoc">Produse</a><br/><a href="#livrare">Livrare</a><br/><a href="#recenzii">Recenzii</a></p></div></div><div className="footer-bottom">© 2026 gustulegeei.ro · Toate drepturile rezervate.</div></div></footer>
  <button className="cart" aria-label="Coș"><ShoppingBag/><span className="cart-count">{cart.length}</span></button>
 </>
}
