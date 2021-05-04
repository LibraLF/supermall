import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addCart(context,payload) {
    //1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    //2.判断oldProduct
    if(oldProduct){
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      context.commit(ADD_TO_CART,payload)
    }
  }
}