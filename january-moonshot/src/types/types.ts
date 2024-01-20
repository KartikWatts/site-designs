import { User } from "firebase/auth";
import { PixabayImage } from "./interfaces";
import { DisplayType } from "./enums";

export type PixabayParams = {
  per_page?: string;
  min_width?: string;
  category?: string;
  q?: string;
  page?: string;
  [key: string]: string | undefined;
  id?: string;
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
  displayType: DisplayType;
};

export type SearchResultsProps = {
  searchResults: PixabayImage[];
  searchKeyword: string;
  isLoadingResults: boolean;
  onImageClick: (item: PixabayImage) => void;
};

export type DialogProps = {
  imageId?: string | null;
  selectedItem?: PixabayImage | null;
  onDialogClose: () => void;
  user: User | null;
};

export type HeaderProps = {
  loadingAuth: boolean;
  user: User | null;
  handleUserSignIn: (user: User | null) => void;
  handleDisplayAccount: () => void;
  displayType: DisplayType;
};

export type AccountProps = {
  handleAccountImageClick: (id: string) => void;
  user: User | null;
};
