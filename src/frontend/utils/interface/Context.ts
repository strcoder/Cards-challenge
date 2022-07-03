import React from 'react';
import { Card } from './Card';

export interface ContextInterface {
  dispatch: React.Dispatch<any>;
  serverError?: {
    message: string;
    code?: number;
  };
  language?: 'es' | 'en';
  theme?: 'dark' | 'light';
  cards?: Card[];
  [others: string]: any;
}
