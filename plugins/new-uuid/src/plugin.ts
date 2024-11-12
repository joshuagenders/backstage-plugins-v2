import {
  createComponentExtension,
  createPlugin
} from '@backstage/core-plugin-api';
import { createCardExtension } from '@backstage/plugin-home-react';

import { rootRouteRef } from './routes';

export const newUuidPlugin = createPlugin({
  id: 'new-uuid',
  routes: {
    root: rootRouteRef,
  },
});

export const NewUuidComponent = newUuidPlugin.provide(
  createComponentExtension({
    name: 'NewUuid',
    component: {
      lazy: () =>
        import('./components/UUIDComponent').then(m => m.UUIDComponent),
    }
  }),
);


export const HomePageUUIDComponent = newUuidPlugin.provide(
  createCardExtension({
    name: 'NewUUIDComponent',
    title: 'New UUID',
    components: () => import('./components/UUIDComponent')
  }),
);
