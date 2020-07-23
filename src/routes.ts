import loadable from '@loadable/component';

const Home = loadable(() =>
  import(/* webpackChunkName: "Home" */ './pages/Home')
);

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    exact: true,
  },
];

export default routes;
