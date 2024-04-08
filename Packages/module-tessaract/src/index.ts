import { createWorker, ImageLike } from "tesseract.js";

export async function recognizeText(imageSource: ImageLike) {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(imageSource);
  await worker.terminate();
  return ret.data.text;
}

function preprocessImage(image: ImageLike) {
  // some preprocessing
  return image;
}
