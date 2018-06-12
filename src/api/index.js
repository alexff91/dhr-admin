import Resource from './resource';

export const Users = new Resource('users');
export const Tokens = new Resource('tokens');
export const Companies = new Resource('companies', {
  getVacancies(companyId) {
    return this.http.get(`/companies/${companyId}/vacancies`);
  }
});

export const Vacancies = new Resource('vacancies', {
  getQuestions(vacancyId = '') {
    return this.http.get(`/vacancies/${vacancyId}/questions`);
  }
});
export const Responds = new Resource('responds', {
  createRespond(vacancyId, data) {
    return this.http.post(`/vacancies/${vacancyId}/responds`, data);
  }
});