import { Navbar } from "@/components/landing/layout/navbar";
import { Footer } from "@/components/landing/layout/footer";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}