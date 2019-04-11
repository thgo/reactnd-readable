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
  api('/posts')
    .then(posts => posts.data)

export const votePostAPI = (postId, vote) =>
  api.post(`/posts/${postId}`, { option: vote })

export const filterPostsAPI = (category) =>
  api.get(`/${category}/posts`)
    .then(posts => posts.data)
