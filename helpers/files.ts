import axios from "axios";

export const imageToDataUri = async (url: string) => {
  const buffer = await axios.get(url, { responseType: "arraybuffer" });
  const dataUrl = Buffer.from(buffer.data, "binary").toString("base64");
  return `data:image/png;base64,${dataUrl}`;
};
