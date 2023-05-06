import React, { useEffect, useReducer } from 'react';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { basicReducer, BasicReducer } from 'lib/basic-reducer';
import { screenStyles } from 'styles';
import api from 'lib/api';
import { Loading } from 'components/loading';
import { Publisher } from 'components/publisher';
import { handleError } from 'state/actions';
import { PublisherDto } from 'types';
import { ArticlesStackParamList } from 'navigators/articles-stack';
import { useAppDispatch } from 'lib/hooks';

type PublisherScreenProps = StackScreenProps<
  ArticlesStackParamList,
  'Publisher'
>;

type PublisherScreenState = {
  publisher: PublisherDto | null;
  isLoading: boolean;
};

export const PublisherScreen = (props: PublisherScreenProps) => {
  const { route } = props;

  const {
    params: { publisherId },
  } = route;

  const dispatch = useAppDispatch();
  const [state, setState] = useReducer<BasicReducer<PublisherScreenState>>(
    basicReducer,
    {
      publisher: null,
      isLoading: false,
    },
  );

  const { publisher, isLoading } = state;

  const fetchPublisher = async () => {
    setState({ isLoading: true });
    try {
      const { data } = await api.getPublisherInformation(publisherId);

      const { publisher: fetchedPublisher } = data;

      setState({
        isLoading: false,
        publisher: fetchedPublisher,
      });
    } catch (error) {
      setState({ isLoading: false });
      dispatch(handleError(error));
    }
  };

  // Side effects

  useEffect(() => {
    fetchPublisher();
  }, [publisherId]);

  return (
    <ScrollView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      {publisher && <Publisher publisher={publisher} />}
    </ScrollView>
  );
};
