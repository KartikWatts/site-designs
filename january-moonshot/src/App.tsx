import { useEffect, useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Home from "./components/Home";
import { getPixabayImages } from "./utils/helperFunctions";
import SearchResults from "./components/SearchResults";
import { PixabayImage } from "./types/interfaces";
import Dialog from "./components/common/Dialog";

const App = () => {
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [searchResults, setSearchResults] = useState<PixabayImage[]>([]);

  const [selectedItem, setSelectedItem] = useState<PixabayImage | null>(null);

  const urlParams = new URLSearchParams(window.location.search);
  const imageId = urlParams.get("imageId");

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

  const handleImageClick = (item: PixabayImage) => {
    setSelectedItem(item);
  };

  const handleDialogClose = () => {
    setSelectedItem(null);
    urlParams.delete("imageId");
    window.history.replaceState({}, "", `${window.location.pathname}`);
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
          onImageClick={handleImageClick}
        />
      )}
      {(selectedItem || imageId) && (
        <Dialog
          imageId={imageId}
          selectedItem={selectedItem}
          onDialogClose={handleDialogClose}
        />
      )}
    </>
  );
};

export default App;
