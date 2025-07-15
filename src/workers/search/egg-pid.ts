import init, { search_seeds_egg_pid } from "@/pkg/potanist_wasm";
import { type ReturnParams } from "@/types/params";

self.onmessage = async (event) => {
    await init();
    const { searchParams, masudaMethod } = event.data;
    const results: ReturnParams[] = search_seeds_egg_pid(searchParams, masudaMethod);
    self.postMessage(results);
};
