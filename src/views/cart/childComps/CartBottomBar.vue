<template>
  <div class="cart-bottom">
    <div class="check-content">
      <check-button class="check-bottom" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate">
      去计算: ({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
  
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList','cartLength']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((previousValue,item) => {
          return previousValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.cartLength === 0) return false
        //1.filter
        //return !this.cartList.filter(item => !item.checked).length
        
        //2.find
        //return !this.cartList.find(item => !item.checked)
        
        //3.普通遍历
        for(let item of this.cartList) {
          if(!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom {
    height: 40px;
    position: relative;
    display: flex;
    background-color: #eee;
    font-size: 14px;
  }
  
  .check-content {
    width: 70px;
    height: 40px;
    display: flex;
    align-items: center;
  }
  
  .check-bottom {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }
  
  .price {
    height: 40px;
    line-height: 40px;
    flex: 1;
    text-align: center;
  }
  
  .calculate {
    width: 100px;
    height: 40px;
    line-height: 40px;
    background-color: red;
    text-align: center;
    color: #fff;
  }
</style>