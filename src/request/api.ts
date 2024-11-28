import request from "./index";

interface TextPrompt {
  text: string;
  weight: number;
}

interface CreateImageParams {
  text_prompts: TextPrompt[];
  cfg_scale: number;
  height: number;
  width: number;
  steps: number;
  samples: number;
}

interface CreateImageResponse {
  code: number;
  message: string;
  data: {
    url: string;
  }[];
}

export const createSdImage = async (
  params: CreateImageParams
): Promise<CreateImageResponse> => {
  return await request({
    url: "/app/tool/tool/createSdImage",
    method: "POST",
    data: params,
  });
};
