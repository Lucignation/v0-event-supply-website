"use client"

import { useState } from 'react'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    consent: false
  })

  const handleSubmit = () => {
    alert('Thank you for your message! We will get back to you soon.')
  }

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Phone',
      value: '+234 (0)800 123 4567',
      subtext: 'Mon-Fri, 8am-6pm WAT',
      color: 'from-blue-500 to-cyan-500',
      action: 'Call Now'
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'WhatsApp',
      value: '+234 (0)900 555 8888',
      subtext: '24/7 for urgent orders',
      color: 'from-green-500 to-teal-500',
      action: 'Chat Now'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email',
      value: 'hello@aquoryn.ng',
      subtext: 'Response within 24 hours',
      color: 'from-purple-500 to-pink-500',
      action: 'Send Email'
    }
  ]

  const offices = [
    {
      city: 'Lagos (HQ)',
      address: '15 Admiralty Way, Lekki Phase 1, Lagos',
      phone: '+234 800 123 4567',
      hours: 'Mon-Sat: 8am-6pm'
    },
    {
      city: 'Abuja',
      address: '32 Gimbiya Street, Area 11, Garki, Abuja',
      phone: '+234 800 123 4568',
      hours: 'Mon-Fri: 9am-5pm'
    },
    {
      city: 'Ibadan',
      address: '8 Ring Road, Ibadan, Oyo State',
      phone: '+234 800 123 4569',
      hours: 'Mon-Fri: 9am-5pm'
    }
  ]

  const faqs = [
    {
      question: 'What is the minimum order value?',
      answer: 'We accept orders from ₦5,000. However, free delivery is available for orders above ₦50,000.'
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 48 hours in advance. For urgent orders, we offer same-day delivery within Lagos (subject to availability).'
    },
    {
      question: 'Do you deliver outside Lagos?',
      answer: 'Yes! We deliver to major cities across Nigeria including Abuja, Ibadan, Port Harcourt, and more. Contact us for delivery timelines to your location.'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-teal-600 via-blue-700 to-purple-700 text-white py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  We're Here to Help
                </span>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">Get in Touch</h1>
              <p className="text-xl leading-relaxed text-teal-50 mb-8">
                Have questions? Need a quote? Our team is ready to assist you with any inquiries about our services.
              </p>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg inline-flex">
                <Clock className="w-5 h-5" />
                <span className="font-medium">Average response time: Under 2 hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact Methods */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Choose Your Preferred Contact Method</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                We're available through multiple channels to serve you better
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              {contactMethods.map((method, i) => (
                <Card key={i} className="group hover:shadow-2xl transition-all hover:-translate-y-2 border-0 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${method.color}`}></div>
                  <div className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {method.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">{method.title}</h3>
                    <p className="text-gray-900 font-semibold text-lg mb-2">{method.value}</p>
                    <p className="text-gray-500 text-sm mb-6">{method.subtext}</p>
                    <Button className={`bg-gradient-to-r ${method.color} text-white hover:opacity-90 w-full`}>
                      {method.action}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <Card className="p-8 shadow-xl border-t-4 border-blue-600">
                  <div className="flex items-center gap-3 mb-6">
                    <Send className="w-8 h-8 text-blue-600" />
                    <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
                  </div>
                  <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <Input 
                          placeholder="John Doe" 
                          className="h-12"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <Input 
                          type="tel" 
                          placeholder="+234 800 000 0000" 
                          className="h-12"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        className="h-12"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                      <Input 
                        placeholder="What is this regarding?" 
                        className="h-12"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                      <textarea 
                        className="w-full border border-gray-300 rounded-lg p-4 min-h-40 font-sans focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Tell us more about your inquiry or event..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        className="mt-1" 
                        id="consent"
                        checked={formData.consent}
                        onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600">
                        I agree to receive communications from Aquoryn regarding my inquiry
                      </label>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 text-lg font-semibold"
                      onClick={handleSubmit}
                    >
                      Send Message
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Additional Info */}
              <div className="space-y-8">
                {/* Office Locations */}
                <Card className="p-8 border-t-4 border-green-600">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-8 h-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Offices</h3>
                  </div>
                  <div className="space-y-6">
                    {offices.map((office, i) => (
                      <div key={i} className="pb-6 border-b border-gray-200 last:border-0">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{office.city}</h4>
                        <p className="text-gray-600 text-sm mb-2 flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {office.address}
                        </p>
                        <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {office.phone}
                        </p>
                        <p className="text-gray-600 text-sm flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {office.hours}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Business Hours */}
                <Card className="p-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                  <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <span className="font-semibold">Monday - Friday</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/20">
                      <span className="font-semibold">Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-green-300">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">24/7 WhatsApp for urgent orders</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Frequently Asked Questions</h2>
              <p className="text-center text-gray-600 mb-12 text-lg">
                Quick answers to common questions
              </p>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <Card key={i} className="p-8 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
                <Button variant="outline" onClick={() => router.push('/faq')} className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                  View All FAQs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="text-6xl mb-6">🚨</div>
              <h2 className="text-4xl font-bold mb-4">Need Urgent Assistance?</h2>
              <p className="mb-8 text-xl text-red-50">
                For same-day delivery requests or emergency orders, contact our 24/7 hotline
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-6 text-lg font-bold">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Emergency Line
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}