"use client";

import BrandLogo from "./icons/BrandLogo";
import BrandLogoText from "./icons/BrandLogoText";

export default function Footer() {
  return (
    <div className="max-w-4xl xl:max-w-full flex mx-auto px-3 lg:px-0">
      <footer className="mb-8 xl:mx-8 bg-[linear-gradient(90deg,#2a1338,#0e0e0e)] dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 rounded-xl">
        <div className="p-4 xl:py-8 xl:px-16">
          <div className="grid grid-cols-1 xl:grid-cols-7 gap-8">
            <div className="xl:col-span-3 place-self-center xl:place-self-start w-full">
              <div className="flex items-center space-x-2 mb-3 text-center xl:text-left w-full justify-center xl:justify-start">
                <BrandLogo />
                <BrandLogoText />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 w-full xl:max-w-md text-center xl:text-left">
                Your dream companion awaits! Create your AI Companion, shape her look, personality, and bring her to
                life in one click. 100% powered by Artificial Intelligence.
              </p>
            </div>

            {/* Quick Links */}
            <div className="place-self-center xl:place-self-start">
              <h3 className="font-semibold mb-4 text-[#cf97f1] text-center xl:text-left">Popular</h3>
              <ul className="space-y-2 text-center xl:text-left">
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
            <div className="place-self-center xl:place-self-start">
              <h3 className="text-[#cf97f1] font-semibold mb-4 text-center xl:text-left">Features</h3>
              <ul className="space-y-2 text-center xl:text-left">
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
            <div className="place-self-center xl:place-self-start">
              <h3 className="font-semibold mb-4 text-[#cf97f1] text-center xl:text-left">Legal</h3>
              <ul className="space-y-2 text-center xl:text-left">
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
            <div className="place-self-center xl:place-self-start">
              <h3 className="text-[#cf97f1] font-semibold mb-4 text-center xl:text-left">Contact Us</h3>
              <ul className="space-y-2 text-center xl:text-left">
                <li>
                  <a href="#" className="hover:underline">
                    Ineffaceable Enterprises
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    3960 Howard Hughes Parkway, Suite 500, Las Vegas, Nevada, 89169
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t-2 border-[#58336e] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">© 2024 get-honey.ai. All rights reserved.</p>
            {/* <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart size={14} className="text-red-500" />
            <span>for AI companionship</span>
          </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}
