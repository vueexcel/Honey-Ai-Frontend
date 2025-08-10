"use client";

import BrandLogo from "./icons/BrandLogo";

export default function Footer() {
  return (
    <footer className="mb-8 mx-6 sm:mx-6 lg:mx-8 bg-[linear-gradient(90deg,#2a1338,#0e0e0e)] dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 rounded-xl">
      <div className="py-8 px-16">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <div className="col-span-1 md:col-span-3">
            <div className="flex items-center space-x-2 mb-3">
              <BrandLogo />
              <span className="text-gray-900 dark:text-white font-semibold text-xl tracking-wider">
                get-honey.ai
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Your dream companion awaits! Create your AI Companion, shape her
              look, personality, and bring her to life in one click. 100%
              powered by Artificial Intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-[#cf97f1]">Popular</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Premium Models
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Models with Video
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Characters
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Premium
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[#cf97f1] font-semibold mb-4 ">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Chat
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Create Character
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  My AI
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-[#cf97f1]">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Anti-Slavery Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Content Removal Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Complaint Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Complaint Management Policy & Procedures
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[#cf97f1] font-semibold mb-4 ">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Ineffaceable Enterprises
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  3960 Howard Hughes Parkway, Suite 500, Las Vegas, Nevada,
                  89169
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-[#58336e] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 get-honey.ai. All rights reserved.
          </p>
          {/* <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={14} className="text-red-500" />
            <span>for AI companionship</span>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
