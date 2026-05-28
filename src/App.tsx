import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2400);
    const removeTimer = setTimeout(() => setShowSplash(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showSplash && (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute inset-0">
            <img
              src="https://picsum.photos/seed/mountain-river/1920/1080"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <img src="/logo.png" alt="陕西朱鹮酒业" className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-xl animate-splash-logo" />
            <h1 className="mt-5 text-3xl md:text-4xl font-bold text-green-800 tracking-widest animate-splash-title"
              style={{ fontFamily: 'SimSun, STSong, "Noto Serif CJK SC", serif' }}>
              陕西朱鹮酒业
            </h1>
            <p className="mt-3 text-base md:text-lg text-green-600 tracking-[0.15em] animate-splash-sub">
              朱鹮故乡 · 有机佳酿
            </p>
          </div>
        </div>
      )}
      <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* 前台路由 */}
            <Route path="/" element={
              <>
                <Navbar />
                <main className="flex-grow"><Home /></main>
              </>
            } />
            <Route path="/products" element={
              <>
                <Navbar />
                <main className="flex-grow"><Products /></main>
              </>
            } />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={
              <>
                <Navbar />
                <main className="flex-grow"><About /></main>
              </>
            } />
            <Route path="/news" element={
              <>
                <Navbar />
                <main className="flex-grow"><News /></main>
              </>
            } />
            <Route path="/news/:id" element={
              <>
                <Navbar />
                <main className="flex-grow"><NewsDetail /></main>
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <main className="flex-grow"><Contact /></main>
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <main className="flex-grow"><Cart /></main>
              </>
            } />
            <Route path="/checkout" element={
              <>
                <Navbar />
                <main className="flex-grow"><Checkout /></main>
              </>
            } />
            <Route path="/orders" element={
              <>
                <Navbar />
                <main className="flex-grow"><Orders /></main>
              </>
            } />

            {/* 后台路由 */}
            <Route path="/admin/login" element={<Navigate to="/login" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>

          {/* Footer - 仅前台显示 */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
    </>
  );
}

function Footer() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">朱鹮酒业</h3>
            <p className="text-green-200 text-sm">
              朱鹮故乡，有机佳酿
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2 text-green-200 text-sm">
              <li><a href="/" className="hover:text-white">首页</a></li>
              <li><a href="/products" className="hover:text-white">商品列表</a></li>
              <li><a href="/news" className="hover:text-white">新闻资讯</a></li>
              <li><a href="/about" className="hover:text-white">关于我们</a></li>
              <li><a href="/contact" className="hover:text-white">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">客户服务</h3>
            <ul className="space-y-2 text-green-200 text-sm">
              <li><a href="#" className="hover:text-white">配送说明</a></li>
              <li><a href="#" className="hover:text-white">退换政策</a></li>
              <li><a href="#" className="hover:text-white">常见问题</a></li>
              <li><a href="/contact" className="hover:text-white">在线留言</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">联系我们</h3>
            <ul className="space-y-2 text-green-200 text-sm">
              <li>电话：400-888-6666</li>
              <li>邮箱：info@zhuohuan-wine.com</li>
              <li>地址：陕西省汉中市洋县</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-6 text-center text-green-300 text-sm">
          &copy; 2026 陕西朱鹮酒业有限公司 版权所有
        </div>
      </div>
    </footer>
  );
}

export default App;
