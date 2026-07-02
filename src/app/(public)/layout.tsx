import { Navbar } from "@/components/landing/layout/navbar";
import { Footer } from "@/components/landing/layout/footer";
import { FloatingAction } from "@/components/floating-action"

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
      <FloatingAction
        phoneNumber="+6285338851818"
        message="Halo Admin Kominfo, saya ingin mendapatkan informasi."
      />
    </>
  );
}