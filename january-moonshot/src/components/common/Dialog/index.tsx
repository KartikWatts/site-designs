import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { DialogProps } from "../../../types/types";
import Checkbox from "../Checkbox";
import {
  extractTagsFromData,
  getPixabayImages,
} from "../../../utils/helperFunctions";
import { PixabayImage } from "../../../types/interfaces";
import { Loader } from "../Loader";
import shareIcon from "../../../assets/share.png";
import { ref, set } from "firebase/database";
import db from "../../../firebase";

const Dialog = ({
  imageId,
  selectedItem,
  onDialogClose,
  user,
}: DialogProps) => {
  const [dialogItem, setDialogItem] = useState<PixabayImage | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isUploadingData, setIsUploadingData] = useState(false);

  const dialogModal = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (selectedItem || imageId) {
      dialogModal?.current?.showModal();
      if (selectedItem) {
        setDialogItem(selectedItem);
      } else if (imageId) {
        getPixabayImages({
          id: imageId.toString(),
        })
          .then((res) => {
            setDialogItem(res[0]);
          })
          .catch((error: Error) => {
            console.error("Exception: ", error.message);
          });
      }
    }
  }, [selectedItem, imageId]);

  useEffect(() => {
    if (dialogItem) {
      const tags = extractTagsFromData([dialogItem], 10);
      setTagsList(tags);
    }
  }, [dialogItem]);

  const downloadImage = (event: MouseEvent) => {
    event.preventDefault();
    if (!selectedImageUrl) return;

    const urlParts = selectedImageUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];

    setIsUploadingData(true);
    set(ref(db, `users/${user?.uid}/downloads/${dialogItem?.id}`), {
      url: dialogItem?.previewURL,
    }).catch((err) => {
      console.error(err);
    });

    fetch(selectedImageUrl, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsUploadingData(false);
      });
  };

  const handleDialogClose = () => {
    dialogModal?.current?.close();
    onDialogClose();
  };

  const copyToClipboard = async () => {
    const baseUrl = window.location.origin;

    try {
      await navigator.clipboard.writeText(
        `${baseUrl}?imageId=${dialogItem ? dialogItem.id : imageId}`
      );
      setIsCopied(true);
      // Reset the "Copied" status after a short delay
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <dialog ref={dialogModal}>
      <div className={styles.modalHeader}>
        <div className={styles.previewDetails}>
          Preview ID: {dialogItem ? dialogItem.id : imageId}
          <div className={styles.shareIcon} onClick={copyToClipboard}>
            <img src={shareIcon} width={32} />
            <div className={styles.shareInstructionText}>
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </div>
          </div>
        </div>
        <div className={styles.closeBtn} onClick={handleDialogClose}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='33'
            viewBox='0 0 32 33'
            fill='none'
          >
            <path
              d='M11.8451 20.3409L20.2303 11.9557M20.2303 20.3409L11.8451 11.9557M11.5933 30.9631H20.4822C27.8896 30.9631 30.8525 28.0002 30.8525 20.5928V11.7039C30.8525 4.29646 27.8896 1.3335 20.4822 1.3335H11.5933C4.18586 1.3335 1.2229 4.29646 1.2229 11.7039V20.5928C1.2229 28.0002 4.18586 30.9631 11.5933 30.9631Z'
              stroke='#3B4043'
              strokeWidth='2.22138'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
      {dialogItem ? (
        <div className={styles.bodyContainer}>
          <div className={styles.detailsContainer}>
            <div className={styles.resultImageContainer}>
              <img
                className={styles.resultImage}
                src={dialogItem.webformatURL}
              />
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.mainText}>Download</div>
              <div className={styles.dimensionDisplayContainer}>
                {/* <DimensionBox
                type='Small'
                width={selectedItem.previewWidth}
                height={selectedItem.previewHeight}
                imageUrl={selectedItem.previewURL}
                selectedDimension={selectedItem.previewURL === selectedImageUrl}
                onChange={(imageUrl) => setSelectedImageUrl(imageUrl)}
              /> */}
                <DimensionBox
                  type='Medium'
                  width={dialogItem.previewWidth}
                  height={dialogItem.previewHeight}
                  imageUrl={dialogItem.previewURL}
                  selectedDimension={dialogItem.previewURL === selectedImageUrl}
                  onChange={(imageUrl) => setSelectedImageUrl(imageUrl)}
                />
                <DimensionBox
                  type='Big'
                  width={dialogItem.webformatWidth}
                  height={dialogItem.webformatHeight}
                  imageUrl={dialogItem.webformatURL}
                  selectedDimension={
                    dialogItem.webformatURL === selectedImageUrl
                  }
                  onChange={(imageUrl) => setSelectedImageUrl(imageUrl)}
                />
                <DimensionBox
                  type='Original'
                  width={dialogItem.imageWidth}
                  height={dialogItem.imageHeight}
                  imageUrl={dialogItem.largeImageURL}
                  selectedDimension={
                    dialogItem.largeImageURL === selectedImageUrl
                  }
                  onChange={(imageUrl) => setSelectedImageUrl(imageUrl)}
                />
              </div>
              <button
                className={`${styles.downloadButton} ${
                  (!selectedImageUrl || isUploadingData) && styles.disabled
                }`}
                disabled={!selectedImageUrl || isUploadingData}
                onClick={(e) => downloadImage(e)}
              >
                {isUploadingData ? "Processing..." : "Download for free!"}
              </button>
              <div className={styles.mainText}>Information</div>
              <div className={styles.informationContainer}>
                <InformationData data='User' value={dialogItem.user} />
                <InformationData
                  data='User ID'
                  value={dialogItem.user_id.toString()}
                />
                <InformationData data='Type' value={dialogItem.type} />
                <InformationData
                  data='Views'
                  value={dialogItem.views.toLocaleString()}
                />
                <InformationData
                  data='Downloads'
                  value={dialogItem.downloads.toLocaleString()}
                />
                <InformationData
                  data='Likes'
                  value={dialogItem.likes.toLocaleString()}
                />
              </div>
            </div>
          </div>
          <div className={styles.tagsContainer}>
            <span className={styles.tagTitle}>Tags: </span>
            {tagsList.map((tag, index) => {
              return (
                <span key={`${tag}_${index}`} className={styles.tag}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
    </dialog>
  );
};

const DimensionBox = ({
  type,
  width,
  height,
  imageUrl,
  selectedDimension,
  onChange,
}: {
  type: string;
  width: number;
  height: number;
  imageUrl: string;
  selectedDimension: boolean;
  onChange: (imageUrl: string) => void;
}) => {
  return (
    <div className={styles.dimensionsBox}>
      <div>{type}</div>
      <div className={styles.dimensionCheck}>
        <div className={styles.dimensionText}>{`${width}x${height}`}</div>
        <Checkbox
          id={type}
          isChecked={selectedDimension}
          onChange={() => onChange(imageUrl)}
        />
      </div>
    </div>
  );
};

const InformationData = ({ data, value }: { data: string; value: string }) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoData}>{data}</div>
      <div className={styles.valueData}>{value}</div>
    </div>
  );
};

export default Dialog;
