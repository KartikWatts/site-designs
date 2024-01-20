import { useEffect, useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import { getPixabayImages } from "./utils/helperFunctions";
import SearchResults from "./components/SearchResults";
import { PixabayImage } from "./types/interfaces";
import Dialog from "./components/common/Dialog";
import { auth } from "./firebase";
import { User } from "firebase/auth";
import { DisplayType } from "./types/enums";
import Home from "./pages/Home";
import Account from "./pages/Account";

const App = () => {
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [searchResults, setSearchResults] = useState<PixabayImage[]>([]);
  const [selectedItem, setSelectedItem] = useState<PixabayImage | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [displayType, setDisplayType] = useState(DisplayType.Home);

  const urlParams = new URLSearchParams(window.location.search);
  const [imageId, setImageId] = useState<string | null>(
    urlParams.get("imageId")
  );

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

  useEffect(() => {
    auth
      .authStateReady()
      .then(() => {
        if (auth.currentUser) {
          setUser(auth.currentUser);
        }
      })
      .finally(() => setLoadingAuth(false));
  }, [auth]);

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
    setImageId(null);
    urlParams.delete("imageId");
    window.history.replaceState({}, "", `${window.location.pathname}`);
  };

  const handleUserSignIn = (authUser: User | null) => {
    setUser(authUser);
    if (!authUser) {
      setDisplayType(DisplayType.Home);
    }
  };

  const handleDisplayAccount = () => {
    if (displayType === DisplayType.Home) {
      setDisplayType(DisplayType.Account);
    } else {
      setDisplayType(DisplayType.Home);
    }
  };

  const handleAccountImageClick = (id: string) => {
    setImageId(id);
  };

  return (
    <>
      <Background
        onTagsListUpdate={handleTagsListUpdate}
        searchKeyword={searchKeyword}
        displayType={displayType}
      />
      <Header
        loadingAuth={loadingAuth}
        user={user}
        handleUserSignIn={handleUserSignIn}
        handleDisplayAccount={handleDisplayAccount}
        displayType={displayType}
      />
      {displayType === DisplayType.Home && (
        <>
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
        </>
      )}
      {displayType === DisplayType.Account && (
        <Account
          handleAccountImageClick={handleAccountImageClick}
          user={user}
        />
      )}

      {(selectedItem || imageId) && (
        <Dialog
          imageId={imageId}
          selectedItem={selectedItem}
          onDialogClose={handleDialogClose}
          user={user}
        />
      )}
    </>
  );
};

export default App;
