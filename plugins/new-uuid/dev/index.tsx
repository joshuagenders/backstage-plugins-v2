import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { newUuidPlugin, NewUuidPage } from '../src/plugin';

createDevApp()
  .registerPlugin(newUuidPlugin)
  .addPage({
    element: <NewUuidPage />,
    title: 'Root Page',
    path: '/new-uuid',
  })
  .render();
