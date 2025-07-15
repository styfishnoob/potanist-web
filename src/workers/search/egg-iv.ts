import init, { search_seeds_egg_iv } from "@/pkg/potanist_wasm";
import { type ReturnParams } from "@/types/params";

self.onmessage = async (event) => {
    await init();
    const { searchParams, firstParentIVs, secondParentIVs } = event.data;
    const results: ReturnParams[] = search_seeds_egg_iv(searchParams, firstParentIVs, secondParentIVs);
    self.postMessage(results);
};
