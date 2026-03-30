"use client";
import { plans } from "@/public/data";
import { useState } from "react";
import "./pricingCard.css";

const PricingCards = () => {
    const [isYearly, setIsYearly] = useState(false);

    const getDisplayPrice = (plan: (typeof plans)[0]) => {
        if (plan.isFree) return "Free";
        const price = isYearly ? plan.priceYearly : plan.priceMonthly;
        return `₹${price.toLocaleString("en-IN")}`;
    };

    const getPeriodText = (plan: (typeof plans)[0]) => {
        if (plan.isFree) return "Forever";
        return isYearly ? "/ year" : "/ month";
    };

    return (
        <section className="pricing-section">
            {/* Toggle */}
            <div className="billing-toggle">
                <div className={`toggle-pill ${isYearly ? "yearly" : ""}`}>
                    <span>Monthly</span>
                    <span>Yearly</span>
                    <div className="toggle-slider" />
                </div>

                <div className="toggle-buttons">
                    <button onClick={() => setIsYearly(false)} />
                    <button onClick={() => setIsYearly(true)} />
                </div>

                <div className="save-pill">Save 20%</div>
            </div>

            {/* Cards */}
            <div className="pricing-grid">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`pricing-card ${plan.badge ? "featured" : ""}`}
                    >
                        {plan.badge && (
                            <div className="badge">{plan.badge}</div>
                        )}

                        <h3 className="plan-title">{plan.name}</h3>
                        <p className="plan-desc">{plan.description}</p>

                        <div className="price-area">
                            <span className="price">
                                {getDisplayPrice(plan)}
                            </span>
                            <span className="period">
                                {getPeriodText(plan)}
                            </span>
                        </div>

                        <ul className="features">
                            {plan.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>

                        <button
                            className={`cta ${plan.isFree ? "outline" : "primary"}`}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingCards;
