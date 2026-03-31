import { Toggle } from "@/components/ui/Toggle/toggle";
import React from "react";

interface NotificationState {
    email: boolean;
    desktop: boolean;
    mentions: boolean;
  }

  const notifItems: { key: keyof NotificationState; title: string; desc: string }[] = [
    { key: "email",   title: "Email notifications",         desc: "Receive summaries and updates in your external email." },
    { key: "desktop", title: "Desktop push notifications",  desc: "Show alerts on your desktop when the app is in the background." },
    { key: "mentions",title: "Important mentions",          desc: "Only notify me when I am explicitly @mentioned in a thread." },
  ];
  
  const NotificationsCard = ({ state, onChange } : {state :any , onchange: any }) => (
    <section className="card" aria-label="Notification preferences">
      <div className="cardHeader">
        <p className="sectionLabel">Notification Preferences</p>
      </div>
      <ul className="notifList">
        {notifItems.map((item, i) => (
          <React.Fragment key={item.key}>
            {i > 0 && <li className="dividerLi"><hr className="divider" /></li>}
            <li className="notifItem">
              <div className="notifInfo">
                <p className="notifTitle">{item.title}</p>
                <p className="notifDesc">{item.desc}</p>
              </div>
              <Toggle
                id={`notif-${item.key}`}
                checked={state[item.key]}
                onChange={(val) => onChange(item.key, val)}
              />
            </li>
          </React.Fragment>
        ))}
      </ul>
    </section>
  );

  export default NotificationsCard;