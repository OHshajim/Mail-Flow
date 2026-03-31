import { Toggle } from "@/components/ui/Toggle/toggle";

interface SecurityCardProps {
    twoFA: boolean;
    onTwoFAChange: (val: boolean) => void;
  }
  
  const SecurityCard: React.FC<SecurityCardProps> = ({ twoFA, onTwoFAChange }) => (
    <section className="card" aria-label="Security and access">
      <div className="cardHeader">
        <p className="sectionLabel">Security &amp; Access</p>
      </div>
  
      {/* Password */}
          <div className="securityItem">
        <div className="securityLeft">
          <div className="securityIcon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div>
            <p className="securityTitle">Account Password</p>
            <p className="securityDesc">Last changed 3 months ago. We recommend a change every 6 months.</p>
          </div>
        </div>
        <button className="btnAction" type="button">Change Password</button>
      </div>
  
      <hr className="divider" />
  
      {/* 2FA */}
      <div className="securityItem">
        <div className="securityLeft">
          <div className="securityIcon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="securityTitle">
              Two-Factor Authentication{" "}
              <span className={twoFA ? "chipOn" : "chipOff"}>
                {twoFA ? "On" : "Off"}
              </span>
            </p>
            <p className="securityDesc">Secure your account with an extra layer of protection.</p>
          </div>
        </div>
        <Toggle id="two-fa" checked={twoFA} onChange={onTwoFAChange} />
      </div>
  
              <hr className="divider" />
  
      {/* Active Sessions */}
      <div className="cardHeader" style={{ paddingTop: 18 }}>
        <p className="sectionLabel" style={{ marginBottom: 0 }}>Active Sessions</p>
      </div>
      <div className="sessionItem">
        <div className="sessionIcon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>
                  <div className="sessionInfo">
          <p className="sessionDevice">MacBook Pro 16"</p>
          <p className="sessionMeta">New Delhi, India</p>
          <div className="sessionChips">
            <span className="chipActive">Active now</span>
            <span className="chipCurrent">Current Device</span>
          </div>
        </div>
      </div>
      <div className="sessionFooter">
        <button className="btnAction btnActionDanger" type="button">
          Sign out all other sessions
        </button>
      </div>
    </section>
  );

  export default SecurityCard;