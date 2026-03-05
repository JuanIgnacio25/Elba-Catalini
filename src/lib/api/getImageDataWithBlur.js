import { getPlaiceholder } from "plaiceholder";
import { unstable_cache } from "next/cache";

export const getImageDataWithBlur = unstable_cache(
  async (imageUrl) => {
    if (!imageUrl) {
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      const { base64: generatedBase64 } = await getPlaiceholder(buffer);
      return generatedBase64;
    } catch (error) {
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }
  },
  ['sale-image-blur-cache'],
  { 
    revalidate: 86400
  }
)