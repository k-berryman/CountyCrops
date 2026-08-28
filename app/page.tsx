"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import MapHero from "./components/MapHero";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpggvay";

export default function Home() {
  const [farmerSubmitted, setFarmerSubmitted] = useState(false);
  const [buyerSubmitted, setBuyerSubmitted] = useState(false);

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
    
    // Simulate submission for now if endpoint is missing
    if (FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT") {
      alert("Please add your Formspree endpoint in the code!");
      return;
    }

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

    if (FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT") {
      alert("Please add your Formspree endpoint in the code!");
      return;
    }

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
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4">
        <MapHero />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.5 }}
          className="z-10 relative"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white">
            Local food, delivered.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Connecting Eastern Shore farms to your neighborhood. First delivery: Friday, September 6th.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#order" className="px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all hover:shadow-[0_0_20px_rgba(0,230,118,0.5)]">
              Place a Pre-Order
            </a>
            <a href="#farmer" className="px-8 py-4 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-black transition-all">
              Join as a Founding Farm
            </a>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <motion.div {...fadeIn} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-gray-400">You grow it. We handle the rest.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: "1", title: "We list your farm. Free.", desc: "You tell us what you grow. We build your online store. You pay nothing." },
            { num: "2", title: "Customers order from you.", desc: "Neighbors browse your products and place orders. You see every order on your phone." },
            { num: "3", title: "We deliver. You get paid.", desc: "Every Friday and Saturday, we pick up your products and deliver to customers." }
          ].map((step, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.1 }}
              className="p-8 rounded-xl bg-dark border border-gray-800 hover:border-primary transition-all"
            >
              <div className="text-5xl font-bold text-primary mb-4">{step.num}</div>
              <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div {...fadeIn} className="mt-12 text-center p-6 rounded-xl border-2 border-primary">
          <p className="text-2xl font-bold text-white">No booth fees. No listing fees. No subscriptions. <span className="text-primary">You keep 88%.</span></p>
        </motion.div>
      </section>

      {/* We Handle Everything */}
      <section className="py-24 px-4 bg-dark">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">You Grow It. We Handle the Rest.</h2>
            <p className="text-xl text-gray-400">Here&apos;s everything County Crops takes care of.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Takes 30 Seconds", desc: "No app download required to sign up. Just tell us your name and what you grow." },
              { title: "You Keep 88%", desc: "No booth fees. No listing fees. We only earn when you earn." },
              { title: "Insured & Protected", desc: "Every delivery is fully commercially insured. Zero liability on you." },
              { title: "Delivered Fresh", desc: "Weekend delivery on Fridays and Saturdays. Farm to door the same day." },
              { title: "Paid Automatically", desc: "Payment deposits to your account within 1-2 business days of delivery." },
              { title: "We Handle Customers", desc: "If a customer has an issue, we resolve it. You focus on farming." }
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.05 }}
                className="p-6 rounded-xl bg-background border border-gray-800 hover:border-primary transition-all hover:shadow-[0_0_15px_rgba(0,230,118,0.2)]"
              >
                <h3 className="text-xl font-bold text-primary mb-2">{card.title}</h3>
                <p className="text-gray-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div {...fadeIn} className="mt-16 text-center p-8 rounded-xl bg-gradient-to-r from-background to-dark border border-gray-800">
            <p className="text-2xl font-bold text-white mb-2">If you can send a text message, you can sell on County Crops.</p>
            <p className="text-xl text-primary">You handle one thing: putting your products out for pickup. We handle everything else.</p>
          </motion.div>
        </div>
      </section>

      {/* Pre-Order Form */}
      <section id="order" className="py-24 px-4">
        <div className="max-w-2xl mx-auto bg-dark p-8 rounded-2xl border border-gray-800">
          <h2 className="text-3xl font-bold mb-2 text-white text-center">Pre-Order for Friday Delivery</h2>
          <p className="text-gray-400 mb-8 text-center">Be first to shop from local farms. Free stickers at launch.</p>
          
          {buyerSubmitted ? (
            <div className="text-center text-primary text-xl py-8">Thank you! Your pre-order request has been received.</div>
          ) : (
            <form onSubmit={handleBuyerSubmit} className="space-y-4">
              <input type="hidden" name="_subject" value="New Pre-Order Request" />
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                <input type="text" name="buyer_name" required className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input type="email" name="buyer_email" required className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <input type="tel" name="buyer_phone" required className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Delivery Address</label>
                <input type="text" name="buyer_address" required className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">What do you want to order? (We will confirm availability)</label>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  {["Vegetables", "Meat", "Dairy/Eggs", "Honey", "Baked Goods", "Other"].map((item) => (
                    <label key={item} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-background cursor-pointer">
                      <input type="checkbox" name="buyer_items[]" value={item} className="rounded accent-primary" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Preferred Delivery Day</label>
                <select name="buyer_delivery_day" className="w-full p-3 bg-background rounded-lg border border-gray-700 focus:border-primary outline-none transition-all">
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>

              <button type="submit" className="w-full p-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all hover:shadow-[0_0_20px_rgba(0,230,118,0.5)]">
                Submit Pre-Order
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">No payment until we confirm availability.</p>
            </form>
          )}
        </div>
      </section>

      {/* Farmer Form */}
      <section id="farmer" className="py-24 px-4 bg-dark">
        <div className="max-w-2xl mx-auto bg-background p-8 rounded-2xl border border-gray-800">
          <h2 className="text-3xl font-bold mb-2 text-white text-center">Join as a Founding Farm</h2>
          <p className="text-gray-400 mb-8 text-center">Takes 30 seconds. No commitment. We build your store for you.</p>
          
          {farmerSubmitted ? (
            <div className="text-center text-primary text-xl py-8">Thank you! We will be in touch shortly.</div>
          ) : (
            <form onSubmit={handleFarmerSubmit} className="space-y-4">
              <input type="hidden" name="_subject" value="New Farm Registration" />
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Farm Name</label>
                <input type="text" name="farm_name" required className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                <input type="text" name="contact_name" required className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <input type="tel" name="phone" required className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input type="email" name="email" required className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-3">What do you grow?</label>
                <div className="grid grid-cols-2 gap-2 text-gray-300">
                  {["Vegetables", "Meat", "Dairy/Eggs", "Honey", "Baked Goods", "Other"].map((item) => (
                    <label key={item} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark cursor-pointer">
                      <input type="checkbox" name="farm_items[]" value={item} className="rounded accent-primary" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">County</label>
                <select name="county" className="w-full p-3 bg-dark rounded-lg border border-gray-700 focus:border-primary outline-none transition-all">
                  <option value="Accomack">Accomack</option>
                  <option value="Northampton">Northampton</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <button type="submit" className="w-full p-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dark transition-all hover:shadow-[0_0_20px_rgba(0,230,118,0.5)]">
                Become a Founding Farm
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">County Crops</h3>
            <p className="text-gray-500">Launching on the Eastern Shore of Virginia, September 2026</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="mailto:hello@countycrops.com" className="hover:text-primary transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}