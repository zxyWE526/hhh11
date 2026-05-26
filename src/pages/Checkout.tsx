import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const user = JSON.parse(localStorage.getItem('zhuohuan_user') || '{}');

  const handleSubmitOrder = () => {
    // 保存订单到 localStorage
    const orders = JSON.parse(localStorage.getItem('zhuohuan_orders') || '[]');
    const newOrder = {
      id: 'ORD' + Date.now(),
      user: user.username || 'guest',
      items: cart,
      total: getCartTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem('zhuohuan_orders', JSON.stringify(orders));

    clearCart();
    setOrderPlaced(true);
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">订单提交成功！</h2>
            <p className="text-gray-600 mb-6">
              感谢您的购买，我们会尽快为您处理订单。
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/orders')}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                查看订单
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1 border-green-600 text-green-600"
              >
                返回首页
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-8">确认订单</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Info */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-green-800 mb-4">收货信息</h3>
              
              {user && (
                <>
                  <div>
                    <Label className="text-gray-500">收货人</Label>
                    <Input value={user.username || '未设置'} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label className="text-gray-500">联系电话</Label>
                    <Input value={user.phone || '未设置'} readOnly className="bg-gray-50" />
                  </div>
                </>
              )}

              <div>
                <Label className="text-gray-500">收货地址</Label>
                <Input placeholder="请输入详细收货地址" className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-green-800 mb-4">商品清单</h3>
              
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 pb-3 border-b last:border-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-green-800">{item.product.name}</p>
                      <p className="text-sm text-gray-500">x {item.quantity}</p>
                      <p className="text-green-600 font-bold">¥{item.product.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Total */}
        <Card className="border-0 shadow-lg mt-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">商品总额</span>
              <span className="text-xl font-bold text-green-600">¥{getCartTotal()}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">运费</span>
              <span className="text-green-600">免费</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-green-800">实付款</span>
              <span className="text-2xl font-bold text-green-600">¥{getCartTotal()}</span>
            </div>

            <Button
              onClick={handleSubmitOrder}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-6 text-lg"
            >
              提交订单
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
