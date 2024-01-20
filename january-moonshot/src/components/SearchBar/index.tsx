import { useState } from "react";
import searchIcon from "../../assets/search_icon.png";
import Button from "../common/Button";
import styles from "./styles.module.css";

const SearchBar = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <img src={searchIcon} className={styles.searchIcon} />
        <input
          autoFocus
          className={styles.searchInput}
          placeholder='Search'
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.actionContainer}>
        <span
          className={`${styles.instructionText} ${
            searchKeyword && styles.instructionVisible
          }`}
        >
          <kbd className={styles.actionKey}>Enter &#9166;</kbd> to Search
        </span>
        <Button label='Go!' onClick={() => {}} />
      </div>
    </div>
  );
};

export default SearchBar;
