import { useState } from 'react'

// Figma assets
import crossIcon from '../assets/figma/cross-icon.svg'
import minusIcon from '../assets/figma/minus-icon.svg'
import plusIcon from '../assets/figma/plus-icon.svg'
import chevronForward from '../assets/figma/chevron-forward.svg'
import chevronDropdown from '../assets/figma/chevron-dropdown.svg'
import toggleOff from '../assets/figma/toggle-off.svg'
import closeStrategies from '../assets/figma/close-strategies.svg'
import chevronStrategy from '../assets/figma/chevron-strategy.svg'
import dividerImg from '../assets/figma/divider.svg'

const strategies = ['Spreads', 'Butterflies', 'Iron Condors', 'Verticals']

// Bar chart data (monthly stock price trends)
const chartData = [
  { month: 'Jan', values: [174, 129] },
  { month: 'Feb', values: [142, 151] },
  { month: 'Mar', values: [162, 129] },
  { month: 'Apr', values: [151, 117] },
  { month: 'May', values: [169, 144] },
  { month: 'Jun', values: [154, 112] },
  { month: 'Jul', values: [129, 137] },
]

const maxBarHeight = 174

const lotsOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const OptionsTradeModal = ({ isOpen, onClose, option }) => {
  const [premiumPrice, setPremiumPrice] = useState(1)
  const [lots, setLots] = useState(3)
  const [advancedMode, setAdvancedMode] = useState(true)
  const [lotsDropdownOpen, setLotsDropdownOpen] = useState(false)
  const [showStrategies, setShowStrategies] = useState(false)

  if (!isOpen) return null

  const optionLabel = option
    ? `NIFTY ${option.strike} ${option.type} ${option.expiry}`
    : 'NIFTY 18500 CE Sept 2025'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center animate-slide-up">
        <div className="bg-white rounded-t-[50px] w-full max-w-[1148px] max-h-[90vh] overflow-y-auto px-10 py-12 lg:px-[100px]">

          {showStrategies ? (
            /* Advanced Strategies View */
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between p-5">
                <h2 className="text-gray-900 text-2xl tracking-wide">Advanced Strategies</h2>
                <button
                  onClick={() => setShowStrategies(false)}
                  className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
                >
                  <img src={closeStrategies} alt="Close" className="w-6 h-6" />
                </button>
              </div>
              {/* Divider */}
              <img src={dividerImg} alt="" className="w-full" />
              {/* Strategy Cards */}
              <div className="flex flex-col gap-4">
                {strategies.map((strategy) => (
                  <div
                    key={strategy}
                    className="bg-[#F9FAFB] border border-gray-100 rounded-[12px] p-5 flex items-center justify-between cursor-pointer hover:shadow-sm transition-shadow"
                  >
                    <span className="text-gray-500 text-xl tracking-wide">{strategy}</span>
                    <img src={chevronStrategy} alt="" className="w-6 h-6" />
                  </div>
                ))}
              </div>
            </div>
          ) : (

          <div className="flex flex-col gap-7 items-center">

            {/* Option Name Card */}
            <div className="bg-[#F9FAFB] border border-gray-100 rounded-[12px] p-5 flex items-center justify-between w-full">
              <p className="text-gray-900 text-xl tracking-wide">{optionLabel}</p>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              >
                <img src={crossIcon} alt="Close" className="w-10 h-10" />
              </button>
            </div>

            {/* Bar Chart Card */}
            <div
              className="w-full rounded-[40px] p-12 border border-black/5 overflow-hidden"
              style={{ background: 'linear-gradient(to bottom, #ffffff, #f6f6f6)' }}
            >
              <p className="mb-8">
                <span className="text-[#626262] text-xl font-medium">Y</span>
                <span className="text-[#626262] text-xl font-extrabold italic">Stock Price Trends</span>
              </p>
              {/* Bars */}
              <div className="flex items-end justify-between gap-1 mb-5" style={{ height: `${maxBarHeight}px` }}>
                {chartData.map((item, i) => (
                  <div key={i} className="flex items-end gap-1">
                    <div
                      className="w-6 rounded-t-sm bg-[#DBDBDB]"
                      style={{ height: `${item.values[0]}px` }}
                    />
                    <div
                      className="w-6 rounded-t-sm bg-primary"
                      style={{ height: `${item.values[1]}px` }}
                    />
                  </div>
                ))}
              </div>
              {/* Month Labels */}
              <div className="flex items-center justify-between px-2 text-[#A2B6B9] text-lg">
                {chartData.map((item, i) => (
                  <span key={i}>{item.month}</span>
                ))}
              </div>
            </div>

            {/* Buy / Sell Buttons */}
            <div className="flex gap-4 items-center w-[494px]">
              <button className="flex-1 bg-[#00AD65] text-white text-[22px] font-medium py-3 rounded-[10px] text-center hover:opacity-90 transition-opacity">
                Buy
              </button>
              <button className="flex-1 bg-[#FF6464] text-white text-[22px] font-medium py-3 rounded-[10px] text-center hover:opacity-90 transition-opacity">
                Sell
              </button>
            </div>

            {/* Advanced Strategies */}
            <button
              onClick={() => setShowStrategies(true)}
              className="bg-primary border border-primary rounded-[11px] p-7 flex items-center justify-between w-full hover:opacity-90 transition-opacity"
            >
              <span className="text-white text-2xl font-semibold tracking-wide">Advanced Strategies</span>
              <img src={chevronForward} alt="" className="w-6 h-6 rotate-90 brightness-0 invert" />
            </button>

            {/* Premium Price Input */}
            <div className="flex flex-col gap-1 w-full">
              <p className="text-[#0C0D34] text-xl font-medium">Premium price input</p>
              <div className="bg-[#F9FAFB] rounded-[12px] p-5 flex items-center justify-between">
                <button
                  onClick={() => setPremiumPrice((p) => Math.max(0, p - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                >
                  <img src={minusIcon} alt="Minus" className="w-10 h-10" />
                </button>
                <span className="text-[#0C0D34] text-[22px] font-medium">{premiumPrice}</span>
                <button
                  onClick={() => setPremiumPrice((p) => p + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                >
                  <img src={plusIcon} alt="Plus" className="w-10 h-10" />
                </button>
              </div>
            </div>

            {/* Lots */}
            <div className="flex flex-col gap-1 w-full relative">
              <p className="text-[#0C0D34] text-xl font-medium">lots</p>
              <button
                onClick={() => setLotsDropdownOpen(!lotsDropdownOpen)}
                className="bg-[#F9FAFB] rounded-[12px] p-5 flex items-center justify-between w-full text-left"
              >
                <span className="text-[#0C0D34] text-[22px] font-medium">{lots}</span>
                <img src={chevronDropdown} alt="" className="w-6 h-6 rotate-90" />
              </button>
              {lotsDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-[12px] shadow-lg z-10 mt-1 max-h-48 overflow-y-auto">
                  {lotsOptions.map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLots(l); setLotsDropdownOpen(false) }}
                      className={`w-full text-left px-5 py-3 text-lg hover:bg-gray-100 transition-colors ${lots === l ? 'bg-gray-50 font-medium text-primary' : 'text-gray-700'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Advanced Mode */}
            <div className="border border-gray-100 rounded-[22px] w-full">
              <div className="flex items-center justify-between px-5 py-2.5">
                <span className="text-gray-900 text-xl font-medium tracking-wide">Advanced Mode</span>
                <button
                  onClick={() => setAdvancedMode(!advancedMode)}
                  className={`w-11 h-6 rounded-full relative transition-colors ${advancedMode ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${advancedMode ? 'translate-x-5' : 'translate-x-0.5'}`}
                  />
                </button>
              </div>

              {/* Greeks Stats (visible when Advanced Mode is ON) */}
              {advancedMode && (
                <div className="border border-gray-100 rounded-[22px]">
                  <div className="bg-white rounded-b-[12px] px-4 py-1.5">
                    {[
                      { label: 'Delta', value: '300', bold: true },
                      { label: 'Gamma', value: '$82.92', bold: false },
                      { label: 'Theta', value: '8', bold: false },
                      { label: 'Vega', value: '$0.30', bold: true },
                    ].map((item, index) => (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between py-3 ${index < 3 ? 'border-b border-[#EBECEF]' : ''}`}
                      >
                        <span className="text-gray-500 text-[22px] tracking-wide">{item.label}</span>
                        <span className={`text-right text-xl tracking-wide ${item.bold ? 'text-[#383E4C] font-extrabold italic' : 'text-gray-900'}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          )}
        </div>
      </div>
    </>
  )
}

export default OptionsTradeModal
