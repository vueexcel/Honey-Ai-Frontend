"use client";

import { CheckCircle2, ShieldCheck, ShoppingCart } from "lucide-react";

// Data for the pricing plans based on the image
const plans = [
  {
    duration: "1 month",
    dailyPrice: "0.66",
    discount: "50% OFF",
    originalPrice: "39.99",
    discountedPrice: "19.99",
    popular: false,
  },
  {
    duration: "12 months",
    dailyPrice: "0.33",
    discount: "70% OFF",
    originalPrice: "399.99",
    discountedPrice: "119.99",
    popular: true,
  },
  {
    duration: "3 months",
    dailyPrice: "0.48",
    discount: "60% OFF",
    originalPrice: "109.99",
    discountedPrice: "43.99",
    popular: false,
  },
];

// Data for the premium benefits list
const premiumBenefits = [
  "Generate photos",
  "Get 100 tokens every month",
  "Unlock chat photos",
  "Create your own AI Characters",
  "Fast response",
  "New features priority use",
  "Content privacy",
  "And much more!",
];

export default function PricingSection() {
  return (
    <div className="bg-[#0e0e0e] flex items-center justify-center min-h-screen p-4 sm:p-6 xl:p-8 font-sans">
      <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold">Choose your plan</h1>
          <div className="flex items-center justify-center text-green-400 mt-2">
            <ShieldCheck size={20} className="mr-2" />
            <p>Your payment is 100% anonymous!</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Side: Plans */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h2 className="text-white text-3xl font-bold">Get Exclusive</h2>
              <h2 className="text-purple-400 text-3xl font-bold">Discount Only</h2>
              <h2 className="text-white text-3xl font-bold">Today!</h2>
            </div>
            
            {/* Tokens Banner */}
            <div className="bg-gradient-to-r from-[#4a3a24] to-[#3c2f1e] text-white p-3 rounded-lg flex items-center justify-center mb-6">
              <span className="bg-orange-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center mr-3">C</span>
              <span>Get 100 Tokens every month</span>
            </div>

            {/* Plan Options */}
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.duration}
                  className={`bg-[#2c2c2c] p-4 rounded-lg border-2 ${
                    plan.popular ? "border-purple-600" : "border-transparent"
                  } cursor-pointer transition-all duration-300 hover:border-purple-500`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-white text-lg font-semibold">{plan.duration}</h3>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">{plan.discount}</span>
                      </div>
                       <div className="text-gray-400 text-sm">
                        <span className="line-through">{plan.originalPrice}</span>
                        <span> {plan.discountedPrice}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-3xl font-bold">${plan.dailyPrice}</p>
                      <p className="text-gray-400 text-sm">USD per day</p>
                    </div>
                  </div>
                  {plan.popular && (
                    <div className="bg-purple-600 text-white text-center text-sm font-bold p-2 rounded-b-md -m-4 mt-4">
                      MOST POPULAR
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Benefits */}
          <div className="bg-[#2c2c2c] p-8 rounded-lg">
            <h3 className="text-white text-2xl font-bold mb-6 text-purple-400">Premium Benefits</h3>
            <ul className="space-y-4">
              {premiumBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-white">
                  <CheckCircle2 size={20} className="text-purple-400 mr-3 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-gray-300 text-sm mb-6 gap-4">
            <div className="flex items-center">
              <ShoppingCart size={20} className="mr-2" />
              <span>No commitment. Cancel anytime!</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck size={20} className="mr-2 text-green-400" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>

          <button className="w-full bg-pink-600 text-white font-bold text-lg py-4 rounded-lg hover:bg-pink-700 transition-colors duration-300">
            Continue
          </button>
          
          <div className="text-gray-500 text-xs text-center mt-4">
            <p>
              By continuing, you confirm that you are at least 18 years old and agree to an introductory payment of $43.99 for a quarterly subscription. 
              If you do not cancel at least 24 hours before the end of the introductory period, you will automatically be charged $109.99 for each subsequent period until you cancel.
            </p>
            <p className="mt-2">
              By clicking Continue, you also confirm that you agree to our <a href="#" className="underline hover:text-gray-300">Terms & Conditions</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}