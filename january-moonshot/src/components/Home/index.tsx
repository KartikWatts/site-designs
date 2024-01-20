import { TagsListProps } from "../../types/types";
import SearchBar from "../SearchBar";
import TrendingKeywords from "../TrendingKeywords";
import styles from "./styles.module.css";

const Home = ({ tagsList }: TagsListProps) => {
  return (
    <section>
      <div className={styles.primaryText}>
        Discover over 2,000,000 free Stock Images
      </div>
      <SearchBar />
      <TrendingKeywords tagsList={tagsList} />
    </section>
  );
};

export default Home;
