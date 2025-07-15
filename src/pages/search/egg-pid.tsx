import { useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AppLayout } from "@/components/app-layout";
import { InputNumberClamped } from "@/components/input-number-clamped";
import { SelectStatus } from "@/components/select-status";

import { createSearchParams, type ReturnParams } from "@/types/params";

import { POKEMON_ABILITIES } from "@/const/select-item/pokemon-abilities";
import { POKEMON_GENDERS } from "@/const/select-item/pokemon-genders";
import { POKEMON_NATURES } from "@/const/select-item/pokemon-natures";

import WorkerEggPID from "@/workers/search/egg-pid?worker";

export function SearchEggPID() {
    const reactRootRef = useRef<Root | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [nature, setNature] = useState<string>("-1");
    const [gender, setGender] = useState<string>("-1");
    const [ability, setAbility] = useState<string>("-1");
    const [shiny, setShiny] = useState<boolean>(false);
    const [masudaMethod, setMasudaMethod] = useState<boolean>(false);
    const [tid, setTid] = useState<number | null>(0);
    const [sid, setSid] = useState<number | null>(0);
    const [maxAdvances, setMaxAdvances] = useState<number | null>(500);
    const [maxFrameSum, setMaxFrameSum] = useState<number | null>(1000);

    const exeSearch = async () => {
        const output = document.querySelector("#output");
        if (!output) return;

        if (!reactRootRef.current) reactRootRef.current = createRoot(output);
        reactRootRef.current.render(<></>);
        setIsLoading(true);

        const searchParams = createSearchParams(null, nature, ability, shiny, tid, sid, maxAdvances, maxFrameSum);
        const worker = new WorkerEggPID();
        const results: ReturnParams[] = await new Promise((resolve) => {
            worker.onmessage = (event) => resolve(event.data);
            worker.postMessage({ searchParams, masudaMethod });
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
        <AppLayout pageCategory="機能" pageName="タマゴ性格値" isLoading={isLoading}>
            <SelectStatus
                label="性格"
                value={nature}
                items={POKEMON_NATURES}
                onSelectChange={(value) => setNature(value)}
            />
            <SelectStatus
                label="性別"
                value={gender}
                items={POKEMON_GENDERS}
                onSelectChange={(value) => setGender(value)}
            />
            <SelectStatus
                label="特性"
                value={ability}
                items={POKEMON_ABILITIES}
                onSelectChange={(value) => setAbility(value)}
            />
            <div className="flex items-center gap-5">
                <span className="w-[4rem]">色違い</span>
                <Checkbox checked={shiny} className="scale-120" onCheckedChange={() => setShiny((prev) => !prev)} />
            </div>
            <div className="flex items-center gap-5">
                <span className="w-[4rem]">国際孵化</span>
                <Checkbox
                    checked={masudaMethod}
                    className="scale-120"
                    onCheckedChange={() => setMasudaMethod((prev) => !prev)}
                />
            </div>
            <div className="flex items-center gap-5">
                <span className="w-[4rem]">TID</span>
                <InputNumberClamped
                    className="w-[6rem] h-[2rem] rounded-sm"
                    value={tid}
                    min={0}
                    max={65535}
                    disabled={!shiny}
                    onChange={setTid}
                />
            </div>
            <div className="flex items-center gap-5">
                <span className="w-[4rem]">SID</span>
                <InputNumberClamped
                    className="w-[6rem] h-[2rem] rounded-sm"
                    value={sid}
                    min={0}
                    max={65535}
                    disabled={!shiny}
                    onChange={setSid}
                />
            </div>
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
                <span className="block w-[6rem]">性格値</span>
                <span>: 0x{props.item.pid.toString(16)}</span>
            </div>
            <div className="flex">
                <span className="block w-[6rem]">性格</span>
                <span>: {props.item.nature}</span>
            </div>
            <div className="flex">
                <span className="block w-[6rem]">性別値</span>
                <span>: {props.item.gender}</span>
            </div>
            <div className="flex">
                <span className="block w-[6rem]">特性値</span>
                <span>: {props.item.ability}</span>
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
