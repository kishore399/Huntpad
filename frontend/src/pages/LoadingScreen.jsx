import { LoaderCircle } from "lucide-react"

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[url('/BackgroundVioletScenery.jpg')] bg-cover bg-center">
        <div className="flex flex-col items-center justify-center gap-8 w-screen h-screen backdrop-blur-lg">
            <LoaderCircle className="animate-spin scale-200 t text-purple-600" />
            <h1 className="font-semibold text-purple-300 text-md">Loading...</h1>
        </div>
    </div>
  )
}

export default LoadingScreen