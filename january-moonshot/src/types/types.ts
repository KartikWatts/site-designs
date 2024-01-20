import { PixabayImage } from "./interfaces";

export type PixabayParams = {
  per_page?: string;
  min_width?: string;
  category?: string;
  q?: string;
  page?: string;
  [key: string]: string | undefined;
};

export type TagsListProps = {
  tagsList: string[];
};

export type SearchActionProps = {
  onSearchAction: (keyword: string) => void;
};

export type HomeProps = {
  tagsList: string[];
  onSearchAction: (keyword: string) => void;
  searchKeyword: string;
  isLoadingResults: boolean;
};

export type BackgroundProps = {
  onTagsListUpdate: (tagsList: string[]) => void;
  searchKeyword: string;
};

export type SearchResultsProps = {
  searchResults: PixabayImage[];
  searchKeyword: string;
  isLoadingResults: boolean;
  onImageClick: (item: PixabayImage) => void;
};

export type DialogProps = {
  selectedItem: PixabayImage;
  onDialogClose: () => void;
};
