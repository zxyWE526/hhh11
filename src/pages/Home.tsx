import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { loadProducts } from '@/data/products';

const carouselSlides = [
  {
    image: 'https://picsum.photos/seed/vineyard/1200/500',
    title: '朱鹮故乡，有机佳酿',
    subtitle: '源自秦岭深处的自然馈赠',
    cta: '探索产品'
  },
  {
    image: 'https://picsum.photos/seed/barrel/1200/500',
    title: '传统工艺，现代科技',
    subtitle: '千年酿酒技艺的传承与创新',
    cta: '了解详情'
  },
  {
    image: 'https://picsum.photos/seed/organic/1200/500',
    title: '有机种植，品质保证',
    subtitle: '从田间到餐桌的全程可追溯',
    cta: '查看详情'
  }
];

export const Home: React.FC = () => {
  const [products, setProducts] = useState(loadProducts());
  const featuredProducts = useMemo(() => products.slice(0, 3), [products]);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Carousel */}
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselSlides.map((slide, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-green-700/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4 max-w-3xl animate-fade-in-up">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-green-50 mb-8 drop-shadow">
                    {slide.subtitle}
                  </p>
                  <Link to="/products">
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-6 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all duration-300">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-3 transition-all duration-300">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-green-500 w-8' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient-green mb-4">精选产品</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">传承千年酿酒工艺，融合现代有机科技</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="card-hover overflow-hidden border-0 shadow-lg bg-white ">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    {product.badge && (
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2 text-green-800">{product.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{product.description}</CardDescription>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">¥{product.originalPrice}</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link to={`/product/${product.id}`} className="w-full">
                    <Button className="w-full btn-huangjiu text-white">查看详情</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg" className="border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-full px-8">
                查看全部产品
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">有机认证</h3>
              <p className="text-green-100">全程有机种植，权威机构认证，品质有保障</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">传统工艺</h3>
              <p className="text-green-100">千年酿酒技艺传承，每一滴都是匠心之作</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">生态种植</h3>
              <p className="text-green-100">朱鹮保护区核心地带，自然生态种植环境</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center text-green-800 mb-8">合作伙伴</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['中国有机产品认证', '秦岭生态保护基金', '陕西农业合作社', '绿色食品发展中心'].map((partner, index) => (
              <div key={index} className="px-6 py-3 border-2 border-green-200 rounded-full text-green-700 font-medium hover:border-green-400 hover:bg-green-50 transition-all cursor-pointer">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
