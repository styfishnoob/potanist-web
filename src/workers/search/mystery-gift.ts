import init, { search_seeds_mystery_gift } from "@/pkg/potanist_wasm";
import { type ReturnParams } from "@/types/params";

self.onmessage = async (event) => {
    await init();
    const { searchParams } = event.data;
    const results: ReturnParams[] = search_seeds_mystery_gift(searchParams);
    self.postMessage(results);
};
