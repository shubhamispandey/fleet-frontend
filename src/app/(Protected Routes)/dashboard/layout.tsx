import { ReactNode } from "react";
import Navbar from "@/components/dashboardNavigation/Nav";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
