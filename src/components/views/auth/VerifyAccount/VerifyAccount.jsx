import VerifyAccountMain from "@/components/views/auth/VerifyAccount/VerifyAccountMain";

function VerifyAccount() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[25vh] sm:h-[30vh] my-36 sm:my-24">
      <div className="flex items-center w-[95%] sm:w-[75%] lg:w-[60%] h-full bg-white shadow-md">
        <div className="w-[8%] h-full bg-gradient-to-b from-red-500 to-black rounded-l-md"></div>
        <VerifyAccountMain />
        <div className="w-[8%] h-full bg-gradient-to-b from-red-500 to-black rounded-r-md"></div>
      </div>
    </div>
  );
}

export default VerifyAccount;
