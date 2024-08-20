import tsConfigPaths from "vite-tsconfig-paths";
import wasmPack from "vite-plugin-wasm-pack";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [tsConfigPaths(), wasmPack(["./trevas-wasm"])]
});
