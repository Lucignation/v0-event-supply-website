import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div>
            <Navigation />
           <div className="container mx-auto px-4 py-4">
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-lg mb-4">Effective Date: November 22nd, 2025</p>
                <p className="text-lg mb-4">At Resuply, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our website and services.</p>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p>We collect the following types of information:</p>
                <ul className="list-decimal ml-6">
                    <li>Personal Information: Name, email address, phone number, and any other information you provide when using our website or services.</li>
                    <li>Usage Data: Information about how you use our website and services, including your IP address, browser type, and device information.</li>
                    <li>Order Information: Details of your bookings, including the products you order, delivery addresses, and payment information.</li>
                </ul>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">2. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-decimal ml-6">
                    <li>Processing bookings and delivering products to your event.</li>
                    <li>Communicating with you about your bookings and any updates or changes to your order.</li>
                    <li>Improving our website and services based on your feedback and usage patterns.</li>
                </ul>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">3. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, or loss.</p>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">4. Cookies</h2>
                <p>We use cookies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.</p>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">4. Information sharing</h2>
                <p>Resuply may share your data with:</p>
                <ul className="list-disc ml-6">
                    <li className="">Secure payment processors</li>
                    <li>Delivery/logistics partners</li>
                    <li>Platform service providers</li>
                </ul>
                <p>We never sell customer information.</p>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc ml-6">
                    <li>Request access to your data</li>
                    <li>Update or edit your information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt out of marketing communications</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">6. Updates to This Policy</h2>
                <p>We reserve the right to update this Privacy Policy from time to time. Any changes will be posted on this page and will take effect immediately.</p>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">7. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at <Link className="text-primary hover:text-accent transition underline" href="mailto:hello@Resuply.ng">hello@Resuply.ng</Link>.</p>
                
           </div>
            <Footer />
        </div>
    )
}