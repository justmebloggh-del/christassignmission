/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ChevronLeft,
  ChevronRight, 
  Heart, 
  Globe, 
  Users, 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight
} from 'lucide-react';

// Images provided by user
const FOUNDER_IMAGE = "/images/founder.jpg";
const LOGO_IMAGE = "/images/logo.JPG";

const HERO_IMAGES = [
  "/images/s1.jpg",
  "/images/s2.jpg",
  "/images/s3.jpg",
  "/images/s4.jpg"
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Founder', href: '#founder' },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className={`relative p-0.5 rounded-full border-2 transition-all duration-500 ${scrolled ? 'border-mission-red/10 group-hover:border-mission-red' : 'border-white/10 group-hover:border-white'}`}>
              <img 
                src={LOGO_IMAGE} 
                alt="Logo" 
                className="h-14 w-14 md:h-18 md:w-18 object-contain rounded-full bg-white p-1 shadow-sm" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-lg md:text-xl font-bold leading-none tracking-tight transition-colors ${scrolled ? 'text-mission-red' : 'text-white'}`}>
                CHRIST ASSIGN <span className="text-mission-gold">MISSION</span>
              </span>
              <span className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold mt-1 transition-colors ${scrolled ? 'text-slate-400' : 'text-white/60'}`}>
                Christ for All Campaign
              </span>
            </div>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-mission-gold ${scrolled ? 'text-slate-700' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="bg-mission-red text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-all transform hover:scale-105">
              Donate
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-slate-900' : 'text-white'}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-700 hover:text-mission-red hover:bg-slate-50 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 px-3">
                <a href="#contact" onClick={() => setIsOpen(false)} className="block w-full bg-mission-red text-white py-3 rounded-lg font-bold text-center">
                  Donate Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentIndex}
            src={HERO_IMAGES[currentIndex]} 
            alt={`Mission Background ${currentIndex + 1}`} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      {/* Carousel Controls */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-4 md:px-8 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all pointer-events-auto group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-all pointer-events-auto group"
        >
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {HERO_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-mission-gold w-8' : 'bg-white/30'}`}
          />
        ))}
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Assigned to <span className="text-mission-gold italic">Transform</span> Lives
          </h1>
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Spreading the light of Christ through mission, service, and unwavering faith. Join us in our journey of spiritual awakening.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#ministries" className="bg-mission-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all flex items-center gap-2 group">
              Join Our Mission <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#founder" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Learn More
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/ordi.jpg" 
                alt="Mission Work" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-mission-red p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-white text-4xl font-serif font-bold mb-1">10+</p>
              <p className="text-white/80 text-sm uppercase tracking-widest">Years of Service</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-mission-red font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              A Vision Born from <span className="italic text-mission-gold">Divine Purpose</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Christ Assign Mission was founded on the principle that every soul has a divine assignment. We are a community dedicated to helping individuals discover and fulfill their God-given potential through biblical teaching and practical service.
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              From humble beginnings, we have grown into a global mission that reaches across borders, providing spiritual guidance and humanitarian aid to those in need.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-lg text-mission-red">
                  <Globe size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Global Reach</h4>
                  <p className="text-sm text-slate-500">Missions in 15+ countries</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gold-100 p-3 rounded-lg text-mission-gold">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Community</h4>
                  <p className="text-sm text-slate-500">Thousands of lives touched</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FounderSection = () => {
  return (
    <section id="founder" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-mission-gold/20 rounded-3xl blur-2xl group-hover:bg-mission-gold/30 transition-all" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src={FOUNDER_IMAGE} 
                  alt="Rev William Mawu" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-mission-red font-bold tracking-widest uppercase text-sm mb-4 block">The Founder</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Rev William Mawu</h2>
            <p className="text-xl text-mission-gold font-serif italic mb-8">Visionary & Servant Leader</p>
            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-mission-red pl-6">
                "Our mission is simple: to be the hands and feet of Christ in a world that desperately needs His love. We don't just preach the gospel; we live it through every action we take."
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Rev William Mawu is a dedicated man of God with a profound passion for mission work and spiritual transformation. With decades of experience in ministry, he has led Christ Assign Mission with a focus on integrity, compassion, and biblical truth.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                His leadership has inspired a generation of believers to step out of their comfort zones and into their divine assignments, creating a ripple effect of positive change across communities worldwide.
              </p>
            </div>
            
            <div className="mt-10 flex gap-4">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all">
                Let God be Glorified
              </button>
              <div className="flex items-center gap-4 ml-4">
                <a href="https://www.facebook.com/profile.php?id=100071193850747" className="text-slate-400 hover:text-mission-red transition-colors"><Facebook size={20} /></a>
                <a href="https://twitter.com/" className="text-slate-400 hover:text-mission-red transition-colors"><Twitter size={20} /></a>
                <a href="https://www.youtube.com/" className="text-slate-400 hover:text-mission-red transition-colors"><Youtube size={20} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Ministries = () => {
  const items = [
    {
      title: "Evangelism",
      desc: "Spreading the good news of Christ to every corner of the world through outreach and crusades.",
      icon: <BookOpen className="text-white" />,
      color: "bg-red-600"
    },
    {
      title: "Youth Empowerment",
      desc: "Mentoring the next generation to lead with faith, character, and professional excellence.",
      icon: <Users className="text-white" />,
      color: "bg-amber-600"
    },
    {
      title: "Global Missions",
      desc: "Providing humanitarian aid, clean water, and education to underserved communities globally.",
      icon: <Globe className="text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "Welfare & Support",
      desc: "Caring for the widows, orphans, and less privileged through our dedicated welfare programs.",
      icon: <Heart className="text-white" />,
      color: "bg-emerald-600"
    }
  ];

  return (
    <section id="ministries" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-mission-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Impact</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ministries & Outreach</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We serve through diverse ministries designed to meet both spiritual and physical needs of people everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                {item.desc}
              </p>
              <a href="#" className="flex items-center gap-2 text-mission-gold font-bold hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialFeed = () => {
  const posts = [
    {
      id: 1,
      type: 'instagram',
      image: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2070&auto=format&fit=crop',
      likes: '1.2k',
      caption: 'A beautiful morning of worship and fellowship. #ChristAssignMission #Worship',
    },
    {
      id: 2,
      type: 'facebook',
      image: '/images/banner.jpg',
      likes: '850',
      caption: 'Our youth outreach program is growing! See how you can get involved.',
    },
    {
      id: 3,
      type: 'instagram',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
      likes: '2.1k',
      caption: 'Global missions in action. Bringing hope to every corner of the world.',
    },
    {
      id: 4,
      type: 'facebook',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
      likes: '940',
      caption: 'Community support is at the heart of what we do. Thank you for your donations.',
    }
  ];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-mission-red font-bold tracking-widest uppercase text-sm"
          >
            Stay Connected
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mt-4"
          >
            Mission Moments
          </motion.h2>
          <p className="text-slate-600 mt-6 max-w-2xl mx-auto">
            Follow our journey and stay updated with the latest news, events, and stories from our global mission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Social Post" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                <div className="flex justify-between items-start">
                  <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                    {post.type === 'instagram' ? <Instagram size={20} /> : <Facebook size={20} />}
                  </div>
                  <div className="flex items-center gap-1 font-bold">
                    <Heart size={18} className="fill-current" /> {post.likes}
                  </div>
                </div>
                <p className="text-sm line-clamp-3 font-medium leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#" 
              className="flex items-center gap-3 bg-white border border-slate-200 px-8 py-4 rounded-full font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Instagram size={20} className="text-mission-red" /> Follow on Instagram
            </a>
            <a 
              href="#" 
              className="flex items-center gap-3 bg-white border border-slate-200 px-8 py-4 rounded-full font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Facebook size={20} className="text-blue-600" /> Follow on Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20">
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Get in Touch</h2>
              <p className="text-lg text-slate-600 mb-12">
                Have questions about our mission or want to partner with us? We'd love to hear from you.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-mission-red">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase font-bold tracking-wider">Email Us</p>
                    <p className="text-lg font-bold text-slate-900">love.onel7787@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-mission-red">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase font-bold tracking-wider">Call Us</p>
                    <p className="text-lg font-bold text-slate-900">+233 (0) 54 770 1261</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-mission-red">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase font-bold tracking-wider">Visit Us</p>
                    <p className="text-lg font-bold text-slate-900">Suhum, Ghana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 lg:p-20 border-l border-slate-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mission-red focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mission-red focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mission-red focus:border-transparent outline-none transition-all" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-mission-red focus:border-transparent outline-none transition-all" placeholder="Your message here..."></textarea>
                </div>
                <button className="w-full bg-mission-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-200">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="relative p-0.5 rounded-full border-2 border-white/10 group-hover:border-mission-gold transition-all duration-500">
                <img 
                  src={LOGO_IMAGE} 
                  alt="Logo" 
                  className="h-18 w-18 rounded-full bg-white p-1" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold leading-none">
                  Christ Assign <span className="text-mission-gold">Mission</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold mt-1 text-slate-500">
                  Assigned to Transform
                </span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Dedicated to fulfilling the Great Commission through spiritual empowerment and humanitarian service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-mission-red transition-all"><Facebook size={18} /></a>
              <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-mission-red transition-all"><Twitter size={18} /></a>
              <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-mission-red transition-all"><Instagram size={18} /></a>
              <a href="#" className="bg-white/5 p-2 rounded-lg hover:bg-mission-red transition-all"><Youtube size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-mission-gold transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-mission-gold transition-colors">About Us</a></li>
              <li><a href="#founder" className="hover:text-mission-gold transition-colors">The Founder</a></li>
              <li><a href="#ministries" className="hover:text-mission-gold transition-colors">Ministries</a></li>
              <li><a href="#contact" className="hover:text-mission-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Ministries</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-mission-gold transition-colors">Evangelism</a></li>
              <li><a href="#" className="hover:text-mission-gold transition-colors">Youth Outreach</a></li>
              <li><a href="#" className="hover:text-mission-gold transition-colors">Global Missions</a></li>
              <li><a href="#" className="hover:text-mission-gold transition-colors">Welfare Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-slate-400 mb-6">Stay updated with our latest mission news and events.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-mission-gold w-full" />
              <button className="bg-mission-gold text-slate-950 p-2 rounded-lg hover:bg-yellow-500 transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© 2026 Christ Assign Mission. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <FounderSection />
      <Ministries />
      <SocialFeed />
      <Contact />
      <Footer />
    </div>
  );
}
