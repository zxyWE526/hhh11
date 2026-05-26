import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('购物车为空');
      return;
    }
    const user = localStorage.getItem('zhuohuan_user');
    if (!user) {
      alert('请先登录后再购买');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">购物车空空如也</h2>
          <p className="text-gray-500 mb-8">快去挑选心仪的商品吧！</p>
          <Button onClick={() => navigate('/products')} className="bg-green-600 hover:bg-green-700">
            去购物
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-8">购物车</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <Card key={item.product.id} className="border-0 shadow-md overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-green-800 mb-1">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{item.product.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border-2 border-green-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 text-green-600 hover:bg-green-50"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 text-green-600 hover:bg-green-50"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">¥{item.product.price * item.quantity}</p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-sm text-red-500 hover:text-red-600"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-green-800">订单摘要</h3>
                
                <div className="flex justify-between text-gray-600">
                  <span>商品数量</span>
                  <span>{cart.reduce((acc, item) => acc + item.quantity, 0)} 件</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>商品总额</span>
                  <span className="text-green-600 font-bold">¥{getCartTotal()}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>运费</span>
                  <span className="text-green-600">免费</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-green-800">实付款</span>
                    <span className="text-green-600">¥{getCartTotal()}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-6 text-lg"
                >
                  立即结算
                </Button>

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                >
                  清空购物车
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => navigate('/products')}
                  className="w-full text-green-600 hover:bg-green-50"
                >
                  继续购物 →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
