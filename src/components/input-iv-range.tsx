import { InputNumberNullable } from "./input-number-nullable";

interface Props {
    label: string;
    start: number | null;
    end: number | null;
    disabled?: boolean;
    onIVRangeChange: (start: number | null, end: number | null) => void;
}

export function InputIVRange(props: Props) {
    const MIN_IV = 0;
    const MAX_IV = 31;

    return (
        <div className="flex items-center gap-5">
            <span className="w-[4rem]">{props.label}</span>
            <div className="flex gap-1.5">
                <InputNumberNullable
                    className="w-[4rem] h-[2rem] rounded-sm"
                    value={props.start}
                    min={MIN_IV}
                    max={MAX_IV}
                    disabled={props.disabled}
                    onChange={(value) => props.onIVRangeChange(value, props.end)}
                />
                <span>〜</span>
                <InputNumberNullable
                    className="w-[4rem] h-[2rem] rounded-sm"
                    value={props.end}
                    min={MIN_IV}
                    max={MAX_IV}
                    disabled={props.disabled}
                    onChange={(value) => props.onIVRangeChange(props.start, value)}
                />
            </div>
        </div>
    );
}
