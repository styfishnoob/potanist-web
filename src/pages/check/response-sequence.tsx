import { AppLayout } from "@/components/app-layout";
import { InputHex } from "@/components/input-hex";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";

import IconRaikou from "@/assets/pokemon-icon/raikou.png";
import IconEntei from "@/assets/pokemon-icon/entei.png";
import IconLati from "@/assets/pokemon-icon/lati.png";
import { InputNumberClamped } from "@/components/input-number-clamped";

import WorkerResponseSequence from "@/workers/check/response-sequence?worker";

export function CheckResponseSequence() {
    const reactRootRef = useRef<Root | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [initialSeed, setInitialSeed] = useState<string | null>("0");
    const [searchRange, setSearchRange] = useState<number | null>(10);
    const [checkedRaikou, setCheckedRaikou] = useState(true);
    const [checkedEntei, setCheckedEntei] = useState(true);
    const [checkedLati, setCheckedLati] = useState(true);

    const exeSearch = async () => {
        const output = document.querySelector("#output");
        if (!output) return;

        if (!reactRootRef.current) reactRootRef.current = createRoot(output);
        reactRootRef.current.render(<></>);
        setIsLoading(true);

        const parsedInitialSeed = parseInt(initialSeed ?? "0x0", 16);
        const roamingNum = [checkedRaikou, checkedEntei, checkedLati].filter(Boolean).length;
        const worker = new WorkerResponseSequence();
        const results: Map<number, number[]> = await new Promise((resolve) => {
            worker.onmessage = (event) => resolve(event.data);
            worker.postMessage({ initialSeed, roamingNum, searchRange });
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
                        <Result key={index} seed={key} targetSeed={parsedInitialSeed} responseTypes={value} />
                    ))
                )}
            </>
        );

        setIsLoading(false);
    };

    return (
        <AppLayout isLoading={isLoading} pageCategory="シード確認" pageName="Elm">
            <div className="flex items-center">
                <span className="w-[7rem]">初期シード</span>
                <div className="flex items-center gap-1.5">
                    <span>0x</span>
                    <InputHex value={initialSeed} maxLength={8} className="w-[8rem]" onChange={setInitialSeed} />
                </div>
            </div>
            <div className="flex items-center">
                <span className="w-[7rem]">徘徊ポケモン</span>
                <div className="flex gap-5">
                    <div className="flex items-center gap-2.5">
                        <img src={IconRaikou} style={{ imageRendering: "pixelated" }} />
                        <Checkbox checked={checkedRaikou} onCheckedChange={() => setCheckedRaikou((prev) => !prev)} />
                    </div>
                    <div className="flex items-center gap-2.5">
                        <img src={IconEntei} style={{ imageRendering: "pixelated" }} />
                        <Checkbox checked={checkedEntei} onCheckedChange={() => setCheckedEntei((prev) => !prev)} />
                    </div>
                    <div className="flex items-center gap-2.5">
                        <img src={IconLati} style={{ imageRendering: "pixelated" }} />
                        <Checkbox checked={checkedLati} onCheckedChange={() => setCheckedLati((prev) => !prev)} />
                    </div>
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

function Result(props: { seed: number; targetSeed: number; responseTypes: number[] }) {
    return (
        <div className={`${props.seed == props.targetSeed ? "text-primary" : ""} py-[1rem]`}>
            <div className="flex">
                <span className="block w-[6rem]">初期シード</span>
                <span>: 0x{props.seed.toString(16)}</span>
            </div>
            <div className="flex">
                <span className="w-[6rem]">ウツギ</span>
                <span className="mr-1">:</span>
                {props.responseTypes.map((r, index) => (
                    <span key={index} className="w-[1rem]">
                        {r}
                    </span>
                ))}
            </div>
            <div className="flex">
                <span className="w-[6rem]">マイク</span>
                <span className="mr-1">:</span>
                {props.responseTypes.map((r, index) => (
                    <span key={index} className="w-[1rem]">
                        {r}
                    </span>
                ))}
            </div>
        </div>
    );
}
