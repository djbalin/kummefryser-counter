import Header from "../ui/navbar/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header></Header>
      {/* </Suspense> */}
      {children}
    </>
  );
}
