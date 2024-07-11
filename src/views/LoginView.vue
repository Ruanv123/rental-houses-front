<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RouterLink, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/stores/authStore'

const email = ref('')
const password = ref('')

const router = useRouter()

const authStore = useAuthStore()

async function handleLogin() {
  if (email.value !== '' && password.value !== '') {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    const data = await res.json()

    console.log(data)

    if (res.status === 200) {
      authStore.login(data.access_token)
      toast.success('Login successful')
      router.push('/dashboard')
    } else {
      toast.error('Invalid credentials')
    }
  }
}
</script>

<template>
  <div class="w-full lg:grid lg:grid-cols-2 min-h-screen">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Login</h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form @submit.prevent="handleLogin">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" v-model="email" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <RouterLink to="/forgot-password" class="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </RouterLink>
              </div>
              <Input id="password" type="password" v-model="password" required />
            </div>
            <Button type="submit" class="w-full"> Login </Button>
            <Button variant="outline" class="w-full"> Login with Google </Button>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Sign up </RouterLink>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="/home-login.jpg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
