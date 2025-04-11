import PasswordRecoveryMain from "@/components/views/auth/PasswordRecovery/PasswordRecoveryMain";

function PasswordRecovery() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[51vh] sm:h-[59vh] my-24">
      <div className="flex flex-row w-full h-full max-w-[95vw] sm:max-w-[85vw] md:max-w-[75vw] lg:max-w-[52vw] bg-white">
        <div className="w-[8%] bg-gradient-to-t from-gray-800 to-red-600 rounded-l-md"></div>    
          <PasswordRecoveryMain />
        <div className="w-[8%] bg-gradient-to-t from-gray-800 to-red-600 rounded-r-md"></div>
      </div>
    </div>
  );
}

export default PasswordRecovery;