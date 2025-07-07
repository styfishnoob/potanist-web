import { useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { AppLayout } from "@/components/app-layout";
import { InputIVRange } from "@/components/input-iv-range";
import { InputNumberClamped } from "@/components/input-number-clamped";

import type { IVRangesWithIgnore, IVRangeWithIgnore, IVs } from "@/types/ivs";
import { type ReturnParams, createSearchParams } from "@/types/params";

import { search_seeds_egg_iv } from "@/pkg/potanist_wasm";

const DEFAULT_IVS = {
    hp: 31,
    attack: 31,
    defense: 31,
    speed: 31,
    sp_attack: 31,
    sp_defense: 31,
};

const DEFAULT_IVRANGES_WITH_IGNORE = {
    hp: { start: 31, end: 31, ignore: false },
    attack: { start: 31, end: 31, ignore: false },
    defense: { start: 31, end: 31, ignore: false },
    speed: { start: 31, end: 31, ignore: false },
    sp_attack: { start: 31, end: 31, ignore: false },
    sp_defense: { start: 31, end: 31, ignore: false },
};

export function SearchEggIV() {
    const reactRootRef = useRef<Root | null>(null);
    const [showDone, setShowDone] = useState(false);
    const [maxAdvances, setMaxAdvances] = useState<number | null>(500);
    const [maxFrameSum, setMaxFrameSum] = useState<number | null>(1000);
    const [IVRangesWithIgnore, setIVRangesWithIgnore] = useState<IVRangesWithIgnore>({
        ...DEFAULT_IVRANGES_WITH_IGNORE,
    });
    const [firstParentIVs, setFirstParentIVs] = useState<IVs>({ ...DEFAULT_IVS });
    const [secondParentIVs, setSecondParentIVs] = useState<IVs>({ ...DEFAULT_IVS });

    const handleIVRangesChange = (key: keyof IVRangesWithIgnore, start: number | null, end: number | null) => {
        setIVRangesWithIgnore((prevRanges) => ({
            ...prevRanges,
            [key]: {
                start: start,
                end: end,
            },
        }));
    };

    const handleIVRangesIgnoreChange = (key: keyof IVRangesWithIgnore, checked: boolean | "indeterminate") => {
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

    const handleIVsChange = (
        key: keyof IVs,
        value: number | null,
        setStateAction: React.Dispatch<React.SetStateAction<IVs>>
    ) => {
        setStateAction((prevIVs) => ({
            ...prevIVs,
            [key]: {
                value,
            },
        }));
    };

    const exeSearch = () => {
        const output = document.querySelector("#output");
        if (!output) return;

        const searchParams = createSearchParams(
            IVRangesWithIgnore,
            null,
            null,
            null,
            null,
            null,
            maxAdvances,
            maxFrameSum
        );
        const searchResults: ReturnParams[] = search_seeds_egg_iv(searchParams, firstParentIVs, secondParentIVs);
        if (!reactRootRef.current) reactRootRef.current = createRoot(output);

        reactRootRef.current.render(
            <>
                {searchResults.length === 0 ? (
                    <div className="py-[1rem]">
                        <span>条件に合うものは見つかりませんでした。</span>
                    </div>
                ) : (
                    searchResults.map((item, index) => <SearchResult key={index} item={item} />)
                )}
            </>
        );

        if (showDone == false) {
            setShowDone(true);
            setTimeout(() => setShowDone(false), 3000);
        }
    };

    return (
        <AppLayout pageCategory="機能" pageName="タマゴ個体値" showDone={showDone}>
            <div className="flex flex-col divide-y">
                <div className="flex flex-col gap-2.5 pb-5">
                    {(Object.entries(IVRangesWithIgnore) as [keyof IVRangesWithIgnore, IVRangeWithIgnore][]).map(
                        ([key, _]) => (
                            <div key={key} className="flex items-center gap-2.5">
                                <InputIVRange
                                    label={key}
                                    start={IVRangesWithIgnore[key].start}
                                    end={IVRangesWithIgnore[key].end}
                                    onIVRangeChange={(start, end) => handleIVRangesChange(key, start, end)}
                                    disabled={IVRangesWithIgnore[key].ignore}
                                />
                                <Checkbox
                                    checked={IVRangesWithIgnore[key].ignore}
                                    className="scale-120"
                                    onCheckedChange={(checked) => handleIVRangesIgnoreChange(key, checked)}
                                />
                                <span className="w-[4rem]">指定なし</span>
                            </div>
                        )
                    )}
                </div>
                <div className="flex py-5 divide-x">
                    <div className="flex flex-col gap-2.5 pr-3.5">
                        <span className="text-center inline-block leading-none align-middle">first parent IVs</span>
                        {(Object.entries(firstParentIVs) as [keyof IVs, number][]).map(([key, _]) => (
                            <div key={key} className="flex items-center gap-5">
                                <span className="w-[4rem]">{key}</span>
                                <InputNumberClamped
                                    className="w-[4rem] h-[2rem] rounded-sm"
                                    value={firstParentIVs[key]}
                                    min={0}
                                    max={65535}
                                    onChange={(value) => handleIVsChange(key, value, setFirstParentIVs)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2.5 pl-3.5">
                        <span className="text-center inline-block leading-none align-middle">second parent IVs</span>
                        {(Object.entries(secondParentIVs) as [keyof IVs, number][]).map(([key, _]) => (
                            <div key={key} className="flex items-center gap-5">
                                <span className="w-[4rem]">{key}</span>
                                <InputNumberClamped
                                    className="w-[4rem] h-[2rem] rounded-sm"
                                    value={secondParentIVs[key]}
                                    min={0}
                                    max={65535}
                                    onChange={(value) => handleIVsChange(key, value, setSecondParentIVs)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2.5 py-5">
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
                        <Button className="w-full" onClick={exeSearch}>
                            実行
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function SearchResult(props: { item: ReturnParams }) {
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
