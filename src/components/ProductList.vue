<template>
  <div>
    <v-toolbar
     dense
    >
      <v-toolbar-title>Products</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filter"
        solo
        dense
        hide-details
        label="Filter"
      ></v-text-field>
      <v-btn
        class="ml-2"
        depressed
        color="success"
        dark
        @click="getFiltredProductList(page, filter)"
      >
        Apply
      </v-btn>
      <v-btn
        class="ml-2"
        depressed
        color="primary"
        dark
        @click="addProduct()"
      >
        Add
      </v-btn>
    </v-toolbar>
    <v-container>
      <template v-if="products === null">
        <v-progress-linear
          indeterminate
          color="cyan"
        ></v-progress-linear>
      </template>
      <template v-else>
        <v-row
          v-for="(item, index) in products"
          :key="item.id"
        >
          <v-col cols="1">{{ item.id }}</v-col>
          <v-col cols="5">
            <v-text-field
              v-model="item.name"
              solo
              dense
              hide-details
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="item.price"
              solo
              dense
              hide-details
              label="Price"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <template v-if="!createMode">
              <v-btn
                class="mr-2"
                depressed
                color="success"
                dark
                @click="updateProduct(index)"
              >
                Upd
              </v-btn>
              <v-btn
                depressed
                color="error"
                dark
                @click="deleteProduct(index)"
              >
                Del
              </v-btn>
            </template>
            <template v-else>
              <v-btn
                depressed
                color="warning"
                dark
                @click="createProduct()"
              >
                Save
              </v-btn>
            </template>
          </v-col>
        </v-row>
        <v-row v-if="!createMode">
          <v-pagination
            v-model="page"
            :length="lastPage"
            circle
            @input="getProductList(page, filter)"
          ></v-pagination>
        </v-row>
      </template>
    </v-container>
  </div>
</template>

<script>
import {HTTP} from '../http'

export default {
  name: 'ProductList',
  data() {
    return {
      filter: '',
      page: 1,
      createMode: false,
      lastPage: null,
      products: null,
      product: {},
    }
  },
  beforeMount () {
    this.getProductList(this.page, '')
  },
  methods: {
    getProductList (page, filter) {
      this.clearList()
      HTTP.get(`products?page=${page}&filter=${filter}`)
      .then(res => {
        this.products = res.data.data
        this.lastPage = res.data.last_page
      })
    },
    getFiltredProductList (page, filter) {
      this.page = 1
      this.clearList()
      this.getProductList (page, filter)
    },
    clearList () {
      this.products = null
    },
    updateProduct (index) {
      const id = this.products[index].id
      HTTP.put(`products/${id}`, {
        name: this.products[index].name,
        price: this.products[index].price
      })
    },
    deleteProduct (index) {
      const id = this.products[index].id
      HTTP.delete(`products/${id}`)
    },
    addProduct () {
      if (!this.createMode) {
        this.products = [
          {
            id: '',
            name: '',
            price: 0
          }
        ]
        this.createMode = true
      } else {
        this.createMode = false
      }
    },
    createProduct () {
      this.createMode = false
      const name = this.products[0].name
      const price = this.products[0].price
      this.products = null
      HTTP.post('products', {
        name: name,
        price: price
      })
      .finally(() => {
        
        this.getProductList(this.page, this.filter)
      })
    }
  },
}
</script>
