import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <Outlet />
            </SidebarProvider>
        </>
    );
}

export default App;
