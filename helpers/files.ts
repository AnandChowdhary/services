import axios from "axios";

export const imageToDataUri = async (url: string) => {
  const buffer = await axios.get(
    `https://images.weserv.nl/?url=${encodeURIComponent(
      url.replace("https://", "")
    )}&w=100&h=100&fit=cover&mask=circle&mbg=white&quality=50&output=jpg&encoding=base64`
  );
  return buffer.data;
};
