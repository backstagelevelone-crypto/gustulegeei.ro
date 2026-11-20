import Link from "next/link";

export default function LegalPage(){
  return <main className="legal-page">
    <div className="container legal-wrap">
      <Link href="/" className="legal-back">← Înapoi la gustulegeei.ro</Link>
      <div className="kicker">gustulegeei.ro</div>
      <h1>Contact</h1>
      <div className="legal-content"><p>Contact gustulegeei.ro</p>
<p>Denumire societate: [DE COMPLETAT]<br/>CUI: [DE COMPLETAT]<br/>Nr. Registrul Comerțului: [DE COMPLETAT]<br/>Adresă sediu: [DE COMPLETAT]</p>
<p>E-mail: [DE COMPLETAT]<br/>Telefon: [DE COMPLETAT]</p>
<p>Program suport:<br/>[Luni–Vineri, orele – DE COMPLETAT]</p>
<p>Pentru întrebări despre produse, comenzi, livrare sau retur, folosește datele de contact de mai sus.</p></div>
    </div>
  </main>
}
