<template>
  <div>
    <product-list></product-list>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'Products',
  components: {
    ProductList
  }
}
</script>
