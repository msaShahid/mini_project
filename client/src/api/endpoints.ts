export const endpoints = {
  users: {
    register: '/users/register',
    login: '/users/login',
    profile: '/users/profile',
  },
  tasks: {
    root: '/tasks',
    byId: (id: string) => `/tasks/${id}`,
  },
};
