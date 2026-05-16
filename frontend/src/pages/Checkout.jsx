import { useEffect, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../api/axios'
import OrderPlacedPopup from '../components/checkout/OrderPlacedPopup'
import CouponPopup from '../components/checkout/CouponPopup'
import DummyPaymentModal from '../components/checkout/DummyPaymentModal'
import { toast } from 'react-toastify'
import { clearCart } from '../store/slices/cartSlice'
import { paymentMethodLabel } from '../utils/orderStatus'
import {
  isValidUpiId,
  isValidCardNumber,
  isValidCardExpiry,
  isValidCvv,
  isValidCardholderName,
  NETBANKING_BANKS,
  EMI_TENURES,
  digitsOnly,
  maskUpiForDisplay,
  cardBrandFromPan
} from '../utils/paymentValidation'

export default function Checkout() {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { cart } = useSelector(
    (state) => state.cart
  )

  const items = cart?.items || []

  const [addresses, setAddresses] =
    useState([])

  const [selectedAddress, setSelectedAddress] =
    useState(null)

  const [paymentMethod, setPaymentMethod] =
    useState('')

  const [placing, setPlacing] =
    useState(false)

  const [couponCode, setCouponCode] =
    useState('')

  const [discount, setDiscount] =
    useState(0)

  const [couponApplied, setCouponApplied] =
    useState(false)

  const [showCouponPopup, setShowCouponPopup] =
    useState(false)

  const [showRewardModal, setShowRewardModal] =
    useState(false)

  const [dummyPayOpen, setDummyPayOpen] = useState(false)

  const [upiId, setUpiId] = useState('')

  const [cardNumber, setCardNumber] = useState('')

  const [cardName, setCardName] = useState('')

  const [cardExpiry, setCardExpiry] = useState('')

  const [cardCvv, setCardCvv] = useState('')

  const [netbankBankId, setNetbankBankId] = useState('')

  const [emiMonths, setEmiMonths] = useState('')

  const [codAcknowledged, setCodAcknowledged] = useState(false)

  const [paySessionRef, setPaySessionRef] = useState('')

  const [createdOrderId, setCreatedOrderId] = useState(null)

  useEffect(() => {
    setCodAcknowledged(false)
    setUpiId('')
    setCardNumber('')
    setCardName('')
    setCardExpiry('')
    setCardCvv('')
    setNetbankBankId('')
    setEmiMonths('')
  }, [paymentMethod])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/auth/profile')
        const userAddresses = data.user?.addresses || []
        setAddresses(userAddresses)
        if (userAddresses.length > 0) {
          setSelectedAddress(userAddresses[0])
        }
      } catch (err) {
        setAddresses([])
      }
    }
    fetchProfile()
  }, [])

  const subtotal = items.reduce(

    (acc, item) => {

      const price =
        item.product?.discountPrice > 0
          ? item.product.discountPrice
          : item.product?.price || 0

      return (
        acc + price * item.quantity
      )

    },

    0
  )

  const shipping =
    subtotal > 999 ? 0 : 99

  const total =
    subtotal + shipping - discount

  const applyCoupon = async () => {

    if (!couponCode) {

      toast.error(
        'Please enter coupon code'
      )

      return

    }

    const code =
      couponCode.trim().toUpperCase()

    try {

      const { data } = await axios.get(
        `/coupons/validate/${code}`,
        {
          params: {
            amount: subtotal
          }
        }
      )

      if (!data?.success) {

        toast.error(
          data?.message ||
          'Invalid coupon'
        )

        return

      }

      const discountAmount =
        Number(
          data?.coupon?.discountValue
        ) || 0

      setDiscount(discountAmount)

      setCouponApplied(true)

      setShowCouponPopup(true)

      toast.success(
        '🎉 Coupon applied successfully'
      )

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        'Invalid or expired coupon'
      )

    }

  }

  const submitOrder = useCallback(async () => {
    setPlacing(true)
    try {
      const { data } = await axios.post('/orders', {
        shippingAddress: selectedAddress,
        paymentMethod,
        couponCode: couponApplied ? couponCode.trim().toUpperCase() : undefined
      })
      setCreatedOrderId(data.order?._id || data.orderId)
      await dispatch(clearCart())
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setShowRewardModal(true)
      setTimeout(() => {
        navigate('/orders')
      }, 3500)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order')
    } finally {
      setPlacing(false)
    }
  }, [selectedAddress, paymentMethod, couponApplied, couponCode, dispatch, navigate])

  const paymentDetailsValid = useMemo(() => {
    if (!paymentMethod) return false
    if (paymentMethod === 'cod') return codAcknowledged
    if (paymentMethod === 'upi') return isValidUpiId(upiId)
    if (paymentMethod === 'card') {
      return (
        isValidCardNumber(cardNumber) &&
        isValidCardExpiry(cardExpiry) &&
        isValidCvv(cardCvv) &&
        isValidCardholderName(cardName)
      )
    }
    if (paymentMethod === 'netbanking') return Boolean(netbankBankId)
    if (paymentMethod === 'emi') return Boolean(emiMonths)
    return false
  }, [
    paymentMethod,
    codAcknowledged,
    upiId,
    cardNumber,
    cardExpiry,
    cardCvv,
    cardName,
    netbankBankId,
    emiMonths
  ])

  const startCheckout = () => {
    if (!selectedAddress) {
      toast.error('Please add a delivery address first')
      return
    }
    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }
    if (!paymentDetailsValid) {
      toast.error('Please enter valid payment details for the selected method')
      return
    }
    const needsDummyPay = ['upi', 'card', 'netbanking', 'emi'].includes(paymentMethod)
    if (needsDummyPay) {
      setPaySessionRef(`RMPAY${Date.now().toString(36).toUpperCase().slice(-10)}`)
      setDummyPayOpen(true)
      return
    }
    void submitOrder()
  }

  const handleDummyPayComplete = useCallback(() => {
    setDummyPayOpen(false)
    void submitOrder()
  }, [submitOrder])

  const dummyPayMeta = useMemo(() => {
    if (paymentMethod === 'upi') {
      return { payMode: 'upi', payerSummary: maskUpiForDisplay(upiId) }
    }
    if (paymentMethod === 'card') {
      const d = digitsOnly(cardNumber)
      return {
        payMode: 'card',
        payerSummary: `${cardBrandFromPan(cardNumber)} · ending ${d.slice(-4)}`
      }
    }
    if (paymentMethod === 'netbanking') {
      const b = NETBANKING_BANKS.find((x) => x.id === netbankBankId)
      return { payMode: 'netbanking', payerSummary: b?.label || '' }
    }
    if (paymentMethod === 'emi') {
      const e = EMI_TENURES.find((x) => String(x.months) === emiMonths)
      return { payMode: 'emi', payerSummary: e ? `${e.label} EMI` : '' }
    }
    return { payMode: '', payerSummary: '' }
  }, [paymentMethod, upiId, cardNumber, netbankBankId, emiMonths])

  return (

    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-10 px-4">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* LEFT */}

        <div className="lg:col-span-2 space-y-8">

          {/* ADDRESS */}

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Delivery Address
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Select your delivery address
                </p>

              </div>

              <button
                onClick={() =>
                  navigate('/profile')
                }
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-medium shadow-lg hover:scale-[1.02] transition"
              >

                Add Address

              </button>

            </div>

            {addresses.length === 0 ? (

              <div className="border border-red-300 bg-red-50 rounded-2xl p-6">

                <h3 className="text-red-600 font-bold text-lg">

                  No Delivery Address Found

                </h3>

                <p className="text-red-500 text-sm mt-2">

                  Please add a delivery address before placing your order.

                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {addresses.map((addr) => (

                  <button
                    key={addr._id}
                    onClick={() =>
                      setSelectedAddress(addr)
                    }
                    className={`w-full text-left p-5 rounded-2xl border transition ${
                      selectedAddress?._id ===
                      addr._id
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-emerald-300'
                    }`}
                  >

                    <p className="font-bold text-gray-800">

                      {addr.name}
                      {' '}
                      •
                      {' '}
                      {addr.phone}

                    </p>

                    <p className="text-gray-500 mt-1">

                      {addr.address},
                      {' '}
                      {addr.city},
                      {' '}
                      {addr.state}
                      {' '}
                      -
                      {' '}
                      {addr.pincode}

                    </p>

                  </button>

                ))}

              </div>

            )}

          </div>

          {/* PAYMENT */}

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

            <h2 className="text-2xl font-bold text-gray-800 mb-1">

              Payment Method

            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Demo gateway — same steps as a live checkout (validation + secure sheet). No real charge, no Razorpay account needed.
            </p>

            <div className="space-y-4">

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`w-full p-5 rounded-2xl border text-left transition ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-emerald-200'
                }`}
              >
                <p className="font-semibold text-gray-900">Cash on Delivery</p>
                <p className="text-sm text-gray-500 mt-1">Pay with cash when your order arrives</p>
              </button>

              {paymentMethod === 'cod' && (
                <label className="flex items-start gap-3 p-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={codAcknowledged}
                    onChange={(e) => setCodAcknowledged(e.target.checked)}
                  />
                  <span className="text-sm text-gray-800">
                    I understand cash payment is due at delivery and I will keep exact change if possible.
                  </span>
                </label>
              )}

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`w-full p-5 rounded-2xl border text-left transition ${
                  paymentMethod === 'upi'
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-emerald-200'
                }`}
              >
                <p className="font-semibold text-gray-900">UPI</p>
                <p className="text-sm text-gray-500 mt-1">Google Pay, PhonePe, Paytm, BHIM — demo flow</p>
              </button>

              {paymentMethod === 'upi' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                  <label className="block text-sm font-medium text-gray-800">UPI ID (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value.trim())}
                    placeholder="yourname@paytm"
                    autoComplete="off"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500">Format: username@bank or username@ybl — required before checkout.</p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-5 rounded-2xl border text-left transition ${
                  paymentMethod === 'card'
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-emerald-200'
                }`}
              >
                <p className="font-semibold text-gray-900">Credit / Debit card</p>
                <p className="text-sm text-gray-500 mt-1">Visa, Mastercard, RuPay — validated demo (no charge)</p>
              </button>

              {paymentMethod === 'card' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Card number</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => {
                        const d = digitsOnly(e.target.value).slice(0, 16)
                        const spaced = d.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
                        setCardNumber(spaced)
                      }}
                      placeholder="4111 1111 1111 1111"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 font-mono tracking-wider"
                    />
                    <p className="text-xs text-gray-500 mt-1">Demo: 4111 1111 1111 1111 passes validation (Luhn).</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-1">Name on card</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="As printed on card"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">Valid thru (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1">CVV</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(digitsOnly(e.target.value).slice(0, 4))}
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`w-full p-5 rounded-2xl border text-left transition ${
                  paymentMethod === 'netbanking'
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-emerald-200'
                }`}
              >
                <p className="font-semibold text-gray-900">Net banking</p>
                <p className="text-sm text-gray-500 mt-1">Pay from your bank account — demo</p>
              </button>

              {paymentMethod === 'netbanking' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
                  <label className="block text-sm font-medium text-gray-800">Select bank</label>
                  <select
                    value={netbankBankId}
                    onChange={(e) => setNetbankBankId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  >
                    <option value="">Choose your bank</option>
                    {NETBANKING_BANKS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={() => setPaymentMethod('emi')}
                className={`w-full p-5 rounded-2xl border text-left transition ${
                  paymentMethod === 'emi'
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-emerald-200'
                }`}
              >
                <p className="font-semibold text-gray-900">EMI</p>
                <p className="text-sm text-gray-500 mt-1">Split into monthly instalments — demo</p>
              </button>

              {paymentMethod === 'emi' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
                  <label className="block text-sm font-medium text-gray-800">Tenure</label>
                  <select
                    value={emiMonths}
                    onChange={(e) => setEmiMonths(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  >
                    <option value="">Select tenure</option>
                    {EMI_TENURES.map((e) => (
                      <option key={e.months} value={String(e.months)}>
                        {e.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div>

          <div className="sticky top-24 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">

              Order Summary

            </h2>

            <div className="space-y-4">

              {items.map((item) => {

                const price =
                  item.product?.discountPrice > 0
                    ? item.product.discountPrice
                    : item.product?.price || 0

                return (

                  <div
                    key={item._id}
                    className="flex justify-between"
                  >

                    <div>

                      <p className="font-medium text-gray-800">

                        {item.product?.name}

                      </p>

                      <p className="text-sm text-gray-500">

                        Qty:
                        {' '}
                        {item.quantity}

                      </p>

                    </div>

                    <p className="font-semibold text-gray-800">

                      ₹
                      {(
                        price *
                        item.quantity
                      ).toLocaleString()}

                    </p>

                  </div>

                )

              })}

            </div>

            {/* COUPON */}

            <div className="mt-8">

              <p className="font-semibold text-gray-900 mb-3">

                Apply Coupon

              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">

                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) =>
                    setCouponCode(
                      e.target.value
                    )
                  }
                  placeholder="Enter coupon code"
                  className="w-full sm:flex-1 min-w-0 px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-emerald-400"
                />

                <button
                  onClick={applyCoupon}
                  className="w-full sm:w-auto sm:min-w-[150px] px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
                >

                  Apply Coupon

                </button>

              </div>

            </div>

            <div className="border-t mt-6 pt-6 space-y-3">

              <div className="flex justify-between text-gray-600">

                <span>Subtotal</span>

                <span>

                  ₹{subtotal.toLocaleString()}

                </span>

              </div>

              <div className="flex justify-between text-gray-600">

                <span>Shipping</span>

                <span>

                  {shipping === 0
                    ? 'Free'
                    : `₹${shipping}`}

                </span>

              </div>

              {discount > 0 && (

                <div className="flex justify-between text-emerald-600 font-semibold">

                  <span>Discount</span>

                  <span>

                    -₹{discount}

                  </span>

                </div>

              )}

              <div className="flex justify-between text-2xl font-bold text-gray-900 pt-2 border-t">

                <span>Total</span>

                <span>

                  ₹{total.toLocaleString()}

                </span>

              </div>

            </div>

            <button
              type="button"
              onClick={startCheckout}
              disabled={placing || !selectedAddress || !paymentDetailsValid}
              className={`mt-8 w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                placing || !selectedAddress || !paymentDetailsValid
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-gradient-to-r from-emerald-600 to-green-500 hover:scale-[1.02] text-white shadow-xl'
              }`}
            >
              {placing
                ? 'Placing order…'
                : !selectedAddress
                  ? 'Add a delivery address'
                  : !paymentMethod
                    ? 'Select payment method'
                    : !paymentDetailsValid
                      ? 'Complete payment details'
                      : ['upi', 'card', 'netbanking', 'emi'].includes(paymentMethod)
                        ? `Pay ₹${total.toLocaleString()} securely`
                        : 'Place order'}
            </button>

          </div>

        </div>

      </div>

      <DummyPaymentModal
        open={dummyPayOpen}
        amount={total}
        methodLabel={paymentMethod ? paymentMethodLabel(paymentMethod) : ''}
        payMode={dummyPayMeta.payMode}
        payerSummary={dummyPayMeta.payerSummary}
        transactionRef={paySessionRef}
        onComplete={handleDummyPayComplete}
        onCancel={() => setDummyPayOpen(false)}
      />

      <CouponPopup
        open={showCouponPopup}
        onClose={() =>
          setShowCouponPopup(false)
        }
        couponCode={couponCode}
        discount={discount}
      />

      <OrderPlacedPopup
        open={showRewardModal}
        orderId={createdOrderId || '#RM' + Math.floor(10000 + Math.random() * 89999)}
        onClose={() => {

          setShowRewardModal(false)

          navigate('/')

        }}
        confirmText="Continue Shopping"
      />

    </div>

  )

}