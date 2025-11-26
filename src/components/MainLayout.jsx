const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#F0F4F8' }}>
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export default MainLayout

