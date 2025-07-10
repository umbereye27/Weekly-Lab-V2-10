// import { ProtectedRoute } from "@/component/protected-route";

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      <main>{children}</main>
    </div>
    // </ProtectedRoute>
  );
}
