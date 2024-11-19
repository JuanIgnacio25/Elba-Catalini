import SimplifiedViewCategories from "@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewCategories"
import FallbackSpinner from "@/components/common/FallbackSpinner/FallbackSpinner"

function SimplifiedViewMainFallback() {

  const handleCategoryChange = () => {

  }

  return (
    <div className="simplified-view">
      <SimplifiedViewCategories handleCategoryChange={handleCategoryChange}/>
      <div className="flex w-full  h-[200px] justify-center items-center">
        <FallbackSpinner/>
      </div>
    </div>
  )
}

export default SimplifiedViewMainFallback