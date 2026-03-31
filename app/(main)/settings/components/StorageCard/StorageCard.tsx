import { useState, useEffect } from "react";
import "./storageCard.css"

const StorageCard: React.FC = () => {
    const [barWidth, setBarWidth] = useState(0);
    const USED_GB = 5.4;
    const TOTAL_GB = 15;
    const PCT = Math.round((USED_GB / TOTAL_GB) * 100);
  
    useEffect(() => {
      const t = setTimeout(() => setBarWidth(PCT), 200);
      return () => clearTimeout(t);
    }, [PCT]);
  
    return (
      <section className="card" aria-label="Storage usage">
        <div className="cardHeader">
          <p className="sectionLabel">Storage</p>
        </div>
        <div className="storageSection">
          <div className="storageHeader">
            <div>
              <p className="storageTitle">
                Storage Usage
                <span className="warningPill">{PCT}% Full</span>
              </p>
              <p className="storageSubtitle">{USED_GB} GB of {TOTAL_GB} GB used</p>
            </div>
          </div>
          <div className="storageBarWrap" role="progressbar" aria-valuenow={PCT} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="storageBarFill"
              style={{ width: `${barWidth}%`, transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)" }}
            />
          </div>
          <div className="storageStats">
            <span className="storageUsed">{USED_GB} GB used</span>
            <span>{(TOTAL_GB - USED_GB).toFixed(1)} GB available</span>
          </div>
        </div>
      </section>
    );
  };

  export default StorageCard;