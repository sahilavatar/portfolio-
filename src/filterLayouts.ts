/**
 * filterLayouts.ts
 * Grid positions for all cards matching mchiu.co.uk
 */

export interface CardPosition {
  col: string;
  row: string;
  dim?: boolean;
}

export type FilterCategory = 'All' | 'About' | 'Work' | 'Side Quests';

export const MOBILE_BREAKPOINT = 768;

export const LAYOUTS: Record<FilterCategory, Record<string, CardPosition>> = {
  All: {
    about:      { col: '1 / 3', row: '1' },
    gmail:      { col: '3',     row: '1' },
    linkedin:   { col: '4',     row: '1' },
    strava:     { col: '1 / 3', row: '2 / 4' },
    schedule:   { col: '3 / 5', row: '2 / 4' },
    plugin:     { col: '1 / 3', row: '4 / 6' },
    designlab:  { col: '3 / 5', row: '4 / 6' },
    ds:         { col: '1 / 3', row: '6 / 8' },
    alexa:      { col: '3 / 5', row: '6 / 8' },
    duolingo:   { col: '1',     row: '8' },
  },
  About: {
    about:      { col: '1 / 3', row: '1' },
    gmail:      { col: '3',     row: '1' },
    linkedin:   { col: '4',     row: '1' },
    strava:     { col: '1 / 3', row: '2 / 4',  dim: true },
    schedule:   { col: '3 / 5', row: '2 / 4',  dim: true },
    plugin:     { col: '1 / 3', row: '4 / 6',  dim: true },
    designlab:  { col: '3 / 5', row: '4 / 6',  dim: true },
    ds:         { col: '1 / 3', row: '6 / 8',  dim: true },
    alexa:      { col: '3 / 5', row: '6 / 8',  dim: true },
    duolingo:   { col: '1',     row: '8',      dim: true },
  },
  Work: {
    strava:     { col: '1 / 3', row: '1 / 3' },
    schedule:   { col: '3 / 5', row: '1 / 3' },
    plugin:     { col: '1 / 3', row: '3 / 5' },
    designlab:  { col: '3 / 5', row: '3 / 5' },
    ds:         { col: '1 / 3', row: '5 / 7' },
    alexa:      { col: '3 / 5', row: '5 / 7',  dim: true },
    about:      { col: '1 / 3', row: '7',      dim: true },
    gmail:      { col: '3',     row: '7',      dim: true },
    linkedin:   { col: '4',     row: '7',      dim: true },
    duolingo:   { col: '1',     row: '8',      dim: true },
  },
  'Side Quests': {
    alexa:      { col: '1 / 3', row: '1 / 3' },
    duolingo:   { col: '3',     row: '1' },
    gmail:      { col: '4',     row: '1',      dim: true },
    about:      { col: '3 / 5', row: '2',      dim: true },
    strava:     { col: '1 / 3', row: '3 / 5',  dim: true },
    schedule:   { col: '3 / 5', row: '3 / 5',  dim: true },
    plugin:     { col: '1 / 3', row: '5 / 7',  dim: true },
    designlab:  { col: '3 / 5', row: '5 / 7',  dim: true },
    ds:         { col: '1 / 3', row: '7 / 9',  dim: true },
    linkedin:   { col: '3',     row: '7',      dim: true },
  },
};

export const MOBILE_LAYOUTS: Record<FilterCategory, Record<string, CardPosition>> = {
  All: {
    about:      { col: '1 / 3', row: '1' },
    gmail:      { col: '1',     row: '2' },
    linkedin:   { col: '2',     row: '2' },
    strava:     { col: '1 / 3', row: '3 / 5' },
    schedule:   { col: '1 / 3', row: '5 / 7' },
    plugin:     { col: '1 / 3', row: '7 / 9' },
    designlab:  { col: '1 / 3', row: '9 / 11' },
    ds:         { col: '1 / 3', row: '11 / 13' },
    alexa:      { col: '1 / 3', row: '13 / 15' },
    duolingo:   { col: '1',     row: '15' },
  },
  About: {
    about:      { col: '1 / 3', row: '1' },
    gmail:      { col: '1',     row: '2' },
    linkedin:   { col: '2',     row: '2' },
    strava:     { col: '1 / 3', row: '3 / 5',   dim: true },
    schedule:   { col: '1 / 3', row: '5 / 7',   dim: true },
    plugin:     { col: '1 / 3', row: '7 / 9',   dim: true },
    designlab:  { col: '1 / 3', row: '9 / 11',  dim: true },
    ds:         { col: '1 / 3', row: '11 / 13', dim: true },
    alexa:      { col: '1 / 3', row: '13 / 15', dim: true },
    duolingo:   { col: '1',     row: '15',      dim: true },
  },
  Work: {
    strava:     { col: '1 / 3', row: '1 / 3' },
    schedule:   { col: '1 / 3', row: '3 / 5' },
    plugin:     { col: '1 / 3', row: '5 / 7' },
    designlab:  { col: '1 / 3', row: '7 / 9' },
    ds:         { col: '1 / 3', row: '9 / 11' },
    alexa:      { col: '1 / 3', row: '11 / 13', dim: true },
    about:      { col: '1 / 3', row: '13',      dim: true },
    gmail:      { col: '1',     row: '14',      dim: true },
    linkedin:   { col: '2',     row: '14',      dim: true },
    duolingo:   { col: '1',     row: '15',      dim: true },
  },
  'Side Quests': {
    alexa:      { col: '1 / 3', row: '1 / 3' },
    duolingo:   { col: '1',     row: '3' },
    gmail:      { col: '2',     row: '3',       dim: true },
    about:      { col: '1 / 3', row: '4',       dim: true },
    strava:     { col: '1 / 3', row: '5 / 7',   dim: true },
    schedule:   { col: '1 / 3', row: '7 / 9',   dim: true },
    plugin:     { col: '1 / 3', row: '9 / 11',  dim: true },
    designlab:  { col: '1 / 3', row: '11 / 13', dim: true },
    ds:         { col: '1 / 3', row: '13 / 15', dim: true },
    linkedin:   { col: '1',     row: '15',      dim: true },
  },
};
