<template>
  <div class="login">
    <div class="login-content">
      <h1>Iniciar sesión</h1>

      <div class="input-group" style="text-align: left;">
        <label class="form-label" for="#email">Correo electronico:</label><br />
        <input v-model="email" class="form-input" type="email" id="email" required placeholder="Correo electronico">
      </div>
      <br />
      <div class="input-group" style="text-align: left;">
        <label class="form-label" for="#password">Contraseña de usuario:</label><br />
        <input v-model="password" class="form-input" type="password" id="password" placeholder="Contraseña de usuario">
      </div>

      <ul v-show="messages.length > 0">
        <li v-for="message in messages" :key="message">
          {{message}}
        </li>
      </ul>

      <br />
      <button type="button" class="btn btn-primary" @click="login">Iniciar sesión</button>

      <p class="msg">Si no tiene una cuenta, aun puedes
        <router-link to="/register">Regístrarte</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">

import HttpService from '@/services/httpService'
import { defineComponent } from "vue-demi";
import { useUserStore } from '@/store/user'

export default defineComponent({
  data: () => ({
    email: "",
    password: "",
    messages: []
  }),
  setup() {
    const userStore = useUserStore();
    const httpService = HttpService;

    return { userStore, httpService }
  },
  methods: {
    login() {

      this.messages = [];
      const params = {
        email: this.email,
        password: this.password
      };

      this.httpService.httpAuth('auth/login', params, this.callbackLogin);
    },
    callbackLogin(status: string, response: any) {

      if (status === 'error_validation' || status === 'error_login') {
        this.messages = response;
        return false;
      }      

      if (status === 'success') {

        const { token, user } = response;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLogged", "YES");

        this.userStore.$patch({
          user,
          isLogged: true,
          token: token
        });

        window.location.assign('/');
        return false;
      }

      alert("Upps, no fue posible acceder a tu sesión.")
    }
  },
});
</script>

<style scoped>
.login {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4%;
}

.login-content {
  width: 240pt;
  padding: 20pt;
  text-align: center;
}
</style>