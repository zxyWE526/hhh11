import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { products as staticProducts, categories } from '@/data/products';

const STORAGE_KEY = 'zhuohuan_admin_products';

const defaultNewProduct = {
  id: 0,
  name: '',
  price: 0,
  originalPrice: 0,
  image: '',
  description: '',
  detail: '',
  category: '黄酒',
  volume: '500ml',
  alcoholContent: '12% vol',
  shelfLife: '5 年',
  storage: '阴凉干燥处保存',
  badge: '',
  rating: 5.0,
  reviews: 0,
  stock: 99
};

const statusFlow = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<any>({ ...defaultNewProduct });

  const loadProducts = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    const withStock = staticProducts.map(p => ({ ...p, stock: Math.floor(Math.random() * 50 + 50) }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withStock));
    return withStock;
  };

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('zhuohuan_admin') || 'null');
    if (!adminData) { navigate('/admin/login'); return; }
    const allOrders = JSON.parse(localStorage.getItem('zhuohuan_orders') || '[]');
    setOrders(allOrders);
    const allMessages = JSON.parse(localStorage.getItem('zhuohuan_messages') || '[]');
    setMessages(allMessages);
    const allUsers = JSON.parse(localStorage.getItem('zhuohuan_users') || '[]');
    setUsers(allUsers);
    setProducts(loadProducts());
  }, [navigate]);

  const saveProducts = (updated: any[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setProducts(updated);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct({ ...product });
    setShowEditProduct(true);
  };

  const saveEditProduct = () => {
    if (!editingProduct) return;
    const updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
    saveProducts(updated);
    setShowEditProduct(false);
    setEditingProduct(null);
  };

  const handleAddProduct = () => {
    const id = Date.now();
    const product = { ...newProduct, id };
    const updated = [...products, product];
    saveProducts(updated);
    setShowAddProduct(false);
    setNewProduct({ ...defaultNewProduct });
  };

  const deleteProduct = (id: number) => {
    if (!confirm('确定要删除此商品吗？')) return;
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const allOrders = JSON.parse(localStorage.getItem('zhuohuan_orders') || '[]');
    const updated = allOrders.map((o: any) => o.id === orderId ? { ...o, status: newStatus } : o);
    localStorage.setItem('zhuohuan_orders', JSON.stringify(updated));
    setOrders(updated);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusText = (s: string) => ({ pending: '待处理', processing: '处理中', shipped: '已发货', delivered: '已送达', cancelled: '已取消' })[s] || s;
  const getStatusColor = (s: string) => ({ pending: 'bg-amber-500', processing: 'bg-blue-500', shipped: 'bg-violet-500', delivered: 'bg-emerald-500', cancelled: 'bg-red-500' })[s] || 'bg-gray-500';

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const lowStock = products.filter(p => (p.stock ?? 0) < 20).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-50">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-gray-800">朱鹮酒业</h1>
              <p className="text-xs text-gray-400">管理后台</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {[
            { key: 'overview', label: '数据总览', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { key: 'orders', label: '订单管理', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { key: 'products', label: '商品管理', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
            { key: 'users', label: '用户管理', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
            { key: 'messages', label: '用户留言', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
          ].map(item => (
            <Button
              key={item.key}
              variant={activeTab === item.key ? 'default' : 'ghost'}
              className={`w-full justify-start ${activeTab === item.key ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-200' : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'}`}
              onClick={() => setActiveTab(item.key)}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="ml-64">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {activeTab === 'overview' && '数据总览'}
                {activeTab === 'orders' && '订单管理'}
                {activeTab === 'products' && '商品管理'}
                {activeTab === 'users' && '用户管理'}
                {activeTab === 'messages' && '用户留言'}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                {activeTab === 'overview' && `共 ${orders.length} 个订单，${products.length} 件商品`}
                {activeTab === 'orders' && `${pendingOrders} 个待处理订单`}
                {activeTab === 'products' && `${lowStock} 件商品库存不足`}
                {activeTab === 'users' && `共 ${users.length} 个用户`}
                {activeTab === 'messages' && `${messages.length} 条留言`}
              </p>
            </div>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: '总销售额', value: `¥${totalRevenue.toLocaleString()}`, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'emerald' },
                  { title: '订单总数', value: orders.length.toString(), icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'blue' },
                  { title: '待处理', value: pendingOrders.toString(), icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'amber' },
                  { title: '低库存商品', value: lowStock.toString(), icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'rose' },
                ].map((stat, i) => (
                  <Card key={i} className="border-0 shadow-md bg-white overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                          <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                        </div>
                        <div className={`w-14 h-14 bg-${stat.color}-50 rounded-2xl flex items-center justify-center`}>
                          <svg className={`w-7 h-7 text-${stat.color}-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                          </svg>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      最近订单
                    </h3>
                    {orders.length === 0 ? (
                      <p className="text-gray-300 text-center py-8">暂无订单数据</p>
                    ) : (
                      <div className="space-y-3">
                        {orders.slice(0, 5).map(order => (
                          <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{order.id}</p>
                              <p className="text-xs text-gray-500">{order.user} · ¥{order.total}</p>
                            </div>
                            <Badge className={`${getStatusColor(order.status)} text-white`}>{getStatusText(order.status)}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
                      库存预警
                    </h3>
                    {products.filter(p => (p.stock ?? 0) < 20).length === 0 ? (
                      <p className="text-gray-300 text-center py-8">所有商品库存充足</p>
                    ) : (
                      <div className="space-y-3">
                        {products.filter(p => (p.stock ?? 0) < 20).map(p => (
                          <div key={p.id} className="flex items-center justify-between p-3 bg-rose-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{p.name}</p>
                                <p className="text-xs text-gray-500">¥{p.price}</p>
                              </div>
                            </div>
                            <span className="text-rose-600 font-bold text-sm">{p.stock ?? 0}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                {orders.length === 0 ? (
                  <p className="text-gray-300 text-center py-12">暂无订单数据</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-100">
                          <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">订单号</th>
                          <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">用户</th>
                          <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">金额</th>
                          <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">状态</th>
                          <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">时间</th>
                          <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, i) => (
                          <tr key={order.id} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                            <td className="py-4 px-4 font-mono text-sm text-gray-800">{order.id}</td>
                            <td className="py-4 px-4 font-medium text-gray-800">{order.user}</td>
                            <td className="py-4 px-4 font-bold text-emerald-600">¥{order.total.toLocaleString()}</td>
                            <td className="py-4 px-4">
                              <Badge className={`${getStatusColor(order.status)} text-white px-3 py-1`}>{getStatusText(order.status)}</Badge>
                            </td>
                            <td className="py-4 px-4 text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString('zh-CN')}</td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 hover:border-emerald-400" onClick={() => { setSelectedOrder(order); setShowOrderDetail(true); }}>
                                  详情
                                </Button>
                                {order.status === 'pending' && (
                                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleStatusChange(order.id, 'processing')}>
                                    处理
                                  </Button>
                                )}
                                {order.status === 'processing' && (
                                  <Button size="sm" className="bg-violet-500 hover:bg-violet-600 text-white" onClick={() => handleStatusChange(order.id, 'shipped')}>
                                    发货
                                  </Button>
                                )}
                                {order.status === 'shipped' && (
                                  <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => handleStatusChange(order.id, 'delivered')}>
                                    完成
                                  </Button>
                                )}
                                {(order.status === 'pending' || order.status === 'processing') && (
                                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleStatusChange(order.id, 'cancelled')}>
                                    取消
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'products' && (
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">商品管理（共 {products.length} 件）</h3>
                  <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-md shadow-emerald-200" onClick={() => setShowAddProduct(true)}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    添加商品
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group bg-white">
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        {(product.stock ?? 0) < 20 && (
                          <Badge className="absolute top-3 left-3 bg-rose-500 text-white">库存 {(product.stock ?? 0)}</Badge>
                        )}
                        {product.badge && (
                          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white">{product.badge}</Badge>
                        )}
                      </div>
                      <div className="p-4">
                        <Badge variant="outline" className="mb-2 border-emerald-400 text-emerald-600 text-xs">{product.category}</Badge>
                        <h4 className="font-bold text-gray-800 mb-1 truncate">{product.name}</h4>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <span className="text-xl font-bold text-emerald-600">¥{product.price}</span>
                            {product.originalPrice && <span className="text-sm text-gray-400 line-through ml-2">¥{product.originalPrice}</span>}
                          </div>
                          <span className={`text-sm font-medium ${(product.stock ?? 0) > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            库存: {product.stock ?? 0}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 border-emerald-400 text-emerald-600 hover:bg-emerald-50" onClick={() => handleEditProduct(product)}>
                            编辑
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-red-300 text-red-500 hover:bg-red-50" onClick={() => deleteProduct(product.id)}>
                            删除
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'messages' && (
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                {messages.length === 0 ? (
                  <p className="text-gray-300 text-center py-12">暂无用户留言</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, i) => (
                      <div key={i} className="border rounded-xl p-5 bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                              {msg.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800">{msg.name}</p>
                              <p className="text-sm text-gray-500">{msg.phone} {msg.email && `· ${msg.email}`}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString('zh-CN')}</span>
                        </div>
                        {msg.company && <p className="text-xs text-gray-600 mb-2 bg-gray-100 inline-block px-3 py-1 rounded-full">公司：{msg.company}</p>}
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'users' && (
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                {users.length === 0 ? (
                  <p className="text-gray-300 text-center py-12">暂无注册用户</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-500 text-sm">
                          <th className="pb-3 font-medium">用户名</th>
                          <th className="pb-3 font-medium">邮箱</th>
                          <th className="pb-3 font-medium">手机号</th>
                          <th className="pb-3 font-medium">注册时间</th>
                          <th className="pb-3 font-medium">账户类型</th>
                          <th className="pb-3 font-medium">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 font-medium text-gray-800">{u.username}</td>
                            <td className="py-4 text-gray-600">{u.email || '-'}</td>
                            <td className="py-4 text-gray-600">{u.phone || '-'}</td>
                            <td className="py-4 text-gray-500 text-sm">{u.createdAt ? new Date(u.createdAt).toLocaleString('zh-CN') : '-'}</td>
                            <td className="py-4">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                u.role === 'vip' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {u.role === 'vip' && (
                                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16l-6.4 4.8L8 14l-6-4.8h7.6z" />
                                  </svg>
                                )}
                                {u.role === 'vip' ? 'VIP 用户' : '普通用户'}
                              </span>
                            </td>
                            <td className="py-4">
                              <Button
                                size="sm"
                                variant={u.role === 'vip' ? 'outline' : 'default'}
                                className={u.role === 'vip'
                                  ? 'border-gray-300 text-gray-600 hover:bg-gray-100'
                                  : 'bg-amber-500 hover:bg-amber-600 text-white'
                                }
                                onClick={() => {
                                  const updated = users.map((x) =>
                                    x.username === u.username ? { ...x, role: x.role === 'vip' ? 'user' : 'vip' } : x
                                  );
                                  setUsers(updated);
                                  localStorage.setItem('zhuohuan_users', JSON.stringify(updated));
                                }}
                              >
                                {u.role === 'vip' ? '取消 VIP' : '设为 VIP'}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </main>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={showEditProduct} onOpenChange={setShowEditProduct}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">编辑商品</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4 mt-4">
              <div className="flex gap-4">
                <img src={editingProduct.image} alt="" className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">商品名称</Label>
                    <Input value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} className="bg-white text-gray-900 border-gray-300" />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">商品分类</Label>
                    <Select value={editingProduct.category} onValueChange={v => setEditingProduct({ ...editingProduct, category: v })}>
                      <SelectTrigger className="bg-white text-gray-900 border-gray-300"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-white text-gray-900">
                        {categories.filter(c => c !== '全部').map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">售价 (¥)</Label>
                  <Input type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} className="bg-white text-gray-900 border-gray-300" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">原价 (¥)</Label>
                  <Input type="number" value={editingProduct.originalPrice || 0} onChange={e => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) || undefined })} className="bg-white text-gray-900 border-gray-300" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">库存</Label>
                  <Input type="number" value={editingProduct.stock ?? 0} onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })} className="bg-white text-gray-900 border-gray-300" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">商品图片</Label>
                <div className="flex items-center gap-3 mt-1">
                  <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    选择图片
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, (url) => setEditingProduct({ ...editingProduct, image: url }))} />
                  </label>
                  <Input value={editingProduct.image} onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })} placeholder="或输入图片 URL" className="bg-white text-gray-900 border-gray-300 text-sm" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">描述</Label>
                <Input value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })} className="bg-white text-gray-900 border-gray-300" />
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">详情</Label>
                <Textarea rows={3} value={editingProduct.detail} onChange={e => setEditingProduct({ ...editingProduct, detail: e.target.value })} className="bg-white text-gray-900 border-gray-300" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">容量</Label>
                  <Input value={editingProduct.volume || ''} onChange={e => setEditingProduct({ ...editingProduct, volume: e.target.value })} className="bg-white text-gray-900 border-gray-300" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">酒精度</Label>
                  <Input value={editingProduct.alcoholContent || ''} onChange={e => setEditingProduct({ ...editingProduct, alcoholContent: e.target.value })} className="bg-white text-gray-900 border-gray-300" />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700">标签</Label>
                  <Input value={editingProduct.badge || ''} onChange={e => setEditingProduct({ ...editingProduct, badge: e.target.value })} className="bg-white text-gray-900 border-gray-300" />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-700">评分</Label>
                  <Input type="number" step="0.1" value={editingProduct.rating || 5} onChange={e => setEditingProduct({ ...editingProduct, rating: Number(e.target.value) })} className="bg-white text-gray-900 border-gray-300" />
                </div>
              </div>

              <DialogFooter className="pt-4 gap-2">
                <Button variant="outline" onClick={() => setShowEditProduct(false)}>取消</Button>
                <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700" onClick={saveEditProduct}>
                  保存修改
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={showAddProduct} onOpenChange={setShowAddProduct}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">添加新商品</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">商品名称 *</Label>
              <Input value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="请输入商品名称" className="bg-white text-gray-900 border-gray-300" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">售价 (¥) *</Label>
                <Input type="number" value={newProduct.price || ''} onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })} className="bg-white text-gray-900 border-gray-300" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">原价 (¥)</Label>
                <Input type="number" value={newProduct.originalPrice || ''} onChange={e => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) || 0 })} className="bg-white text-gray-900 border-gray-300" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">库存 *</Label>
                <Input type="number" value={newProduct.stock || ''} onChange={e => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} className="bg-white text-gray-900 border-gray-300" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">分类</Label>
              <Select value={newProduct.category} onValueChange={v => setNewProduct({ ...newProduct, category: v })}>
                <SelectTrigger className="bg-white text-gray-900 border-gray-300"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  {categories.filter(c => c !== '全部').map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">商品图片</Label>
              <div className="flex items-center gap-3 mt-1">
                <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  选择图片
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, (url) => setNewProduct({ ...newProduct, image: url }))} />
                </label>
                <Input value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} placeholder="或输入图片 URL" className="bg-white text-gray-900 border-gray-300 text-sm" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">描述</Label>
              <Input value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="商品简短描述" className="bg-white text-gray-900 border-gray-300" />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">详情</Label>
              <Textarea rows={3} value={newProduct.detail} onChange={e => setNewProduct({ ...newProduct, detail: e.target.value })} placeholder="商品详细介绍" className="bg-white text-gray-900 border-gray-300" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">标签</Label>
                <Input value={newProduct.badge} onChange={e => setNewProduct({ ...newProduct, badge: e.target.value })} placeholder="如：热销、新品" className="bg-white text-gray-900 border-gray-300" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">容量</Label>
                <Input value={newProduct.volume} onChange={e => setNewProduct({ ...newProduct, volume: e.target.value })} placeholder="如：500ml" className="bg-white text-gray-900 border-gray-300" />
              </div>
            </div>

            <DialogFooter className="pt-4 gap-2">
              <Button variant="outline" onClick={() => setShowAddProduct(false)}>取消</Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700" onClick={handleAddProduct} disabled={!newProduct.name || !newProduct.price}>
                添加商品
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Detail Dialog */}
      <Dialog open={showOrderDetail} onOpenChange={setShowOrderDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">订单详情</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">订单编号</p>
                  <p className="font-mono font-medium text-gray-800">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">下单用户</p>
                  <p className="font-medium text-gray-800">{selectedOrder.user}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">订单状态</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`${getStatusColor(selectedOrder.status)} text-white`}>{getStatusText(selectedOrder.status)}</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">下单时间</p>
                  <p className="font-medium text-gray-800">{new Date(selectedOrder.createdAt).toLocaleString('zh-CN')}</p>
                </div>
              </div>

              {/* Status management */}
              <div className="bg-white border rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-3">修改订单状态</p>
                <div className="flex flex-wrap gap-2">
                  {statusFlow.map(status => (
                    <Button
                      key={status}
                      size="sm"
                      className={selectedOrder.status === status ? `${getStatusColor(status)} text-white` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                      onClick={() => handleStatusChange(selectedOrder.id, status)}
                    >
                      {getStatusText(status)}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">商品清单（共 {selectedOrder.items.length} 件）</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="flex gap-4 p-3 border rounded-lg">
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.product.name}</p>
                        <p className="text-sm text-gray-500">数量：{item.quantity} · ¥{item.product.price}/件</p>
                        <p className="text-emerald-600 font-bold mt-1">¥{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-bold text-gray-800">订单总计</span>
                <span className="text-3xl font-bold text-emerald-600">¥{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
