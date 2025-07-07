import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./app.tsx";
import "./index.css";

import { SearchStaticEncounter } from "./pages/search/static-encounter";
import { SearchMysteryGift } from "./pages/search/mystery-gift";
import { SearchEggPID } from "./pages/search/egg-pid";
import { SearchEggIV } from "./pages/search/egg-iv";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="/search/static-encounter" element={<SearchStaticEncounter />} />
                    <Route path="/search/mystery-gift" element={<SearchMysteryGift />} />{" "}
                    <Route path="/search/egg-pid" element={<SearchEggPID />} />{" "}
                    <Route path="/search/egg-iv" element={<SearchEggIV />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
