import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import config from 'lib/config';

import { store } from 'state/store';
import { ArticleDto, PublisherDto, PublisherInListDto, RegionDto } from 'types';

type StatusResponse = {
  status: 'ok';
};

type AuthResponse = {
  token: string;
  toReadArticles: string[];
  followedRegions: string[];
  hasAccess: boolean;
};

type AuthResponsePublisher = {
  token: string;
  hasPassword: boolean;
  articlesReported: string[];
  publisherId: string;
};

type DataType = 'query' | 'body';

class Api {
  private apiUrl;

  constructor() {
    this.apiUrl = config.apiUrl;
  }

  getConfig = (
    data: any = null,
    dataType: DataType = 'query',
  ): AxiosRequestConfig => {
    const jwtToken = store.getState().jwtToken;

    const requestConfig: AxiosRequestConfig = {};

    if (jwtToken) {
      Object.assign(requestConfig, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
    }
    if (data) {
      if (dataType === 'query') {
        Object.assign(requestConfig, {
          paramsSerializer: (params: any) => qs.stringify(params),
          params: data,
        });
      } else {
        Object.assign(requestConfig, {
          data,
        });
      }
    }

    return requestConfig;
  };

  post = <T>(url: string, body = {}): Promise<AxiosResponse<T>> =>
    axios.post(`${this.apiUrl}${url}`, body, this.getConfig());

  put = <T>(url: string, body = {}): Promise<AxiosResponse<T>> =>
    axios.put(`${this.apiUrl}${url}`, body, this.getConfig());

  patch = <T>(url: string, body = {}): Promise<AxiosResponse<T>> =>
    axios.patch(`${this.apiUrl}${url}`, body, this.getConfig());

  delete = <T>(url: string, body = {}): Promise<AxiosResponse<T>> =>
    axios.delete(`${this.apiUrl}${url}`, this.getConfig(body, 'body'));

  get = <T>(url: string, query = {}): Promise<AxiosResponse<T>> => {
    return axios.get(`${this.apiUrl}${url}`, this.getConfig(query, 'query'));
  };

  // Login & Register

  readerRefreshToken = (): Promise<AxiosResponse<AuthResponse>> =>
    this.post('/readers/refresh');

  loginByEmail = (
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> =>
    this.post('/readers/loginByEmail', { email, password });

  registerByEmail = (
    email: string,
    password: string,
    repeatPassword: string,
  ): Promise<AxiosResponse<StatusResponse>> =>
    this.post('/readers/registerByEmail', { email, password, repeatPassword });

  verifyEmail = (
    emailVerificationCode: string,
  ): Promise<AxiosResponse<AuthResponse>> =>
    this.post('/readers/verifyEmail', { emailVerificationCode });

  authByFacebook = (authToken: string): Promise<AxiosResponse<AuthResponse>> =>
    this.post('/readers/authByFacebook', { authToken });

  // Articles

  getReaderArticles = (
    page: number = 1,
    perPage: number = config.perPage,
  ): Promise<AxiosResponse<{ articles: ArticleDto[] }>> =>
    this.get('/readers/articles', { page, perPage });

  getArticles = (
    page: number = 1,
    perPage: number = config.perPage,
  ): Promise<AxiosResponse<{ articles: ArticleDto[] }>> => {
    return this.get('/articles', { page, perPage });
  };

  getArticle = (
    articleId: string,
  ): Promise<AxiosResponse<{ article: ArticleDto }>> =>
    this.get(`/articles/${articleId}`);

  getRegionArticles = (
    regionId: string,
    page: number = 1,
    perPage: number = config.perPage,
  ): Promise<AxiosResponse<{ articles: ArticleDto[] }>> =>
    this.get(`/regions/${regionId}/articles`, { page, perPage });

  getPublisherArticles = (
    publisherId: string,
    page: number = 1,
    perPage: number = config.perPage,
  ): Promise<AxiosResponse<{ articles: ArticleDto[] }>> =>
    this.get(`/publishers/${publisherId}/articles`, { page, perPage });

  // Regions

  getRegions = (): Promise<AxiosResponse<{ regions: RegionDto[] }>> =>
    this.get('/regions');

  getRegion = (
    regionId: string,
  ): Promise<AxiosResponse<{ region: RegionDto }>> =>
    this.get(`/regions/${regionId}`);

  getFollowedRegions = (): Promise<AxiosResponse<{ regions: RegionDto[] }>> =>
    this.get('/readers/regions');

  followRegion = (regionId: string): Promise<AxiosResponse<StatusResponse>> =>
    this.post(`/readers/regions/${regionId}`);

  unfollowRegion = (regionId: string): Promise<AxiosResponse<StatusResponse>> =>
    this.delete(`/readers/regions/${regionId}`);

  // Saved Articles

  getArticlesToRead = (): Promise<AxiosResponse<{ articles: ArticleDto[] }>> =>
    this.get('/readers/articlesToRead');

  addArticleToRead = (
    articleId: string,
  ): Promise<AxiosResponse<StatusResponse>> =>
    this.post(`/readers/articlesToRead/${articleId}`);

  removeArticleToRead = (
    articleId: string,
  ): Promise<AxiosResponse<StatusResponse>> =>
    this.delete(`/readers/articlesToRead/${articleId}`);

  // Publisher

  publisherRefreshToken = (): Promise<AxiosResponse<AuthResponsePublisher>> =>
    this.post('/publishers/refresh');

  getPublishers = (): Promise<
    AxiosResponse<{ publishers: PublisherInListDto[] }>
  > => this.get('/publishers');

  getPublisherInformation = (
    publisherId: string,
  ): Promise<AxiosResponse<{ publisher: PublisherDto }>> =>
    this.get(`/publishers/${publisherId}`);

  publisherLogin = (
    email: string,
    password: string,
    code: string,
  ): Promise<AxiosResponse<AuthResponsePublisher>> =>
    this.post('/publishers/login', { email, password, code });

  getOwnArticles = (
    page: number = 1,
    perPage: number = config.perPage,
  ): Promise<AxiosResponse<{ articles: ArticleDto[]; countAll: number }>> =>
    this.get('/publishers/articles', { page, perPage });

  getReportedArticles = (
    page: number = 1,
    perPage: number = config.perPage,
  ): Promise<AxiosResponse<{ articles: ArticleDto[]; countAll: number }>> =>
    this.get('/publishers/articlesReported', { page, perPage });

  reportArticle = (articleId: string): Promise<AxiosResponse<StatusResponse>> =>
    this.post(`/publishers/articlesReported/${articleId}`);

  undoReportArticle = (
    articleId: string,
  ): Promise<AxiosResponse<StatusResponse>> =>
    this.delete(`/publishers/articlesReported/${articleId}`);
}

export default new Api();
