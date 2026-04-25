import * as tandarts from './tandarts';
import * as webshop from './webshop';
import * as restaurant from './restaurant';
import * as makelaar from './makelaar';

export const CASE_REGISTRY = {
  tandarts: {
    label: 'Tandartspraktijk',
    short: 'Tandarts',
    Component: tandarts.Component,
    initialState: tandarts.initialState,
    executeTool: tandarts.executeTool,
  },
  webshop: {
    label: 'E-commerce klantenservice',
    short: 'Webshop',
    Component: webshop.Component,
    initialState: webshop.initialState,
    executeTool: webshop.executeTool,
  },
  restaurant: {
    label: 'Restaurant reserveringen',
    short: 'Restaurant',
    Component: restaurant.Component,
    initialState: restaurant.initialState,
    executeTool: restaurant.executeTool,
  },
  makelaar: {
    label: 'Makelaardij & vastgoed',
    short: 'Makelaar',
    Component: makelaar.Component,
    initialState: makelaar.initialState,
    executeTool: makelaar.executeTool,
  },
};

export const CASE_KEYS = Object.keys(CASE_REGISTRY);
