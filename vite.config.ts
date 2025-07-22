import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import appname from "./package.json";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 4066,
    proxy: {},
  },
  base: "/jingdu",
  resolve: {
    alias: [{ find: "@/", replacement: "/src/" }],
  },
  build: {
    outDir: "jingdu", // 这里设置你的输出目录
    // 可以添加其他build配置选项
  },
  css: {
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: `@import "./src/styles/variables";`, // 在每个文件之前注入的内容
    //     includePaths: [
    //       './src/styles', // 指定搜索 @import 路径的目录
    //     ],
    //   },
    // },
  },
});
