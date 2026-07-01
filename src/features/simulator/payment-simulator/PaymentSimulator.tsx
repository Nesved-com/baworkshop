import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Smartphone, CreditCard, Building2, Calendar, Wallet, ShoppingBag,
  ChevronRight, CheckCircle2, Shield, Lock, RefreshCw, X, Info,
  ArrowLeft, Zap, AlertCircle, Star
} from 'lucide-react'
import type { PaymentMethod } from '../../../types'
import { SectionHeader } from '../business-problem/BusinessProblem'
import { SectionBanner } from '../../../components/ui/SectionBanner'

interface Props { onNext: () => void }

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: React.ReactNode; color: string; badge?: string; desc: string }[] = [
  { id: 'upi', label: 'UPI', icon: <Smartphone className="w-5 h-5" />, color: '#0d8fe6', badge: 'Instant', desc: 'Pay via UPI ID or QR Code' },
  { id: 'card', label: 'Card', icon: <CreditCard className="w-5 h-5" />, color: '#8b5cf6', desc: 'Credit / Debit Card' },
  { id: 'netbanking', label: 'Net Banking', icon: <Building2 className="w-5 h-5" />, color: '#10b981', desc: 'All major banks supported' },
  { id: 'emi', label: 'EMI', icon: <Calendar className="w-5 h-5" />, color: '#f59e0b', badge: 'No-Cost', desc: 'Easy monthly instalments' },
  { id: 'wallet', label: 'Wallet', icon: <Wallet className="w-5 h-5" />, color: '#ef4444', desc: 'ShopEase Wallet balance' },
  { id: 'bnpl', label: 'Buy Now Pay Later', icon: <ShoppingBag className="w-5 h-5" />, color: '#06b6d4', badge: 'New', desc: 'Pay within 30 days, 0% interest' },
]

const ORDER = { items: [{ name: 'Sony WH-1000XM5 Headphones', qty: 1, price: 24990 }, { name: 'Phone Case', qty: 2, price: 299 }], discount: 500 }
const TOTAL = ORDER.items.reduce((s, i) => s + i.price * i.qty, 0) - ORDER.discount

export function PaymentSimulator({ onNext }: Props) {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>('upi')
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle')
  const [baNote, setBaNote] = useState('')
  const [savedNotes, setSavedNotes] = useState<Partial<Record<PaymentMethod, string>>>({})
  const [showBAPanel, setShowBAPanel] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const handlePay = () => {
    setPaymentState('processing')
    setAttempts(a => a + 1)
    setTimeout(() => {
      // Simulate 80% success rate
      const success = attempts === 0 || Math.random() > 0.3
      setPaymentState(success ? 'success' : 'failed')
    }, 2200)
  }

  const handleRetry = () => {
    setPaymentState('idle')
  }

  const handleReset = () => {
    setPaymentState('idle')
    setAttempts(0)
  }

  const saveNote = () => {
    if (baNote.trim()) {
      setSavedNotes(prev => ({ ...prev, [activeMethod]: baNote }))
      setBaNote('')
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <SectionHeader
        icon={<CreditCard className="w-5 h-5" />}
        title="Payment Screen Simulator"
        subtitle="Experience the To-Be payment portal as a customer — then document requirements as a BA"
      />
      <SectionBanner
        color="violet"
        time="12 min"
        what="This simulator puts you in the customer's shoes. A great BA doesn't just write requirements from a meeting room — they experience the product, observe what data is needed, what can go wrong, and what the user expects at every step."
        why="Every field you see in a payment form is a requirement. Every error message, every timeout, every success screen — a BA must define all of these. If the BA doesn't specify them, the developer will guess — and the customer will suffer."
        tip="Guide students: 'Try each payment tab — note what inputs are required, what the success message says, and what happens on failure. You will use these observations to write your BRD, User Stories, and Acceptance Criteria in the next steps.'"
      />

      {/* Instruction banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-2xl p-4 mb-6"
      >
        <Info className="w-4 h-4 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-brand-800 dark:text-brand-200">
          <strong>BA Mode:</strong> Experience each payment method as a customer first, then use the <strong>BA Notes panel</strong> to document requirements for that method.
          Click the <strong>📋 BA Notes</strong> button to capture your analysis.
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* ─── LEFT: CHECKOUT MOCK UI ─────────────────────────── */}
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-premium overflow-hidden">
            {/* Checkout header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">ShopEase Checkout</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Secure Payment Portal</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">256-bit SSL</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Payment methods panel */}
              <div className="flex-1 p-6">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Select Payment Method
                </p>

                {/* Method tabs */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                  {PAYMENT_METHODS.map(method => (
                    <button
                      key={method.id}
                      onClick={() => { setActiveMethod(method.id); handleReset() }}
                      className={`relative flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 transition-all duration-200 ${
                        activeMethod === method.id
                          ? 'border-current shadow-lg scale-105'
                          : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-gray-900'
                      }`}
                      style={activeMethod === method.id ? { borderColor: method.color, backgroundColor: `${method.color}10` } : {}}
                    >
                      {method.badge && (
                        <span
                          className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded-full text-white text-[10px] font-bold"
                          style={{ backgroundColor: method.color }}
                        >
                          {method.badge}
                        </span>
                      )}
                      <span style={{ color: activeMethod === method.id ? method.color : undefined }}
                        className={activeMethod === method.id ? '' : 'text-gray-500 dark:text-gray-400'}>
                        {method.icon}
                      </span>
                      <span className={`text-xs font-semibold leading-tight text-center ${
                        activeMethod === method.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {method.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Payment form */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMethod}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                  >
                    {paymentState === 'idle' && <PaymentForm method={activeMethod} onPay={handlePay} />}
                    {paymentState === 'processing' && <ProcessingState method={activeMethod} />}
                    {paymentState === 'success' && <SuccessState onReset={handleReset} />}
                    {paymentState === 'failed' && <FailedState onRetry={handleRetry} onSwitch={() => { handleReset(); setActiveMethod('upi') }} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Order summary sidebar */}
              <div className="w-full md:w-60 bg-gray-50 dark:bg-gray-800/50 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 p-5 flex-shrink-0">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Order Summary</p>
                <div className="space-y-3 mb-4">
                  {ORDER.items.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{i === 0 ? '🎧' : '📱'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-tight line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{(TOTAL + ORDER.discount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span>-₹{ORDER.discount}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Delivery</span>
                    <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total</span>
                    <span>₹{TOTAL.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Shield className="w-3 h-3" />
                    <span>PCI-DSS Secured</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>RBI Compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png"
                  className="h-4 opacity-60" alt="UPI" onError={e => { e.currentTarget.style.display = 'none' }} />
                <span>|</span>
                <span className="font-semibold text-gray-500">VISA</span>
                <span>|</span>
                <span className="font-semibold text-gray-500">RuPay</span>
                <span>|</span>
                <span className="font-semibold text-gray-500">Mastercard</span>
              </div>
              <div className="ml-auto text-xs text-gray-400">Powered by ShopEase Pay</div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: BA PANEL ──────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Method info card */}
          <MethodInfoCard method={activeMethod} />

          {/* BA Notes */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">📋</span>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">BA Requirements Notes</p>
              <span className="ml-auto text-xs font-semibold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-2 py-0.5 rounded-lg">
                {PAYMENT_METHODS.find(m => m.id === activeMethod)?.label}
              </span>
            </div>
            <textarea
              value={baNote}
              onChange={e => setBaNote(e.target.value)}
              placeholder={`Document your BA requirements for ${PAYMENT_METHODS.find(m => m.id === activeMethod)?.label} here...\n\nE.g.:\n• What inputs does the customer provide?\n• What validations are needed?\n• What are the success/failure scenarios?\n• What business rules apply?`}
              className="w-full h-36 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400 dark:placeholder-gray-600"
            />
            <button
              onClick={saveNote}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Save BA Note for {PAYMENT_METHODS.find(m => m.id === activeMethod)?.label}
            </button>
          </div>

          {/* Saved notes */}
          {Object.keys(savedNotes).length > 0 && (
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
                ✅ Saved BA Notes ({Object.keys(savedNotes).length} methods)
              </p>
              {Object.entries(savedNotes).map(([method, note]) => (
                <div key={method} className="mb-3 last:mb-0">
                  <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-200 capitalize mb-1">
                    {PAYMENT_METHODS.find(m => m.id === method)?.label}
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 line-clamp-2">{note}</p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={onNext}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold px-6 py-3.5 rounded-2xl shadow-glow transition-all hover:scale-105 text-sm"
          >
            Next: Build BRD
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── PAYMENT FORMS ──────────────────────────────────────────────────────────

function PaymentForm({ method, onPay }: { method: PaymentMethod; onPay: () => void }) {
  const [upiId, setUpiId] = useState('')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [bank, setBank] = useState('HDFC Bank')
  const [emiBank, setEmiBank] = useState('HDFC Bank')
  const [emiTenure, setEmiTenure] = useState('12')

  const amount = 25088
  const emiAmount = Math.round(amount / parseInt(emiTenure))

  if (method === 'upi') return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Enter UPI ID</label>
          <div className="relative">
            <input value={upiId} onChange={e => setUpiId(e.target.value)}
              placeholder="yourname@upi"
              className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-800 dark:text-gray-200" />
            <Smartphone className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-center">
        <div className="w-20 h-20 bg-gray-900 dark:bg-white rounded-xl mx-auto mb-2 flex items-center justify-center">
          <div className="grid grid-cols-5 gap-0.5 p-2">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-sm ${Math.random() > 0.5 ? 'bg-white dark:bg-gray-900' : 'bg-gray-900 dark:bg-white'}`} />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">Or scan QR code with any UPI app</p>
        <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mt-1">shopease@razorpay</p>
      </div>
      <PayButton label="Verify & Pay ₹25,088" color="#0d8fe6" onClick={onPay} disabled={!upiId && true} />
    </div>
  )

  if (method === 'card') return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Card Number</label>
        <input value={cardNum} onChange={e => setCardNum(e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim())}
          placeholder="1234 5678 9012 3456" maxLength={19}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200" />
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Cardholder Name</label>
        <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name as on card"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Expiry (MM/YY)</label>
          <input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="12/27" maxLength={5}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">CVV</label>
          <input value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/,'').slice(0,3))} placeholder="•••" maxLength={3} type="password"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 dark:text-gray-200" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
        <Lock className="w-3 h-3" />
        <span>OTP will be sent to your registered mobile for 2FA (RBI mandated)</span>
      </div>
      <PayButton label="Pay Securely ₹25,088" color="#8b5cf6" onClick={onPay} />
    </div>
  )

  if (method === 'netbanking') return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">Select Your Bank</label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak', 'Yes Bank'].map(b => (
            <button key={b} onClick={() => setBank(b)}
              className={`py-2.5 px-3 rounded-xl border-2 text-xs font-semibold transition-all ${bank === b
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                : 'border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-200 dark:hover:border-gray-600'
              }`}>
              {b}
            </button>
          ))}
        </div>
        <select value={bank} onChange={e => setBank(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
          <option>Or choose from all 50+ banks...</option>
          {['Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'IndusInd Bank', 'Federal Bank'].map(b =>
            <option key={b}>{b}</option>
          )}
        </select>
      </div>
      <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        You will be redirected to {bank}'s secure portal to login and confirm payment
      </div>
      <PayButton label={`Continue to ${bank}`} color="#10b981" onClick={onPay} />
    </div>
  )

  if (method === 'emi') return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">Select Bank for EMI</label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {['HDFC Bank', 'ICICI Bank', 'SBI Card', 'Axis Bank', 'Kotak', 'Bajaj'].map(b => (
            <button key={b} onClick={() => setEmiBank(b)}
              className={`py-2.5 px-2 rounded-xl border-2 text-xs font-semibold transition-all ${emiBank === b
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300'
                : 'border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-200'
              }`}>
              {b}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 block">Choose Tenure</label>
        <div className="grid grid-cols-4 gap-2">
          {['3', '6', '12', '24'].map(t => (
            <button key={t} onClick={() => setEmiTenure(t)}
              className={`py-3 rounded-xl border-2 text-center transition-all ${emiTenure === t
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30'
                : 'border-gray-100 dark:border-gray-700 hover:border-gray-200'
              }`}>
              <p className={`text-sm font-bold ${emiTenure === t ? 'text-amber-700 dark:text-amber-300' : 'text-gray-900 dark:text-white'}`}>{t}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">months</p>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Monthly Instalment</p>
            <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">₹{emiAmount.toLocaleString('en-IN')}</p>
            <p className="text-xs text-amber-600 dark:text-amber-400">× {emiTenure} months = ₹{amount.toLocaleString('en-IN')}</p>
          </div>
          <div className="text-right">
            <span className="inline-block bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg">No-Cost</span>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">0% interest</p>
          </div>
        </div>
      </div>
      <PayButton label={`Confirm ₹${emiAmount.toLocaleString('en-IN')}/month × ${emiTenure}`} color="#f59e0b" onClick={onPay} />
    </div>
  )

  if (method === 'wallet') return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl p-5 text-white">
        <p className="text-xs text-rose-100 mb-1">ShopEase Wallet Balance</p>
        <p className="text-3xl font-bold">₹1,250.00</p>
        <p className="text-xs text-rose-200 mt-1">Sufficient balance ✓</p>
      </div>
      <div className="bg-rose-50 dark:bg-rose-950/30 rounded-xl p-3 text-xs text-rose-700 dark:text-rose-300 space-y-1">
        <p>• ₹25,088 will be deducted from wallet</p>
        <p className="text-rose-500 dark:text-rose-400 font-semibold">⚠ Insufficient balance — ₹23,838 short</p>
        <p>• Combine with UPI or card to pay remaining</p>
      </div>
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Pay remaining ₹23,838 via UPI</label>
        <input placeholder="yourname@upi"
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-800 dark:text-gray-200" />
      </div>
      <PayButton label="Pay ₹1,250 Wallet + ₹23,838 UPI" color="#ef4444" onClick={onPay} />
    </div>
  )

  if (method === 'bnpl') return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-cyan-500 to-brand-600 rounded-2xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5" />
          <p className="font-bold">Buy Now, Pay Later</p>
        </div>
        <p className="text-cyan-100 text-xs mb-3">Pay ₹0 today. Repay within 30 days.</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/20 rounded-xl p-2.5 text-center">
            <p className="text-xl font-bold">₹0</p>
            <p className="text-xs text-cyan-200">Pay Now</p>
          </div>
          <div className="bg-white/20 rounded-xl p-2.5 text-center">
            <p className="text-xl font-bold">₹25,088</p>
            <p className="text-xs text-cyan-200">Pay by {new Date(Date.now() + 30 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-xs">
        {['0% interest for 30 days', 'Auto-debit on due date (optional)', 'No hidden charges', 'Instant approval — no paperwork'].map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            {f}
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
        ✓ Credit limit available: ₹50,000 &nbsp;|&nbsp; ✓ KYC verified
      </div>
      <PayButton label="Confirm BNPL — Pay Later" color="#06b6d4" onClick={onPay} />
    </div>
  )

  return null
}

function PayButton({ label, color, onClick, disabled }: { label: string; color: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-full py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      style={{ backgroundColor: color, boxShadow: `0 4px 20px ${color}40` }}>
      <Lock className="w-4 h-4" />
      {label}
    </button>
  )
}

function ProcessingState({ method }: { method: PaymentMethod }) {
  const labels: Partial<Record<PaymentMethod, string>> = {
    upi: 'Waiting for UPI app approval…',
    card: 'Sending OTP to registered mobile…',
    netbanking: 'Redirecting to bank portal…',
    emi: 'Setting up EMI with bank…',
    wallet: 'Deducting from wallet…',
    bnpl: 'Checking BNPL credit limit…',
  }
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-5">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-brand-100 dark:border-brand-900 border-t-brand-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="w-6 h-6 text-brand-500" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Processing Payment</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{labels[method]}</p>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="w-2 h-2 rounded-full bg-brand-400"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }} />
        ))}
      </div>
    </div>
  )
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-10 gap-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
        className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
        <CheckCircle2 className="w-9 h-9 text-emerald-500" />
      </motion.div>
      <div className="text-center">
        <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">Payment Successful!</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Order #SE-284756 confirmed</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Confirmation sent to rahul@email.com</p>
      </div>
      <div className="w-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 space-y-1.5">
        <div className="flex justify-between text-xs"><span className="text-gray-500">Amount Paid</span><span className="font-semibold text-gray-900 dark:text-white">₹25,088</span></div>
        <div className="flex justify-between text-xs"><span className="text-gray-500">Transaction ID</span><span className="font-mono text-gray-600 dark:text-gray-400">TXN8472635</span></div>
        <div className="flex justify-between text-xs"><span className="text-gray-500">Estimated Delivery</span><span className="font-semibold text-emerald-600">2-3 days</span></div>
      </div>
      <button onClick={onReset}
        className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
        <RefreshCw className="w-3 h-3" /> Try another payment method
      </button>
    </motion.div>
  )
}

function FailedState({ onRetry, onSwitch }: { onRetry: () => void; onSwitch: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-10 gap-4">
      <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900 flex items-center justify-center">
        <X className="w-8 h-8 text-rose-500" />
      </div>
      <div className="text-center">
        <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">Payment Failed</p>
        <p className="text-sm text-rose-600 dark:text-rose-400">Transaction declined by bank</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Your account has NOT been charged</p>
      </div>
      <div className="w-full bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-4 space-y-1">
        <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">Possible reasons:</p>
        <p className="text-xs text-rose-600 dark:text-rose-400">• Incorrect card details</p>
        <p className="text-xs text-rose-600 dark:text-rose-400">• Insufficient funds</p>
        <p className="text-xs text-rose-600 dark:text-rose-400">• Bank server temporarily unavailable</p>
      </div>
      <div className="flex gap-3 w-full">
        <button onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
        <button onClick={onSwitch}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors">
          Try UPI <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── METHOD INFO CARD ────────────────────────────────────────────────────────

const METHOD_INFO: Record<PaymentMethod, { flow: string[]; rules: string[]; inputs: string[] }> = {
  upi: {
    flow: ['Customer enters UPI ID or scans QR', 'System sends payment request to NPCI', 'Customer approves on UPI app', 'NPCI confirms & notifies ShopEase'],
    rules: ['UPI timeout: 5 minutes (NPCI standard)', 'Max UPI amount: ₹1 lakh per transaction', 'Real-time — no settlement delay'],
    inputs: ['UPI Virtual Payment Address (VPA)', 'Or: QR code scan'],
  },
  card: {
    flow: ['Customer enters card number, expiry, CVV', 'System sends to payment gateway', 'Bank sends OTP (2FA — RBI mandate)', 'Bank authorizes → order confirmed'],
    rules: ['OTP mandatory for CNP > ₹5,000 (RBI)', 'CVV must NOT be stored (PCI-DSS)', 'Max 3 OTP attempts before card lock'],
    inputs: ['16-digit card number', 'Expiry (MM/YY)', 'CVV (3-4 digits)', 'OTP (via SMS)'],
  },
  netbanking: {
    flow: ['Customer selects bank', 'Redirected to bank\'s secure portal', 'Customer logs in & confirms', 'Bank redirects back to ShopEase'],
    rules: ['ShopEase cannot access bank login credentials', 'Session data preserved during redirect', 'Redirect must happen within 2 seconds'],
    inputs: ['Bank selection', 'Bank username & password (on bank portal)'],
  },
  emi: {
    flow: ['Customer selects bank & tenure', 'System checks eligibility via bank API', 'Customer sees monthly EMI amount', 'EMI plan created after card auth'],
    rules: ['Minimum order: ₹3,000 for EMI', 'EMI eligibility: bank-determined', 'No-cost EMI: ShopEase absorbs interest'],
    inputs: ['Bank selection', 'Tenure (3/6/9/12/24 months)', 'Card details for authentication'],
  },
  wallet: {
    flow: ['System shows wallet balance', 'Customer confirms payment', 'Balance deducted instantly', 'Order confirmed in < 1 second'],
    rules: ['Max wallet balance: ₹10,000 (RBI prepaid limit)', 'No OTP needed for wallet payment', 'Partial wallet + other method allowed'],
    inputs: ['Wallet PIN or biometric (optional)', 'UPI/Card for remaining amount if insufficient'],
  },
  bnpl: {
    flow: ['System checks BNPL credit limit', 'Customer confirms deferred payment', 'Order placed — ₹0 charged now', 'Auto-reminder 5 days before due date'],
    rules: ['Max BNPL limit: ₹50,000 (partner set)', 'KYC verification required first time', '30-day repayment window', 'Late fee applies after due date'],
    inputs: ['KYC verification (one-time)', 'Mobile OTP to confirm BNPL'],
  },
}

function MethodInfoCard({ method }: { method: PaymentMethod }) {
  const info = METHOD_INFO[method]
  const pm = PAYMENT_METHODS.find(m => m.id === method)!

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl" style={{ backgroundColor: `${pm.color}15`, color: pm.color }}>
          {pm.icon}
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white text-sm">{pm.label} — BA Analysis</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{pm.desc}</p>
        </div>
      </div>

      <InfoSection title="Payment Flow" icon="🔄" items={info.flow} />
      <InfoSection title="Business Rules" icon="📋" items={info.rules} />
      <InfoSection title="Required Inputs" icon="✍️" items={info.inputs} />
    </div>
  )
}

function InfoSection({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">{icon} {title}</p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
