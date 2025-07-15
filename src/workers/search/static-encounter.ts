import init, { search_seeds_static_encounter } from "@/pkg/potanist_wasm";
import { type ReturnParams } from "@/types/params";

self.onmessage = async (event) => {
    await init();
    const { searchParams } = event.data;
    const results: ReturnParams[] = search_seeds_static_encounter(searchParams);
    self.postMessage(results);
};
