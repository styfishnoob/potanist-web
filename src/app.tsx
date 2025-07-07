import { SidebarProvider, useSidebar } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

function SidebarController({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    const { setOpenMobile, isMobile } = useSidebar();

    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false);
        }
    }, [location.pathname, setOpenMobile, isMobile]);

    return <>{children}</>;
}

function App() {
    return (
        <>
            <SidebarProvider>
                <SidebarController>
                    <AppSidebar />
                    <Outlet />
                </SidebarController>
            </SidebarProvider>
        </>
    );
}

export default App;
