import { recognize, ImageLike } from "tesseract.js";

export async function recognizeText(image: ImageLike) {
  return await recognize(image);
}
