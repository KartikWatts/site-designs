import SearchBar from "../../components/SearchBar";
import TrendingKeywords from "../../components/TrendingKeywords";
import { HomeProps } from "../../types/types";
import styles from "./styles.module.css";

const Home = ({
  tagsList,
  onSearchAction,
  searchKeyword,
  isLoadingResults,
}: HomeProps) => {
  return (
    <section>
      <div
        className={`${styles.primaryText} ${
          searchKeyword && styles.displayFade
        }`}
      >
        Discover over 2,000,000 free Stock Images
      </div>

      <SearchBar onSearchAction={onSearchAction} />
      {!searchKeyword ? (
        <TrendingKeywords tagsList={tagsList} />
      ) : (
        <div className={styles.resultTextLabel}>
          {isLoadingResults ? `Loading...` : `Results: ${searchKeyword}`}
        </div>
      )}
    </section>
  );
};

export default Home;
