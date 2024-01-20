export type PixabayParams = {
  per_page?: string;
  min_width?: string;
  category?: string;
  [key: string]: string | undefined;
};

export type TagsListProps = {
  tagsList: String[];
};
