<template>
  <div class="home">

    <div class="home-items">
      <div class="home-item">        
        <span>Facturas</span>
        <strong>{{invoicesStore.invoices.length}}</strong>
      </div>
      <div class="home-item">                
        <span>Total Facturado</span>
        <strong>
          <Formatters :number="invoicesStore.getIvoiceTotal" />
        </strong>
      </div>
    </div>

  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useInvoicesStore } from '@/store/invoices'
import Formatters from '@/components/Formatters.vue'

export default defineComponent({
  name: 'TotalsHeader',
  components: {
    Formatters
  },
  setup() {
    const invoicesStore = useInvoicesStore();

    return {
      invoicesStore
    }
  }
})
</script>

<style scoped>
.home-items {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10pt;
}

.home-item {
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 10px;
  width: fit-content;
  padding: 4px 30px;
}

.home-item strong {
  font-size: 30pt;
  display: block;
}
</style>
 