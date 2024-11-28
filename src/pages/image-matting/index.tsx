import React, { useState } from "react";
import { Button, Upload, TextArea } from "antd";
import {
  ArrowLeftOutlined,
  UploadOutlined,
  DownloadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { UploadFile } from "antd/es/upload/interface";

const ImageMatting: React.FC = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<number>(0);
  const stylesList = [
    { id: 0, name: "写实", icon: "🖌️" },
    { id: 1, name: "卡通", icon: "🎨" },
    { id: 2, name: "水彩", icon: "🎨" },
    { id: 3, name: "油画", icon: "🎨" },
    { id: 4, name: "素描", icon: "🖌️" },
    { id: 5, name: "水墨", icon: "🎨" },
    { id: 6, name: "版画", icon: "🎨" },
    { id: 7, name: "水彩画", icon: "🎨" },
    { id: 8, name: "水粉画", icon: "🎨" },
    { id: 9, name: "水彩", icon: "🎨" },
  ];

  const handleBack = () => {
    navigate("/");
  };

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      setPreviewImage(URL.createObjectURL(info.file.originFileObj));
    }
    setFileList(info.fileList.slice(-1));
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
          <h3 className="mb-3 font-medium">上传图片</h3>
          <Upload
            accept="image/*"
            fileList={fileList}
            onChange={handleChange}
            maxCount={1}
            className="w-full"
          >
            <Button
              icon={<UploadOutlined />}
              className="w-full h-32 flex items-center justify-center border-dashed"
            >
              点击或拖拽图片到此处
            </Button>
          </Upload>
        </div>

        <div className="space-y-3">
          <h3 className="mb-3 font-medium">抠图设置</h3>
          <div className="grid gap-3">
            <Button className="w-full bg-gray-100 hover:bg-blue-50">
              移除背景
            </Button>
            <Button className="w-full bg-gray-100 hover:bg-blue-50">
              保留人像
            </Button>
            <Button className="w-full bg-gray-100 hover:bg-blue-50">
              保留主体
            </Button>
          </div>
        </div>

        <Button
          type="primary"
          block
          size="large"
          className="mt-auto h-12 text-base"
          disabled={fileList.length === 0}
        >
          开始抠图
        </Button>
      </div>

      <div className="flex-1 bg-white rounded-lg p-5 flex flex-col shadow-md">
        <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-gray-400">预览区域</div>
          )}
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

export default ImageMatting;
