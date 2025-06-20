import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Item = {
    value: string;
    label: string;
};

type Props = {
    label: string;
    items: Item[];
    value: string;
    onSelectChange: (value: string) => void;
};

export function SelectStatus(props: Props) {
    return (
        <div className="flex items-center gap-5">
            <span className="w-[4rem]">{props.label}</span>
            <Select value={props.value} onValueChange={props.onSelectChange}>
                <SelectTrigger className="w-[8rem] px-2 !h-[2rem]">
                    <SelectValue placeholder={`${props.label}を選択`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>{props.label}</SelectLabel>
                        {props.items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
