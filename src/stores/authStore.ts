import type { LoginProps } from '@/@types'
import { api } from '@/lib/axios'
import axios from 'axios'
import { defineStore } from 'pinia'

export const authStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isLogged: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    async login({ email, password }: LoginProps) {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        if (res.status == 200) {
          const data = await res.json()
          this.token = data.token
          this.isLogged = true
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getProfile() {
      const res = await api.get('/api/profile')
    },
    logout() {
      this.user = null
      this.token = null
      this.isLogged = false
      delete api.defaults.headers.common['Authorization']
    }
  }
})
