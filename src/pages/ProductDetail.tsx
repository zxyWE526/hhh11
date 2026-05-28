import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { loadProducts } from '@/data/products';
import Navbar from '@/components/Navbar';
import { useCart } from '@/hooks/useCart';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState(loadProducts());

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  const product = products.find(p => p.id === Number(id));
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 3);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">商品不存在</h1>
          <Button onClick={() => navigate('/products')} className="bg-green-600 hover:bg-green-700">
            返回商品列表
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`已将 ${quantity} 件 ${product.name} 加入购物车！`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-24 pb-6 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600">首页</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-green-600">商品列表</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="animate-fade-in-up">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 text-lg">
                    {product.badge}
                  </Badge>
                )}
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-lg animate-pulse">
                  立即购买
                </Badge>
              </div>
            </div>

            {/* Info */}
            <div className="animate-fade-in-up animation-delay-200">
              <Badge variant="outline" className="mb-4 border-green-600 text-green-600">
                {product.category}
              </Badge>
              
              <h1 className="text-4xl font-bold text-green-800 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-yellow-500">
                  <span className="text-lg font-bold mr-2">{product.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-500">({product.reviews} 条评价)</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 mb-8">
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-5xl font-bold text-green-600">¥{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through mb-2">¥{product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <Badge className="bg-red-500 text-white">
                    立省 ¥{product.originalPrice - product.price}
                  </Badge>
                )}
              </div>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">{product.detail}</p>

              {/* Specifications */}
              <Card className="mb-8 border-green-100 bg-green-50/50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg text-green-800 mb-4">产品规格</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.volume && (
                      <div>
                        <span className="text-gray-500 text-sm">容量</span>
                        <p className="font-medium text-gray-800">{product.volume}</p>
                      </div>
                    )}
                    {product.alcoholContent && (
                      <div>
                        <span className="text-gray-500 text-sm">酒精度</span>
                        <p className="font-medium text-gray-800">{product.alcoholContent}</p>
                      </div>
                    )}
                    {product.shelfLife && (
                      <div>
                        <span className="text-gray-500 text-sm">保质期</span>
                        <p className="font-medium text-gray-800">{product.shelfLife}</p>
                      </div>
                    )}
                    {product.storage && (
                      <div>
                        <span className="text-gray-500 text-sm">储存方式</span>
                        <p className="font-medium text-gray-800">{product.storage}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <div className="flex items-center border-2 border-green-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-green-600 hover:bg-green-50 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-green-600 hover:bg-green-50 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 btn-huangjiu text-white text-lg py-6"
                >
                  加入购物车
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">相关产品</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map(p => (
                <Card key={p.id} className="card-hover border-0 shadow-lg overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
                  <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-bold text-green-800 mb-2">{p.name}</h3>
                    <p className="text-green-600 font-bold">¥{p.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
