import init, { create_call_response_sequence_map } from "@/pkg/potanist_wasm";
import { type ReturnParams } from "@/types/params";

self.onmessage = async (event) => {
    await init();
    const { initialSeed, roamingNum, searchRange } = event.data;
    const results: ReturnParams[] = create_call_response_sequence_map(initialSeed, roamingNum, searchRange);
    self.postMessage(results);
};
