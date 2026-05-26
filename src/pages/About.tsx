import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[400px] bg-gradient-to-r from-green-800 to-green-600 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/farm/1600/400"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in-up">关于我们</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            朱鹮故乡，有机佳酿——传承千年的酿酒工艺，守护生态的自然馈赠
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <img
                src="https://picsum.photos/seed/brewery/600/400"
                alt="酒厂风光"
                className="rounded-2xl shadow-2xl "
              />
            </div>
            <div className="animate-slide-in-right">
              <h2 className="text-4xl font-bold text-green-800 mb-6">企业故事</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                陕西朱鹮酒业有限公司坐落于秦岭深处的朱鹮国家级自然保护区内，这里生态环境优越，水源纯净，空气质量优良，
                是大自然赐予的酿酒宝地。
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                朱鹮，被誉为"东方宝石"，是国家一级保护动物。我们的企业以朱鹮命名，旨在倡导生态保护理念，
                坚持有机种植，不使用化肥农药，让每一滴酒都来自纯净的自然环境。
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                传承千年酿酒工艺，融合现代生物科技，我们生产的有机黄酒、黑米酒等产品，
                不仅口感醇厚，更富含多种氨基酸和微量元素，是健康养生的理想选择。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">企业使命</h2>
            <p className="text-gray-600 text-lg">守护生态，传承匠心，酿造健康</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                ),
                title: '生态保护',
                description: '坚持有机种植，保护朱鹮栖息地，实现企业与自然的和谐共生'
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                ),
                title: '匠心酿造',
                description: '传承千年工艺，精选优质原料，每一道工序都精益求精'
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                ),
                title: '健康理念',
                description: '酿造低度健康酒品，让消费者在品味中享受健康'
              }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-lg text-center py-8 card-hover">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">酿造工艺</h2>
            <p className="text-gray-600 text-lg">传统与现代的完美融合</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: '选料', desc: '精选秦岭有机黑米、糯米', image: 'https://picsum.photos/seed/grain/300/200' },
              { step: '02', title: '浸泡', desc: '山泉水浸泡 24 小时', image: 'https://picsum.photos/seed/water/300/200' },
              { step: '03', title: '发酵', desc: '恒温发酵 180 天', image: 'https://picsum.photos/seed/ferment/300/200' },
              { step: '04', title: '陈酿', desc: '橡木桶陈年储藏', image: 'https://picsum.photos/seed/barrel2/300/200' }
            ].map((item, index) => (
              <div key={index} className="animate-fade-in-up overflow-hidden rounded-xl shadow-lg" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                  <div className="absolute top-2 left-2 w-10 h-10 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="p-4 bg-green-50">
                  <h3 className="font-bold text-green-800 text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">联系我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="font-medium">陕西省汉中市洋县朱鹮大道 1 号</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="font-medium">400-888-6666</p>
            </div>
            <div>
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-medium">info@zhuohuan-wine.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
