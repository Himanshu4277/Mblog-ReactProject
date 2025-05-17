import React, { useId, forwardRef } from 'react'

function Select({
    label,
    options,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''>{label}</label>}
            <select {...props} id={id} className={`${className} p-2 rounded bg-white text-black border border-gray-400 focus:bg-gray-50 duration-200 w-full`}>
                {options?.map((option) => {
                    return <option key={option} value={option}>{option}</option>
                })}
            </select>
        </div>

    )
}

export default forwardRef(Select)