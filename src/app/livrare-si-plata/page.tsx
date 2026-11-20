import Link from "next/link";

export default function LegalPage(){
  return <main className="legal-page">
    <div className="container legal-wrap">
      <Link href="/" className="legal-back">← Înapoi la gustulegeei.ro</Link>
      <div className="kicker">gustulegeei.ro</div>
      <h1>Livrare și plată</h1>
      <div className="legal-content">
        <p><strong>Costul livrării</strong></p>
        <p>• Transport gratuit pentru comenzile cu valoare de minimum 400 lei.<br/>• Pentru comenzile sub 400 lei, costul transportului este de 69 lei.</p>
        <p>Valoarea transportului este calculată automat în coș și afișată înainte de trimiterea comenzii.</p>
        <p><strong>Metode de plată</strong><br/>• Ramburs la livrare – plătești curierului la primirea coletului.<br/>• Plata online cu cardul – va fi disponibilă după activarea și testarea procesatorului de plăți.</p>
        <p><strong>Livrare</strong><br/>• Zone de livrare: România.<br/>• Costul transportului este cel afișat în coș și în pagina de finalizare a comenzii.<br/>• Termenul estimat de livrare va fi comunicat la confirmarea comenzii.</p>
        <p><strong>Produsele alimentare</strong><br/>Produsele sunt ambalate pentru transport. Condițiile specifice de păstrare și manipulare sunt indicate, după caz, în descrierea produsului.</p>
      </div>
    </div>
  </main>
}
