import { recognizeText } from "..";

export async function recognize(image: string): Promise<string> {
  const [_, body] = image.split(",");
  const buff = Buffer.from(body, "base64");
  const result = await recognizeText(buff);
  return result;
}
