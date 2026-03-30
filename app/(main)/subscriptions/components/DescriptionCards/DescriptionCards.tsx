import { descriptionCards } from '@/public/data';
import "./description.css"

const DescriptionCards = () => {
    return (
        <section className="faq-info-section">
            <div className="faq-info-grid">
                
                {/* <!-- LEFT SIDE --> */}
                <div className="left-side">
                <h3>Security at the core.</h3>
                <p>
                    We employ military-grade encryption for all your communications. 
                    Your data remains yours, protected by the most advanced security protocols in the industry.
                </p>
                </div>

                {/* <!-- RIGHT SIDE --> */}
                <div className="right-side">
                <div className="faq-item">
                    <h4>Can I cancel anytime?</h4>
                    <p>
                    Yes, R3A2 Mail Box is a no-contract service. You can downgrade or
                    cancel your subscription at any time with one click.
                    </p>
                </div>
                <div className="faq-item">
                    <h4>Do you offer educational discounts?</h4>
                    <p>
                    Absolutely! We provide 50% off for verified students and
                    academic institutions. Contact support to learn more.
                    </p>
                </div>
                </div>

            </div>
        </section>
    );
};

export default DescriptionCards;