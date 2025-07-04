import type { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "min" | "max"> & {
    value: string | number | null;
    onChange: (value: number | null) => void;
    min: number;
    max: number;
};
export function InputNumberClamped(props: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const v = Number(value);

        if (value === "") {
            props.onChange(null);
            return;
        }

        if (!isNaN(v)) {
            const clamped = Math.max(props.min, Math.min(v, props.max));
            props.onChange(clamped);
        }
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.value === null || e.target.value === "") {
            props.onChange(props.min);
        }
    };

    return (
        <Input
            type="number"
            inputMode="numeric"
            className={props.className}
            value={props.value === null ? "" : props.value}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    );
}
