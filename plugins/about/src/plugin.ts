import {
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const aboutPlugin = createPlugin({
  id: 'about',
  routes: {
    root: rootRouteRef,
  },
});

export const AboutCard = aboutPlugin.provide(
  createComponentExtension({
    component: {
      lazy: () =>
        import('./components/AboutCardComponent').then(m => m.AboutCard),
    },
  })
);
  
export const AboutPage = aboutPlugin.provide(
  createRoutableExtension({
    name: 'AboutPage',
    component: () =>
      import('./components/AboutCardPage').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
