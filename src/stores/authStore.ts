import { api } from '@/lib/axios'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

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
      localStorage.setItem('token', token)
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
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']

      router.push('/login')
    }
  }
})
