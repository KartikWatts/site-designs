import { useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => {
  const [tagsList, setTagsList] = useState<String[]>([]);

  const handleTagsListUpdate = (tagsListResponse: String[]) => {
    setTagsList(tagsListResponse);
  };

  return (
    <>
      <Background onTagsListUpdate={handleTagsListUpdate} />
      <Header />
      <Home tagsList={tagsList} />
    </>
  );
};

export default App;
