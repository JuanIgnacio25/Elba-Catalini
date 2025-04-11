import SendRecoveryTokenMain from "@/components/views/auth/SendRecoveryToken/SendRecoveryTokenMain";

function SendRecoveryToken() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[35vh] my-28 sm:my-24">
      <div className="flex flex-row justify-start items-center w-[95%] sm:w-[80%] lg:w-[60%] min-h-full bg-white">
        <div className="w-[8%] h-full bg-gradient-to-b from-red-500 to-black rounded-l-md"></div>
        <SendRecoveryTokenMain />
        <div className="w-[8%] h-full bg-gradient-to-b from-red-500 to-black rounded-r-md"></div>
      </div>
    </div>
  );
}

export default SendRecoveryToken;
