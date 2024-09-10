import VerifyingAccountMain from "@/components/views/auth/VerifyingAccount/VerifyingAccountMain";
import "./verifyingAccount.css";

function VerifyingAccount({email}) {
  return (
    <div className="verifying-account-container">
      <div className="verifying-account">
        <div className="verifying-account-side verifying-account-side-left"></div>
        <VerifyingAccountMain email={email}/>
        <div className="verifying-account-side verifying-account-side-right"></div>
      </div>
    </div>
  );
}

export default VerifyingAccount;
