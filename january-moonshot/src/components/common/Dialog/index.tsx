import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { DialogProps } from "../../../types/types";
import Checkbox from "../Checkbox";
import { extractTagsFromData } from "../../../utils/helperFunctions";

const Dialog = ({ selectedItem, onDialogClose }: DialogProps) => {
  const dialogModal = useRef<HTMLDialogElement | null>(null);

  console.log(selectedItem);

  useEffect(() => {
    if (selectedItem) {
      dialogModal?.current?.showModal();
    }
  }, [selectedItem]);

  const tagsList = extractTagsFromData([selectedItem], 10);

  return (
    <dialog ref={dialogModal}>
      <div className={styles.modalHeader}>
        <div>Preview ID: {selectedItem.id}</div>
        <div
          className={styles.closeBtn}
          onClick={() => {
            dialogModal?.current?.close();
            onDialogClose();
          }}
        >
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
      <div className={styles.bodyContainer}>
        <div className={styles.detailsContainer}>
          <div className={styles.resultImageContainer}>
            <img
              className={styles.resultImage}
              src={selectedItem.webformatURL}
            />
          </div>
          <div className={styles.descriptionContainer}>
            <div className={styles.mainText}>Download</div>
            <div className={styles.dimensionDisplayContainer}>
              <DimensionBox />
              <DimensionBox />
              <DimensionBox />
              <DimensionBox />
            </div>
            <button className={styles.downloadButton}>
              Download for free!
            </button>
            <div className={styles.mainText}>Information</div>
            <div className={styles.informationContainer}>
              <InformationData data='User' value={selectedItem.user} />
              <InformationData
                data='User ID'
                value={selectedItem.user_id.toString()}
              />
              <InformationData data='Type' value={selectedItem.type} />
              <InformationData
                data='Views'
                value={selectedItem.views.toLocaleString()}
              />
              <InformationData
                data='Downloads'
                value={selectedItem.downloads.toLocaleString()}
              />
              <InformationData
                data='Likes'
                value={selectedItem.likes.toLocaleString()}
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
    </dialog>
  );
};

const DimensionBox = () => {
  return (
    <div className={styles.dimensionsBox}>
      <div>Small</div>
      <div className={styles.dimensionCheck}>
        <div className={styles.dimensionText}>640 x 960</div>
        <Checkbox />
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
