export type PixabayParams = {
  per_page?: string;
  min_width?: string;
  category?: string;
  q?: string;
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
