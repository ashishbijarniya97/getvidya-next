import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth/admin";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — GetVidya", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 ml-64 transition-all duration-300 min-h-screen">
        {children}
      </main>
    </div>
  );
}
