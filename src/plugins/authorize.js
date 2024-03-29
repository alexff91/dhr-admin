import store from '../store';
import router from '../router';

export default Vue => {
  // Authorize
  // Make sure that is the first hook.
  router.beforeHooks.unshift((to, from, next) => {
    // don't need authorize
    if (!to.meta.requiresAuth) {
      return next();
    }
    // check login state
    store.dispatch('checkToken')
      .then(valid => {
        // authorized
        if (valid) {
          return next();
        }
        // unauthorized
        next({path: 'login', query: {redirect: to.fullPath}});
      });
  });

  // // login page visiable
  // router.beforeEach((to, from, next) => {
  //   if (to.name !== 'login') return next()
  //   // check login state
  //   store.dispatch('checkToken')
  //     .then(valid => {
  //       if (!valid) return next()
  //       // when logged in
  //       console.log('dont need authorize')
  //       next({ path: to.query.redirect || '/' })
  //     })
  // })

  // // mount the authorize to Vue component instance
  // Object.defineProperties(Vue.prototype, {
  //   $authorize: { get: () => store.dispatch('refreshToken') }
  // })
}
