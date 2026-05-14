export default function SellerAnalytics() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Analytics Dashboard
          </h1>

          <p className="text-lg text-gray-600">
            Track sales, products, revenue and customer growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-gray-500 font-semibold mb-2">
              Total Sales
            </h2>

            <p className="text-4xl font-black text-emerald-600">
              ₹0
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-gray-500 font-semibold mb-2">
              Orders
            </h2>

            <p className="text-4xl font-black text-blue-600">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-gray-500 font-semibold mb-2">
              Products
            </h2>

            <p className="text-4xl font-black text-orange-500">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-gray-500 font-semibold mb-2">
              Customers
            </h2>

            <p className="text-4xl font-black text-purple-600">
              0
            </p>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-10 mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sales Overview
          </h2>

          <div className="h-72 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-400 text-lg">
              Charts & analytics will appear here
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}