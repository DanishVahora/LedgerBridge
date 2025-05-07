import { useState, useRef } from 'react';
import { FileUp, X, Upload, File } from 'lucide-react';

interface InvoiceFormData {
  invoiceNumber: string;
  buyerId: string;
  amount: string;
  dueDate: string;
  description: string;
  file: File | null;
}

const UploadInvoice = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNumber: '',
    buyerId: '',
    amount: '',
    dueDate: '',
    description: '',
    file: null
  });

  // Mock buyers list (replace with API call)
  const buyers = [
    { id: '1', name: 'Tech Corp Industries' },
    { id: '2', name: 'Global Systems Ltd' },
    { id: '3', name: 'Innovate Solutions' },
    { id: '4', name: 'Meta Enterprises' },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFormData(prev => ({ ...prev, file }));
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement API call to submit invoice
      console.log('Submitting invoice:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      alert('Invoice uploaded successfully!');
      setFormData({
        invoiceNumber: '',
        buyerId: '',
        amount: '',
        dueDate: '',
        description: '',
        file: null
      });
      setPreviewUrl(null);
    } catch (error) {
      alert('Error uploading invoice');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#F2EFE7] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#006A71] mb-2">Upload Invoice</h1>
          <p className="text-gray-600">Upload a new invoice for financing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            {/* File Upload Section */}
            <div className="mb-6">
              <div className="border-2 border-dashed border-[#9ACBD0] rounded-lg p-8 text-center">
                {!previewUrl ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer"
                  >
                    <FileUp className="mx-auto h-12 w-12 text-[#48A6A7]" />
                    <p className="mt-2 text-sm text-gray-600">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF (up to 10MB)</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2 bg-[#F2EFE7] rounded">
                    <div className="flex items-center space-x-2">
                      <File className="h-6 w-6 text-[#48A6A7]" />
                      <span className="text-sm text-gray-600">
                        {formData.file?.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setFormData(prev => ({ ...prev, file: null }));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48A6A7] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Buyer
                </label>
                <select
                  name="buyerId"
                  value={formData.buyerId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48A6A7] focus:border-transparent"
                >
                  <option value="">Select a buyer</option>
                  {buyers.map(buyer => (
                    <option key={buyer.id} value={buyer.id}>
                      {buyer.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48A6A7] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48A6A7] focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48A6A7] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !formData.file}
              className={`
                flex items-center space-x-2 px-6 py-3 bg-[#006A71] text-white rounded-lg
                ${loading || !formData.file 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#48A6A7] transition-colors'}
              `}
            >
              <Upload className="h-5 w-5" />
              <span>{loading ? 'Uploading...' : 'Upload Invoice'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadInvoice;