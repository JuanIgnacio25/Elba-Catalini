import VerifyingAccountMain from "@/components/views/auth/VerifyingAccount/VerifyingAccountMain";

function VerifyingAccount({ email }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[30vh] my-[90px]">
      <div className="flex flex-row items-center w-[95%] sm:w-[75%] lg:w-[55%] bg-white shadow-md">
        <div className="w-[8%] h-full bg-gradient-to-r from-red-500 to-red-700 rounded-l-md"></div>
        <VerifyingAccountMain email={email} />
        <div className="w-[8%] h-full bg-gradient-to-r from-red-500 to-red-700 rounded-r-md"></div>
      </div>
    </div>
  );
}

export default VerifyingAccount;

