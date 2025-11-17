export const endpoints = {
  user: {
    register: '/user/register',
    login: '/user/login',
    profile: '/user/profile',
  },
  post: {
    create: '/post',             
    list: '/post',               
    userPost: '/post/user',     
    getById: (id: string) => `/post/${id}`,     
    update: (id: string) => `/post/${id}`,      
    delete: (id: string) => `/post/${id}`,   
  }
 };
