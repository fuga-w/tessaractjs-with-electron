import { recognizeText } from "../index";

const base64StringToFile = (base64String: string) => {
  const byteString = atob(base64String);
  const arrayBuffer = Uint8Array.from(byteString, (c) => c.charCodeAt(0));
  const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
  return blob;
};

export async function recognize(image: string) {
  const [_, imageBody] = image.split(",");
  const blob = base64StringToFile(imageBody);
  const result = await recognizeText(blob);

  return result;
}
