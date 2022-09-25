import { State } from '@/interfaces/user';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      user: {
        "id": 0,
        "name": "",
        "email": "",
        "email_verified_at": null,
        "created_at": "",
        "updated_at": ""
      },
      isLogged: false,
      token: "",
    }
  },
  actions: {
    isLoggedIn(): boolean {

      const isLoggedState: any = localStorage.getItem("isLogged");
      const token: any = localStorage.getItem("token");
      const user: any = localStorage.getItem("user");

      if (isLoggedState === 'YES') {

        this.user = JSON.parse(user);
        this.isLogged = true;
        this.token = token;

        return true;
      }

      this.isLogged = false;
      localStorage.setItem("isLogged", '');

      return false;
    },
    logout(useConfirm: boolean) {

      if (useConfirm) {
        const confirmLogout = confirm("¿Seguro que desear salir del sistema?");
        if (!confirmLogout) return false;
      }

      localStorage.setItem("isLogged", '');
      localStorage.setItem("token", '');
      localStorage.setItem("user", '');

      this.user = {
        "id": 0,
        "name": "",
        "email": "",
        "email_verified_at": null,
        "created_at": "",
        "updated_at": ""
      };
      this.isLogged = false;
      this.token = "";

      window.location.assign('/login');

    }
  }
});

