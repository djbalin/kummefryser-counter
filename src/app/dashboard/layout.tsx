export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-green-500 bg-opacity-20 min-h-screen flex justify-center">
      {children}
    </div>
  );
}
