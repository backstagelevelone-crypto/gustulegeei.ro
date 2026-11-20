import Link from "next/link";

export default function LegalPage(){
  return <main className="legal-page">
    <div className="container legal-wrap">
      <Link href="/" className="legal-back">← Înapoi la gustulegeei.ro</Link>
      <div className="kicker">gustulegeei.ro</div>
      <h1>ANPC și soluționarea alternativă a litigiilor</h1>
      <div className="legal-content"><p>ANPC și soluționarea alternativă a litigiilor</p>
<p>Pentru informații oficiale privind protecția consumatorilor:<br/>ANPC – Autoritatea Națională pentru Protecția Consumatorilor<br/>https://anpc.ro/</p>
<p>Pentru soluționarea unei sesizări, clientul poate contacta mai întâi comerciantul la datele publicate în pagina „Contact”.</p>
<p>Informațiile despre procedura de soluționare alternativă a litigiilor și autoritatea competentă vor fi completate înainte de lansare, în funcție de forma juridică a comerciantului și de mecanismele aplicabile la momentul lansării.</p>
<p>Notă: nu introducem linkuri sau mecanisme care nu sunt aplicabile efectiv magazinului.</p></div>
    </div>
  </main>
}
