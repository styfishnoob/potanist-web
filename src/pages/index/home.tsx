import { Breadcrumb, BreadcrumbList, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export function Home() {
    return (
        <SidebarInset>
            <header className="sticky top-0 bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4 z-49">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="md:block">
                            <span>Home</span>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <main className="p-5">
                <section className="px-5 pt-5">
                    <span className="text-3xl font-semibold">ようこそ</span>
                </section>
                <section className="flex flex-col gap-5 p-5">
                    <div>
                        <p className="pb-0.5">本システムはDPPt/HGSSに対応した4世代用乱数調整ツールです。</p>
                        <p className="py-0.5">Webアプリのため、スマホのみでの乱数調整が可能です。</p>
                        <p className="pt-0.5">
                            PCを持っていないため乱数調整を諦めていた方もぜひ乱数調整に挑戦してみてください。
                        </p>
                    </div>
                </section>
            </main>
        </SidebarInset>
    );
}
