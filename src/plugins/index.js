import authorize from './authorize';
import title from './title';

export default {
  install(Vue) {
    authorize(Vue);
    title(Vue, {property: 'title'});
  }
};
