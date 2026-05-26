import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  user: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
}

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const user = JSON.parse(localStorage.getItem('zhuohuan_user') || '{}');

  useEffect(() => {
    if (!user.username) {
      navigate('/login');
      return;
    }
    const allOrders = JSON.parse(localStorage.getItem('zhuohuan_orders') || '[]');
    const userOrders = allOrders.filter((o: Order) => o.user === user.username);
    setOrders(userOrders);
  }, [user.username, navigate]);

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: '待处理',
      processing: '处理中',
      shipped: '已发货',
      delivered: '已送达',
      cancelled: '已取消'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'bg-yellow-500',
      processing: 'bg-blue-500',
      shipped: 'bg-purple-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500'
    };
    return colorMap[status] || 'bg-gray-500';
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center py-20">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">暂无订单</h2>
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
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-green-800 mb-8">我的订单</h1>

        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">订单编号：{order.id}</p>
                    <p className="text-sm text-gray-500">下单时间：{new Date(order.createdAt).toLocaleString('zh-CN')}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                <div className="border-t pt-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 py-2">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-green-800">{item.product.name}</p>
                        <p className="text-sm text-gray-500">数量：{item.quantity}</p>
                        <p className="text-green-600 font-bold">¥{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-green-800">实付款</span>
                  <span className="text-2xl font-bold text-green-600">¥{order.total}</span>
                </div>

                <div className="flex gap-4 mt-4">
                  <Button variant="outline" className="flex-1 border-green-600 text-green-600">
                    查看详情
                  </Button>
                  {order.status === 'pending' && (
                    <Button variant="outline" className="flex-1 border-red-300 text-red-600">
                      取消订单
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
