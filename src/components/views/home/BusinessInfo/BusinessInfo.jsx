import GradientSubtitle from "@/components/common/GradientSubtitle"
import BusinessCard from "./BusinessInfoCard"

function BusinessInfo() {
  return (
    <div className="w-full flex flex-col justify-center my-20 sm:my-28">
      <GradientSubtitle text={"Donde nos encontrás"}/>
      <BusinessCard/>
    </div>
  )
}

export default BusinessInfo