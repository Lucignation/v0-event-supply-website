import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div>
           <Navigation />

           <div className="container mx-auto px-4 py-4">
                <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
                <p className="text-lg mb-4">Effective Date: November 22nd, 2025</p>
                <p className="text-lg mb-4">These Terms and Conditions govern the use of the Aquoryn website and services. By accessing our website or booking with Aquoryn, you agree to these terms.</p>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">1. ⁠Definitions</h2>
                <ul className="list-decimal ml-6">
                    <li>“Aquoryn” / “We” / “Our” — The company providing beverage and water supply services.</li>
                    <li>“User” / “Customer” — Anyone who visits our website or books our services.</li>
                    <li>“Service” — Water supply, beverage delivery, and related event logistics.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">2. Use of the Aquoryn Website</h2>
                <p>Users agree not to:</p>
                <ul className="list-decimal ml-6">
                    <li>Misuse or disrupt the platform</li>
                    <li>Attempt unauthorized access or hacking</li>
                    <li>Provide false or misleading information</li>
                    <li>Engage in any activity that violates applicable laws or regulations</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">3.⁠ ⁠Bookings & Orders</h2>
                <ul className="list-decimal ml-6">
                    <li>All orders must be made via the Aquoryn website or designated channels.</li>
                    <li>A booking is confirmed only after full or partial payment (where applicable).</li>
                    <li>Users must provide accurate delivery and event details.</li>
                    <li>Once a booking is confirmed, it cannot be canceled or modified.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">4.⁠ ⁠Delivery & Logistics</h2>
                <ul className="list-decimal ml-6">
                    <li>Users must provide accurate delivery and event details.</li>
                    <li>Users are responsible for providing accurate delivery addresses.</li>
                    <li>Delivery times are estimated based on the logistics partner's schedule.</li>
                    <li>Aquoryn is not liable for delays caused by incorrect addresses, traffic, weather, or other external conditions.</li>
                    <li>Large or bulk orders may require advance notice.</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">5.⁠ Cancellations & Refunds</h2>
                <p>Customers may cancel by contacting Aquoryn directly. Cancellation fees may apply based on:</p>
                <ul className="list-decimal ml-6">
                    <li>Order size</li>
                    <li>Preparation stage</li>
                    <li>Delivery status</li>
                </ul>
                <p>Refunds will be processed within 7-10 business days of receiving the order.</p>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">6. Pricing & Payments</h2>
                <p>Prices are subject to change without prior notice. Payment is due at the time of booking.</p>
                <ul className="list-decimal ml-6">
                    <li>Prices may vary based on availability, demand, or location.</li>
                    <li>Payments are securely processed by approved third parties.</li>
                    <li>Refunds follow Aquoryn’s <Link href="/refund-policy" className="hover:text-accent text-primary transition underline">refund policy</Link></li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">7. Service Refusal</h2>
                <p>Aquoryn reserves the right to refuse service if:</p>
                <ul className="list-decimal ml-6">
                    <li>Violates these terms</li>
                    <li>Attempts to misuse the platform</li>
                    <li>Information provided is false or incomplete</li>
                    <li>Engages in any activity that violates applicable laws or regulations</li>
                    <li>Payment fails</li>
                    <li>Order is not processed in a timely manner</li>
                    <li>Delivery location is unsafe or inaccessible</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">8. Limitation of Liability</h2>
                <p>Aquoryn is not responsible for:</p>
                <ul className="list-decimal ml-6">
                    <li>Event disruptions caused by late deliveries due to external factors</li>
                    <li>Damages resulting from misuse of products</li>
                    <li>Losses caused by third-party providers beyond Aquoryn’s control</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">9. ⁠Intellectual Property</h2>
                <p>All content, logos, images, and branding on the Aquoryn website are the property of Aquoryn and may not be copied or distributed without written permission.</p>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">10. Termination</h2>
                <p>Aquoryn reserves the right to terminate or suspend your access to the platform or services if:</p>
                <ul className="list-decimal ml-6">
                    <li>Violation of these terms</li>
                    <li>Use of the platform</li>
                    <li>Use of the services</li>
                    <li>Use of the platform</li>
                    <li>Use of the services</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">11. Governing Law</h2>
                <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">12. Dispute Resolution</h2>
                <p>Any disputes arising from or related to these terms shall be resolved through arbitration in accordance with the laws of the Federal Republic of Nigeria.</p>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">13. Contact Us</h2>
                <p>If you have any questions or concerns about these terms, please contact us at <Link className="text-primary hover:text-accent transition underline" href="mailto:hello@aquoryn.ng">hello@aquoryn.ng</Link>.</p>
           </div>

           <Footer />
        </div>
    )
}