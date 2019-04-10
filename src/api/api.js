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
    getAllCategories(),
    getAllPosts()
  ]).then(([categories, posts]) => ({
    categories,
    posts
  }))
}

export const getAllCategories = () =>
  api.get('/categories')
    .then(res => res.data)

export const getAllPosts = () =>
  api('/posts')
    .then(posts => Object.values(posts.data))

export const votePostAPI = (postId, vote) => {
  return api.post(`/posts/${postId}`, { option: vote })
}