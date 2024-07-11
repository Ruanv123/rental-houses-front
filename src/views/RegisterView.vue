<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')

async function handleSubmit() {
  if (name.value !== '' && email.value !== '' && password.value !== '') {
    try {
      const res = await fetch('/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name.value, email: email.value, password: password.value })
      })

      const data = await res.json()

      if (res.status === 201) {
        toast.success('Registration successful')
        router.push('/login')
      } else if (res.status === 500) {
        toast.error('User already exists')
      } else {
        toast.error(data.messsage)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<template>
  <div class="w-full lg:grid lg:grid-cols-2 min-h-screen">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-[350px] gap-6">
        <div class="grid gap-2 text-center">
          <h1 class="text-3xl font-bold">Register</h1>
          <p class="text-balance text-muted-foreground">
            Enter your email below to register to your account
          </p>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" v-model="name" required />
            </div>
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
              <Input id="password" type="password" required v-model="password" />
              <small>Password must be at least 8 characters</small>
            </div>
            <Button type="submit" class="w-full"> Login </Button>
            <Button variant="outline" class="w-full"> Login with Google </Button>
          </div>
        </form>
        <div class="mt-4 text-center text-sm">
          Do have an account?
          <RouterLink to="/login" class="underline"> Sign in </RouterLink>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?cs=srgb&dl=pexels-pixabay-259588.jpg&fm=jpg"
        alt="Image"
        width="1920"
        height="1080"
        class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
