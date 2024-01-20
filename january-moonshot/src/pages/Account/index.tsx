import { useEffect, useState } from "react";
import { AccountProps } from "../../types/types";
import styles from "./styles.module.css";
import { child, get, ref } from "firebase/database";
import db, { auth } from "../../firebase";
import { getFirebaseData } from "../../utils/helperFunctions";
import { FirebaseImageData } from "../../types/interfaces";
import { Loader } from "../../components/common/Loader";

const images = [
  {
    id: "8113311",
    url: "https://cdn.pixabay.com/photo/2023/07/07/20/12/dragonfly-8113312_150.jpg",
  },
  {
    id: "8113312",
    url: "https://cdn.pixabay.com/photo/2023/07/07/20/12/dragonfly-8113312_150.jpg",
  },
];

const Account = ({ handleAccountImageClick, user }: AccountProps) => {
  const [downloadedImages, setDownloadedImages] = useState<FirebaseImageData[]>(
    []
  );
  const [favoriteImages, setFavoriteImages] = useState<FirebaseImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const downloadResults = await getFirebaseData("downloads", user);
        setDownloadedImages(downloadResults);
        const favoriteResults = await getFirebaseData("favorites", user);
        setFavoriteImages(favoriteResults);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.container}>
        <Loader />
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.heading}>Downloaded Images</div>
      <div className={styles.resultsContainer}>
        {downloadedImages.map((image, index) => {
          return (
            <div
              key={`${image.key}_${index}`}
              className={styles.resultCardContainer}
            >
              <div
                className={styles.resultImageContainer}
                onClick={() => handleAccountImageClick(image.key)}
              >
                <img className={styles.resultImage} src={image.url} />
              </div>
              <div className={styles.tagContainer}>
                <div key={`${image.key}_${index}`} className={styles.tag}>
                  ImageId: {image.key}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.heading}>Favorite Images</div>
      <div className={styles.resultsContainer}>
        {favoriteImages.map((image, index) => {
          return (
            <div
              key={`${image.key}_${index}`}
              className={styles.resultCardContainer}
            >
              <div
                className={styles.resultImageContainer}
                onClick={() => handleAccountImageClick(image.key)}
              >
                <img className={styles.resultImage} src={image.url} />
              </div>
              <div className={styles.tagContainer}>
                <div key={`${image.key}_${index}`} className={styles.tag}>
                  ImageId: {image.key}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Account;
