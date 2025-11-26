const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-[30px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-variant',
    secondary: 'bg-white text-text-primary-dark hover:bg-gray-50 border border-gray-200',
    outline: 'bg-transparent text-primary border-2 border-primary hover:bg-primary/10',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

