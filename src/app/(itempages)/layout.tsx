import Header from "../ui/navbar/Header";

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