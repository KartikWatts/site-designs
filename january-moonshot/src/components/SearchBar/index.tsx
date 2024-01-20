import { KeyboardEvent, useState } from "react";
import searchIcon from "../../assets/search_icon.png";
import Button from "../common/Button";
import styles from "./styles.module.css";
import { SearchActionProps } from "../../types/types";

const SearchBar = ({ onSearchAction }: SearchActionProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [triggeredSearchKeyword, setTriggeredSearchKeyword] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Search");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!searchKeyword) return;
    setTriggeredSearchKeyword(searchKeyword);
    setPlaceholderText("Start New Search");
    const keyword = searchKeyword.trim();
    onSearchAction(keyword);
  };

  return (
    <div
      className={`${styles.container} ${
        triggeredSearchKeyword && styles.containerCompressed
      }`}
    >
      <div className={styles.labelContainer}>
        <img src={searchIcon} className={styles.searchIcon} />
        <input
          autoFocus
          className={styles.searchInput}
          placeholder={placeholderText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </div>
      {triggeredSearchKeyword != searchKeyword && (
        <div className={styles.actionContainer}>
          <span
            className={`${styles.instructionText} ${
              searchKeyword && styles.instructionVisible
            }`}
          >
            <kbd className={styles.actionKey}>Enter &#9166;</kbd> to Search
          </span>
          <Button label='Go!' onClick={handleSearch} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
