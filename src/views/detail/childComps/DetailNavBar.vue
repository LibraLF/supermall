<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" class="backImage">
      </div>
      <div slot="center" class="titles">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active: index === currentIndex}" @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
 .titles {
   display: flex;
   font-size: 14px;
 }
  
  .title-item {
    flex: 1;
  }
  
  .active {
    color: var(--color-high-text);
  }
  
  .backImage {
    margin-top: 11px;
  }
</style>