export interface BottomSheetGroupDataItemCommon {
  id: string;
  title: string;
  type: string;
}

export interface BottomSheetArticlesGroupDataItem
  extends BottomSheetGroupDataItemCommon {
  iconName: string;
  route: string;
}

export interface BottomSheetRegionGroupDataItem
  extends BottomSheetGroupDataItemCommon {
  iconUrl: string;
}

export type BottomSheetGroup = {
  title: string;
  data: (BottomSheetArticlesGroupDataItem | BottomSheetRegionGroupDataItem)[];
  index: number;
};
