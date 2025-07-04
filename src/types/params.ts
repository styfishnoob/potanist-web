import type { IVRanges, IVRangesWithIgnore, IVs } from "./ivs";

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

export function createSearchParams(
    IVRanges: IVRangesWithIgnore | null,
    nature: string | null,
    ability: string | null,
    shiny: boolean | null,
    tid: number | null,
    sid: number | null,
    maxAdvances: number | null,
    maxFrameSum: number | null
): SearchParams {
    return {
        iv_ranges: IVRanges
            ? (Object.fromEntries(
                  (Object.keys(IVRanges) as Array<keyof IVRangesWithIgnore>).map((key) => {
                      if (IVRanges[key].ignore) {
                          return [key, { start: 0, end: 31 }];
                      } else {
                          return [key, { start: IVRanges[key].start ?? 0, end: IVRanges[key].end ?? 0 }];
                      }
                  })
              ) as SearchParams["iv_ranges"])
            : {
                  hp: { start: 31, end: 31 },
                  attack: { start: 31, end: 31 },
                  defense: { start: 31, end: 31 },
                  speed: { start: 31, end: 31 },
                  sp_attack: { start: 31, end: 31 },
                  sp_defense: { start: 31, end: 31 },
              },
        nature: nature ? Number(nature) : -1,
        ability: ability ? Number(ability) : -1,
        shiny: shiny ?? false,
        tid: tid ?? 0,
        sid: sid ?? 0,
        max_advances: maxAdvances ?? 0,
        max_frame_sum: maxFrameSum ?? 0,
    };
}
