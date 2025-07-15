import { useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AppLayout } from "@/components/app-layout";
import { InputIVRange } from "@/components/input-iv-range";
import { InputNumberClamped } from "@/components/input-number-clamped";

import type { IVRangesWithIgnore, IVRangeWithIgnore } from "@/types/ivs";
import { type ReturnParams, createSearchParams } from "@/types/params";

import WorkerMysteryGift from "@/workers/search/mystery-gift?worker";

const DEFAULT_IVRANGES_WITH_IGNORE = {
    hp: { start: 31, end: 31, ignore: false },
    attack: { start: 31, end: 31, ignore: false },
    defense: { start: 31, end: 31, ignore: false },
    speed: { start: 31, end: 31, ignore: false },
    sp_attack: { start: 31, end: 31, ignore: false },
    sp_defense: { start: 31, end: 31, ignore: false },
};

export function SearchMysteryGift() {
    const reactRootRef = useRef<Root | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [maxAdvances, setMaxAdvances] = useState<number | null>(500);
    const [maxFrameSum, setMaxFrameSum] = useState<number | null>(1000);
    const [IVRangesWithIgnore, setIVRangesWithIgnore] = useState<IVRangesWithIgnore>({
        ...DEFAULT_IVRANGES_WITH_IGNORE,
    });

    const handleIVRangeChange = (key: keyof IVRangesWithIgnore, start: number | null, end: number | null) => {
        setIVRangesWithIgnore((prevRanges) => ({
            ...prevRanges,
            [key]: {
                ...prevRanges[key],
                start: start,
                end: end,
            },
        }));
    };

    const handleIVIgnoreChange = (key: keyof IVRangesWithIgnore, checked: boolean | "indeterminate") => {
        if (typeof checked === "boolean") {
            setIVRangesWithIgnore((prevRanges) => ({
                ...prevRanges,
                [key]: {
                    ...prevRanges[key],
                    ignore: checked,
                },
            }));
        }
    };

    const exeSearch = async () => {
        const output = document.querySelector("#output");
        if (!output) return;

        if (!reactRootRef.current) reactRootRef.current = createRoot(output);
        reactRootRef.current.render(<></>);
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 0));
        const ivrwi = IVRangesWithIgnore;
        const searchParams = createSearchParams(ivrwi, null, null, null, null, null, maxAdvances, maxFrameSum);
        const worker = new WorkerMysteryGift();
        const results: ReturnParams[] = await new Promise((resolve) => {
            worker.onmessage = (event) => resolve(event.data);
            worker.postMessage({ searchParams });
        });

        reactRootRef.current.render(
            <>
                {results.length === 0 ? (
                    <div className="py-[1rem]">
                        <span>条件に合うものは見つかりませんでした。</span>
                    </div>
                ) : (
                    results.map((item, index) => <Result key={index} item={item} />)
                )}
            </>
        );

        setIsLoading(false);
    };

    return (
        <AppLayout pageCategory="機能" pageName="ふしぎなおくりもの" isLoading={isLoading}>
            {(Object.entries(IVRangesWithIgnore) as [keyof IVRangesWithIgnore, IVRangeWithIgnore][]).map(([key, _]) => (
                <div key={key} className="flex items-center gap-2.5">
                    <InputIVRange
                        label={key}
                        start={IVRangesWithIgnore[key].start}
                        end={IVRangesWithIgnore[key].end}
                        onIVRangeChange={(start, end) => handleIVRangeChange(key, start, end)}
                        disabled={IVRangesWithIgnore[key].ignore}
                    />
                    <Checkbox
                        checked={IVRangesWithIgnore[key].ignore}
                        className="scale-120"
                        onCheckedChange={(checked) => handleIVIgnoreChange(key, checked)}
                    />
                    <span className="w-[4rem]">指定なし</span>
                </div>
            ))}
            <div className="flex items-center gap-5">
                <span className="w-[4rem]">消費数</span>
                <InputNumberClamped
                    className="w-[6rem] h-[2rem] rounded-sm"
                    value={maxAdvances}
                    min={0}
                    max={9999}
                    onChange={setMaxAdvances}
                />
            </div>
            <div className="flex items-center gap-5">
                <span className="w-[4rem]">ﾌﾚｰﾑ数</span>
                <InputNumberClamped
                    className="w-[6rem] h-[2rem] rounded-sm"
                    value={maxFrameSum}
                    min={0}
                    max={9999}
                    onChange={setMaxFrameSum}
                />
            </div>
            <div className="flex items-center pt-3">
                <Button className="w-full text-[oklch(0.985_0_0)] md:min-w-[340px]" onClick={exeSearch}>
                    実行
                </Button>
            </div>
        </AppLayout>
    );
}

function Result(props: { item: ReturnParams }) {
    return (
        <div className="py-[1rem]">
            <div className="flex">
                <span className="block w-[6rem]">初期シード</span>
                <span>: 0x{props.item.initial_seed.toString(16)}</span>
            </div>
            <div className="flex">
                <span className="block w-[6rem]">個体値</span>
                <span>
                    : {props.item.ivs.hp}-{props.item.ivs.attack}-{props.item.ivs.defense}-{props.item.ivs.speed}-
                    {props.item.ivs.sp_attack}-{props.item.ivs.sp_defense}
                </span>
            </div>
            <div className="flex">
                <span className="block w-[6rem]">消費数</span>
                <span>: {props.item.advances}</span>
            </div>
            <div className="flex">
                <span className="block w-[6rem]">月*日+分+秒</span>
                <span>: {props.item.time_sum}</span>
            </div>
            <div className="flex">
                <span className="block w-[6rem]">時</span>
                <span>: {props.item.hour}</span>
            </div>
            <div className="flex">
                <span className="block w-[6rem]">フレーム数</span>
                <span>: {props.item.frame_sum}</span>
            </div>
        </div>
    );
}
