import { useEffect, useState } from "react";
import {
  extractTagsFromData,
  getPixabayImages,
} from "../../utils/helperFunctions";
import styles from "./styles.module.css";
import { BackgroundProps } from "../../types/types";

const Background = ({ onTagsListUpdate, searchKeyword }: BackgroundProps) => {
  const [homePageUrl, setHomePageUrl] = useState("");

  useEffect(() => {
    const randomPageSize = Math.floor(Math.random() * 100) + 20;
    getPixabayImages({
      per_page: randomPageSize.toString(),
      min_width: "1400",
      min_height: "1000",
      category: "backgrounds",
      colors: "blue,black,brown",
    })
      .then((res) => {
        // console.log(res);
        const randomIndex = Math.floor(Math.random() * res.length);
        setHomePageUrl(res[randomIndex].largeImageURL);
        const tagsList = extractTagsFromData(res);
        onTagsListUpdate(tagsList);
      })
      .catch((error: Error) => {
        console.error("Exception: ", error.message);
      });
  }, []);

  return (
    <section
      className={`${styles.imageContainer} ${
        searchKeyword && styles.searchContainer
      }`}
    >
      {homePageUrl && (
        <img
          src={homePageUrl}
          alt='Background Image'
          className={styles.background}
        />
      )}
      <div className={styles.overlay}></div>
    </section>
  );
};

export default Background;
