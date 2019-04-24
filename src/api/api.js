import axios from 'axios'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers
});

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getInitialData () {
  return Promise.all([
    getAllCategoriesAPI(),
    getAllPostsAPI()
  ]).then(([categories, posts]) => ({
    categories,
    posts
  }))
}

export const getAllCategoriesAPI = () =>
  api.get('/categories')
    .then(res => res.data.categories)

export const getAllPostsAPI = () =>
  api.get('/posts')
    .then(posts => posts.data)

export const votePostAPI = (postId, vote) =>
  api.post(`/posts/${postId}`, { option: vote })

export const filterPostsAPI = (category) =>
  api.get(`/${category}/posts`)
    .then(posts => posts.data)

export const addPostAPI = (post) =>
  api.post('/posts', post)
    .then(res => res.data)

export const deletePostAPI = (id) =>
  api.delete(`/posts/${id}`)
    .then(res => res)