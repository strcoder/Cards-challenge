/* eslint-disable no-param-reassign */
import { Request } from 'express';
import axios from 'axios';

import { API_URL, IMG_CLOUD_URL } from '../config';
import { HeadQuarter, Character, Technology } from '../../frontend/utils/interface/Card';
import { ContextInterface } from '../../frontend/utils/interface/Context';

const getInitialData = async (req: Request, mutateObj: Partial<ContextInterface>): Promise<Partial<ContextInterface>> => {
  const path = req.originalUrl.split('?').shift();
  const config = {};

  if (path === '/' || path === '/home') {
    try {
      const { data } = await axios.get<(HeadQuarter | Character | Technology)[]>(`${API_URL}`, config);
      const cards = data?.map((item) => {
        return {
          ...item,
          imgUrl: `${IMG_CLOUD_URL}/${item.id}.png?tx=h_600,q_80,f_auto`,
        };
      });
      mutateObj.cards = cards;
    } catch (e) {
      console.log(e);
    }
  }

  return mutateObj;
};

export default getInitialData;
