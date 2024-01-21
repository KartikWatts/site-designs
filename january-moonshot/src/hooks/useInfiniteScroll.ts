import { useState, useEffect, useCallback } from "react";

type UseInfiniteScrollReturnType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

const useInfiniteScroll = (
  callback: () => void
): UseInfiniteScrollReturnType => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 200 <=
        document.documentElement.offsetHeight ||
      isFetching
    )
      setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;

    callback();
  }, [isFetching, callback]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
