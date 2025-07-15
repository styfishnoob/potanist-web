import { Loader2 } from "lucide-react";

type Props = {
    isLoading: boolean;
    children: React.ReactNode;
};

export function MainWindow(props: Props) {
    return (
        <main className="flex flex-col divide-y md:flex-row md:divide-x w-full h-full">
            <section className="flex flex-col gap-2.5 p-5 border-r-1">{props.children}</section>
            <section className="w-full h-[calc(100vh-4rem)]">
                <div className="relative w-full h-full p-5">
                    {props.isLoading && (
                        <Loader2 className="absolute z-10000 w-[4rem] text-white top-10 right-5 mr-2 h-7 animate-spin" />
                    )}
                    <div
                        id="output"
                        className="w-full h-full overflow-auto flex flex-col px-5 bg-black divide-y-1 rounded-md text-white text-sm dark:border dark:border-chart-2 dark:divide-chart-2"
                    ></div>
                </div>
            </section>
        </main>
    );
}
