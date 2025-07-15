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

import WorkerRoamersLocation from "@/workers/check/roamers-location?worker";

export function CheckRoamersLocation() {
    const reactRootRef = useRef<Root | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [initialSeed, setInitialSeed] = useState<string | null>("0");
    const [searchRange, setSearchRange] = useState<number | null>(10);
    const [roamingRaikou, setroamingRaikou] = useState(true);
    const [roamingEntei, setroamingEntei] = useState(true);
    const [roamingLati, setroamingLati] = useState(true);

    const exeSearch = async () => {
        const output = document.querySelector("#output");
        if (!output) return;

        if (!reactRootRef.current) reactRootRef.current = createRoot(output);
        reactRootRef.current.render(<></>);
        setIsLoading(true);

        const parsedInitialSeed = parseInt(initialSeed ?? "0x0", 16);
        const worker = new WorkerRoamersLocation();
        const results: Map<number, [number[], boolean[]]> = await new Promise((resolve) => {
            worker.onmessage = (event) => resolve(event.data);
            worker.postMessage({ parsedInitialSeed, roamingRaikou, roamingEntei, roamingLati, searchRange });
        });
        const sortedResults = Array.from(results.entries()).sort(([a], [b]) => a - b);

        reactRootRef.current.render(
            <>
                {sortedResults.length === 0 ? (
                    <div className="py-[1rem]">
                        <span>条件に合うものは見つかりませんでした。</span>
                    </div>
                ) : (
                    sortedResults.map(([key, tupple], index) => (
                        <Result key={index} seed={key} targetSeed={parsedInitialSeed} tupple={tupple} />
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
                        <Checkbox checked={roamingRaikou} onCheckedChange={() => setroamingRaikou((prev) => !prev)} />
                    </div>
                    <div className="flex items-center gap-2.5">
                        <img src={IconEntei} style={{ imageRendering: "pixelated" }} />
                        <Checkbox checked={roamingEntei} onCheckedChange={() => setroamingEntei((prev) => !prev)} />
                    </div>
                    <div className="flex items-center gap-2.5">
                        <img src={IconLati} style={{ imageRendering: "pixelated" }} />
                        <Checkbox checked={roamingLati} onCheckedChange={() => setroamingLati((prev) => !prev)} />
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

function Result(props: { seed: number; targetSeed: number; tupple: [number[], boolean[]] }) {
    let index = 0;
    let icons = [IconRaikou, IconEntei, IconLati];

    return (
        <div className={`${props.seed == props.targetSeed ? "text-primary" : ""} py-[1rem]`}>
            <div className="flex">
                <span className="block w-[5rem]">初期シード</span>
                <span className="mr-[0.25rem]">:</span>
                <span>0x{props.seed.toString(16)}</span>
            </div>
            <div className="flex">
                <span className="block w-[5rem]">徘徊位置</span>
                <span className="mr-[0.25rem]">:</span>
                <div className="flex gap-2.5">
                    {props.tupple[1].map((flag, i) => {
                        if (flag) {
                            const value = props.tupple[0][index++];
                            return (
                                <div key={i} className="flex items-center gap-1">
                                    <img src={icons[i]} style={{ imageRendering: "pixelated" }} />
                                    <span>{value}</span>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
}
