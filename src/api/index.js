import Resource from './resource';

export const Users = new Resource('secured/users');
export const Tokens = new Resource('tokens', {
  getToken(data) {
    return this.http.post(`/secured/login`, data);
  }
});

export const Companies = new Resource('secured/companies', {
  getVacancies(companyId) {
    return this.http.get(`/secured/companies/${companyId}/vacancies`);
  },
  createVacancy(companyId, data) {
    return this.http.post(`/secured/companies/${companyId}/vacancies`, data);
  },
  getSkills(companyId) {
    return this.http.get(`/secured/companies/${companyId}/skills`);
  },
  setSkills(companyId, data) {
    return this.http.post(`/secured/companies/${companyId}/skills/batch`, data);
  },
  deleteSkill(companyId, skillId) {
    return this.http.delete(`/secured/companies/${companyId}/skills/${skillId}`);
  }
});

export const Vacancies = new Resource('vacancies', {
  setSecured(vacancyId, data) {
    return this.http.put(`/secured/vacancies/${vacancyId}`, data);
  },
  getResponses(vacancyId, responseId = '') {
    return this.http.get(`/secured/vacancies/${vacancyId}/responds/${responseId}`);
  }
});

export const Responds = new Resource('responds', {
  getAnswers(respondId) {
    return this.http.get(`/secured/respond/${respondId}/answers`);
  },
  createRespondFeedback(respondId, userId, data) {
    return this.http.post(`/secured/responds/${respondId}/users/${userId}/review`, data);
  }
});

export const Answers = new Resource('answers', {
  get(questionAnswerId, userId) {
    return this.http.get(`/secured/answers/${questionAnswerId}/review/user/${userId}`);
  },

  createAnswerFeedback(questionAnswerId, userId, data) {
    return this.http.post(`/secured/answers/${questionAnswerId}/user/${userId}/review`, data);
  }
});