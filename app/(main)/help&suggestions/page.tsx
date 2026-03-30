import "./help&suggestions.css"
import Faq from "./components/FAQ/Faq";
import SupportCategory from "./components/SupportCategory/SupportCategory";
import RequestForm from "./components/RequestForm/RequestForm";

export default function HelpCenterPage() {
    return (
        <div className="help-center">
            <div className="container">
                {/* Hero Section */}
                <div className="hero">
                    <h1>How can we help?</h1>
                    <p className="hero-subtitle">
                        Search our knowledge base for articles, guides, and
                        troubleshooting tips.
                    </p>
                </div>

                {/* Support Categories Section */}
                <SupportCategory/>

                {/* FAQ Section */}
                <Faq />

                {/* Request Form */}
                <RequestForm/>
            </div>
        </div>
    );
}
