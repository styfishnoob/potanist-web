import type { IVRanges, IVs } from "./ivs";

export type SearchParams = {
    iv_ranges: IVRanges;
    nature: number;
    ability: number;
    shiny: boolean;
    tid: number;
    sid: number;
    max_advances: number;
    max_frame_sum: number;
};

export type ReturnParams = {
    initial_seed: number;
    ivs: IVs;
    pid: number;
    nature: number;
    gender: number;
    ability: number;
    advances: number;
    time_sum: number;
    hour: number;
    frame_sum: number;
};
