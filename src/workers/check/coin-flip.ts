import init, { create_coin_flip_result_map } from "@/pkg/potanist_wasm";
import { type ReturnParams } from "@/types/params";

self.onmessage = async (event) => {
    await init();
    const { initialSeed, searchRange } = event.data;
    const results: ReturnParams[] = create_coin_flip_result_map(initialSeed, searchRange);
    self.postMessage(results);
};
