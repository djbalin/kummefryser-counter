export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 min-h-[150vh] flex justify-center">{children}</div>
  );
}
