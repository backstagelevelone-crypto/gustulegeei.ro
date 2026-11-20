-- gustulegeei.ro – schema inițială pentru magazin
-- Rulează în Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.products (
  id bigint primary key,
  name text not null,
  category text not null,
  price numeric(10,2) not null check (price >= 0),
  description text not null default '',
  image text not null default '',
  active boolean not null default true,
  stock_quantity integer null check (stock_quantity is null or stock_quantity >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  county text not null,
  city text not null,
  postal_code text not null default '',
  address text not null,
  notes text not null default '',
  payment_method text not null check (payment_method in ('cash_on_delivery','card')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','pending','paid','failed','refunded')),
  order_status text not null default 'new' check (order_status in ('new','confirmed','processing','shipped','completed','cancelled')),
  subtotal numeric(10,2) not null check (subtotal >= 0),
  shipping numeric(10,2) not null default 0 check (shipping >= 0),
  total numeric(10,2) not null check (total >= 0),
  currency text not null default 'RON',
  netopia_ntp_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id bigint references public.products(id) on delete set null,
  product_name text not null,
  unit_price numeric(10,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0 and quantity <= 99),
  line_total numeric(10,2) not null check (line_total >= 0),
  created_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_status_idx on public.orders(order_status, payment_status);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Public can read active products" on public.products;
create policy "Public can read active products"
  on public.products for select
  using (active = true);

-- Nu există politici publice de INSERT/UPDATE/DELETE pentru comenzi.
-- Scrierile sunt făcute exclusiv din API-ul serverului cu SUPABASE_SERVICE_ROLE_KEY.
-- Cheia service role nu trebuie expusă niciodată în browser.

insert into public.products (id, name, category, price, description, image, active)
values
 (1,'Terra Creta Traditional – ulei extravirgin 500 ml','Uleiuri',79.90,'Ulei extravirgin grecesc din soiul Koroneiki, produs de Terra Creta în Creta. Fotografie de produs Terra Creta.','https://edesma.de/thumbnail/12/7e/87/1695370185/final-big-traditional-extra-front_1920x1920.jpg',true),
 (2,'Iliada Peza PDO – ulei extravirgin 500 ml','Uleiuri',84.90,'Ulei extravirgin Iliada din regiunea Peza, Creta. Verifică mențiunea PDO și gramajul pe ambalajul lotului aprovizionat.','https://shop.falesca.com/cdn/shop/files/removal.ai__d362bf57-3e86-4c85-9cc6-1cb009e0708b.png?v=1687905220',true),
 (3,'Pamako Organic – ulei extravirgin 500 ml','Uleiuri',119.90,'Ulei extravirgin premium Pamako, prezentat în recipient ceramic și cutie cadou. Confirmă varianta și gramajul la furnizor.','https://olivetreespecial.gr/420-large_default/pamako-olive-oil-premium-monovarietal-organic-evoo-500-ml-gift-box.jpg',true),
 (4,'Odysea Extra Virgin – ulei de măsline 750 ml','Uleiuri',89.90,'Ulei extravirgin Odysea din Creta, realizat din măsline Koroneiki. Fotografia prezintă sticla de 750 ml.','https://ca.yachew.com/cdn/shop/files/719r3ACHZ_L.jpg?v=1759114174',true),
 (5,'Terra Creta Estate – ulei extravirgin 500 ml','Uleiuri',74.90,'Ulei extravirgin Terra Creta din soiul Koroneiki, cu profil fructat echilibrat. Verifică varianta exactă înainte de listarea comercială.','https://www.houseoforganic.fi/cdn/shop/files/terra-creta-extra-virgin-olive-oil-estate-500ml-0690da19369f61.jpg?v=1763617249',true),
 (6,'Iliada Kalamata – măsline întregi 370 g','Măsline',29.90,'Măsline Kalamata Iliada în borcan. Gramajul fotografiei este 370 g; confirmă gramajul și eticheta lotului primit.','https://cdn11.bigcommerce.com/s-kg39v/images/stencil/800x800/products/1389/2617/1__61230.1621948157.jpg?c=2',true),
 (7,'Gaea Kalamata – măsline fără sâmburi 290 g','Măsline',32.90,'Măsline Kalamata Gaea fără sâmburi, în borcan. Fotografia prezintă ambalajul comercial al produsului.','https://bluepassionkw.com/cdn/shop/files/GAEA-KUW37-Organic-Pitted-Kalamata-Olives-290g-1.jpg?crop=center&height=600&v=1706033194&width=630',true),
 (8,'Siouras Chalkidiki – măsline verzi umplute','Măsline',34.90,'Măsline verzi Chalkidiki umplute cu lămâie, de la producătorul grec Siouras. Verifică umplutura și gramajul exact la furnizor.','https://shop.themediterraneandish.com/cdn/shop/files/greek-olives-7.jpg?v=1716920576',true),
 (9,'Olymp – selecție de măsline grecești','Măsline',27.90,'Selecție de măsline grecești Olymp, cu sortimente verzi și Kalamata. Imaginea prezintă gama de borcane; alege SKU-ul exact la aprovizionare.','https://www.redcreative.gr/sites/default/files/2023-06/Olymp_Olives_06.jpg',true),
 (10,'Kalantzis Foods – măsline Kalamata și verzi','Măsline',31.90,'Gama Kalantzis Foods include măsline Kalamata și măsline verzi în borcane. Fotografia prezintă mai multe variante ale producătorului grec.','https://kalantzisfoods.com/images/Kalantzis%20Foods%20-%20Glass%20Jars.jpg',true),
 (11,'Attiki – miere grecească wild flora & thyme 455 g','Miere',39.90,'Miere grecească Attiki din flori sălbatice și cimbru. Fotografia prezintă borcanul Attiki de 455 g.','https://www.asiacontinental.co.uk/cdn/shop/files/Attikigreekhoney.png?v=1752156056&width=1445',true),
 (12,'Meligyris – miere de cimbru din Creta','Miere',42.90,'Miere de cimbru Meligyris din Creta, cu ambalajul comercial prezentat în fotografie. Gramajul se confirmă la furnizor.','https://www.cheesyplace.com/cdn/shop/files/IMG-5327_1200x1200.jpg?v=1758044953',true),
 (13,'Meligyris – miere cu fagure 450 g','Miere',44.90,'Miere grecească Meligyris cu bucăți de fagure, în borcan de 450 g. Verifică lotul și disponibilitatea.','https://meligyris.com/cdn/shop/files/Meligyris-honey-with-honeycomb-450g.jpg?v=1691380013',true),
 (14,'Odysea – miere grecească de pin și brad 480 g','Miere',36.90,'Miere Odysea de pin și brad, produs grecesc în borcan de 480 g. Fotografia prezintă ambalajul comercial.','https://static.wixstatic.com/media/ed338a_b16a3c0912e649ffa2a06131d1b9be05~mv2.jpg/v1/fill/w_600%2Ch_600%2Cal_c%2Cq_80%2Cenc_avif%2Cquality_auto/ed338a_b16a3c0912e649ffa2a06131d1b9be05~mv2.jpg',true),
 (15,'Attiki – miere grecească de brad','Miere',41.90,'Miere de brad Attiki, sortiment prezentat de producătorul grec Attiki-Pittas. Confirmă gramajul și ambalajul disponibil.','https://s1.sklavenitis.gr/images/ProductDetail/files/ProductMedia/Products/1572252/1.jpg',true),
 (16,'Othrys Farms – oregano grecesc 50 g','Condimente',14.90,'Oregano grecesc Othrys Farms, ambalat în pachet de 50 g. Fotografia prezintă produsul ambalat.','https://brettosplaka.com/cdn/shop/files/Oregano50gr.jpg?v=1682838843&width=1946',true),
 (17,'Krokos Kozanis PDO – șofran grecesc 0,5 g','Condimente',39.90,'Șofran Krokos Kozanis, cu denumire de origine protejată. Verifică certificarea, gramajul și sigiliile de pe produsul aprovizionat.','https://www.bakerybits.co.uk/media/catalog/product/cache/b9ab49d5389bbd5102928d4e8c6e63c1/b/b/bbits_apr26293487.jpg',true),
 (18,'Symbeeosis – ceai de munte și dittany','Condimente',19.90,'Amestec de ceai organic de munte grecesc și dittany de la Symbeeosis. Fotografia prezintă cutia comercială.','https://www.greekflavours.com/cdn/shop/files/greek-organic-mountain-tea-and-dittany-195g-symbeeosis-352225.jpg?v=1741707874',true),
 (19,'Dictamus – selecție de plante aromatice din Creta','Condimente',24.90,'Selecție de plante aromatice cretane Dictamus, cu ambalaje pentru infuzii și plante tradiționale. Verifică sortimentul exact la furnizor.','https://atasteofcrete.co.uk/cdn/shop/collections/5_Teas_with_Herbs.png?v=1762969508&width=1500',true),
 (20,'My Land – set de oregano, rozmarin și cimbru','Condimente',29.90,'Set de plante aromatice grecești My Land: oregano, rozmarin și cimbru. Fotografia prezintă setul de trei pachete.','https://my-land.co/cdn/shop/files/71qoppE1SHL_2048x.jpg?v=1783320436',true)
on conflict (id) do update set
  name = excluded.name, category = excluded.category, price = excluded.price,
  description = excluded.description, image = excluded.image, active = excluded.active;
