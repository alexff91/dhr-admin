import {
  CommentService,
  OptionService,
  VacancyService,
  TermService,
  TokenService,
  UserService
} from '../services'

export default Vue => {
  // alias
  const services = {
    comment: CommentService,
    option: OptionService,
    vacancy: VacancyService,
    term: TermService,
    token: TokenService,
    user: UserService
  }

  // mount the services to Vue
  Object.defineProperties(Vue, {
    services: {get: () => services}
  })

  // mount the services to Vue component instance
  Object.defineProperties(Vue.prototype, {
    $services: {get: () => services}
  })
}
