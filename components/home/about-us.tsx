
"use client"

import Image from 'next/image'

export default function AboutUs() {
  const images = [
    "https://www.coca-cola.com/content/dam/onexp/ng/home-image/brands/eva-water/eva-logo-180x180-01.svg",
    "https://i.pinimg.com/736x/d1/69/33/d169331a3f00cee139c03dacc84e107f.jpg",
    "https://www.nestlepurelife.com/themes/custom/nplus/images/logo.png",
    "https://www.brandtimes.com.ng/wp-content/uploads/2024/02/Bigi-CSD-Logo.png",
    "https://1000logos.net/wp-content/uploads/2020/09/Aquafina-Logo-2004.jpg",
  ];

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-slate-500">Trusted Water Brands & Partners</p>
      </div>
      
      <div className="relative">
        <div className="flex animate-scroll">
          <div className="flex gap-8 px-4">
            {images.map((src, index) => (
              <div 
                key={`first-${index}`} 
                className="w-48 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <Image
                  src={src}
                  alt={`Water brand ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={192}
                  height={128}
                />
              </div>
            ))}
          </div>
          
          <div className="flex gap-8 px-4">
            {images.map((src, index) => (
              <div 
                key={`second-${index}`} 
                className="w-48 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <Image
                  src={src}
                  alt={`Water brand ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={192}
                  height={128}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}