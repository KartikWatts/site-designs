import { useEffect, useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Home from "./components/Home";
import { getPixabayImages } from "./utils/helperFunctions";
import SearchResults from "./components/SearchResults";
import { PixabayImage } from "./types/interfaces";

const App = () => {
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [searchResults, setSearchResults] = useState<PixabayImage[]>([]);

  useEffect(() => {
    if (!searchKeyword) return;
    setIsLoadingResults(true);
    getPixabayImages({
      q: searchKeyword,
    })
      .then((res) => {
        setSearchResults(res);
      })
      .catch((error: Error) => {
        console.error("Exception: ", error.message);
      })
      .finally(() => setIsLoadingResults(false));
  }, [searchKeyword]);

  const handleSearchAction = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleTagsListUpdate = (tagsListResponse: string[]) => {
    setTagsList(tagsListResponse);
  };

  return (
    <>
      <Background
        onTagsListUpdate={handleTagsListUpdate}
        searchKeyword={searchKeyword}
      />
      <Header />
      <Home
        tagsList={tagsList}
        onSearchAction={handleSearchAction}
        searchKeyword={searchKeyword}
        isLoadingResults={isLoadingResults}
      />
      {searchKeyword && (
        <SearchResults
          searchResults={searchResults}
          searchKeyword={searchKeyword}
          isLoadingResults={isLoadingResults}
        />
      )}
    </>
  );
};

export default App;
