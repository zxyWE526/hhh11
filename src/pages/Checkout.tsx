import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PAYMENT_METHODS = [
  {
    id: 'wechat',
    name: '微信支付',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.164 3.098c-.481.032-.972.111-1.461.253-1.54.446-2.795 1.309-3.634 2.453-1.351 1.838-1.584 4.08-.688 5.845.904 1.788 2.815 2.886 5.062 2.886.364 0 .723-.027 1.079-.083a.862.862 0 01.592.098l1.478.864a.316.316 0 00.156.05c.156 0 .283-.128.283-.286 0-.067-.026-.133-.043-.2l-.302-1.145a.663.663 0 01.07-.558 5.22 5.22 0 001.328-3.477c-.002-2.814-2.338-5.09-5.4-5.09zm-1.383 2.651c.49 0 .887.403.887.9a.893.893 0 01-.887.902.893.893 0 01-.888-.901c0-.498.397-.901.888-.901zm2.766 0c.49 0 .887.403.887.9a.893.893 0 01-.887.902.893.893 0 01-.888-.901c0-.498.398-.901.888-.901z"/>
      </svg>
    ),
    color: 'bg-green-500'
  },
  {
    id: 'alipay',
    name: '支付宝',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.422 15.358c-3.22-1.386-6.847-2.408-10.609-3.093 1.646-2.442 3.127-5.294 3.564-8.388h-3.409v-1.87h6.886v-1.87h-10.83v1.886h3.957c-.428 2.72-1.676 5.242-3.319 7.394-.857-1.19-1.682-2.512-2.097-4.472h-1.86c.598 3.098 2.132 5.619 3.853 7.444-1.918.77-3.96 1.305-6.117 1.552v.621c2.492.016 4.88-.442 7.187-1.234.332.302.664.613.996.923-2.917.212-5.727.798-8.248 1.744-.535.201-1.082.542-1.346 1.192-.579 1.423.382 2.53 1.737 3.078 2.423.98 5.087-.05 6.724-1.766.702.414 1.387.867 2.034 1.362-1.014 1.034-2.035 1.98-3.577 2.496-3.47 1.168-6.45-.173-7.795-2.323-1.347-2.152-1.288-5.236.184-7.471.62-.94 1.362-1.839 2.166-2.754-.774-1.404-1.224-3.035-1.224-4.829 0-.44.027-.88.082-1.327h-3.175v-1.886h3.922c.19-1.058.538-1.935 1.017-2.674h-4.939v-1.87h10.83v1.87h-3.957c-.228.566-.409 1.18-.543 1.838h3.426v1.886h-3.343c-.499 2.262-1.568 4.444-2.824 6.16 2.333 1.33 4.896 2.264 7.33 2.866 1.124-2.128 1.963-4.798 2.014-7.492h-3.653v-1.87h9.754v1.87h-3.532c-.173 3.183-1.174 5.994-2.675 8.286 3.426.24 6.742.733 9.56 1.926v-2.632z"/>
      </svg>
    ),
    color: 'bg-blue-500'
  },
  {
    id: 'card',
    name: '银行卡支付',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    color: 'bg-purple-500'
  }
];

type Step = 'form' | 'payment' | 'processing' | 'success';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>('form');
  const user = JSON.parse(localStorage.getItem('zhuohuan_user') || '{}');
  const [formData, setFormData] = useState({
    name: user.username || '',
    phone: user.phone || '',
    address: ''
  });
  const [payMethod, setPayMethod] = useState('wechat');
  const [payTotal, setPayTotal] = useState(0);

  const handleSubmitOrder = () => {
    const total = getCartTotal();
    setPayTotal(total);
    const orders = JSON.parse(localStorage.getItem('zhuohuan_orders') || '[]');
    const newOrder = {
      id: 'ORD' + Date.now(),
      user: user.username || 'guest',
      items: cart,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      address: formData.address,
      phone: formData.phone,
      name: formData.name
    };
    orders.push(newOrder);
    localStorage.setItem('zhuohuan_orders', JSON.stringify(orders));
    clearCart();
    setStep('payment');
  };

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (cart.length === 0 && step === 'form') {
    navigate('/cart');
    return null;
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">支付成功！</h2>
            <p className="text-gray-600 mb-6">
              感谢您的购买，我们会尽快为您处理订单。
            </p>
            <div className="flex gap-4">
              <Button
                onClick={() => navigate('/orders')}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
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

  if (step === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">支付处理中</h2>
            <p className="text-gray-500 mb-2">请稍候，正在安全处理您的支付...</p>
            <div className="flex justify-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">确认支付</h2>
              <p className="text-4xl font-bold text-green-600">¥{payTotal}</p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium text-gray-600">选择支付方式</p>
              {PAYMENT_METHODS.map(method => (
                <div
                  key={method.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    payMethod === method.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => setPayMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center text-white`}>
                      {method.icon}
                    </div>
                    <span className="font-medium text-gray-700">{method.name}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    payMethod === method.id ? 'border-green-500' : 'border-gray-300'
                  }`}>
                    {payMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handlePay}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-6 text-lg mb-3"
            >
              确认支付 ¥{payTotal}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setStep('form')}
              className="w-full text-gray-500"
            >
              返回修改
            </Button>
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

              <div>
                <Label className="text-gray-500">收货人</Label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="请输入收货人姓名"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-500">联系电话</Label>
                <Input
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="请输入手机号码"
                  type="tel"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-500">收货地址</Label>
                <Input
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="请输入详细收货地址"
                  className="mt-1"
                />
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
