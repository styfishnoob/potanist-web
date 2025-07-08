type Props = {
    showDone: boolean;
    children: React.ReactNode;
};

export function MainWindow(props: Props) {
    return (
        <main className="flex flex-col divide-y md:flex-row md:divide-x w-full h-full">
            <section className="flex flex-col gap-2.5 p-5 border-r-1">{props.children}</section>
            <section className="w-full h-[calc(100vh-4rem)]">
                <div className="relative w-full h-full p-5">
                    <span
                        hidden={!props.showDone}
                        className="absolute z-10000 w-[4rem] bg-green-500 top-10 right-10 text-center text-sm text-white p-1 rounded-xs"
                    >
                        DONE!
                    </span>
                    <div
                        id="output"
                        className="w-full h-full overflow-auto flex flex-col px-5 bg-black divide-y-1 rounded-md text-white text-sm dark:border dark:border-chart-2"
                    ></div>
                </div>
            </section>
        </main>
    );
}
