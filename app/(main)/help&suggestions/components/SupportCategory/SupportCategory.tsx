import { supportCategories } from "@/public/data";
import "./supportCategory.css";

const colors = [
    ["#7C3AED", "#A78BFA"],
    ["#2563EB", "#60A5FA"],
    ["#059669", "#34D399"],
    ["#EA580C", "#FB923C"],
    ["#DB2777", "#F472B6"],
    ["#0891B2", "#22D3EE"],
    ["#9333EA", "#C084FC"],
    ["#16A34A", "#4ADE80"],
    ["#a35c16", "#dea84a"],
    ["#16a3a3", "#4adede"],
    ["#a31653", "#de4a80"],
];

const getRandomGradient = () => colors[Math.floor(Math.random() * colors.length)];

const SupportCategory = () => {
    return (
        <section className="support-section">
            <div className="cards-grid">
                {supportCategories.map((cat, idx) => {
                    const gradient = getRandomGradient();

                    return (
                        <div
                            key={idx}
                            className="card fade-up"
                            style={{
                                animationDelay: `${idx * 120}ms`,
                                "--icon-grad-1": gradient[0],
                                "--icon-grad-2": gradient[1],
                            }}
                        >
                            <div className="card-header">
                                <div className="card-icon">{cat.icon}</div>
                                <h3>{cat.title}</h3>
                            </div>

                            <ul className="card-list">
                                {cat.categories.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>

                            <button className="card-link">
                                View all articles{" "}
                                <span className="arrow">→</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default SupportCategory;
