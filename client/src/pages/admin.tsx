import ProductUploadForm from "@/components/product-upload-form";

export default function Admin() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-4">
            Admin Panel
          </h1>
          <p className="text-lg text-gray-600">
            Manage your jewelry collection and add new products
          </p>
        </div>
      </section>

      {/* Product Upload Form */}
      <ProductUploadForm />

      {/* Admin Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <i className="fas fa-plus-circle text-3xl text-gold mb-4"></i>
              <h3 className="text-lg font-semibold text-black mb-2">Add Products</h3>
              <p className="text-sm text-gray-600">Upload new jewelry pieces to your catalog</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <i className="fas fa-edit text-3xl text-gold mb-4"></i>
              <h3 className="text-lg font-semibold text-black mb-2">Manage Inventory</h3>
              <p className="text-sm text-gray-600">Update stock levels and product details</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <i className="fas fa-chart-bar text-3xl text-gold mb-4"></i>
              <h3 className="text-lg font-semibold text-black mb-2">View Analytics</h3>
              <p className="text-sm text-gray-600">Track product performance and sales</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
