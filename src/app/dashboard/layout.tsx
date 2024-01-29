export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex pt-12 sm:pt-12 min-h-[150vh] justify-center">
      {children}
    </div>
  );
}
