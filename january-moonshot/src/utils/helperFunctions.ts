import { User } from "firebase/auth";
import db from "../firebase";
import { PixabayImage } from "../types/interfaces";
import { PixabayParams } from "../types/types";
import { child, get, ref } from "firebase/database";

export const getPixabayImages = async (additionalParams: PixabayParams) => {
  const searchParams = new URLSearchParams({
    key: import.meta.env.VITE_PIXABAY_API_KEY,
    safesearch: "true",
  });
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
): string[] => {
  const allTagsString = data.map((image) => image.tags).join(",");
  // console.log(allTagsString);

  const allTagsArray = allTagsString.split(",");

  // console.log(allTagsArray);

  // console.log(uniqueTagsArray);

  const sortedTags = allTagsArray.sort((a, b) => {
    const countA = allTagsArray.filter((tag) => tag === a).length;
    const countB = allTagsArray.filter((tag) => tag === b).length;
    return countB - countA;
  });
  // console.log(sortedTags);

  const uniqueTagsSet = new Set<string>();

  sortedTags.forEach((tag) => {
    const capitalizedTag = capitalizeFirstLetters(tag);
    uniqueTagsSet.add(capitalizedTag);
  });

  const uniqueTagsArray = Array.from(uniqueTagsSet);

  const topTagsList = uniqueTagsArray.slice(0, tagsLimit);

  // console.log(topTagsList);

  return topTagsList;
};

export const getFirebaseData = (
  dataKey: string,
  user: User | null
): Promise<Array<{ key: string; url: string }>> => {
  return new Promise((resolve, reject) => {
    const userUid = user?.uid;

    if (!userUid) {
      reject("User is not authenticated");
      return;
    }

    const dataRef = child(ref(db), `users/${userUid}/${dataKey}`);

    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const images = snapshot.val();
          const imageArray = [];

          for (const key in images) {
            if (Object.hasOwnProperty.call(images, key)) {
              const item = images[key];
              imageArray.push({ key, url: item.url });
            }
          }

          resolve(imageArray);
        } else {
          console.log("No data available");
          resolve([]); // Resolve with an empty array if no data is available
        }
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

const capitalizeFirstLetters = (input: string): string => {
  const words = input.trim().split(/\s+/);

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return capitalizedWords.join(" ");
};
