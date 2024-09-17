<template>
  <main class="main-products">
    <h1 class="puik-brand-h1">Products</h1>
    <puik-table v-model:selection="selection" :headers="headers" :items="products" :expandable="true" :selectable="true"
      :searchBar="true" :searchFromServer="false" :sortFromServer="false" :fullWidth="true" , :stickyFirstCol="true"
      :stickyLastCol="true">
      <template #item-active="{ item }">
        <puik-switch v-model="item.active"></puik-switch>
      </template>
      <template #item-actions="{ item }">
        <puik-button variant="text" right-icon="delete" aria-label="Delete item"></puik-button>
      </template>
    </puik-table>
  </main>
</template>

<script setup lang="ts">
import type { PuikTableHeader } from '@prestashopcorp/puik-components';
import { ref } from 'vue';

export interface Product {
  "productId": number,
  "active": boolean,
  "name": string,
  "quantity": number,
  "price": string,
  "category": string
}

const headers: PuikTableHeader[] = [];
const selection = ref([]);
const products = ref<Product[]>([]);

const productKeys = Object.keys({
  productId: 0,
  active: true,
  name: '',
  quantity: 0,
  price: '',
  category: ''
});

productKeys.forEach(key => {
  headers.push({
    text: key,
    value: key,
    align: 'left',
    searchable: true,
    sortable: true,
    searchType: key === 'price' ? 'range' : 'text',
    preventExpand: key === 'active' ? true : false
  });
});

headers.push({
  text: 'Actions',
  value: 'actions',
  align: 'center',
  sortable: false,
  searchable: false,
  searchSubmit: true
});

const props = defineProps<{ products: Product[] | any }>();
products.value = props.products;
</script>

<style lang="scss" scoped>
.main-products {
  @apply p-10;
}
</style>
