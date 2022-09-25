<template>

  <Transition to="body" name="bounce">
    <div v-if="modalStore.isOpen" class="modal">
      <div class="modal-container">
        <div class="modal-body">
          <div class="flex space-between align-center">
            <p>{{modalStore.title}}</p>
            <button class="btn btn-secundary" @click="modalStore.updateModal('', false)">&times;</button>
          </div>

          <div class="modal-content">
            <slot></slot>
          </div>

        </div>
        <div class="modal-footer">
          <button class="btn btn-secundary" @click="modalStore.updateModal('', false)">Cerrar</button>
          <button v-if="modalStore.useBtnOk" class="btn btn-primary"
            @click="btnOkAction">{{modalStore.btnOkTitle}}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">

import { useModalStore } from '@/store/modal'

export default {
  name: 'ModalComponent',
  props: ['btnOkAction'],
  setup() {
    const modalStore = useModalStore();

    return {
      modalStore
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #33a66d78;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.modal-container {
  margin-top: 2%;
  width: 390pt;
  height: calc(100vh - 10%);
  background-color: white;
  border-radius: 5pt;
  box-shadow: 0 0 10px -3px #8f8d8d;
  position: relative;
  overflow: hidden;
  
}

.modal-body {
  overflow: hidden;
  padding: 10px;
  padding-right: 10px;
}

.modal-content {
  height: 80vh;
  overflow: auto;
  padding-right: 10px;
}

.modal-footer {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}
</style>