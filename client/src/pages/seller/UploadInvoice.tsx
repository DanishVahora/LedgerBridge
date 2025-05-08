import { useState, useRef, useEffect } from 'react';
import { FileUp, X, Upload, File } from 'lucide-react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';


interface InvoiceFormData {
  supplierusername: string;
  invoiceNumber: string;
  buyerusername: string;
  amount: string;
  dueDate: string;
  remarks: string;
  uploadDate: string;
  invoiceDocument: File | null;
  factoringType: 'factoring' | 'reverse_factoring' | ''; // Add this new field
}
interface Buyer {
  id: number;
  userName: string;
  companyName: string;
}
const UploadInvoice = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user } = useUserContext();
  const [formData, setFormData] = useState<InvoiceFormData>({
    supplierusername: '',
    invoiceNumber: '',
    buyerusername: '',
    amount: '',
    dueDate: '',
    remarks: '',
    uploadDate: '',
    invoiceDocument: null,
    factoringType: '' // Add initial value
  });


  // Buyers list state
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  useEffect(() => {
    console.log('User');
    console.log(user);
    axios
      .get<Buyer[]>(`${import.meta.env.VITE_API_BASE_URL}/api/buyers`)
      .then(res => setBuyers(res.data))
      .catch(err => {
        console.error('Failed to load buyers:', err);
        alert('Could not fetch buyers list.');
      });
  }, []);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFormData(prev => ({ ...prev, invoiceDocument: file }));
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


      const payload = new FormData();
      payload.append('supplierusername', user?.userName ?? "Supplier_shahil_478587");  
      payload.append('buyerusername', formData.buyerusername);  
      payload.append('amount', formData.amount);
      payload.append('dueDate', formData.dueDate);
      payload.append('factoringType', formData.factoringType); // Add this line
      const today = new Date().toISOString().split('T')[0];
      payload.append('uploadDate', today);
      payload.append('remarks', formData.remarks);
      if (formData.invoiceDocument) {
        payload.append('invoiceDocument', formData.invoiceDocument);
      }
 


      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/invoices/create`,
        payload
      );
 
      console.log(response);
      alert('Invoice uploaded successfully!');
 
      // Reset form
      setFormData({
        supplierusername: '',
        invoiceNumber: '',
        buyerusername: '',
        amount: '',
        dueDate: '',
        remarks: '',
        uploadDate: '',
        invoiceDocument: null,
        factoringType: '' // Add initial value
      });
      setPreviewUrl(null);
 
    } catch (error) {
      console.error(error);
      alert('Error uploading invoice');
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
            {/* Factoring Type Selection - Add this section first */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Financing Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, factoringType: 'factoring' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.factoringType === 'factoring'
                      ? 'border-[#006A71] bg-[#F2EFE7] text-[#006A71]'
                      : 'border-gray-200 hover:border-[#9ACBD0]'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="font-medium mb-2">Factoring</h3>
                    <p className="text-sm text-gray-600">
                      Sell your invoices directly to financiers
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, factoringType: 'reverse_factoring' }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.factoringType === 'reverse_factoring'
                      ? 'border-[#006A71] bg-[#F2EFE7] text-[#006A71]'
                      : 'border-gray-200 hover:border-[#9ACBD0]'
                  }`}
                >
                  <div className="text-center">
                    <h3 className="font-medium mb-2">Reverse Factoring</h3>
                    <p className="text-sm text-gray-600">
                      Use buyer-arranged financing program
                    </p>
                  </div>
                </button>
              </div>
              {!formData.factoringType && (
                <p className="mt-2 text-sm text-red-500">
                  Please select a financing type
                </p>
              )}
            </div>

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
                        {formData.invoiceDocument?.name}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Buyer</label>
                <select
                  name="buyerusername"
                  value={formData.buyerusername}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#48A6A7]"
                >
                  <option value="">Select a buyer</option>
                  {buyers.map(b => (
                    <option key={b.id} value={b.userName}>
                      {b.companyName}
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
                  name="remarks"
                  value={formData.remarks}
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
              disabled={loading || !formData.invoiceDocument || !formData.factoringType}
              className={`
                flex items-center space-x-2 px-6 py-3 bg-[#006A71] text-white rounded-lg
                ${loading || !formData.invoiceDocument || !formData.factoringType
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
