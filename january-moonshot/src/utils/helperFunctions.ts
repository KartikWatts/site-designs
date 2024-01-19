import { PixabayParams } from "../types/types";

const searchParams = new URLSearchParams({
  key: import.meta.env.VITE_PIXABAY_API_KEY,
  safesearch: "true",
});

export const getPixabayImages = async (additionalParams: PixabayParams) => {
  try {
    for (const key in additionalParams) {
      if (additionalParams.hasOwnProperty(key)) {
        const value = additionalParams[key] || "";
        if (value) searchParams.append(key, value);
      }
    }
    const response = await fetch(`https://pixabay.com/api/?${searchParams}`);
    const images = await response.json();
    return images?.hits;
  } catch (e) {
    throw new Error("Something went wrong");
  }
};
