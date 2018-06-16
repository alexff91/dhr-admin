import authorize from './authorize';
import title from './title';
import nprogress from './nprogress';

export default {
  install(Vue) {
    authorize(Vue);
    title(Vue, {property: 'title'});
    nprogress(Vue);
  }
};
