# gustulegeei.ro

Magazin Next.js pentru produse grecești. Include catalog, coș persistent în browser, checkout și endpoint server pentru înregistrarea comenzilor în Supabase.

## Cerințe
- Node.js 20+
- Proiect Supabase
- Domeniu HTTPS pentru producție

## Instalare locală
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Configurare Supabase
1. Deschide proiectul în Supabase.
2. Intră în SQL Editor.
3. Rulează integral `supabase/schema.sql`. Scriptul creează tabelele `products`, `orders`, `order_items`, activează RLS și introduce/actualizează cele 20 de produse din catalog.
4. Copiază Project URL și anon/public key în `.env.local`.
5. Copiază `service_role` key în `SUPABASE_SERVICE_ROLE_KEY`. Această cheie este secretă și trebuie păstrată exclusiv pe server.
6. Repornește serverul Next.js.

Catalogul este citit din tabelul `products` când Supabase este configurat. Dacă variabilele lipsesc, homepage-ul afișează catalogul demonstrativ local, însă trimiterea comenzilor este dezactivată.

## Fluxul de comandă
- Coșul este păstrat în `localStorage`.
- Checkout-ul trimite numai ID-urile produselor și cantitățile.
- API-ul server verifică produsele și prețurile în Supabase; nu are încredere în prețurile trimise de browser.
- Comenzile ramburs sunt salvate în `orders`, iar liniile în `order_items`.
- API-ul nu expune cheia `service_role` în browser.

## Plăți și livrare – înainte de producție
- Checkout-ul afișează ramburs și card. În această livrare, comenzile ramburs sunt înregistrate în Supabase.
- Plata NETOPIA cu cardul NU este activată încă: trebuie configurat contul comerciant, API key, POS Signature și trebuie finalizate endpoint-urile de inițiere, redirect/3-D Secure și verificarea notificărilor (IPN) folosind mecanismul oficial NETOPIA. Nu marca nicio comandă drept plătită doar pe baza redirectului browserului.
- Transportul este momentan necalculat și se confirmă separat. Configurează tariful real de livrare și regulile de transport înainte să accepți comenzi publice.
- Înainte de lansare, adaugă autentificare pentru panoul de administrare, notificări email, rate limiting/anti-spam și flux de actualizare/reducere atomică a stocului.
- Produsele și prețurile din `supabase/schema.sql` sunt DEMONSTRATIVE. Înlocuiește-le cu catalogul real și verifică TVA, gramaj, disponibilitate și informațiile obligatorii pentru alimente.

## Build
```bash
npm run build
npm start
```

## Catalog inițial – 20 de produse

Catalogul conține 20 de poziții propuse (5 uleiuri, 5 sortimente de măsline, 5 tipuri de miere și 5 condimente/plante). Am înlocuit imaginile generice repetate cu fotografii distincte ale unor ambalaje comerciale reale pentru produse grecești, găzduite pe site-uri de producători și comercianți. Aceste imagini sunt încărcate de pe domenii externe (hotlink); nu avem confirmarea drepturilor de reutilizare. Înainte de lansarea comercială, cere furnizorilor fotografiile oficiale și acordul de utilizare, apoi găzduiește-le în propriul Supabase Storage. Prețurile și disponibilitatea sunt orientative; verifică SKU-ul, gramajul, ingredientele, originea, certificările (inclusiv PDO/organic) și prețul de achiziție.

Pentru ca cele 20 de produse să apară și când aplicația citește catalogul din Supabase, rulează din nou fișierul `supabase/schema.sql` în Supabase Dashboard → SQL Editor. Secțiunea de seed folosește `ON CONFLICT (id) DO UPDATE`, deci actualizează pozițiile cu ID 1–20. Nu rula fișierul pe o bază de date care conține deja produse comerciale cu aceleași ID-uri fără să verifici întâi datele.
