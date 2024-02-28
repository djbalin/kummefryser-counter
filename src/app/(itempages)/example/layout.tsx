export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex sm:pt-12 min-h-[150vh] justify-center">
      {children}
    </main>
  );
}
