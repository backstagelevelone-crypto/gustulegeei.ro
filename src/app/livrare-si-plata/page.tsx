import Link from "next/link";

export default function LegalPage(){
  return <main className="legal-page">
    <div className="container legal-wrap">
      <Link href="/" className="legal-back">← Înapoi la gustulegeei.ro</Link>
      <div className="kicker">gustulegeei.ro</div>
      <h1>Livrare și plată</h1>
      <div className="legal-content"><p>Livrare și plată</p>
<p>Metode de plată<br/>• Plata online cu cardul – prin procesatorul de plăți configurat de comerciant.<br/>• Alte metode de plată – vor fi afișate numai după activarea lor.</p>
<p>Livrare<br/>• Curier: [DE COMPLETAT]<br/>• Zone de livrare: [DE COMPLETAT]<br/>• Cost transport: [DE COMPLETAT]<br/>• Termen estimat: [DE COMPLETAT]</p>
<p>Costul și condițiile exacte vor fi afișate în checkout înainte de trimiterea comenzii.</p>
<p>Produsele alimentare<br/>Pentru produsele alimentare, condițiile de transport, temperatură, termen de valabilitate și eventualele restricții trebuie stabilite în funcție de produs și de furnizor.</p>
<p>Notă: informațiile dintre paranteze trebuie completate înainte de lansarea comercială.</p></div>
    </div>
  </main>
}
