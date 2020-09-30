<template>
  <section class="hero is-fullheight">
    <div class="hero-head">Navigation bar</div>
    <div class="hero-body">
      <div class="table container">
          <table class="table is-fullwidth">
          <thead>
            <tr>
              <th><abbr title="Code">Code</abbr></th>
              <th>Name</th>
              <th><abbr title="Base Price">Base Price</abbr></th>
              <th><abbr title="Total Price">Total Price</abbr></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(product) in productsLocalStorage"
              :key="product.index"
              >
                <td>{{ product.code }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.basePrice }}</td>
                <td>{{ product.totalPrice }}</td>
            </tr>

            <tr>
              <td>Subtotal:</td>
              <td></td>
              <td>{{ subtotalBasePrice }}</td>
              <td>{{ subtotalTotalPrice }}</td>
              <td></td>
            </tr>

          </tbody>
        </table>
        <button class="button is-success" v-on:click="back()">Back</button>
      </div>

    </div>
    <div class="hero-foot">Created by Mindaugas Januška</div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      productsLocalStorage: null,
      subtotalBasePrice: null,
      subtotalTotalPrice: null,
      taxValue: 0.21
    }
  },
  created () {
    this.productsLocalStorage = JSON.parse(localStorage.getItem('products'))
    this.countTotalPrice()
    this.countSubtotal()
  },
  methods: {
    back () {
      this.$router.push('/')
    },
    countTotalPrice () {
      this.productsLocalStorage.forEach(element => {
        const totalPrice = this.countTax(element.basePrice)
        element.totalPrice = totalPrice
      })
    },
    countTax (param) {
      const price = Number(param) // convert string to number
      const tax = price * this.taxValue
      return Math.round(((price + tax) + Number.EPSILON) * 100) / 100 // round to 2 decimal places
    },
    countSubtotal () {
      let basePriceTotal = 0
      let totalPriceSubtotal = 0
      this.productsLocalStorage.forEach(element => {
        const elementBasePrice = Number(element.basePrice)
        const elementTotalPrice = Number(element.totalPrice)
        basePriceTotal += elementBasePrice
        totalPriceSubtotal += elementTotalPrice
      })
      this.subtotalBasePrice = basePriceTotal
      this.subtotalTotalPrice = totalPriceSubtotal
    }
  }
}
</script>
