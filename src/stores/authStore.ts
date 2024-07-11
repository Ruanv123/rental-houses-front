import { api } from '@/lib/axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: '',
    isLogged: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async login(token: string) {
      this.token = token
      this.isLogged = true
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    },
    async getProfile() {
      try {
        const res = await api.get('/api/profile')
        if (res.status === 200) {
          this.user = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    logout() {
      this.user = null
      this.token = ''
      this.isLogged = false
      delete api.defaults.headers.common['Authorization']
    }
  }
})
