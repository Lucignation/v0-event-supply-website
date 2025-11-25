import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import Link from "next/link";

export default function RefundPolicyPage() {
    return (
        <div>
            <Navigation />
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
                <p className="text-lg mb-4">Effective Date: November 22nd, 2025</p>
                <p className="text-lg mb-4">At Resuply, we are committed to providing reliable, high-quality water and beverage supply services for caterers, event planners, and corporate clients. This Refund Policy explains how refunds, cancellations, and adjustments are handled for all bookings made through our platform.</p>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">1. 1.⁠ ⁠Eligibility for Refunds</h2>
                <p>Refunds may be issued under the following conditions:</p>
                <ul className="list-decimal ml-6">
                    <li>Order Cancelled by Customer (Before Dispatch)</li>
                    <ul className="list-disc ml-6">
                        <li>Order Cancelled by Customer (Before Dispatch).</li>
                        <li>50% refund if cancelled 24–48 hours before delivery.</li>
                        <li>No refund for cancellations made less than 24 hours before delivery.</li>
                    </ul>
                    <li>Order Cancelled by Resuply</li>
                    <p>If Resuply cancels an order due to operational issues or product unavailability:</p>
                    <ul className="list-disc ml-6">
                        <li>Customer receives a full refund or may choose a rescheduled delivery at no extra cost.</li>
                    </ul>
                </ul>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">2. Non-Refundable Situations</h2>
                <p>Refunds will not be issued if:</p>
                <ul className="list-decimal ml-6">
                    <li>Products have already been dispatched for delivery.</li>
                    <li>Delivery was attempted but failed due to:</li>
                    <ul className="list-disc ml-6">
                        <li>Wrong or incomplete address</li>
                        <li>Customer not available at location</li>
                        <li>Inaccessible venue</li>
                        <li>Products were damaged after successful delivery.</li>
                        <li>Customer ordered the wrong quantity and the order has been processed.</li>
                    </ul>
                </ul>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">3. Partial Refunds</h2>
                <p>Partial refunds may apply if:</p>
                <ul className="list-decimal ml-6">
                    <li>Product quantity delivered differs from the quantity ordered.</li>
                    <li>Some items are unavailable and customer accepts a partial delivery.</li>
                </ul>
                <p>In such cases, Resuply will refund the difference within 3–7 business days.</p>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">4. Delivery-Related Issues</h2>
                <p>If delivery is delayed due to reasons within Resuply’s control, customers may request:</p>
                <ul className="list-decimal ml-6">
                    <li>Delivery rescheduling at no cost</li>
                    <li>A partial refund (case-by-case basis)</li>
                </ul>
                <p>Delays caused by factors outside our control, such as weather, traffic, or road closures, are not refundable.</p>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">5. How to Request a Refund</h2>
                <p>To request a refund:</p>
                <ul className="list-decimal ml-6">
                    <li>Email: [insert email]</li>
                    <li>Include:
                        <ul className="list-disc ml-6">
                            <li>Order ID</li>
                            <li>Customer name</li>
                            <li>Reason for refund request</li>
                            <li>Proof of payment (if applicable)</li>
                            <li>Any supporting evidence (if applicable)</li>
                        </ul>
                    </li>
                </ul>
                <p>Our team will review your request and respond within 24–48 hours.</p>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">6. Refund Timeline</h2>
                <p>Approved refunds will be processed within:</p>
                <ul className="list-decimal ml-6">
                    <li>3–7 business days for card or online payments or bank transfer</li>
                </ul>
                <p>Processing time may vary depending on your bank or payment provider.</p>
                <h2 className="text-2xl font-bold mb-4 mt-[30px]">7. Mode of Refund</h2>
                <p>Refunds will be issued using the same payment method used for the original order, unless otherwise agreed.</p>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">Changes to This Policy</h2>
                <p>Resuply may update this Refund Policy at any time. The updated version will be posted on this page with a revised “Last Updated” date.</p>

                <h2 className="text-2xl font-bold mb-4 mt-[30px]">8. Contact Us</h2>
                <p>If you have any questions or concerns about these terms, please contact us at <Link className="text-primary hover:text-accent transition underline" href="mailto:hello@Resuply.ng">hello@Resuply.ng</Link>.</p>
            </div>
                
            
            <Footer />
        </div>
    )
}