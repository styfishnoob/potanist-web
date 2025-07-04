export type IV = number;
export type IVRange = { start: IV; end: IV };
export type IVRangeWithIgnore = { start: number | null; end: number | null; ignore: boolean };

export type IVs = {
    hp: IV;
    attack: IV;
    defense: IV;
    speed: IV;
    sp_attack: IV;
    sp_defense: IV;
};

export type IVRanges = {
    hp: IVRange;
    attack: IVRange;
    defense: IVRange;
    speed: IVRange;
    sp_attack: IVRange;
    sp_defense: IVRange;
};

export type IVRangesWithIgnore = {
    hp: IVRangeWithIgnore;
    attack: IVRangeWithIgnore;
    defense: IVRangeWithIgnore;
    speed: IVRangeWithIgnore;
    sp_attack: IVRangeWithIgnore;
    sp_defense: IVRangeWithIgnore;
};
