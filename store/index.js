import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'

// create function instead of object -> should be callable by nuxt, if object -> all users would get same instance
// normal vuex store
const createStore = () => {
  return new Vuex.Store({
    // starting state
    state: {
      loadedPosts: [],
      token: null
    },
    // receive state and payload
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        )

        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(process.env.baseUrl + '/posts.json')
          .then(res => {
            const postsArray = []
            for (const key in res.data) {
              // ... pulls out all properties
              postsArray.push({ ...res.data[key], id: key })
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(error => context.error(error))
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updated: new Date()
        }

        return axios
          .post(process.env.baseUrl + '/posts.json?auth=' + vuexContext.state.token, createdPost)
          .then(result => {
            // add firebase id
            vuexContext.commit('addPost', {
              ...createdPost,
              id: result.data.name
            })
          })
          .catch(error => console.error(error))
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            process.env.baseUrl + '/posts/' +
            editedPost.id +
            '.json?auth=' + vuexContext.state.token,
            editedPost
          )
          .then(result => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(error => console.error(error))
      },
      authenticateUser(vuexContext, authData) {
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbApiKey

        if (!authData.isLogin) {
          authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbApiKey
        }

        return axios.post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }).then(result => {
          const token = result.data.idToken
          const expire = new Date().getTime() + +result.data.expiresIn * 1000

          vuexContext.commit('setToken', token)
          localStorage.setItem('token', token)
          localStorage.setItem('tokenExpiration', expire)

          Cookie.set('jwt', token)
          Cookie.set('expirationDate', expire)
        }).catch(error => console.error(error))
      },
      initAuth(vuexContext, request) {
        let token
        let expirationDate

        if (request) {
          if (!request.headers.cookie) {
            return
          }
          // extract token from cookie
          const jwtCookie = request.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))

          if (!jwtCookie) {
            return
          }

          token = jwtCookie.split('=')[1]
          expirationDate = request.headers.cookie.split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('='[1])
        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }

        // check if cookie is expired or no token exists
        if (new Date().getTime() > +expirationDate || !token) {
          console.info('no token or invalid token')
          vuexContext.dispatch('logout')
          return
        }

        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')

        if (process.env.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
        console.info('user was successfully logged out')
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore
