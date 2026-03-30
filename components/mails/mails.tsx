import Image from "next/image";
import "./mails.css"

const Mails = ({
    mails = [],
    handleMailClick,
    selectedMail,
}: {
    mails: any[];
    handleMailClick: (mail: any) => void;
    selectedMail: any;
}) => {

    if (!mails.length) {
        return <div className="empty-state">No emails found</div>;
    }

    return (
        <div className="email-list">
            {mails.length === 0 ? (
                <div className="empty-state">No emails found</div>
            ) : (
                mails.map((mail) => (
                    <div
                        key={mail.id}
                        className={`email-item ${!mail.read ? "unread" : ""} ${
                            selectedMail?.id === mail.id ? "selected" : ""
                        }`}
                        onClick={() => handleMailClick(mail)}
                    >
                        <Image
                            src={"/logo.svg"}
                            alt="User-photo"
                            width={50}
                            height={50}
                        />
                        <div className="email-item-body">
                            <div style={{display:"flex", justifyContent:"space-between"}}>
                                <h4 className="email-sender">{mail.from}</h4>
                                <p className="email-date">{mail.date}</p>
                            </div>
                            <h4 className="email-subject">{mail.subject}</h4>
                            <p className="email-body">{mail.body}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Mails;