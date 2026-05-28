import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 保存留言到 localStorage
    const messages = JSON.parse(localStorage.getItem('zhuohuan_messages') || '[]');
    messages.push({ ...formData, createdAt: new Date().toISOString() });
    localStorage.setItem('zhuohuan_messages', JSON.stringify(messages));
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">联系我们</h1>
          <p className="text-xl text-green-100">期待与您合作共赢</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-6">联系方式</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">公司地址</h4>
                      <p className="text-gray-600">陕西省汉中市洋县朱鹮大道 1 号</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">联系电话</h4>
                      <p className="text-gray-600">400-888-6666</p>
                      <p className="text-gray-600">0916-8888888</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">电子邮箱</h4>
                      <p className="text-gray-600">info@zhuohuan-wine.com</p>
                      <p className="text-gray-600">sales@zhuohuan-wine.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 mb-1">营业时间</h4>
                      <p className="text-gray-600">周一至周六 9:00-18:00</p>
                      <p className="text-gray-600">周日及国家法定假日休息</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-green-800 mb-6">在线留言</h3>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-green-800 mb-2">留言提交成功！</h4>
                    <p className="text-gray-600 mb-6">我们会尽快与您联系</p>
                    <Button onClick={() => setSubmitted(false)} className="bg-green-600 hover:bg-green-700">
                      继续留言
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-green-700 font-medium">姓名 *</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="请输入您的姓名"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-green-700 font-medium">电话 *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          required
                          placeholder="请输入您的电话"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-green-700 font-medium">邮箱</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="请输入您的邮箱"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company" className="text-green-700 font-medium">公司</Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="请输入公司名称"
                          value={formData.company}
                          onChange={handleChange}
                          className="mt-1 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-green-700 font-medium">留言内容 *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="请输入您的留言内容"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 focus:border-green-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white py-6 text-lg"
                    >
                      提交留言
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
