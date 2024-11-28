import React, { useState } from "react";
import { Button, Input } from "antd";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const TextToModel: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [modelType, setModelType] = useState<"object" | "character">("object");

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen p-5 gap-5 bg-gray-100">
      <div className="w-[300px] flex flex-col gap-5 bg-white p-5 rounded-lg shadow-md">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="self-start hover:text-blue-500"
        >
          返回首页
        </Button>

        <div className="space-y-3">
          <h3 className="mb-3 font-medium">提示词</h3>
          <TextArea
            placeholder='输入文字，比如: "一只宇航狗"'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-3">
          <h3 className="mb-3 font-medium">高级设置</h3>
          <div className="flex gap-3">
            <Button
              type={modelType === "object" ? "primary" : "default"}
              onClick={() => setModelType("object")}
              className="flex-1"
            >
              物品模型
            </Button>
            <Button
              type={modelType === "character" ? "primary" : "default"}
              onClick={() => setModelType("character")}
              className="flex-1"
            >
              人物模型
            </Button>
          </div>
        </div>

        <Button
          type="primary"
          block
          size="large"
          className="mt-auto h-12 text-base"
        >
          生成模型
        </Button>
      </div>

      <div className="flex-1 bg-white rounded-lg p-5 flex flex-col shadow-md">
        <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
          <div className="text-gray-400">模型预览区域</div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button icon={<DownloadOutlined />} className="px-6">
            下载
          </Button>
          <Button icon={<ShareAltOutlined />} className="px-6">
            分享
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextToModel;
