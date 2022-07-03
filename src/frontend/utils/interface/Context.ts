import React from 'react';
import { HeadQuarter, Character, Technology } from './Card';

export interface ContextInterface {
  dispatch: React.Dispatch<any>;
  serverError?: {
    message: string;
    code?: number;
  };
  language?: 'es' | 'en';
  theme?: 'dark' | 'light';
  cards?: (HeadQuarter | Character | Technology)[];
  [others: string]: any;
}
