import FooterInfo from "./FooterInfo"
import FooterBottom from "./FooterBottom"

import { Separator } from "@/components/ui/separator"

function Footer() {
  return (
    <div className="flex justify-center bg-black py-10">
      <div className="w-11/12 sm:w-10/12">
        <FooterInfo/>
        <Separator decorative={true} orientation={"horizontal"} className=" h-[0.1px] mx-auto my-6 bg-gray-300/40"/>
        <FooterBottom/>
      </div>
    </div>
  )
}

export default Footer