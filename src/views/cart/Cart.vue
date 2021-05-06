<template>
  <div class="cart">
    <!-- 顶部的导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list/>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";

  import {mapGetters} from 'vuex'
  import CartBottomBar from "./childComps/CartBottomBar";
  
  export default {
    name: "Cart",
    components: {
      CartBottomBar,
      CartList,
      NavBar
    },
    computed: {
      //两种语法
      //...mapGetters(['cartLength'],['cartList']),
      ...mapGetters({
        cartLength: 'cartLength'
      })
      
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>