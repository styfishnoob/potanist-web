import { SidebarProvider, useSidebar } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";

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
    const { pathname } = useLocation();

    useEffect(() => {
        const sidebarHeader = document.querySelector("#sidebar-header");
        if (sidebarHeader) {
            window.scrollTo(0, 0);
            window.scrollBy(0, -sidebarHeader.clientHeight);
        }
    }, [pathname]);

    return (
        <ThemeProvider>
            <SidebarProvider>
                <SidebarController>
                    <AppSidebar />
                    <Outlet />
                </SidebarController>
            </SidebarProvider>
        </ThemeProvider>
    );
}

export default App;
