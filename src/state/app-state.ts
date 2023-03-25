import { UserRole, BottomSheetGroup } from 'types';

export type AppState = {
  jwtToken: string;
  role: UserRole | null;
  publisherId: string;
  regionGroups: BottomSheetGroup[];
  savedArticles: string[];
  followedRegions: string[];
  reportedArticles: string[];
  hasAccess: boolean;
};
