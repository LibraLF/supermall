import {debounce} from "./utils";
export const imageMixinLoad = {
  data() {
    return {
      imageLoadListener: null
    }
  },
  mounted() {
    //图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.imageLoadListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.imageLoadListener)
  }
}

import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0,300)
    },
    showBackTopListener(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}