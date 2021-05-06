<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll id="detail-scroll" ref="scroll"
            @scroll="detailScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  
  import {getDetail,Goods,Shop,GoodsParam,getRecommends} from "network/detail";
  import {imageMixinLoad,backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";
  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    mixins: [imageMixinLoad,backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    created() {
      //1.保存传入的iid
      //this.iid = this.$route.params.iid
      this.iid = this.$route.query.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        //1.获取顶部轮播图片的数据
        this.topImages = data.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //4.获取商品详细信息
        this.detailInfo = data.detailInfo
        //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //6.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      
      //3.请求推荐数据
      getRecommends().then(res => {
        this.recommends = res.data.list
      })
      
      //4.给themeTopYs赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.imageLoadListener)
    },
    methods: {
      ...mapActions(['addCart']),
      detailImageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      detailScroll(position) {
        //判断BackTop是否显示
        this.showBackTopListener(position)
        //1.获取滚动的y值
        const positionY= -position.y
        //this.themeTopYs = [0, 2877, 3729, 4019]
        const length = this.themeTopYs.length
        /*for(let i = 0; i < length; i++) {
          if((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
              || (i === length - 1 && positionY >= this.themeTopYs[i]))){
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }*/
        for(let i = 0;i < length - 1;i++) {
          if((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
      },
      addToCart() {
        const product = {}
        product.iid = this.iid;
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        //this.$store.dispatch('addCart',product)
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        this.addCart(product).then(res => {
          console.log(res);
          this.$toast.show(res,2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  
  #detail-scroll {
    height: calc(100% - 44px - 52px);
  }
  
  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
</style>