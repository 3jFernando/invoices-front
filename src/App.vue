<template>
  <nav v-if="userStore.isLoggedIn()" class="flex space-between align-center">
    <div class="flex align-center gap-2">
      <router-link to="/">
        <h1><strong>FacturaAPP</strong></h1>
      </router-link>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/about">Mi cuenta</router-link>      
    </div>
    <span class="pointer text-gray" @click=userStore.logout(true)>Salir del sistema </span>
  </nav>
  <nav v-else class="flex space-between align-center">
    <div class="flex align-center gap-2">
      <router-link to="/">
        <h1><strong>FacturaAPP</strong></h1>
      </router-link>
    </div>
   <div class="flex gap-2">
    <router-link to="/login">Acceder</router-link>
    <router-link to="/register">Registrarme</router-link>    
   </div>
  </nav>
  
  <div class="content">
    <router-view />
  </div>

</template>

<script lang="ts">

import { defineComponent } from "vue-demi";
import { useUserStore } from '@/store/user'

export default defineComponent({
  name: 'AppComponent',
  data() {
    return {
      isLoginRouteActived: false
    }
  },
  setup() {
    const userStore = useUserStore();

    return { userStore }
  }
});
</script>

<style >
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: Arial, Helvetica, sans-serif;
  -moz-osx-font-smoothing: Arial, Helvetica, sans-serif;
  color: #2c3e50;
}

.content{
  padding: 0 10pt;
}

.center {
  text-align: left;
}

.text-gray{
  color: gray;
}

.pointer{
  cursor: pointer;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

a{
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.flex {
  display: flex;
}
.wrap{
  flex-wrap: wrap;
}

.gap-2 {
  gap: 10px
}

.space-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.btn {
  padding: 3pt 9pt;
  border-radius: 3pt;
  box-shadow: 0 2px 10px -3px #ccc;
  cursor: pointer;
  font-size: 12px;
  height: 30px;
}

.btn-primary {
  background-color: #42b983;
  color: aliceblue;
  border: 1px solid #42b983;
}

.btn-primary:hover {
  background-color: #97debe;
  border: 1px solid transparent;
  color: rgb(50, 52, 54);
}

.btn-secundary {
  color: black;
  background-color: white;
  border: 1px solid aliceblue;
}

.btn-secundary:hover {
  color: #42b983;
  background-color: aliceblue;
  border: 1px solid transparent;
}

.forms {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 5px 20px;
}

.input-group label {
  font-weight: bold;
}

.input-group input,
.input-group select,
.input-group textarea {
  width: 95%;
  padding: 8px 10px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card {
  padding: 4%;
  background-color: #fcfcfc;
  border-radius: 10px;
  box-shadow: 0 2px 10px -3px #ccc;
}

.table {
  width: 100%;
  border: 0px !important;
  border-spacing: 0px;  
  text-align: center;
}

.m-b {
  margin-bottom: 10px;
}

.table thead {
  background-color: white;
  color: #606060;
  font-weight: bold;
}

.table thead>tr>th {
  padding: 8pt;
  border: 1px solid #606060;
  border-radius: 2px;
}

.table tbody>tr>td {
  padding: 3pt 2pt;
  border: 1px solid rgb(239, 239, 239);
}
</style>
