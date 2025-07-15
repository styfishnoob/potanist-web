import { useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";

import { AppLayout } from "@/components/app-layout";
import { InputHex } from "@/components/input-hex";
import { InputNumberClamped } from "@/components/input-number-clamped";
import { Button } from "@/components/ui/button";

import WorkerCoinFlip from "@/workers/check/coin-flip?worker";

export function CheckCoinFlip() {
    const reactRootRef = useRef<Root | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [initialSeed, setInitialSeed] = useState<string | null>("0");
    const [searchRange, setSearchRange] = useState<number | null>(10);

    const exeSearch = async () => {
        const output = document.querySelector("#output");
        if (!output) return;

        if (!reactRootRef.current) reactRootRef.current = createRoot(output);
        reactRootRef.current.render(<></>);
        setIsLoading(true);

        const parsedInitialSeed = parseInt(initialSeed ?? "0x0", 16);
        const worker = new WorkerCoinFlip();
        const results: Map<number, boolean[]> = await new Promise((resolve) => {
            worker.onmessage = (event) => resolve(event.data);
            worker.postMessage({ initialSeed, searchRange });
        });
        const sortedResults = Array.from(results.entries()).sort(([a], [b]) => a - b);

        reactRootRef.current.render(
            <>
                {sortedResults.length === 0 ? (
                    <div className="py-[1rem]">
                        <span>条件に合うものは見つかりませんでした。</span>
                    </div>
                ) : (
                    sortedResults.map(([key, value], index) => (
                        <Result key={index} seed={key} targetSeed={parsedInitialSeed} coinFlipResults={value} />
                    ))
                )}
            </>
        );

        setIsLoading(false);
    };

    return (
        <AppLayout isLoading={isLoading} pageCategory="確認" pageName="コイントス">
            <div className="flex items-center">
                <span className="w-[7rem]">初期シード</span>
                <div className="flex items-center gap-1.5">
                    <span>0x</span>
                    <InputHex value={initialSeed} maxLength={8} className="w-[8rem]" onChange={setInitialSeed} />
                </div>
            </div>
            <div className="flex items-center">
                <span className="w-[7rem]">検索範囲</span>
                <InputNumberClamped
                    className="w-[5rem]"
                    value={searchRange}
                    min={10}
                    max={100}
                    onChange={setSearchRange}
                />
            </div>
            <div className="flex pt-3 items-center">
                <Button className="w-full text-[oklch(0.985_0_0)] md:min-w-[340px]" onClick={exeSearch}>
                    実行
                </Button>
            </div>
        </AppLayout>
    );
}

function Result(props: { seed: number; targetSeed: number; coinFlipResults: boolean[] }) {
    return (
        <div className={`${props.seed == props.targetSeed ? "text-primary" : ""} py-[1rem]`}>
            <div className="flex">
                <span className="block w-[6rem]">初期シード</span>
                <span>: 0x{props.seed.toString(16)}</span>
            </div>
            <div className="flex">
                <span className="w-[6rem]">コイントス</span>
                <span className="mr-1">:</span>
                {props.coinFlipResults.map((result, index) => (
                    <span className="mr-[0.25rem]" key={index}>
                        {result ? "○" : "×"}
                    </span>
                ))}
            </div>
        </div>
    );
}
