export default (Vue) => {

  Object.defineProperties(Vue.prototype, {
    $title: {
      get: () => (title) => {
        document.title = title;
      }
    }
  });
}