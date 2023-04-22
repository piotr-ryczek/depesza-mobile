import React, { useEffect, useReducer } from 'react';
import { SafeAreaView } from 'react-native';

import { BasicReducer, basicReducer } from 'lib/basic-reducer';
import { screenStyles } from 'styles';
import api from 'lib/api';
import { Loading } from 'components/loading';
import { Publishers } from 'components/publishers';
import { handleError } from 'state/actions';
import { PublisherInListDto } from 'types';
import { useAppDispatch } from 'lib/hooks';

type PublishersScreenState = {
  isLoading: boolean;
  publishers: PublisherInListDto[];
};

export const PublishersScreen = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useReducer<BasicReducer<PublishersScreenState>>(
    basicReducer,
    {
      publishers: [],
      isLoading: false,
    },
  );

  const { publishers, isLoading } = state;

  const fetchPublishers = async () => {
    setState({ isLoading: true });
    try {
      const { data } = await api.getPublishers();

      const { publishers: fetchedPublishers } = data;

      setState({ isLoading: false, publishers: fetchedPublishers });
    } catch (error) {
      setState({ isLoading: false });
      dispatch(handleError(error));
    }
  };

  // Side effects

  useEffect(() => {
    fetchPublishers();
  }, []);

  return (
    <SafeAreaView style={screenStyles.screenWrapper}>
      <Loading isLoading={isLoading} />
      <Publishers publishers={publishers} />
    </SafeAreaView>
  );
};
