import FooterContainer from "@/shared/layout/footer/container/FooterContainer";
import NavbarContainer from "@/shared/layout/navbar/container/NavbarContainer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarContainer />
      {children}
      <FooterContainer />
    </>
  );
}
