import "./globals.css";
// import { cookies } from 'next/headers'
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "Inje University dclabs",
  description: "Inje University dclabs - Graduate School of Design",
};

export default async function RootLayout({ children }) {

  // const cookieStore = await cookies();
  // const token = cookieStore.get('admin_token')?.value;

  return (
    <html>
      <body className="layout">
        <Analytics />
        <main className="content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}