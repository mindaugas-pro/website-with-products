<template>
  <section class="hero is-fullheight">
    <div class="hero-head">Navigation bar</div>
    <div class="hero-body">
      <div class="container">

        <div class="field">
          <label class="label">Code</label>
          <div class="control">
            <input class="input" type="text" v-model="product.code">
          </div>
        </div>

        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text" v-model="product.name">
          </div>
        </div>

        <div class="field">
          <label class="label">Base Price</label>
          <div class="control">
            <input class="input" type="text" v-model="product.basePrice">
          </div>
        </div>

        <div class="buttons">
          <button class="button is-success" v-on:click="save()">Save</button>
          <button class="button is-link" v-on:click="cancel()">Cancel</button>
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
      product: {
        code: this.$store.getters.getProductEdit.code,
        name: this.$store.getters.getProductEdit.name,
        basePrice: this.$store.getters.getProductEdit.basePrice,
        totalPrice: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'getProductEdit'
    ])
    // productEdit: {
    //   get () {
    //     return this.$store.getters.getProductEdit
    //   },
    //   set (value) {
    //     this.$store.commit('SET_PRODUCT_EDIT', value)
    //   }
    // }
  },
  methods: {
    ...mapMutations([
      'SET_PRODUCT_EDIT',
      'SET_PRODUCT_EDIT_EMPTY',
      'SET_PRODUCT_EDIT_INDEX'
    ]),
    save () {
      this.SET_PRODUCT_EDIT(this.product)
      this.$router.push('/')
    },
    cancel () {
      this.SET_PRODUCT_EDIT_EMPTY()
      this.SET_PRODUCT_EDIT_INDEX(null)
      this.$router.push('/')
    }
  }
}
</script>
