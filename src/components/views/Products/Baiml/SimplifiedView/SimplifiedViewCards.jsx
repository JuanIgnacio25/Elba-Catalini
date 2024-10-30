import SimplifiedViewProductCard from "@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewProductCard"

function SimplifiedViewCards() {
  const products = [
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
    "FARO BAIML 1010E.A",
  ]

  return (
    <div className="simplified-view-cards-container">
      {products.map((prod,index) => {
        return <SimplifiedViewProductCard prod={prod} key={index}/>
      })}
    </div>
  )
}

export default SimplifiedViewCards