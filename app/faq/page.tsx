"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { ChevronDown, Globe, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FaqPage() {
    const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Resuply?",
      answer: "Resuply is a premium event beverage supply service that provides clean bottled water and drinks for caterers, event planners, and corporate events across Nigeria. We offer reliable booking, fast delivery, and high-quality products."
    },
    {
      question: "Who can use Resuply's services?",
    //   answer: "Our platform is designed for caterers, event planners, party vendors, corporate organisations, and individuals hosting events. If you need drinks delivered quickly and professionally, we're here for you."
    answer: <div><h2>Our platform is designed for:</h2>
    <ul className="list-disc ml-6">
        <li>Caterers</li>
        <li>Event planners</li>
        <li>Party vendors</li>
        <li>Corporate organisations</li>
        <li>Individuals hosting events</li>
    </ul></div>
    },
    {
      question: "How do I place a booking?",
      answer: "Bookings can be made directly through our website by selecting the products you need and choosing your delivery time. You will receive instant confirmation once your order is processed."
    },
    {
      question: "How early should I book for an event?",
      answer: "We recommend booking at least 24–48 hours before your event. Large or bulk orders should be booked 3–7 days in advance for guaranteed availability."
    },
    {
      question: "What areas do you deliver to?",
      answer: "Resuply currently delivers within major cities in Nigeria. You can enter your location at checkout to confirm delivery availability."
    },
    {
      question: "What products do you supply?",
    //   answer: "We provide bottled water (various premium brands), water packs & sachets (if requested), soft drinks, premium beverages, and ice blocks (optional). Additional items may be available depending on partnership brands."
    answer: <div><h2>We provide:</h2>
    <ul className="list-disc ml-6">
        <li>Bottled water (various premium brands)</li>
        <li>Water packs & sachets (if requested)</li>
        <li>Soft drinks</li>
        <li>Premium beverages</li>
        <li>Ice blocks (optional)</li>
    </ul>
    <p>Additional items may be available depending on partnership brands.</p></div>
    },
    {
      question: "Do you offer same-day delivery?",
      answer: "Yes. Same-day delivery is available for certain locations and order sizes. However, it depends on inventory and rider availability."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, bank transfers, online payment gateways, and corporate invoicing (for approved clients)."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: <div>Yes. Orders can be modified or cancelled depending on the timeframe. Full refund if cancelled 48 hours before delivery. Partial or no refund if cancelled closer to the delivery date. See our <Link href="/refund-policy" className="hover:text-accent transition underline text-primary">Refund Policy</Link> for full details.</div>
    },
    {
      question: "What happens if my order arrives late?",
      answer: "If delays are caused by Resuply, we will reschedule or compensate you accordingly. If delays are caused by address issues, traffic, or external factors, normal refund rules apply."
    },
    {
      question: "Can I become a partner or reseller?",
      answer: "Yes. Resuply collaborates with caterers, event planners, and beverage brands. Contact us to discuss partnerships."
    },
    {
      question: "How do I contact Resuply?",
      answer: "You can reach us through email, phone, or visit our website at Resuply.com"
    }
  ];

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
    return (
        <div>
            <Navigation />
            <div className="container mx-auto px-4 py-4">
            <main className="max-w-4xl mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Find answers to common questions about our services, delivery, and partnerships
                </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4 mb-16">
                {faqs.map((faq, index) => (
                    <div
                    key={index}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                    >
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-blue-50 transition-colors duration-200"
                    >
                        <span className="font-semibold text-gray-900 pr-4">
                        {faq.question}
                        </span>
                        <ChevronDown
                        className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                            openIndex === index ? 'rotate-180' : ''
                        }`}
                        />
                    </button>
                    
                    <div
                        className={`overflow-hidden transition-all duration-300 ${
                        openIndex === index ? 'max-h-96' : 'max-h-0'
                        }`}
                    >
                        <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">Still Have Questions?</h3>
                <p className="text-center mb-6 text-blue-50">
                    We're here to help! Reach out to us through any of these channels
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <div className="overflow-hidden">
                        <p className="text-xs text-blue-100">Email</p>
                        <p className="font-semibold text-sm truncate">info@Resuply.com</p>
                    </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-blue-100">Phone</p>
                        <p className="font-semibold text-sm">+234 xxx xxx xxxx</p>
                    </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 hover:bg-white/20 transition-colors">
                    <Globe className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <p className="text-xs text-blue-100">Website</p>
                        <p className="font-semibold text-sm">Resuply.com</p>
                    </div>
                    </div>
                </div>
                </div>
            </main>
            </div>
            <Footer />
        </div>
    )
}