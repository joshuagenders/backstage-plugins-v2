import React from 'react';
import { HomePageUUIDComponent } from '@internal/backstage-plugin-new-uuid';


import {
  HomePageRandomJoke,
  HomePageStarredEntities,
  CustomHomepageGrid,
} from '@backstage/plugin-home';
// import { Content, Header, Page } from '@backstage/core-components';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { MicrosoftCalendarCard } from '@backstage-community/plugin-microsoft-calendar';

const defaultConfig = [
  {
    component: <HomePageSearchBar />, // Or 'HomePageSearchBar' as a string if you know the component name
    x: 0,
    y: 0,
    width: 12,
    height: 2,
    movable: true,
    resizable: true,
    deletable: true,
  },
  {
    component: <HomePageRandomJoke />,
    x: 0,
    y: 1,
    width: 6,
    height: 2,
    movable: true,
    resizable: true,
    deletable: true,
  },
  // {
  //   component: <MicrosoftCalendarCard />,
  //   x: 0,
  //   y: 2,
  //   width: 4,
  //   height: 4,
  //   movable: true,
  //   resizable: true,
  //   deletable: true,
  // },
  {
    component: <HomePageStarredEntities />,
    x: 0,
    y: 3,
    width: 6,
    height: 4,
    movable: true,
    resizable: true,
    deletable: true,
  },
  {
    component: <HomePageUUIDComponent />,
    x: 0,
    y: 4,
    width: 6,
    height: 2,
    movable: true,
    resizable: true,
    deletable: true,
  },
];

export const homePage = (
  <CustomHomepageGrid config={defaultConfig}>
    <HomePageSearchBar />
    <HomePageRandomJoke />
    {/* <MicrosoftCalendarCard /> */}
    <HomePageStarredEntities />
    <HomePageUUIDComponent />
  </CustomHomepageGrid>
);