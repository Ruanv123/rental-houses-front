<script setup lang="ts">
import { House, Menu, Search } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Input } from '../ui/input'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

const routes = ref([
  {
    path: '/dashboard',
    title: 'Dashboard'
  },
  {
    path: '/properties',
    title: 'Properties'
  },
  {
    path: '/rent',
    title: 'Rent'
  },
  {
    path: '/tenant',
    title: 'Tenant'
  },
  {
    path: '/analytics',
    title: 'Analytics'
  }
])
</script>

<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
    <nav
      class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
    >
      <RouterLink
        to="/dashboard"
        class="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <House class="h-6 w-6" />
        <span class="sr-only">Acme Inc</span>
      </RouterLink>
      <RouterLink
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        class="text-muted-foreground transition-colors hover:text-foreground"
        activeClass="text-foreground"
        exactActiveClass="text-foreground"
      >
        {{ route.title }}
      </RouterLink>
    </nav>
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav class="grid gap-6 text-lg font-medium">
          <RouterLink to="/dashboard" class="flex items-center gap-2 text-lg font-semibold">
            <House class="h-6 w-6" />
            <span class="sr-only">Acme Inc</span>
          </RouterLink>
          <RouterLink
            v-for="route in routes"
            :key="route.path"
            :to="route.path"
            class="hover:text-foreground"
          >
            {{ route.title }}
          </RouterLink>
          <!-- <RouterLink to="/properties" class="text-muted-foreground hover:text-foreground">
            Orders
          </RouterLink>
          <RouterLink to="#" class="text-muted-foreground hover:text-foreground">
            Products
          </RouterLink>
          <RouterLink to="#" class="text-muted-foreground hover:text-foreground">
            Customers
          </RouterLink>
          <RouterLink to="#" class="text-muted-foreground hover:text-foreground">
            Analytics
          </RouterLink> -->
        </nav>
      </SheetContent>
    </Sheet>
    <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form class="ml-auto flex-1 sm:flex-initial">
        <div class="relative">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="secondary" size="icon" class="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User Image" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <RouterLink to="/settings">Settings</RouterLink>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
