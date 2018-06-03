import {
  CommentService,
  OptionService,
  TermService,
  TokenService,
  UserService,
  VacancyService
} from '../services';

export default Vue => {
  // alias
  const services = {
    comment: CommentService,
    option: OptionService,
    vacancies: VacancyService,
    term: TermService,
    token: TokenService,
    user: UserService
  };

  // mount the services to Vue
  Object.defineProperties(Vue, {
    services: {get: () => services}
  });

  // mount the services to Vue component instance
  Object.defineProperties(Vue.prototype, {
    $services: {get: () => services}
  });
}
