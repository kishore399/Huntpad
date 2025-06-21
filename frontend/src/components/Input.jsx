

const Input = ({ Icon, ...props }) => {
  return (
    <div className="bg-slate-200 w-full rounded-lg hover:ring-1 hover:ring-violet-700 focus-within:ring-1 focus-within:ring-violet-700 flex items-center gap-2 p-2">
        <div>
            <Icon className="size-5 text-cyan-400"/>
        </div>
        <input {...props} className="ml-4 text-slate-700 w-full outline-none"/>
    </div>
  )
}

export default Input