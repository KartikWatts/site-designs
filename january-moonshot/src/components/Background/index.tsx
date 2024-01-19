import { useEffect, useState } from "react";
import { getPixabayImages } from "../../utils/helperFunctions";
import styles from "./styles.module.css";

const Background = () => {
  const [homePageUrl, setHomePageUrl] = useState("");

  useEffect(() => {
    getPixabayImages({
      min_width: "1400",
      min_height: "1000",
      category: "backgrounds",
      colors: "blue,black,brown",
    })
      .then((res) => {
        console.log(res);
        const randomIndex = Math.floor(Math.random() * res.length);
        setHomePageUrl(res[randomIndex].largeImageURL);
      })
      .catch((error: Error) => {
        console.error("Exception: ", error.message);
      });
  }, []);

  return (
    <section className={styles.imageContainer}>
      <img
        src={homePageUrl}
        alt='Full Desktop Image'
        className={styles.background}
      />
    </section>
  );
};

export default Background;
