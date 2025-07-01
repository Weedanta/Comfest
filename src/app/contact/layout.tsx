import NavbarContainer from "@/shared/layout/navbar/container/NavbarContainer";
import FooterContainer from "@/shared/layout/footer/container/FooterContainer";

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      
      {children}
      <FooterContainer />
    </>
  );
}
