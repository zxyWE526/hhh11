import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { useCart } from '@/hooks/useCart';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('zhuohuan_user');
    setIsLoggedIn(!!userData);
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role || '');
    } else {
      setUserRole('');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('zhuohuan_user');
    localStorage.removeItem('zhuohuan_token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: '首页' },
    { to: '/products', label: '商品列表' },
    { to: '/news', label: '新闻资讯' },
    { to: '/about', label: '关于我们' },
    { to: '/contact', label: '联系我们' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2'
          : 'bg-white/80 backdrop-blur-sm shadow-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <Logo size={50} />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link text-gray-700 hover:text-green-700 font-medium transition-colors px-2 py-1 ${
                  location.pathname === link.to ? 'text-green-700' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/cart')}
              className="relative text-gray-700 hover:text-green-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Button>

            <span className="text-gray-600 text-sm border-l pl-4 flex items-center gap-1.5">
              {isLoggedIn ? (
                userRole === 'vip' ? (
                  <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16l-6.4 4.8L8 14l-6-4.8h7.6z" />
                    </svg>
                    VIP
                  </span>
                ) : null
              ) : null}
              {isLoggedIn ? '已登录' : '游客'}
            </span>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/orders')}
                  className="text-gray-700 hover:text-green-700"
                >
                  我的订单
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  退出
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-green-700"
                >
                  登录
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-green-600 hover:bg-green-700 text-white btn-huangjiu"
                >
                  注册
                </Button>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-green-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-gray-700 hover:text-green-700 font-medium px-2 py-2 ${
                    location.pathname === link.to ? 'text-green-700' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate('/cart');
                    setIsMobileMenuOpen(false);
                  }}
                  className="relative text-gray-700 hover:text-green-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </Button>
                <span className="text-sm text-gray-600">购物车</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex flex-col space-y-2">
                {isLoggedIn ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate('/orders');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-green-700 justify-start"
                    >
                      我的订单
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full border-green-600 text-green-600"
                    >
                      退出登录
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate('/login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-gray-700 justify-start"
                    >
                      登录
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        navigate('/register');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      注册
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
