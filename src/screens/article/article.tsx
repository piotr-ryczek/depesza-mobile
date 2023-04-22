import React, { useEffect, useReducer } from 'react';
import { ScrollView } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';

import api from 'lib/api';
import { basicReducer, BasicReducer } from 'lib/basic-reducer';
import { ArticlesHeaderTitle } from 'components/articles-header-title';
import { Article } from 'components/article';
import { screenStyles } from 'styles';
import { Loading } from 'components/loading';
import { handleError } from 'state/actions';
import { ArticlesStackParamList } from 'navigators/articles-stack';
import { ArticleDto } from 'types';
import { useAppDispatch } from 'lib/hooks';

type ArticleScreenProps = StackScreenProps<ArticlesStackParamList, 'Article'>;

type ArticleScreenState = {
  regionTitle: string;
  article: ArticleDto | null;
  isLoading: boolean;
};

export const ArticleScreen = (props: ArticleScreenProps) => {
  const { navigation, route } = props;

  const {
    params: { articleId, regionTitle: regionTitleFromParams = '' },
  } = route;

  const dispatch = useAppDispatch();
  const [state, setState] = useReducer<BasicReducer<ArticleScreenState>>(
    basicReducer,
    {
      regionTitle: regionTitleFromParams,
      article: null,
      isLoading: false,
    },
  );

  const { regionTitle, article, isLoading } = state;

  const fetchArticle = async () => {
    setState({
      isLoading: true,
    });

    try {
      const { data } = await api.getArticle(articleId);

      const { article: fetchedArticle } = data;
      const {
        region: { title: regionTitleFromApi },
      } = fetchedArticle;

      const newState = {
        article: fetchedArticle,
        isLoading: false,
        regionTitle: regionTitleFromApi,
      };

      setState(newState);
    } catch (error) {
      setState({ isLoading: false });
      dispatch(handleError(error));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ArticlesHeaderTitle title={regionTitle} />,
    });
  }, [regionTitle]);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      {article && <Article article={article} />}
    </ScrollView>
  );
};
