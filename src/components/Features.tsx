"use client";

import { Sparkles, Heart, Zap, Shield, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Creation",
    description:
      "Create your perfect companion with advanced AI technology that understands your preferences and desires.",
  },
  {
    icon: Heart,
    title: "Emotional Connection",
    description:
      "Build deep, meaningful relationships with AI companions that respond to your emotions and personality.",
  },
  {
    icon: Zap,
    title: "Instant Interaction",
    description: "Start conversations immediately with responsive AI that adapts to your communication style.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your conversations and data are protected with enterprise-grade security and privacy controls.",
  },
  {
    icon: Users,
    title: "Community Features",
    description: "Connect with other users and share experiences in a safe, moderated community environment.",
  },
  {
    icon: Star,
    title: "Premium Experience",
    description:
      "Unlock advanced features, exclusive characters, and enhanced AI capabilities with premium membership.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose get-honey.ai?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the future of AI companionship with cutting-edge technology and personalized interactions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 shadow-md"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 shadow">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
