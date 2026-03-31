import Image from "next/image";
import "./profileCard.css";

const ProfileCard = () => (
    <section className="card" aria-label="Account profile">
        <div className="cardHeader">
            <p className="sectionLabel">Account</p>
        </div>
        <div className="profileCard">
            <div className="avatarWrap">
                <Image src={"/logo.svg"} alt="" loading={"lazy"} width={100} height={100} className="avatar"/>
                <span className="avatarStatus" aria-label="Online" />
            </div>
            <div className="profileInfo">
                <h2 className="profileName">Ashwani Tanwar</h2>
                <p className="profileEmail">ashwani@mail.com</p>
                <div className="badges">
                    <span className="badgePro">
                        <span className="badgeDot" />
                        Pro Account
                    </span>
                </div>
            </div>
            <button className="btnEdit" type="button">
                Edit Profile
            </button>
        </div>
    </section>
  );

  export default ProfileCard;