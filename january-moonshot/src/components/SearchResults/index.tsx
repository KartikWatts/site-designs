import { useEffect, useRef, useState } from "react";
import { SearchResultsProps } from "../../types/types";
import styles from "./styles.module.css";
import {
  extractTagsFromData,
  getPixabayImages,
} from "../../utils/helperFunctions";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { Loader } from "../common/Loader";
import { PixabayImage } from "../../types/interfaces";

const SearchResults = ({
  searchResults,
  searchKeyword,
  isLoadingResults,
}: SearchResultsProps) => {
  if (isLoadingResults) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }
  if (searchResults.length === 0) {
    return <div className={styles.noResultText}>No Result Found</div>;
  }

  const [results, setResults] = useState(searchResults);
  const [filteredResults, setFilteredResults] = useState(searchResults);
  const [selectedFilterTag, setSelectedFilterTag] = useState("");
  const [loadingMore, setLoadingMore] = useInfiniteScroll(fetchMoreListItems);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPageFetched, setLastPageFetched] = useState(false);

  // console.log(searchResults);
  // console.log(lastPageFetched);

  const containerRef = useRef<HTMLElement | null>(null);

  function fetchMoreListItems() {
    if (lastPageFetched) return;
    setTimeout(() => {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      getPixabayImages({
        page: newPage.toString(),
        q: searchKeyword,
      })
        .then((res: PixabayImage[]) => {
          if (res.length === 0) {
            setLastPageFetched(true);
          }
          const allResults = [...results, ...res];
          setResults(allResults);
          if (selectedFilterTag) {
            const updatedResults = allResults.filter((item) =>
              item.tags.includes(selectedFilterTag.toLowerCase())
            );
            setFilteredResults(updatedResults);
          } else {
            setFilteredResults(allResults);
          }
        })
        .catch((error: Error) => {
          console.error("Exception: ", error.message);
        })
        .finally(() => setLoadingMore(false));
    }, 2000);
  }

  const handleTagClick = (tag: string) => {
    const updatedResults = searchResults.filter((item) =>
      item.tags.includes(tag.toLowerCase())
    );
    setSelectedFilterTag(tag);
    setFilteredResults(updatedResults);
  };

  useEffect(() => {
    setTimeout(() => {
      if (containerRef?.current) containerRef.current.style.opacity = "1";
    }, 500);
  }, []);

  useEffect(() => {
    // console.log("CALLING RESULTS TAG FILTER", results);

    setFilterTags(extractTagsFromData(results, 10));
  }, [results]);

  return (
    <section ref={containerRef} className={styles.container}>
      <TagsFilter
        filterTags={filterTags}
        onTagClick={handleTagClick}
        selectedFilterTag={selectedFilterTag}
      />
      <div className={styles.resultsContainer}>
        {filteredResults.map((resultItem, index) => {
          const itemTagList = extractTagsFromData([resultItem], 3);
          return (
            <div
              key={`${resultItem.id}_${index}`}
              className={styles.resultCardContainer}
            >
              <div className={styles.resultImageContainer}>
                <img
                  className={styles.resultImage}
                  src={resultItem.webformatURL}
                />
              </div>
              <div className={styles.tagContainer}>
                {itemTagList.map((tag, index) => {
                  return (
                    <div key={`${tag}_${index}`} className={styles.tag}>
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {loadingMore && (
          <>
            {lastPageFetched ? (
              <div className={styles.allResultsText}>All Results Fetched</div>
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
    </section>
  );
};

const TagsFilter = ({
  filterTags,
  onTagClick,
  selectedFilterTag,
}: {
  filterTags: string[];
  onTagClick: (tag: string) => void;
  selectedFilterTag: string;
}) => {
  return (
    <div className={styles.filterContainer}>
      {filterTags.map((tag, index) => {
        return (
          <div
            key={`${tag}_${index}`}
            onClick={() => onTagClick(tag)}
            className={`${styles.filterTag} ${
              selectedFilterTag === tag && styles.selectedTag
            }`}
          >
            {tag}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
