import { useState, useEffect } from "react";

const useInfiniteScroll = (callback: any) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;

    callback(() => {
      console.log("called back");
    });
  }, [isFetching]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop + 200 <=
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;