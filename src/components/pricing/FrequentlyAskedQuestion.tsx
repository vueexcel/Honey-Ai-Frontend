'use client'

import { useState } from 'react'
import { AArrowDownIcon, AArrowUpIcon, ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(0) // First question open by default

  const faqs = [
    {
      question: "What is an AI companion and how does it work?",
      answer: "An AI companion is a virtual character created using artificial intelligence. You can customize their appearance and personality, and they will communicate with you through text messages, adapting to your preferences."
    },
    {
      question: "Can I customize the appearance and personality of the AI companion?",
      answer: "Yes, you can personalize their appearance (facial features,clothing, etc) and chooses their personality and behavior to match your preference."
    },
    {
      question: "How realistic is the AI companion?",
      answer: "The AI companion is designed using advanced natural language processing technologies, making interactions smooth nad engaging. However, they remains a virtual character."
    },
    {
      question: "Can I chat with an AI companion 24/7?",
      answer: "Yes, the AI companion available at any time, with no restrictions on time or place. They are always ready to chat whenever it is convenient for you."
    },
    {
      question: "Can I create multiple AI companions?",
      answer: "Yes, you can create multiple characters and customize each one differently. This allows you to explore different personalities and interactions."
    },
    {
      question: "Is it safe to chat with an AI companion?",
      answer: "Yes, your privacy is important to us. All conversations with the AI companion are protected and nots shared with third parties. we do not stores personal data without your consent."
    }
  ]

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? -1 : index)
  }

  return (
    <div className="min-h-screen text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-white from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start xl:items-stretch">
          {/* Left Side - FAQ List - 50% width on desktop */}
          <div className="w-full xl:w-1/2 flex flex-col justify-between">
            <div className="space-y-4 flex-1 flex flex-col justify-center gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[var(--gray-dark)] rounded-xl border border-gray-700/50 overflow-hidden"
                >
                  <button onClick={() => toggleQuestion(index)}
                    className="w-full p-6 gap-4 text-[16px] font-semibold text-[#b8b8b8] text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors duration-200">
                    <h3 className="text-base font-normal text-gray-200 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openQuestion === index ? (
                        <ArrowUpIcon className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {openQuestion === index && (
                    <div className="px-6 pb-4 animate-fadeIn">
                      <div className="pt-2 border-t border-gray-700/30">
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image - 50% width on desktop, on top on mobile */}
          <div className="w-full xl:w-1/2 order-first xl:order-last flex justify-center xl:justify-end">
            <div className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-md xl:max-w-none">
              <img
                src="https://get-honey.ai/assets/faq-sfw-W5NuF4Qf.avif"
                alt="AI Girl"
                className="w-full h-auto object-contain"
                style={{ minHeight: '450px'}}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default FAQSection