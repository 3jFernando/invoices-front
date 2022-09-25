<template>
  <div class="about">

    <strong>Nombre:</strong> {{userStore.user.name}}
    <br />
    <strong>Email: </strong> {{userStore.user.email}}

    <br />
    <br />
    <button class="btn btn-primary" @click="userStore.logout(true)">Cerrar sesión</button>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useUserStore } from '@/store/user'

export default defineComponent({
  name: 'AboutView',
  setup() {
    const userStore = useUserStore();
    return {
      userStore
    }
  }
})
</script>
