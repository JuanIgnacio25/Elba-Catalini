import VerifyAccountMain from "@/components/views/auth/VerifyAccount/VerifyAccountMain";
import "./verifyAccount.css";

function VerifyAccount() {
  return (
    <div className="verify-account-container">
      <div className="verify-account">
        <div className="verify-account-side verify-account-side-left"></div>
        <VerifyAccountMain/>
        <div className="verify-account-side verify-account-side-right"></div>
      </div>
    </div>
  )
}

export default VerifyAccount;
