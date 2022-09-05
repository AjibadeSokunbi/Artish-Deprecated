import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  
  return req;
});




// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);

// export const resetPassword = (form) => API.post(`/api/auth/reset/${token}`, form);
export const login = (form) => API.post('/api/auth/login', form);
export const register = (form) => API.post('/api/auth/register', form);
export const verify = (form) => API.post('/api/auth/verify', form);
export const update = ( form) => API.put('/api/user/update', form);
export const complete = (form) => API.post('/auth/verify', form);
export const recover = ( form) => API.post('/api/auth/recover', form);
// export const resetPassword = ( form) => API.post('/api/auth/resetPassword', form);
