import { Input } from "./ui/input";

type Props = {
    value: string | null;
    maxLength: number;
    className?: string;
    onChange: (value: string) => void;
};

export function InputHex(props: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hex = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, props.maxLength);
        props.onChange(hex);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            props.onChange("0");
        }
    };

    return <Input value={props.value ?? ""} onChange={handleChange} onBlur={handleBlur} className={props.className} />;
}
