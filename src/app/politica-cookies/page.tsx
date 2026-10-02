import Link from "next/link";

export default function LegalPage(){
  return <main className="legal-page">
    <div className="container legal-wrap">
      <Link href="/" className="legal-back">← Înapoi la gustulegeei.ro</Link>
      <div className="kicker">gustulegeei.ro</div>
      <h1>Politica de cookies</h1>
      <div className="legal-content"><p>Politica de cookies – gustulegeei.ro</p>
<p>1. Ce sunt cookie-urile<br/>Cookie-urile sunt fișiere mici stocate pe dispozitivul utilizatorului. Unele sunt necesare pentru funcționarea site-ului, iar altele pot fi folosite pentru statistici, preferințe sau marketing.</p>
<p>2. Cookie-uri necesare<br/>Cookie-urile strict necesare pot fi folosite pentru funcții precum coșul de cumpărături, autentificarea și securitatea sesiunii.</p>
<p>3. Cookie-uri opționale<br/>Cookie-urile de analiză, marketing sau alte categorii care necesită consimțământ vor fi activate numai după alegerea utilizatorului, conform mecanismului de consimțământ implementat.</p>
<p>4. Gestionarea preferințelor<br/>Utilizatorul trebuie să poată accepta, refuza sau modifica preferințele pentru categoriile de cookie-uri opționale.</p>
<p>5. Terți<br/>Dacă sunt folosite servicii terțe, precum analiză, publicitate, hărți, chat sau alte integrări, lista serviciilor și scopurile acestora trebuie completate aici.</p>
<p>6. Contact<br/>Pentru întrebări privind cookie-urile: [E-MAIL].</p>
<p>Notă: lista reală a cookie-urilor trebuie generată după implementarea efectivă a site-ului și a serviciilor terțe. Nu vom publica o listă inventată.</p></div>
    </div>
  </main>
}
