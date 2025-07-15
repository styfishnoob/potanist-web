import { MainWindow } from "@/components/main-window";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

type Props = {
    children: React.ReactNode;
    isLoading: boolean;
    pageCategory: string;
    pageName: string;
};

export function AppLayout(props: Props) {
    return (
        <SidebarInset>
            <header
                id="sidebar-header"
                className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-49"
            >
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <span>{props.pageCategory}</span>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{props.pageName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto">
                    <ThemeToggle />
                </div>
            </header>
            <MainWindow isLoading={props.isLoading}>{props.children}</MainWindow>
        </SidebarInset>
    );
}
