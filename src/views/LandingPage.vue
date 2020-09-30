<template>
  <section class="hero is-fullheight">
    <div class="hero-head">Navigation bar</div>
    <div class="hero-body">
      <div class="container">

        <div class="table container">
          <table class="table is-fullwidth">
          <thead>
            <tr>
              <th><abbr title="Code">Code</abbr></th>
              <th>Name</th>
              <th><abbr title="Base Price">Base Price</abbr></th>
              <th><abbr title="Total Price">Total Price</abbr></th>
              <th>Action</th>
            </tr>
          </thead>
          <!-- <tfoot>
            <tr>
              <th><abbr title="Code">Code</abbr></th>
              <th>Name</th>
              <th><abbr title="Base Price">Base Price</abbr></th>
              <th><abbr title="Total Price">Total Price</abbr></th>
              <th>Action</th>
            </tr>
          </tfoot> -->
          <tbody>
            <tr
              v-for="(product, index) in products"
              :key="product.index"
              >
                <!-- element is shown when 'isEditMode' is FALSE. It is hidden when 'isEditMode' becomes TRUE -->
                <td v-bind:class="{ 'is-hidden' : isEditMode }">{{ product.code }}</td>
                <!-- element is hidden when 'isEditMode' is false. It is shown when 'isEditMode' becomes TRUE -->
                <td v-bind:class="[ isEditMode ? '' : 'is-hidden' ]"><input type="text" class="input" placeholder="code" v-model="product.code"></td>

                <td>{{ product.name }}</td>
                <td>{{ product.basePrice }}</td>
                <td>{{ product.totalPrice }}</td>
                <td><button class="button" v-on:click="edit2(product, index)">edit</button></td>
            </tr>

            <tr>
              <td>Subtotal:</td>
              <td></td>
              <td>{{ subtotalBasePrice }}</td>
              <td>{{ subtotalTotalPrice }}</td>
              <td></td>
            </tr>

            <tr v-if="isEmptyLine">
              <td>{{ }}</td>
              <td>{{ }}</td>
              <td>{{ }}</td>
              <td>{{ }}</td>
              <td><button class="button is-success" v-on:click="addNewLine()">add</button></td>
            </tr>
            <tr v-else>
              <td><input type="text" class="input" placeholder="code" v-model="code"></td>
              <td><input type="text" class="input" placeholder="name" v-model="name"></td>
              <td><input type="text" class="input" placeholder="base price" v-model="basePrice"></td>
              <td></td>
              <td><button class="button" v-on:click="addNew()">add</button></td>
            </tr>
          </tbody>
        </table>
        </div>

      </div>
    </div>
    <div class="hero-foot">Created by Mindaugas Januška</div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      products: [
        { code: '12345', name: 'T-shirt', basePrice: '14.78', totalPrice: null },
        { code: '54321', name: 'Cardigan', basePrice: '34.56', totalPrice: null }
      ],
      isEmptyLine: true,
      isNewLine: false,
      code: '',
      name: '',
      basePrice: '',
      isEditMode: false,
      taxValue: 0.21,
      subtotalBasePrice: null,
      subtotalTotalPrice: null
    }
  },
  created () {
    this.createLocalStorage()
    this.addEditedProduct()
    this.countTotalPrice()
    this.countSubtotal()
  },
  computed: {
    ...mapGetters([
      'getProductEdit',
      'getProductEditIndex'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_PRODUCT_EDIT',
      'SET_PRODUCT_EDIT_INDEX',
      'SET_PRODUCT_EDIT_EMPTY'
    ]),
    addNew () {
      // this.$router.push('/newProduct')
      if (!this.code && !this.name && !this.basePrice) {
        this.isEmptyLine = true
      } else {
        const totalPrice = this.countTax(this.basePrice)
        const product = { code: this.code, name: this.name, basePrice: this.basePrice, totalPrice: totalPrice }
        this.products.push(product)
        this.isEmptyLine = true
        this.code = ''
        this.name = ''
        this.basePrice = ''
      }
    },
    addNewLine () {
      this.isEmptyLine = false
    },
    edit (product, index) {
      this.SET_PRODUCT_EDIT(product)
      this.SET_PRODUCT_EDIT_INDEX(index)
      this.$router.push('/editProduct')
    },
    edit2 (product, index) {
      this.$router.push('/editProduct')
    },
    countTotalPrice () {
      this.products.forEach(element => {
        const totalPrice = this.countTax(element.basePrice)
        element.totalPrice = totalPrice
      })
    },
    countTax (param) {
      const price = Number(param) // convert string to number
      const tax = price * this.taxValue
      return Math.round(((price + tax) + Number.EPSILON) * 100) / 100 // round to 2 decimal places
    },
    addEditedProduct () {
      if (this.getProductEditIndex !== null) {
        this.getProductEdit.totalPrice = this.countTax(this.getProductEdit.basePrice) // count and add total price
        this.products.splice(this.getProductEditIndex, 1, this.getProductEdit) // replace element in the array with latest one
      }
      // set to defaults
      this.SET_PRODUCT_EDIT_INDEX(null)
      this.SET_PRODUCT_EDIT_EMPTY()
    },
    countSubtotal () {
      let basePriceTotal = 0
      let totalPriceSubtotal = 0
      this.products.forEach(element => {
        const elementBasePrice = Number(element.basePrice)
        const elementTotalPrice = Number(element.totalPrice)
        basePriceTotal += elementBasePrice
        totalPriceSubtotal += elementTotalPrice
      })
      this.subtotalBasePrice = basePriceTotal
      this.subtotalTotalPrice = totalPriceSubtotal
    },
    createLocalStorage () {
      localStorage.setItem('products', JSON.stringify(this.products))
      localStorage.setItem('productEditIndex', null)
      // this.products.forEach(element => {
      //   localStorage.setItem('products', JSON.stringify(this.products))
      // })
    }
  }
}
</script>
