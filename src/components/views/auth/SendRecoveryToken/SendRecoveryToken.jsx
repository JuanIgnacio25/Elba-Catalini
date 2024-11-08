import "./sendRecoveryToken.css";
import SendRecoveryTokenMain from "@/components/views/auth/SendRecoveryToken/SendRecoveryTokenMain";

function SendRecoveryToken() {
  
  return (
    <div className="send-rt-container">
      <div className="send-rt">
        <div className="send-rt-side send-rt-side-left"></div>
        <SendRecoveryTokenMain/>
        <div className="send-rt-side send-rt-side-right"></div>
      </div>
    </div>
  );
}

export default SendRecoveryToken;
