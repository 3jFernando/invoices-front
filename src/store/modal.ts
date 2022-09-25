import { State } from '@/interfaces/modal';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: (): State => {
    return {
      isOpen: false,
      name: 'modal-initial',
      title: 'Acciones',
      useBtnOk: true,
      btnOkTitle: 'Procesar'
    }
  },
  actions: {
    updateModal({
      name = '',
      isOpen = false,
      useBtnOk = true,
      title = 'Acciones',
      btnOkTitle = 'Procesar'
    }) {
      this.isOpen = isOpen;
      this.name = name;
      this.title = title;
      this.useBtnOk = useBtnOk;
      this.btnOkTitle = btnOkTitle;
    },
  },
});

