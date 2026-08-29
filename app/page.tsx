"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import MapHero from "./components/MapHero";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpggvay";

const carouselSlides = [
  { src: "/images/carousel-1.jpg", caption: "Fresh produce, delivered to your door" },
  { src: "/images/carousel-2.jpg", caption: "Supporting local Eastern Shore farms" },
  { src: "/images/carousel-3.jpg", caption: "From farm to table, same day" },
  { src: "/images/carousel-4.jpg", caption: "Your neighborhood farmers market, online" },
  { src: "/images/carousel-5.jpg", caption: "Real food from real farmers" },
  { src: "/images/carousel-6.jpg", caption: "Delivered fresh every weekend" },
  { src: "/images/carousel-7.jpg", caption: "Eastern Shore grown, Eastern Shore delivered" },
];

export default function Home() {
  const [farmerSubmitted, setFarmerSubmitted] = useState(false);
  const [buyerSubmitted, setBuyerSubmitted] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeInOut" as const },
    viewport: { once: true }
  };

  const handleFarmerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      setFarmerSubmitted(true);
      form.reset();
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  const handleBuyerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      setBuyerSubmitted(true);
      form.reset();
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-start text-center px-3 pt-24 md:pt-32 overflow-hidden">        <MapHero />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.5 }}
          className="z-10 relative w-full"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-white leading-tight px-2">
            Local food, delivered.
          </h1>

          {/* Digital farmers market tag */}
          <div className="flex justify-center mb-2">
            <span className="bg-green-500/20 text-green-400 border border-green-500/40 px-3 py-1 rounded-full text-xs md:text-sm font-bold">
              Digital Farmers Market. 
            </span>
          </div>
          <p className="text-base md:text-xl text-gray-300 mb-3 max-w-xl mx-auto px-2">
            Shop multiple farms in one order. Delivering ESVA produce to your front door.
          </p>



          {/* Tags - County tags */}
          <div className="flex justify-center gap-2 mb-5">
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/40 px-3 py-1 rounded-full text-xs font-bold">
              Accomack
            </span>
            <span className="bg-purple-500/20 text-purple-400 border border-purple-500/40 px-3 py-1 rounded-full text-xs font-bold">
              Northampton
            </span>
          </div>

          {/* Carousel inside hero */}
          <div className="overflow-hidden relative mb-5 max-w-3xl mx-auto px-2">
            <div 
              className="flex gap-2 w-max"
              style={{
                animation: "carousel-scroll 40s linear infinite",
                animationPlayState: carouselPaused ? "paused" : "running",
              }}
            >
              {[...carouselSlides, ...carouselSlides].map((slide, i) => {
                const realIndex = i % carouselSlides.length;
                const isActive = hoveredCard === realIndex;
                return (
                  <div
                    key={i}
                    className="relative w-40 h-28 md:w-56 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => setCarouselPaused(!carouselPaused)}
                    onMouseEnter={() => setHoveredCard(realIndex)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onTouchStart={() => setHoveredCard(realIndex)}
                    onTouchEnd={() => setHoveredCard(null)}
                  >
                    <img src={slide.src} alt={slide.caption} className="w-full h-full object-cover" />
                    <div
                      className="absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-300"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,230,118,0.85), rgba(0,200,83,0.65))",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <p className="text-white font-semibold text-center text-xs md:text-sm">{slide.caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <a href="#order" className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all hover:shadow-[0_0_20px_rgba(0,230,118,0.5)]">
              Place a Pre-Order
            </a>
            <a href="#farmer" className="px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-black transition-all">
              Join as a Founding Farm
            </a>
          </div>

          {/* Scroll arrow - IN FLOW, visible on all devices */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <a href="#how-it-works" aria-label="Scroll down">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mx-auto">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 max-w-6xl mx-auto">
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">How It Works</h2>
          <div className="flex justify-center mt-2 mb-4">
            <span className="bg-green-500/20 text-green-400 border border-green-500/40 px-3 py-1 rounded-full text-xs font-bold">
              Fully Commercially Insured
            </span>
          </div>
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto">
            Modern community-supported agriculture. We coordinate produce from multiple farms into one perfect delivery box for each customer — you never have to juggle pickups from different farms.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: "1", title: "We list your farm. Free.", desc: "You tell us what you grow. We build your online store. You pay nothing." },
            { num: "2", title: "Customers order from you.", desc: "Neighbors browse your products and place orders. You see every order on your phone." },
            { num: "3", title: "We deliver. You get paid.", desc: "Every Friday and Saturday, we pick up your products and deliver to customers. Or drop off to us in Onancock during the week." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.1 }}
              className="gradient-border-card p-6 rounded-xl bg-dark border border-gray-800 hover:border-primary transition-all"
            >
              <div className="text-4xl font-bold text-primary mb-3">{step.num}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          {...fadeIn} 
          className="pulse-glow-card mt-8 text-center p-5 rounded-xl"
        >
          <p className="text-xl md:text-2xl font-bold text-white">No booth fees. No listing fees. No subscriptions. <span className="text-primary">You keep 88%.</span></p>
        </motion.div>
      </section>

      {/* We Handle Everything */}
      <section className="py-16 px-4 bg-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">You Grow It. We Handle the Rest.</h2>
            <p className="text-lg md:text-xl text-gray-400">Everything County Crops takes care of:</p>       
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Takes 30 Seconds", desc: "No app download required to sign up. Just tell us your name and what you grow." },
              { title: "You Keep 88%", desc: "No upfront fees. We only earn when you earn." },
              { title: "Insured & Protected", desc: "Fully insured. Zero liability on you. Packaged & delivered with care." },              { title: "Delivered Fresh", desc: "Weekend delivery on Fridays and Saturdays. Farm to door the same day." },
              { title: "Paid Securely", desc: "Payments processed securely via Stripe. Direct deposit to your account." },
              { title: "We Handle Customers", desc: "If a customer has an issue, we resolve it. You focus on farming." }
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.05 }}
                className="gradient-border-card p-5 rounded-xl bg-background border border-gray-800 hover:border-primary transition-all hover:shadow-[0_0_15px_rgba(0,230,118,0.2)]"
              >
                <h3 className="text-lg md:text-xl font-bold text-primary mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 space-y-4">
            <motion.div {...fadeIn} className="text-center p-6 rounded-xl bg-gradient-to-r from-background to-dark border border-gray-800">
              <p className="text-lg md:text-xl font-bold text-white mb-1">If you can send a text message, you can sell on County Crops.</p>
              <p className="text-md md:text-lg text-primary">You handle one thing: putting your products out for pickup. We handle everything else.</p>
            </motion.div>

            <motion.a 
              {...fadeIn}
              href="sms:7576016266"
              className="block text-center p-5 rounded-xl bg-dark border border-primary hover:bg-primary/10 transition-all"
            >
              <p className="text-lg md:text-xl font-bold text-white mb-1">Questions? Text us.</p>
              <p className="text-primary text-base md:text-lg font-semibold">757-601-6266</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Pre-Order Form (Mobile Optimized) */}
      <section id="order" className="py-4 md:py-16 px-3 scroll-mt-0">
        <div className="max-w-2xl mx-auto bg-dark p-4 md:p-6 rounded-2xl border border-gray-800">
          <h2 className="text-xl md:text-3xl font-bold mb-1 text-white text-center">Pre-Order for Weekend Delivery</h2>
          <p className="text-gray-400 mb-4 text-center text-sm">Be first to shop from local farms. Free stickers at launch.</p>
          
          {buyerSubmitted ? (
            <div className="text-center text-primary text-xl py-6">Thank you! Your pre-order request has been received.</div>
          ) : (
            <form onSubmit={handleBuyerSubmit} className="space-y-3">
              <input type="hidden" name="_subject" value="New Pre-Order Request" />
              
              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-1">Your Name</label>
                <input type="text" name="buyer_name" required className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm text-gray-400 mb-1">Email</label>
                  <input type="email" name="buyer_email" required className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs md:text-sm text-gray-400 mb-1">Phone</label>
                  <input type="tel" name="buyer_phone" required className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-1">Delivery Address</label>
                <input type="text" name="buyer_address" required className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-2">What do you want to order? (We will confirm availability)</label>
                <div className="grid grid-cols-2 gap-0.5 text-gray-300">
                  {["Vegetables", "Meat", "Eggs", "Honey", "Bread", "Other"].map((item) => (
                    <label key={item} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-background cursor-pointer text-sm">
                      <input type="checkbox" name="buyer_items[]" value={item} className="rounded accent-primary w-4 h-4" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-1">Preferred Delivery Day</label>
                <select name="buyer_delivery_day" className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm">
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>

              <button type="submit" className="w-full p-3 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all hover:shadow-[0_0_20px_rgba(0,230,118,0.5)] text-sm cursor-pointer">
                Submit Pre-Order
              </button>
              <p className="text-xs text-gray-500 text-center">No payment until we confirm availability.</p>
            </form>
          )}
        </div>
      </section>

      {/* Farmer Form (Mobile Optimized) */}
      <section id="farmer" className="py-4 md:py-16 px-3 bg-dark">
        <div className="max-w-2xl mx-auto bg-background p-4 md:p-6 rounded-2xl border border-gray-800">
          <h2 className="text-xl md:text-3xl font-bold mb-1 text-white text-center">Join as a Founding Farm</h2>
          <p className="text-gray-400 mb-4 text-center text-sm">Takes 30 seconds. No commitment. We build your store for you.</p>
          
          {farmerSubmitted ? (
            <div className="text-center text-primary text-xl py-6">Thank you! We will be in touch shortly.</div>
          ) : (
            <form onSubmit={handleFarmerSubmit} className="space-y-3">
              <input type="hidden" name="_subject" value="New Farm Registration" />
              
              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-1">Farm Name</label>
                <input type="text" name="farm_name" required className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm" />
              </div>
              
              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-1">Your Name</label>
                <input type="text" name="contact_name" required className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm text-gray-400 mb-1">Phone</label>
                  <input type="tel" name="phone" required className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-xs md:text-sm text-gray-400 mb-1">Email</label>
                  <input type="email" name="email" required className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-2">What do you grow?</label>
                <div className="grid grid-cols-2 gap-0.5 text-gray-300">
                  {["Vegetables", "Meat", "Eggs", "Honey", "Bread", "Other"].map((item) => (
                    <label key={item} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-dark cursor-pointer text-sm">
                      <input type="checkbox" name="farm_items[]" value={item} className="rounded accent-primary w-4 h-4" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm text-gray-400 mb-1">County</label>
                <select name="county" className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all text-sm">
                  <option value="Accomack">Accomack</option>
                  <option value="Northampton">Northampton</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            <button type="submit" className="w-full p-3 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all hover:shadow-[0_0_20px_rgba(0,230,118,0.5)] text-sm cursor-pointer">
              Become a Founding Farm
            </button>
            </form>
          )}
        </div>
      </section>

      {/* About Us */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold mb-3 text-white">About County Crops</h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              <strong className="text-primary">ESVA locals</strong>, based out of <strong className="text-primary">Onancock, VA</strong>. We&apos;re starting with online orders right here on our website, 
              and our mobile app will be ready for release in 1 month. Built <strong className="text-primary">by the Eastern Shore, for the Eastern Shore</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <div className="text-center">
            <h3 className="text-lg md:text-xl font-bold text-white mb-1">County Crops</h3>
            <p className="text-gray-500 text-sm">Launching on the Eastern Shore of Virginia, September 2026</p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a href="mailto:hello@countycrops.com" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
              <span className="text-lg">✉️</span>
              <span>Email</span>
            </a>
            <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
              <span className="text-lg">📸</span>
              <span>Instagram</span>
            </a>
            <a href="sms:7576016266" className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
              <span className="text-lg">💬</span>
              <span>757-601-6266</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}