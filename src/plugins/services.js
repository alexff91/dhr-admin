import {
  CompanyService,
  RespondService,
  SettingsService,
  TokenService,
  UserService,
  VacancyService
} from '../services';

export default Vue => {
  // alias
  const services = {
    respond: RespondService,
    company: CompanyService,
    settings: SettingsService,
    vacancies: VacancyService,
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
