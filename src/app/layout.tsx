
import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={
 metadataBase:new URL("https://gustulegeei.ro"),
 title:{default:"gustulegeei.ro | Produse autentice din Grecia",template:"%s | gustulegeei.ro"},
 description:"Produse autentice din Grecia: ulei de măsline, măsline Kalamata, feta, miere și specialități grecești.",
 keywords:["produse grecești","Grecia","ulei de măsline","măsline Kalamata","feta","gustulegeei.ro"],
 openGraph:{title:"gustulegeei.ro – Gustul Greciei, la tine acasă",description:"Produse autentice din Grecia.",url:"https://gustulegeei.ro",siteName:"gustulegeei.ro",locale:"ro_RO",type:"website"},
 alternates:{canonical:"https://gustulegeei.ro"}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ro"><body>{children}</body></html>}
