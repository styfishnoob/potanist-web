import { Link, useLocation } from "react-router-dom";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";

const data = {
    navMain: [
        {
            title: "シード検索",
            url: "/search",
            items: [
                {
                    title: "固定シンボル",
                    url: "/search/static-encounter",
                },
                {
                    title: "ふしぎなおくりもの",
                    url: "/search/mystery-gift",
                },
                {
                    title: "タマゴ性格値",
                    url: "/search/egg-pid",
                },
                {
                    title: "タマゴ個体値",
                    url: "/search/egg-iv",
                },
            ],
        },
        {
            title: "シード確認",
            url: "/check",
            items: [
                {
                    title: "ウツギ電話",
                    url: "/check/response-sequence",
                },
                {
                    title: "徘徊位置",
                    url: "/check/roamers-location",
                },
                {
                    title: "コイントス",
                    url: "/check/coin-flip",
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation();

    return (
        <Sidebar {...props}>
            <SidebarHeader className="p-0"></SidebarHeader>
            <SidebarContent className="p-6 gap-0 divide-y">
                {data.navMain.map((item) => (
                    <SidebarGroup className="py-2.5 px-0" key={item.title}>
                        <SidebarGroupLabel className="text-sm px-0 font-bold">{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            className="px-0 py-1 h-auto hover:bg- hover:text- active:bg-"
                                            asChild
                                        >
                                            <Link
                                                className={`px-0 py-1 h-auto font-medium pl-[1rem] ${
                                                    location.pathname === item.url ? "text-primary/90" : ""
                                                }`}
                                                to={item.url}
                                            >
                                                <span>-</span>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
