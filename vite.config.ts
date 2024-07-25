import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import appname from "./package.json";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {},
  },
  base: "./",
  resolve: {
    alias: [{ find: "@/", replacement: "/src/" }],
  },
  build: {
    outDir: "textGenVideo", // 这里设置你的输出目录
    // 可以添加其他build配置选项
  },
});
