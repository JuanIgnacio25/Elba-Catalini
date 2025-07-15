
function GradientSubtitle({text}) {
  return (
    <div className="w-full flex justify-center">
    <h2 className="text-3xl md:text-[2.50rem] md:leading-[3rem] text-center font-medium text-transparent bg-clip-text bg-[linear-gradient(to_right,theme(colors.red.600)_0%,theme(colors.red.700)_25%,theme(colors.red.800)_55%,theme(colors.red.950)_70%,theme(colors.black)_100%)]">
      {text}
    </h2>
    </div>
  )
}

export default GradientSubtitle