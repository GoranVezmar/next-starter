import { withAuth } from "@/utils/with-auth";

import { Dashboard } from "@/components/dashboard/dashboard";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return withAuth({
    handler: async (user) => <Dashboard user={user}>{children}</Dashboard>,
    shouldUserExist: true,
    redirectUrl: "/sign-in",
  });
};

export default DashboardLayout;
