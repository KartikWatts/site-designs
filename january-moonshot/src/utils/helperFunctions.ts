import { PixabayImage } from "../types/interfaces";
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

export const extractTagsFromData = (
  data: PixabayImage[],
  tagsLimit: number = 5
): String[] => {
  const allTagsString = data.map((image) => image.tags).join(",");
  const allTagsArray = allTagsString.split(",");
  const tagFrequencyMap = allTagsArray.reduce((acc, tag) => {
    acc.set(tag, (acc.get(tag) || 0) + 1);
    return acc;
  }, new Map<string, number>());
  const sortedTags = [...tagFrequencyMap.entries()].sort((a, b) => b[1] - a[1]);
  const topTagsList = sortedTags
    .slice(0, tagsLimit)
    .map(([tag]) => capitalizeFirstLetters(tag));
  return topTagsList;
};

const capitalizeFirstLetters = (input: string): string => {
  const words = input.trim().split(/\s+/);

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return capitalizedWords.join(" ");
};
