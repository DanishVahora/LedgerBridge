import Navbar from "../layout/Navbar"

import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, ChevronRight, BarChart3, Clock, Shield, Zap, Globe } from 'lucide-react';

// Import Navbar component
// import Navbar from './Navbar';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    benefits: false,
    stats: false,
    testimonials: false,
    cta: false
  });

  useEffect(() => {
    setIsVisible({
      hero: true,
      features: true,
      benefits: true,
      stats: true,
      testimonials: true,
      cta: true
    });
  }, []);

  // Testimonial data
  const testimonials = [
    {
      quote: "LedgerBridge revolutionized our cash flow management. We've reduced DSO by 27% in just three months.",
      author: "Sarah Chen",
      title: "CFO, TechNova Solutions",
      avatar: "/api/placeholder/64/64"
    },
    {
      quote: "The platform's ease of use and transparent pricing made it an easy decision. Our working capital improved immediately.",
      author: "Michael Rodriguez",
      title: "Finance Director, Global Manufacturing Inc.",
      avatar: "/api/placeholder/64/64"
    },
    {
      quote: "As a supplier to large enterprises, LedgerBridge has been a game-changer for our liquidity management.",
      author: "Priya Sharma",
      title: "CEO, Innovate Supply Chain",
      avatar: "/api/placeholder/64/64"
    }
  ];

  return (
    <div className="w-full font-sans">
        <Navbar></Navbar>
      {/* Hero Section with 3D Elements */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#006A71] to-[#48A6A7] text-white">
        {/* 3D Abstract Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#9ACBD0] blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#F2EFE7] blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-40 h-40 rounded-full bg-white blur-2xl"></div>
        </div>

        {/* Floating 3D Objects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/5 w-16 h-16 bg-[#9ACBD0] rounded-lg transform rotate-12 animate-float opacity-70"></div>
          <div className="absolute top-2/3 right-1/4 w-20 h-20 bg-[#F2EFE7] rounded-full transform -rotate-12 animate-float-slow opacity-60"></div>
          <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-white rounded-lg transform rotate-45 animate-float-medium opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 relative z-10">
          <div className={`grid md:grid-cols-2 gap-8 items-center transition-all duration-1000 transform ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Accelerate Your <span className="text-[#F2EFE7]">Cash Flow</span> With Invoice Discounting
              </h1>
              <p className="text-lg md:text-xl mb-8 text-[#F2EFE7]/90 max-w-lg">
                Turn your unpaid invoices into immediate working capital with LedgerBridge's secure and efficient invoice discounting platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#get-started" className="px-8 py-3 bg-white text-[#006A71] font-medium rounded-lg hover:bg-[#F2EFE7] transition-colors shadow-lg hover:shadow-xl flex items-center group">
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </a>
                <a href="#learn-more" className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                  Learn More
                </a>
              </div>
            </div>

            {/* 3D Dashboard Mockup */}
            <div className="relative hidden md:block">
              <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 shadow-inner">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="bg-[#48A6A7]/20 rounded-md px-3 py-1 text-sm font-medium">Dashboard</div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[#9ACBD0]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#F2EFE7]"></div>
                      <div className="w-3 h-3 rounded-full bg-white/50"></div>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="space-y-3">
                    {/* Chart Mockup */}
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="h-2 w-1/3 bg-white/30 rounded-full mb-2"></div>
                      <div className="h-24 bg-gradient-to-r from-[#9ACBD0]/30 to-[#F2EFE7]/30 rounded-md flex items-end p-2">
                        <div className="w-1/6 h-1/3 bg-[#9ACBD0] rounded-sm mx-1"></div>
                        <div className="w-1/6 h-2/3 bg-[#9ACBD0] rounded-sm mx-1"></div>
                        <div className="w-1/6 h-1/2 bg-[#9ACBD0] rounded-sm mx-1"></div>
                        <div className="w-1/6 h-4/5 bg-[#F2EFE7] rounded-sm mx-1"></div>
                        <div className="w-1/6 h-3/4 bg-[#F2EFE7] rounded-sm mx-1"></div>
                        <div className="w-1/6 h-full bg-white rounded-sm mx-1"></div>
                      </div>
                    </div>

                    {/* Table Mockup */}
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex justify-between mb-2">
                        <div className="h-2 w-1/4 bg-white/30 rounded-full"></div>
                        <div className="h-2 w-1/5 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded">
                            <div className="h-2 w-1/3 bg-white/20 rounded-full"></div>
                            <div className="h-2 w-1/4 bg-[#9ACBD0]/30 rounded-full"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white/5 rounded-lg p-2">
                          <div className="h-2 w-2/3 bg-white/20 rounded-full mb-1"></div>
                          <div className="h-3 w-1/2 bg-[#F2EFE7]/30 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around dashboard */}
              <div className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-[#9ACBD0] to-[#48A6A7] rounded-full shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <BarChart3 size={24} />
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#F2EFE7] to-[#9ACBD0]/70 rounded-lg shadow-lg transform rotate-12">
                <div className="absolute inset-0 flex items-center justify-center text-[#006A71]">
                  <Clock size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.44,118.92,130.61,111.31,186.79,97.69c56.17-13.63,106.23-49.07,159.38-37.5,58,12.54,99.43,43,161.22-3.83Z" fill="#F2EFE7"></path>
          </svg>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-[#F2EFE7] py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 transform ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#006A71] mb-4">Streamline Your Financial Operations</h2>
            <p className="text-lg text-gray-600">Our platform provides a seamless experience to unlock the value in your outstanding invoices.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={32} className="text-[#006A71]" />,
                title: "Quick Funding",
                description: "Receive funds within 24-48 hours after approval, solving immediate cash flow needs."
              },
              {
                icon: <Shield size={32} className="text-[#006A71]" />,
                title: "Secure Transactions",
                description: "Enterprise-level security and blockchain verification protect your financial data."
              },
              {
                icon: <Globe size={32} className="text-[#006A71]" />,
                title: "Global Network",
                description: "Connect with financiers worldwide for competitive rates on your invoices."
              },
              {
                icon: <BarChart3 size={32} className="text-[#006A71]" />,
                title: "Real-time Analytics",
                description: "Track performance metrics and optimize your working capital strategy."
              },
              {
                icon: <CheckCircle size={32} className="text-[#006A71]" />,
                title: "Selective Discounting",
                description: "Choose which invoices to finance based on your specific business needs."
              },
              {
                icon: <Clock size={32} className="text-[#006A71]" />,
                title: "Automated Processes",
                description: "Reduce manual work with intelligent automation and streamlined workflows."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${150 * index}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9ACBD0]/10 to-transparent rounded-bl-full"></div>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#006A71] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with 3D Elements */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#48A6A7]/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 transform ${isVisible.benefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#006A71] mb-4">How Invoice Discounting Works</h2>
            <p className="text-lg text-gray-600">A simple three-step process to transform your invoices into immediate working capital</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
            {[
              {
                step: "01",
                title: "Upload Your Invoices",
                description: "Securely upload your outstanding invoices to our platform and set your financing preferences."
              },
              {
                step: "02",
                title: "Receive Competitive Offers",
                description: "Our network of verified financiers review and provide competitive rates on your invoices."
              },
              {
                step: "03",
                title: "Get Funded Quickly",
                description: "Accept the best offer and receive funds directly to your account within 24-48 hours."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`relative transition-all duration-1000 transform ${isVisible.benefits ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${200 * index}ms` }}
              >
                {/* 3D Step Number */}
                <div className="relative mb-6">
                  <div className="text-5xl md:text-6xl font-bold text-[#006A71]/10">{item.step}</div>
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-[#006A71] to-[#48A6A7] h-0.5 w-full"></div>
                </div>
                
                {/* Step Content */}
                <div className="bg-white rounded-xl p-6 shadow-lg relative">
                  {/* 3D Corner Decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#9ACBD0]/10 transform rotate-12 translate-x-8 -translate-y-8"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#F2EFE7] transform -rotate-12 -translate-x-6 translate-y-6 rounded-lg"></div>
                  
                  <h3 className="text-xl font-semibold text-[#006A71] mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                {/* Arrow for steps (except last one) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2">
                    <ChevronRight size={24} className="text-[#48A6A7]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with 3D Elements */}
      <section className="bg-[#006A71] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-4 gap-8 transition-all duration-1000 transform ${isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { value: "170+", label: "Financial Partners" },
              { value: "$2.3B+", label: "Invoices Processed" },
              { value: "5,800+", label: "Businesses Served" },
              { value: "24-48h", label: "Average Funding Time" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center relative" 
                style={{ transitionDelay: `${100 * index}ms` }}
              >
                {/* 3D Decorative Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/5 transform rotate-45"></div>
                </div>
                
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-[#9ACBD0]">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with 3D Cards */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 transition-all duration-1000 transform ${isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#006A71] mb-4">Trusted by Industry Leaders</h2>
            <p className="text-lg text-gray-600">See how businesses are transforming their cash flow with LedgerBridge</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-[#F2EFE7] rounded-xl p-6 shadow-lg relative overflow-hidden transition-all duration-1000 transform hover:shadow-xl hover:-translate-y-1 ${isVisible.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${150 * index}ms` }}
              >
                {/* 3D Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9ACBD0]/20 to-transparent rounded-bl-full"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#48A6A7]/10 rounded-full"></div>
                
                <div className="relative">
                  <div className="text-xl font-medium text-gray-800 mb-4">"{testimonial.quote}"</div>
                  <div className="flex items-center">
                    <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                    <div>
                      <div className="font-semibold text-[#006A71]">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with 3D Elements */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#48A6A7] to-[#006A71] py-16 md:py-20">
        {/* 3D Abstract Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
          <div className="absolute bottom-10 right-1/3 w-80 h-80 rounded-full bg-[#9ACBD0]/10 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center text-white transition-all duration-1000 transform ${isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Cash Flow?</h2>
            <p className="text-xl text-[#F2EFE7] mb-8 max-w-2xl mx-auto">Join thousands of businesses optimizing their working capital through LedgerBridge's invoice discounting platform.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/register/business" className="px-8 py-3 bg-white text-[#006A71] font-medium rounded-lg hover:bg-[#F2EFE7] transition-colors shadow-lg hover:shadow-xl">
                Create Your Account
              </a>
              <a href="/demo" className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                Request Demo
              </a>
            </div>

            {/* 3D Floating Badge */}
            <div className="mt-12 relative">
              <div className="inline-block relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 shadow-xl transform hover:rotate-2 transition-transform">
                  <span className="text-lg font-medium">No setup fees • Clear pricing • Get funded in 24-48 hours</span>
                </div>
                {/* Decorative Element */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#9ACBD0] rounded-full flex items-center justify-center">
                  <CheckCircle size={16} className="text-[#006A71]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="white"></path>
          </svg>
        </div>
      </section>
    </div>
  );
}