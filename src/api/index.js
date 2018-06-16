import Resource from './resource';

export const Users = new Resource('users');
export const Tokens = new Resource('tokens');

export const Companies = new Resource('companies', {
  getVacancies(companyId) {
    return this.http.get(`/companies/${companyId}/vacancies`);
  },
  createVacancy(companyId, data) {
    return this.http.post(`/companies/${companyId}/vacancies`, data);
  }
});

export const Vacancies = new Resource('vacancies', {
  getQuestions(vacancyId = '') {
    return this.http.get(`/vacancies/${vacancyId}/questions`);
  },
  setQuestions(vacancyId, data) {
    return this.http.post(`vacancies/${vacancyId}/questions/batch`, data);
  },
  getResponses(vacancyId) {
    return this.http.get(`/vacancies/${vacancyId}/responds`);
  }
});

export const Response = new Resource('respond', {
  getResponses(responseId) {
    return this.http.get(`/respond/${responseId}/questionResponds`);
  }
});