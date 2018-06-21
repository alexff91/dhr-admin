import Resource from './resource';

export const Users = new Resource('users');
export const Tokens = new Resource('tokens');

export const Companies = new Resource('companies', {
  getVacancies(companyId) {
    return this.http.get(`/companies/${companyId}/vacancies`);
  },
  createVacancy(companyId, data) {
    return this.http.post(`/companies/${companyId}/vacancies`, data);
  },
  getSkills(companyId) {
    return this.http.get(`/companies/${companyId}/skills`);
  },
  setSkills(companyId, data) {
    return this.http.post(`/companies/${companyId}/skills/batch`, data);
  }
});

export const Vacancies = new Resource('vacancies', {
  getQuestions(vacancyId = '') {
    return this.http.get(`/vacancies/${vacancyId}/questions`);
  },
  setQuestions(vacancyId, data) {
    return this.http.post(`vacancies/${vacancyId}/questions/batch`, data);
  },
  getResponses(vacancyId, responseId = '') {
    return this.http.get(`/vacancies/${vacancyId}/responds/${responseId}`);
  }
});

export const Responds = new Resource('responds', {
  getAnswers(respondId) {
    return this.http.get(`/respond/${respondId}/answers`);
  },
  createRespondFeedback(respondId, userId, data) {
    return this.http.post(`/responds/${respondId}/users/${userId}/review`, data);
  }
});

export const Answers = new Resource('answers', {
  getAll(questionAnswerId) {
    return this.http.get(`/answers/${questionAnswerId}/review`);
  },
  createAnswerFeedback(questionAnswerId, userId, data) {
    return this.http.post(`/answers/${questionAnswerId}/users/${userId}/review`, data);
  }
});