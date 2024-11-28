import React, { useState } from "react";
import { Flexbox } from "react-layout-kit";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();

  const [list, setList] = useState<any[]>([
    {
      title: "AI绘画",
      desc: "AI绘画",
      tags: ["Paint"],
      icon: "🎨",
      path: "/ai-paint",
    },
    {
      title: "一键抠图",
      desc: "一键抠图",
      tags: ["Paint"],
      icon: "🎨",
      path: "/image-matting",
    },
    {
      title: "图片生成视频",
      desc: "图片生成视频",
      tags: ["Video"],
      icon: "🎨",
      path: "/image-to-video",
    },
    {
      title: "文字生成3d模型",
      desc: "文字生成3d模型",
      tags: ["model"],
      icon: "🎨",
      path: "/text-to-model",
    },
  ]);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const RenderItem = ({ title, desc, tags, icon }: any) => {
    return (
      <div className="w-full h-full p-3 rounded-lg bg-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div>
          <div className="text-base font-semibold text-gray-800">{title}</div>
          <div className="text-2xl mb-2">{icon}</div>
        </div>
        <div className="text-sm text-gray-600 mb-2 overflow-hidden text-ellipsis line-clamp-2">
          {desc}
        </div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag: string) => (
            <div
              key={tag}
              className="px-2 py-0.5 bg-blue-50 text-blue-500 rounded text-xs"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen w-screen bg-white flex justify-center items-start pt-5 overflow-hidden">
      <Flexbox
        gap={16}
        style={{
          minWidth: 300,
          padding: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          overflowY: "auto",
          height: "calc(100vh - 40px)",
        }}
      >
        {list.map((item) => (
          <div
            key={item.title}
            className="w-[280px] h-[160px] flex-none m-2.5 cursor-pointer"
            onClick={() => handleCardClick(item.path)}
          >
            <RenderItem {...item} />
          </div>
        ))}
      </Flexbox>
    </div>
  );
};

export default App;
