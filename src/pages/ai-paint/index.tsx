import React, { useState } from "react";
import { Button, Input, Slider, Radio, message, Collapse } from "antd";
import {
  DownloadOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createSdImage } from "@/request/api";
import def from "@/assets/styles/def.png";
import oil from "@/assets/styles/oil.png";
import ink from "@/assets/styles/ink.png";
import fangao from "@/assets/styles/fangao.png";
import monai from "@/assets/styles/monai.png";
import anime from "@/assets/styles/anime.png";
import dmodel from "@/assets/styles/3d-model.png";
import cinematic from "@/assets/styles/cinematic.png";
import comicbook from "@/assets/styles/comic-book.png";
import digitalart from "@/assets/styles/digital-art.png";
import lineart from "@/assets/styles/line-art.png";
import lowpoly from "@/assets/styles/low-poly.png";
import neonpunk from "@/assets/styles/neon-punk.png";
import origami from "@/assets/styles/origami.png";
import photographic from "@/assets/styles/photographic.png";
import pixel from "@/assets/styles/pixel.png";

const { TextArea } = Input;
const { Panel } = Collapse;

const AIPaint: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string>("");

  // 新增参数状态
  const [size, setSize] = useState<"1024x1024" | "1024x1792" | "1792x1024">(
    "1024x1024"
  );
  const [cfgScale, setCfgScale] = useState(7);
  const [steps, setSteps] = useState(30);
  const [negativePrompt, setNegativePrompt] = useState("低品质");

  const handleBack = () => {
    navigate("/");
  };

  const handleGenerate = async () => {
    if (!prompt) {
      message.warning("请输入提示词");
      return;
    }

    setLoading(true);
    try {
      const [width, height] = size.split("x").map(Number);
      const params = {
        text_prompts: [
          { text: prompt, weight: 1 },
          { text: negativePrompt, weight: -1 },
        ],
        cfg_scale: cfgScale,
        height,
        width,
        steps,
        samples: 1,
      };

      const result = await createSdImage(params);
      if (result.code === 1000 && result.data?.[0]?.url) {
        setGeneratedImage(result.data[0].url);
      } else {
        message.error(result.message || "生成失败，请重试");
      }
    } catch (error) {
      message.error("生成失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `ai-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const stylesList = [
    { name: "默认", value: "", img: def },
    { name: "油画", value: ", 油画", inPrompt: true, img: oil },
    {
      name: "水墨画",
      value: ", Chinese ink painting",
      inPrompt: true,
      img: ink,
    },
    {
      name: "梵高",
      value: ", by Vincent Van Gogh",
      inPrompt: true,
      img: fangao,
    },
    { name: "莫奈", value: ", by Claude Monet", inPrompt: true, img: monai },
    { name: "动画风格", value: "anime", img: anime },
    { name: "3D 模型", value: "3d-model", img: dmodel },
    { name: "电影", value: "cinematic", img: cinematic },
    { name: "漫画", value: "comic-book", img: comicbook },
    { name: "数字艺术", value: "digital-art", img: digitalart },
    { name: "线稿艺术", value: "line-art", img: lineart },
    { name: "low-poly", value: "low-poly", img: lowpoly },
    { name: "霓虹朋克", value: "neon-punk", img: neonpunk },
    { name: "折纸艺术", value: "origami", img: origami },
    { name: "摄影", value: "photographic", img: photographic },
    { name: "像素艺术", value: "pixel-art", img: pixel },
  ];

  const handleStyleSelect = (style: (typeof stylesList)[0]) => {
    setSelectedStyle(style.value);
    if (style.inPrompt && prompt) {
      setPrompt(prompt + style.value);
    }
  };

  return (
    <div className="flex h-screen p-5 gap-5 bg-gray-100 dark:bg-black">
      <div className="w-[400px] flex flex-col gap-5 bg-white dark:bg-zinc-900 p-5 rounded-lg shadow-md">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="self-start hover:text-blue-500 dark:text-black"
        >
          返回首页
        </Button>

        <Collapse
          defaultActiveKey={["prompt"]}
          className="flex-1 overflow-auto [&_.ant-collapse-item]:!border-0"
          bordered={false}
          expandIconPosition="end"
          style={{
            background: "transparent",
          }}
        >
          <Panel
            header={<span className="dark:text-white">提示词</span>}
            key="prompt"
            className="!border-0 [&_.ant-collapse-content]:!border-0"
          >
            <TextArea
              placeholder="输入文字，比如: '一只熊猫在湖面上划船'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              bordered={false}
              className="bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-colors dark:placeholder:text-gray-400"
            />
          </Panel>

          <Panel
            header={<span className="dark:text-white">风格选择</span>}
            key="style"
            className="!border-0 [&_.ant-collapse-content]:!border-0"
          >
            <div className="grid grid-cols-3 gap-2">
              {stylesList.map((style) => (
                <div
                  key={style.value}
                  className={`relative flex flex-col items-center gap-1 p-1.5 rounded-lg cursor-pointer transition-all duration-300 overflow-hidden
                    ${
                      selectedStyle === style.value
                        ? "ring-2 ring-blue-500"
                        : "hover:ring-2 hover:ring-blue-200"
                    }`}
                  onClick={() => handleStyleSelect(style)}
                >
                  <img
                    src={style.img}
                    alt={style.name}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                  <span className="text-xs text-black dark:text-white">
                    {style.name}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            header={<span className="dark:text-white">图片尺寸</span>}
            key="size"
            className="!border-0 [&_.ant-collapse-content]:!border-0"
          >
            <Radio.Group
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-gray-50 p-3 rounded-lg w-full"
            >
              <div className="grid grid-cols-1 gap-2">
                <Radio value="1024x1024">正方形 1024x1024</Radio>
                <Radio value="1024x1792">竖版 1024x1792</Radio>
                <Radio value="1792x1024">横版 1792x1024</Radio>
              </div>
            </Radio.Group>
          </Panel>

          <Panel
            header={<span className="dark:text-white">反向提示词</span>}
            key="negative"
            className="!border-0 [&_.ant-collapse-content]:!border-0"
          >
            <TextArea
              placeholder="输入不想要的元素"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              rows={2}
              bordered={false}
              className="bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-colors"
            />
          </Panel>

          <Panel
            header={<span className="dark:text-white">参数设置</span>}
            key="params"
            className="!border-0 [&_.ant-collapse-content]:!border-0"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="dark:text-white">
                    提示词相关性 (CFG Scale)
                  </span>
                  <span className="dark:text-white">{cfgScale}</span>
                </div>
                <Slider
                  min={1}
                  max={20}
                  value={cfgScale}
                  onChange={setCfgScale}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="dark:text-white">迭代步数 (Steps)</span>
                  <span className="dark:text-white">{steps}</span>
                </div>
                <Slider min={10} max={50} value={steps} onChange={setSteps} />
              </div>
            </div>
          </Panel>
        </Collapse>

        <Button
          type="primary"
          block
          size="large"
          className="mt-3 h-12 text-base"
          onClick={handleGenerate}
          loading={loading}
        >
          开始作画
        </Button>
      </div>

      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-lg p-5 flex flex-col shadow-md">
        <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-5 overflow-hidden">
          {generatedImage ? (
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-gray-400 dark:text-gray-500">预览区域</div>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <Button
            icon={<DownloadOutlined />}
            className="px-6 dark:text-white"
            disabled={!generatedImage}
            onClick={handleDownload}
          >
            下载
          </Button>
          <Button
            icon={<ShareAltOutlined />}
            className="px-6 dark:text-white"
            disabled={!generatedImage}
          >
            分享
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIPaint;
