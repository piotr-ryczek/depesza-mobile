import React, { useMemo, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { BottomSheetWrapper } from 'components/bottom-sheet-wrapper';
import { ArticlesHeaderTitle } from 'components/articles-header-title';
import { AppState } from 'state/app-state';

import { DashboardScreen } from 'screens/dashboard';
import { AllArticlesScreen } from 'screens/all-articles';
import { RegionsScreen } from 'screens/regions';
import { RegionScreen } from 'screens/region';
import { ArticleScreen } from 'screens/article';
import { PublisherScreen } from 'screens/publisher';
import { SavedArticlesScreen } from 'screens/saved-articles';
import { OwnArticlesScreen } from 'screens/own-articles';
import { ReportedArticlesScreen } from 'screens/reported-articles';
import {
  BottomSheetGroup,
  BottomSheetArticlesGroupDataItem,
  UserRole,
} from 'types';
import { baseScreenOptions } from 'lib/header/config';
import { fetchRegions } from 'state/actions';
import { DrawerParamList } from 'navigators/app-drawer';
import { useAppDispatch, useAppSelector } from 'lib/hooks';

export type ArticlesStackParamList = {
  Dashboard: {};
  AllArticles: {};
  Article: {
    articleId: string;
    regionTitle: string;
    regionTitleFromParams?: string;
  };
  Regions: {};
  Region: {
    regionId: string;
    regionTitle: string;
    regionTitleFromParams?: string;
  };
  SavedArticles: {};
  OwnArticles: {};
  ReportedArticles: {};
  Publisher: {
    publisherId: string;
  };
};

const Stack = createStackNavigator<ArticlesStackParamList>();
const { Navigator, Screen } = Stack;

type ArticlesStackProps = StackScreenProps<DrawerParamList, 'ArticlesStack'>;

export const ArticlesStack = (props: ArticlesStackProps) => {
  const { navigation } = props;

  const dispatch = useAppDispatch();
  const { regionGroups, jwtToken, role } = useAppSelector(
    (state: AppState) => state,
  );

  const isLoggedReader = !!(jwtToken && role === UserRole.READER);
  const isLoggedPublisher = !!(jwtToken && role === UserRole.PUBLISHER);

  const articlesGroups: BottomSheetGroup[] = useMemo(() => {
    const dataItems: BottomSheetArticlesGroupDataItem[] = [];

    if (isLoggedReader) {
      dataItems.push({
        id: 'dashboard',
        iconName: 'heartbeat',
        title: 'Obserwowane regiony',
        route: 'Dashboard',
        type: 'app',
      });
    }

    dataItems.push({
      id: 'all-articles',
      iconName: 'globe',
      title: 'Wszystkie',
      route: 'AllArticles',
      type: 'app',
    });

    if (isLoggedPublisher) {
      dataItems.push({
        id: 'own-articles',
        iconName: 'pencil',
        title: 'Twoje',
        route: 'OwnArticles',
        type: 'app',
      });

      dataItems.push({
        id: 'reported-articles',
        iconName: 'exclamation',
        title: 'Zgłoszone',
        route: 'ReportedArticles',
        type: 'app',
      });
    }

    if (isLoggedReader) {
      dataItems.push({
        id: 'saved-articles',
        iconName: 'bookmark',
        title: 'Zapisane',
        route: 'SavedArticles',
        type: 'app',
      });
    }

    const articlesGroup: BottomSheetGroup = {
      title: 'Twoje',
      index: 0,
      data: dataItems,
    };

    return [articlesGroup, ...regionGroups];
  }, [isLoggedReader, isLoggedPublisher, regionGroups]);

  // Side Effects

  useEffect(() => {
    if (!regionGroups.length) {
      dispatch(fetchRegions());
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        initialRouteName="AllArticles"
        screenOptions={{
          ...baseScreenOptions({ navigation }),
        }}>
        {isLoggedReader && (
          <Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerTitle: () => (
                <ArticlesHeaderTitle title="Obserwowane regiony" />
              ),
            }}
          />
        )}

        <Screen
          name="AllArticles"
          component={AllArticlesScreen}
          options={{
            headerTitle: () => <ArticlesHeaderTitle title="Wszystkie" />,
          }}
        />
        <Screen
          name="Article"
          component={ArticleScreen}
          options={{
            headerTitle: () => <ArticlesHeaderTitle title="Artykuł" />,
          }}
        />
        <Screen
          name="Regions"
          component={RegionsScreen}
          options={{
            headerTitle: () => <ArticlesHeaderTitle title="Regiony" />,
          }}
        />
        <Screen
          name="Region"
          component={RegionScreen}
          options={{
            headerTitle: () => <ArticlesHeaderTitle title="Region" />,
          }}
        />
        {isLoggedReader && (
          <Screen
            name="SavedArticles"
            component={SavedArticlesScreen}
            options={{
              headerTitle: () => <ArticlesHeaderTitle title="Zapisane" />,
            }}
          />
        )}
        {isLoggedPublisher && (
          <Screen
            name="OwnArticles"
            component={OwnArticlesScreen}
            options={{
              headerTitle: () => <ArticlesHeaderTitle title="Twoje" />,
            }}
          />
        )}
        {isLoggedPublisher && (
          <Screen
            name="ReportedArticles"
            component={ReportedArticlesScreen}
            options={{
              headerTitle: () => <ArticlesHeaderTitle title="Zgłoszone" />,
            }}
          />
        )}
        <Screen
          name="Publisher"
          component={PublisherScreen}
          options={{ headerTitle: 'Autor' }}
        />
      </Navigator>

      <BottomSheetWrapper groups={articlesGroups} />
    </SafeAreaView>
  );
};
