import init, { create_roamers_location_map } from "@/pkg/potanist_wasm";
import { type ReturnParams } from "@/types/params";

self.onmessage = async (event) => {
    await init();
    const { initialSeed, roamingRaikou, roamingEntei, roamingLati, searchRange } = event.data;
    const results: ReturnParams[] = create_roamers_location_map(
        initialSeed,
        roamingRaikou,
        roamingEntei,
        roamingLati,
        searchRange
    );
    self.postMessage(results);
};
