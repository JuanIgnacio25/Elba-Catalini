import VerifyingAccount from "@/components/views/auth/VerifyingAccount/VerifyingAccount";

function VerifyingAccountPage({params}) {
  const {email} = params;

  return (
    <VerifyingAccount email={email}/>
  );
}

export default VerifyingAccountPage;