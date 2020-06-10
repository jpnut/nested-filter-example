import toNumber from 'lodash/toNumber';
import * as React from 'react';

export const toMoney = (value: any) => toNumber((toNumber(value) * 100).toFixed());

export const fromMoney = (value: number) => toNumber((value / 100).toFixed(2));

export const Money: React.SFC<{ children: number }> = ({ children }) => (
  <span>{children.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}</span>
);
