export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-12 sm:pt-12 min-h-[150vh] flex justify-center">
      {children}
    </div>
  );
}
