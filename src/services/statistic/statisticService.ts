import $api from '../api';
import { StatisticRequest, StatisticResponse } from './statisticServiceTypes';

export default class StatisticService {
  static getStatistic = async (userId: string): Promise<StatisticResponse> => {
    const response = await $api.get<StatisticResponse>(
      `/users/${userId}/statistics`
    );
    return response.data;
  };

  static updateStatistic = async (
    userId: string,
    newBody: StatisticRequest
  ): Promise<StatisticResponse> => {
    const response = await $api.put<StatisticResponse>(
      `/users/${userId}/statistics`,
      newBody
    );
    return response.data;
  };
}
