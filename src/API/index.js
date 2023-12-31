import requests from '@/utils/request'
import mockRequest from '@/utils/mockRequest.js'

// 获取三级联动数据
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'GET' })

// 获取轮播图数据
export const reqGetBannerList = () => mockRequest.get('/banner')

// 获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')

// 获取搜索数据
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取商品详情页数据
export const reqGetDetailList = (sukId) => requests({ url: `/item/${sukId}`, method: 'GET' })

// 将产品添加到购物车
export const reqAddShopCart = (sukId, skuNum) => requests({ url: `/cart/addToCart/${sukId}/${skuNum}`, method: 'POST' })

// 获取购物车数据
export const reqGetShopCartList = () => requests({ url: '/cart/cartList', method: 'GET' })

// 切换商品选中的状态
export const reqChangeChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })

// 删除购物车商品
export const reqDeleteShopCart = (skuId) => requests({ url: `/cart/deleteCart/${skuId} `, method: 'DeLETE' })

// 获取注册验证码
export const reqGetRegisterCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

// 注册用户
export const reqRegisterUser = (data) => requests({ url: '/user/passport/register', data, method: 'POST' })

// 登录
export const reqUserLogin = data => requests({ url: '/user/passport/login', data, method: 'POST' })

// token获取用户信息
export const reqTokenGetUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'GET' })

// 退出登录
export const reqLoginOut = () => requests({ url: '/user/passport/logout', method: 'GET' })

// 获取用户地址信息
export const reqGetUserAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })

// 获取订单交易页信息
export const reqGetTradeInfo = () => requests({ url: '/order/auth/trade', method: 'GET' })

// 提交订单
export const reqGetSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'POST' })

// 获取订单支付信息
export const reqGetOrderPayInfo = orderNo => requests({ url: `/payment/weixin/createNative/${orderNo}`, method: 'GET' })

// 获取查询支付订单状态
export const reqGetPayStatus = orderId => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

// 获取我的订单列表
export const reqGetMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
