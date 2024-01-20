import { useEffect, useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Home from "./components/Home";
import { getPixabayImages } from "./utils/helperFunctions";

const App = () => {
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  useEffect(() => {
    if (!searchKeyword) return;
    setIsLoadingResults(true);
    getPixabayImages({
      per_page: "20",
      q: searchKeyword,
    })
      .then((res) => {
        console.log(res);
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
    </>
  );
};

export default App;
