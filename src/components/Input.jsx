import { useId } from "react"
import { forwardRef } from "react"

const input = forwardRef(function ({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return <div className="w-full">
        {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label>}
        <input ref={ref} {...props} id={id} className={`${className} p-2 rounded bg-white text-black border border-gray-400 w-full focus:bg-gray-50 duration-200`} type={type} />
    </div>
})

export default input
