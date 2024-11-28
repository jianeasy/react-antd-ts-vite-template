import React, { useState } from "react";
import { Button, Upload } from "antd";
import {
  ArrowLeftOutlined,
  UploadOutlined,
  DownloadOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { UploadFile } from "antd/es/upload/interface";

const ImageToVideo: React.FC = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [generatedVideo, setGeneratedVideo] = useState<string>("");

  const handleBack = () => {
    navigate("/");
  };

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      setPreviewImage(URL.createObjectURL(info.file.originFileObj));
    }
    setFileList(info.fileList.slice(-1));
  };

  const handleGenerate = () => {
    // TODO: 调用生成视频的API
    console.log("生成视频");
  };

  return (
    <div className="flex h-screen p-5 gap-5 bg-gray-100">
      {/* 左侧面板 */}
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
          <h3 className="mb-3 font-medium">视频设置</h3>
          <div className="grid gap-3">
            <Button className="w-full bg-gray-100 hover:bg-blue-50">
              标准视频
            </Button>
            <Button className="w-full bg-gray-100 hover:bg-blue-50">
              慢动作
            </Button>
            <Button className="w-full bg-gray-100 hover:bg-blue-50">
              快动作
            </Button>
          </div>
        </div>

        <Button
          type="primary"
          block
          size="large"
          className="mt-auto h-12 text-base"
          disabled={fileList.length === 0}
          onClick={handleGenerate}
        >
          生成视频
        </Button>
      </div>

      {/* 右侧预览区 */}
      <div className="flex-1 bg-white rounded-lg p-5 flex flex-col shadow-md">
        <div className="grid grid-cols-2 gap-5 flex-1">
          <div className="bg-gray-100 rounded-lg flex flex-col">
            <div className="p-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">图片</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-gray-400">预览图片</div>
              )}
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg flex flex-col">
            <div className="p-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">视频</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {generatedVideo ? (
                <video
                  src={generatedVideo}
                  controls
                  className="max-w-full max-h-full"
                />
              ) : (
                <div className="text-gray-400">视频预览</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-center mt-5">
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

export default ImageToVideo;
