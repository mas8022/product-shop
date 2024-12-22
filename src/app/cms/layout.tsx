import React, { ReactNode } from "react";
import CmsSideBar from "@/components/templates/CmsSideBar";
import CmsNavbar from "@/components/templates/CmsNavbar";
import CmsScroller from "@/components/templates/cmsScroller";
import ResetToken from "../../../utils/resetToken";
import { redirect } from "next/navigation";
import { MeRole } from "../../../utils/me";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps): Promise<JSX.Element> => {
  const userRoll = await MeRole();
  if (!userRoll || userRoll !== "ADMIN") {
    return redirect("/login");
  }

  return (
    <>
      <div className="hidden-scrollbar w-full h-screen fixed top-0 left-0 overflow-y-scroll bg-first z-[2000] flex">
        <CmsSideBar />
        <div className="hidden-scrollbar sm:w-5/6 w-full h-screen overflow-y-scroll relative">
          <CmsNavbar />
          <div className="w-full sm:p-12 p-6">{children}</div>
        </div>
        <CmsScroller />
      </div>
    </>
  );
};

export default Layout;
