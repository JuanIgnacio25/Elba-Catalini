import { getPlaiceholder } from "plaiceholder";

export async function getSlidesDataWithBlur() {
  const rawSlidesData = [
    {
      src: "https://res.cloudinary.com/dzvwrmykh/image/upload/f_auto,q_auto/v1750791980/autopista-noche_wpzddp.jpg",
      overlayKey: "BaimlOverlay",
    },
    {
      src: "https://res.cloudinary.com/dzvwrmykh/image/upload/f_auto,q_auto/v1750792143/toxic-shine-portada_zoycje.jpg",
      overlayKey: "ToxicShineOverlay",
    },
  ];

  const slidesWithBlur = await Promise.all(
    rawSlidesData.map(async (slide) => {
      try {
        const response = await fetch(slide.src);
        if (!response.ok) {
          return { ...slide, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" };
        }
        const buffer = Buffer.from(await response.arrayBuffer());
        const { base64: generatedBase64 } = await getPlaiceholder(buffer);
        return { ...slide, blurDataURL: generatedBase64 };
      } catch (error) {
        return { ...slide, blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" };
      }
    })
  );
  return slidesWithBlur;
}