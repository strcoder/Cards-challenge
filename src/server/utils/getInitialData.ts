/* eslint-disable no-param-reassign */
import { Request } from 'express';
import axios from 'axios';

import { API_URL } from '../config';
import { ContextInterface } from '../../frontend/utils/interface/Context';

const getInitialData = async (req: Request, mutateObj: Partial<ContextInterface>): Promise<Partial<ContextInterface>> => {
  const path = req.originalUrl.split('?').shift();

  if (path === '/' || path === '/home') {
    const { data } = await axios.get(`${API_URL}`, {});
    mutateObj.user = data.data;
  }

  return mutateObj;
};

export default getInitialData;
