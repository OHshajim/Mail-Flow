"use client";
import { faqs } from "@/public/data";
import { useState } from "react";
import "./Faq.css";

const Faq = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-header">
                <h2>Frequently Asked Questions</h2>
                <p className="section-subtitle">
                    Quick answers to common questions from our users.
                </p>
            </div>

            <div className="faq-list">
                {faqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className={`faq-item ${openFaq === idx ? "open" : ""}`}
                    >
                        <button
                            className="faq-question"
                            onClick={() => toggleFaq(idx)}
                        >
                            <span>{faq.question}</span>
                            <span className="faq-arrow">
                                {openFaq === idx ? "−" : "+"}
                            </span>
                        </button>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Faq;
