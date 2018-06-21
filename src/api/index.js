import Resource from './resource';

export const Users = new Resource('users');
export const Tokens = new Resource('tokens', {
  getToken(data) {
    return this.http.post(`/secured/login`, data);
  },
});
export const Companies = new Resource('companies', {
  getVacancies(companyId) {
    return this.http.get(`/secured//companies/${companyId}/vacancies`);
  },
  createVacancy(companyId, data) {
    return this.http.post(`/secured//companies/${companyId}/vacancies`, data);
  }
});

export const Vacancies = new Resource('vacancies', {
  getQuestions(vacancyId = '') {
    return this.http.get(`/vacancies/${vacancyId}/questions`);
  },
  setQuestions(vacancyId, data){
    return this.http.post(`/secured/vacancies/${vacancyId}/questions/batch`, data)
  }
});
export const Responds = new Resource('responds', {
  createRespond(vacancyId, data) {
    return this.http.post(`/secured/vacancies/${vacancyId}/responds`, data);
  }
});