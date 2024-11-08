import "./passwordRecovery.css";
import PasswordRecoveryMain from "@/components/views/auth/PasswordRecovery/PasswordRecoveryMain";

function PasswordRecovery() {
  return (
    <div className="recovery-token-container">
      <div className="recovery-token">
        <div className="recovery-token-side recovery-token-side-left"></div>
        <PasswordRecoveryMain />
        <div className="recovery-token-side recovery-token-side-right"></div>
      </div>
    </div>
  );
}

export default PasswordRecovery;
