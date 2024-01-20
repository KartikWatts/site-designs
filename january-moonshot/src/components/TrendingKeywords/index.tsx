import { TagsListProps } from "../../types/types";
import styles from "./styles.module.css";

const TrendingKeywords = ({ tagsList }: TagsListProps) => {
  return (
    <div className={styles.container}>
      <span>Trending:</span> {tagsList.join(", ")}
    </div>
  );
};

export default TrendingKeywords;
