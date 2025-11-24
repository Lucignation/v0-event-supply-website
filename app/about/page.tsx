// import Navigation from '@/components/navigation'
// import Footer from '@/components/footer'
// import { Card } from '@/components/ui/card'

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navigation />
//       <main className="flex-1">
//         {/* Hero */}
//         <section className="bg-primary text-primary-foreground py-20">
//           <div className="container mx-auto px-4">
//             <h1 className="text-5xl font-bold text-pretty mb-4">Who We Are</h1>
//             <p className="text-lg max-w-2xl">Nigeria's leading supplier of premium beverages and event consumables to professional caterers.</p>
//           </div>
//         </section>

//         {/* Mission & Vision */}
//         <section className="py-16 bg-background">
//           <div className="container mx-auto px-4">
//             <div className="grid md:grid-cols-2 gap-8">
//               <Card className="p-8">
//                 <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
//                 <p className="text-foreground/80 leading-relaxed">
//                   To provide caterers with reliable, high-quality beverages and event supplies delivered on time, every time. We understand that your events require perfection, and we're here to ensure you have exactly what you need.
//                 </p>
//               </Card>
//               <Card className="p-8">
//                 <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
//                 <p className="text-foreground/80 leading-relaxed">
//                   To become the most trusted event supplies partner for caterers across Nigeria, known for exceptional service, premium products, and reliable delivery that makes every event successful.
//                 </p>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Us */}
//         <section className="py-16 bg-secondary">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-12">Why Choose Aquoryn?</h2>
//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 { title: 'Reliability', desc: 'On-time delivery guaranteed for all orders' },
//                 { title: 'Quality', desc: 'Premium brands and fresh products only' },
//                 { title: 'Coverage', desc: 'Fast delivery across Lagos and Nigeria' },
//                 { title: 'Support', desc: '24/7 customer support for your needs' },
//                 { title: 'Pricing', desc: 'Competitive rates with volume discounts' },
//                 { title: 'Easy Booking', desc: 'Simple online booking and tracking' },
//               ].map((item, i) => (
//                 <div key={i} className="p-6 bg-background rounded-lg text-center">
//                   <h3 className="font-bold text-lg mb-2 text-primary">{item.title}</h3>
//                   <p className="text-foreground/70">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Delivery Coverage */}
//         <section className="py-16 bg-background">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">Our Delivery Coverage</h2>
//             <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10">
//               <p className="text-center text-lg mb-6">We deliver to:</p>
//               <div className="grid md:grid-cols-4 gap-4 text-center">
//                 {['Lagos Island', 'Lagos Mainland', 'Abuja', 'Ogun State', 'Oyo State', 'Kaduna', 'Ibadan', 'Express Delivery Available'].map((loc, i) => (
//                   <div key={i} className="py-4 px-3 bg-background rounded border border-border">
//                     {loc}
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   )
// }




import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Droplets, Award, Users, TrendingUp, Shield, Clock } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: <Shield className="w-8 h-8" />, title: 'Quality Assurance', desc: 'Every product meets our strict quality standards before delivery' },
    { icon: <Clock className="w-8 h-8" />, title: 'Timely Delivery', desc: 'Your events run on schedule, and so do we' },
    { icon: <Users className="w-8 h-8" />, title: 'Customer First', desc: 'Your success is our success. We go the extra mile' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Continuous Growth', desc: 'Always expanding our range and improving our service' },
  ]

  const milestones = [
    { year: '2018', title: 'Founded', desc: 'Started with a vision to serve Lagos caterers' },
    { year: '2020', title: 'Expansion', desc: 'Grew to 500+ regular clients across Lagos' },
    { year: '2022', title: 'National Reach', desc: 'Extended services to major Nigerian cities' },
    { year: '2024', title: 'Tech Innovation', desc: 'Launched online platform for seamless ordering' },
  ]

  const stats = [
    { number: '10,000+', label: 'Events Served' },
    { number: '800+', label: 'Active Caterers' },
    { number: '50+', label: 'Product Lines' },
    { number: '24/7', label: 'Support Available' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero with Gradient */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-block mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Established 2018
                </span>
              </div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">Who We Are</h1>
              <p className="text-xl leading-relaxed text-blue-50">
                Nigeria's leading supplier of premium beverages and event consumables to professional caterers. 
                Trusted by hundreds of caterers across the nation.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 opacity-10">
            <Droplets className="w-64 h-64" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center transform hover:scale-105 transition-transform">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p className="text-xl">
                  Aquoryn was born from a simple observation: caterers across Nigeria were struggling 
                  with unreliable suppliers, inconsistent quality, and delivery headaches. We knew there 
                  had to be a better way.
                </p>
                <p>
                  Starting in Lagos in 2018, we set out to build the most reliable event supplies company 
                  in Nigeria. Our founder, a former caterer herself, understood the pressure of delivering 
                  perfect events—where running out of water or ice could mean disaster.
                </p>
                <p>
                  Today, we serve over 800 professional caterers across Nigeria, delivering everything from 
                  bottled water to premium beverages, ice blocks to disposable wares. Every delivery carries 
                  our promise: quality products, on time, every time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision - Enhanced */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="p-10 border-t-4 border-blue-600 hover:shadow-2xl transition-shadow bg-white">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To provide caterers with reliable, high-quality beverages and event supplies delivered 
                  on time, every time. We understand that your events require perfection, and we're here 
                  to ensure you have exactly what you need, when you need it, without compromise.
                </p>
              </Card>
              <Card className="p-10 border-t-4 border-teal-600 hover:shadow-2xl transition-shadow bg-white">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-teal-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To become the most trusted event supplies partner for caterers across Nigeria, 
                  known for exceptional service, premium products, and reliable delivery that makes 
                  every event successful. We envision a future where no caterer has to worry about supplies.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Our Core Values</h2>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, i) => (
                <div key={i} className="group">
                  <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-xl hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="text-blue-600 mb-4 transform group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-transform">
                        <span className="font-bold text-xl">{milestone.year}</span>
                      </div>
                    </div>
                    <div className="pt-4 flex-1">
                      <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-blue-100 text-lg">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Why Choose Aquoryn?</h2>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
              We don't just deliver products—we deliver peace of mind
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { title: 'Reliability', desc: 'On-time delivery guaranteed for all orders. 98.5% on-time rate.', emoji: '✅' },
                { title: 'Quality', desc: 'Premium brands and fresh products only. Zero compromise on standards.', emoji: '⭐' },
                { title: 'Coverage', desc: 'Fast delivery across Lagos and major cities. Same-day available.', emoji: '🚚' },
                { title: 'Support', desc: '24/7 customer support for urgent needs. Real humans, always.', emoji: '💬' },
                { title: 'Pricing', desc: 'Competitive rates with volume discounts. Best value guaranteed.', emoji: '💰' },
                { title: 'Easy Booking', desc: 'Simple online platform. Track orders in real-time.', emoji: '📱' },
              ].map((item, i) => (
                <Card key={i} className="p-8 hover:shadow-xl transition-all hover:-translate-y-1 border-t-4 border-blue-600">
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Coverage */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Our Delivery Coverage</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Serving caterers across Nigeria with reliable, timely delivery
            </p>
            <Card className="p-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white max-w-5xl mx-auto shadow-2xl">
              <p className="text-center text-xl mb-8 font-semibold">We deliver to major cities including:</p>
              <div className="grid md:grid-cols-4 gap-4">
                {['Lagos Island', 'Lagos Mainland', 'Abuja', 'Ogun State', 'Oyo State', 'Kaduna', 'Ibadan', 'Port Harcourt', 'Benin City', 'Enugu', 'Kano', 'Express Delivery Available'].map((loc, i) => (
                  <div key={i} className="py-4 px-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-center font-medium hover:bg-white/20 transition-colors">
                    {loc}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-blue-100">Don't see your location? Contact us—we're always expanding!</p>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
