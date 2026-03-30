"use client";
import { useState } from "react";
import "./requestform.css";
import { SentIcon } from "@/public/icons";
import { Popup } from "@/components/popup/popup";

const RequestForm = () => {
    const [formData, setFormData] = useState({
        requestType: "feature",
        purpose: "",
        description: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <section className="form-section">
            <header className="form-header">
                <h2>Request a Change</h2>
                <p className="section-subtitle">
                    Have an idea or need a feature? Let us know how we can
                    improve.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="request-form">
                <div className="form-group">
                    <label htmlFor="requestType">Request Type *</label>
                    <select
                        id="requestType"
                        name="requestType"
                        value={formData.requestType}
                        onChange={handleChange}
                        required
                    >
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                        <option value="improvement">Improvement</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="purpose">Purpose *</label>
                    <input
                        type="text"
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        placeholder="What is this about? (e.g., Improve search performance)"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Detailed Description *</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Please provide as much detail as possible..."
                        required
                    />
                </div>

                <button type="submit" className="submit-btn btn">
                    Submit Request
                    <SentIcon size={20}/>
                </button>
            </form>
        </section>
    );
};

export default RequestForm;
