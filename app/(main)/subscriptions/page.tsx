import DescriptionCards from "./components/DescriptionCards/DescriptionCards";
import PricingCards from "./components/pricingCard/PricingCards";
import "./subscription.css"

export default function PricingPage() {

    return (
        <div className="pricing-page">
            <div className="container">
                {/* Header */}
                <div className="header">
                    <h1 className="title">
                        Experience{" "}
                        <span style={{ color: "#6a38d3" }}>Clarity</span> in
                        Inbox
                    </h1>
                    <p className="description">
                        Choose the perfect tier to elevate your digital
                        workspace. Curated tools for professional communication.
                    </p>
                </div>

                {/* Price Cards */}
                <PricingCards />

                {/* Description Cards (Three) */}
                <DescriptionCards />
            </div>
        </div>
    );
}
