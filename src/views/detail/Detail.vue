<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDetail} from "network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: []
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper
    },
    created() {
      //1.保存传入的iid
      //this.iid = this.$route.query.iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        this.topImages = res.result.itemInfo.topImages
      })
    },
  }
</script>

<style scoped>

</style>