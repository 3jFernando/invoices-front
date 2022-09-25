<template>
  {{formatCurrency(number)}}
</template>

<script lang="ts">

export default {
  name: 'FormattersComponent',
  props: {
    number: String,
  },
  methods: {
    formatCurrency(number: number){
      return new Intl.NumberFormat('en-ES', {
        style: 'currency',
        currency: 'COP'
      }).format(number);
    } 
  }
};
</script>
