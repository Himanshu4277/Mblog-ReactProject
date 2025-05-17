
function Button({
  children,
  type = 'button',
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button type={type} className={`p-2 ${bgColor} ${textColor} ${className}  rounded cursor-pointer`}{...props}>{children}</button>
  )
}

export default Button
