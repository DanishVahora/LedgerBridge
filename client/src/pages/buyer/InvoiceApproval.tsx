import { useEffect, useState, useCallback } from 'react';
import {
  Eye,
  CheckCircle,
  XCircle,
  Download,
  Calendar,
  DollarSign,
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

interface BuyerFormData {
  userName: string | null;
  // …other fields
}
interface BackendInvoiceDto {
  id: string;
  seller: string;           // username
  amount: string;           // e.g. "₹1,000"
  dueDate: string;          // e.g. "2025-05-07"
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  invoiceDocument: string;  // Base64 PDF payload
  factoring: boolean;
}

interface Invoice {
  id: string;
  seller: { name: string };
  amount: string;
  dueDate: string;
  status: 'pending' | 'approved' | 'rejected';
  invoiceDocument: string;
  factoring: boolean;
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/buyers`,
  headers: { "Content-Type": "application/json" },
});

const InvoiceApproval = () => {
  const [pending, setPending] = useState<Invoice[]>([]);
  const [approved, setApproved] = useState<Invoice[]>([]);
  const [rejected, setRejected] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all'|'pending'|'approved'|'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice|null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remark, setRemark] = useState('');
  const [decisionType, setDecisionType] = useState<'approve' | 'reject' | null>(null);
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) as BuyerFormData : null;
  const buyerUsername = user?.userName || "";

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await api.get(`${buyerUsername}/dashboard`);
      console.log("DATA");
      console.log(res.data);
      const { pendingInvoices, approvedInvoices, rejectedInvoices } = res.data;
      setPending(pendingInvoices.map(normalize));
      setApproved(approvedInvoices.map(normalize));
      setRejected(rejectedInvoices.map(normalize));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard data");
    }
  }, [buyerUsername]);
  // map backend payload → UI model
  const normalize = (dto: BackendInvoiceDto): Invoice => ({
    id: dto.id,
    seller: { name: dto.seller },
    amount: dto.amount,
    dueDate: dto.dueDate,
    status: dto.status.toLowerCase() as Invoice['status'],
    invoiceDocument: dto.invoiceDocument,
    factoring: dto.factoring,
  });

  useEffect(() => {
    if (buyerUsername) {
      fetchDashboardData();
    }
  }, [buyerUsername,fetchDashboardData]);

  // consolidated + filter + search
  const allInvoices = [...pending, ...approved, ...rejected];
  const visible = allInvoices
    .filter(inv => filterStatus === 'all' || inv.status === filterStatus)
    .filter(inv =>
      inv.id.includes(searchTerm) ||
      inv.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApprove = (inv: Invoice) => {
      setDecisionType('approve');
      setSelectedInvoice(inv);
      setShowRemarkModal(true);
    };
    
    const handleReject = (inv: Invoice) => {
      setDecisionType('reject');
      setSelectedInvoice(inv);
      setShowRemarkModal(true);
    };
    

  const submitDecision = async (decision: 'approve' | 'reject') => {
    if (!selectedInvoice || !remark) return;
  
    try {
      // build the InvoiceActionDto body
      const payload = {
        buyerusername: buyerUsername,  // from session
        remark: remark
      };
  
      // call PATCH /api/invoices/{invoiceId}/{approve|reject}
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/invoices/${selectedInvoice.id}/${decision}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
  
      // on success, close modal & clear state; then refetch or optimistically update your lists
      setShowRemarkModal(false);
      setRemark('');
      setSelectedInvoice(null);
      // e.g. refetch dashboard:
      await fetchDashboardData();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error(err.response.data);
      } else {
        console.error(err);
      }
      
      toast.error("Failed to submit decision");
    }
  };

  // PDF download helper
  const downloadPdf = useCallback(() => {
    if (!selectedInvoice?.invoiceDocument) return;
    const byteChars = atob(selectedInvoice.invoiceDocument);
    const bytes = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      bytes[i] = byteChars.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedInvoice.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [selectedInvoice]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Header & Filters */}
//       <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="flex gap-2">
//           {['all','pending','approved','rejected'].map(status => (
//             <button
//               key={status}
//               onClick={() => setFilterStatus(status as any)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                 filterStatus === status
//                   ? 'bg-[#006A71] text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </button>
//           ))}
//         </div>
//         <input
//           type="text"
//           placeholder="Search invoices..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#006A71]"
//         />
//       </div>

//       {/* Invoice Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {visible.map(inv => (
//           <div key={inv.id} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold">{inv.id}</h3>
//                 <p className="text-gray-600">{inv.seller.name}</p>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 inv.status === 'approved'
//                   ? 'bg-green-100 text-green-800'
//                   : inv.status === 'rejected'
//                   ? 'bg-red-100 text-red-800'
//                   : 'bg-yellow-100 text-yellow-800'
//               }`}>
//                 {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
//               </span>
//             </div>
//             <div className="space-y-2">
//               <div className="flex items-center text-gray-600">
//                 <DollarSign size={16} className="mr-2" />
//                 <span>{inv.amount}</span>
//               </div>
//               <div className="flex items-center text-gray-600">
//                 <Calendar size={16} className="mr-2" />
//                 <span>Due: {new Date(inv.dueDate).toLocaleDateString()}</span>
//               </div>
//             </div>
//             <div className="mt-4 flex gap-2">
//               <button
//                 onClick={() => { setSelectedInvoice(inv); setShowPdfModal(true); }}
//                 className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
//               >
//                 <Eye size={16} className="mr-2" /> View
//               </button>
//               {inv.status === 'pending' && (
//                 <>
//                   <button
//                     onClick={() => handleApprove(inv)}
//                     className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                   >
//                     <CheckCircle size={16} className="mr-2" /> Approve
//                   </button>
//                   <button
//                     onClick={() => handleReject(inv)}
//                     className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                   >
//                     <XCircle size={16} className="mr-2" /> Reject
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Remark Modal */}
//       {showRemarkModal && selectedInvoice && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl p-6 w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">
//             {decisionType === 'approve' ? 'Approve Invoice' : 'Reject Invoice'}
//             </h3>
//             <textarea
//               value={remark}
//               onChange={e => setRemark(e.target.value)}
//               placeholder="Enter remarks..."
//               rows={4}
//               className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#006A71] mb-4"
//             />
//             <div className="flex justify-end gap-2">
//               <button onClick={() => setShowRemarkModal(false)} className="px-4 py-2 text-gray-600">
//                 Cancel
//               </button>
//               <button onClick={() => submitDecision(decisionType)} className="px-4 py-2 bg-[#006A71] text-white rounded-lg">
//               {decisionType === 'approve' ? 'Approve' : 'Reject'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* PDF Viewer & Download Modal */}
//       {showPdfModal && selectedInvoice && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
//             <div className="flex justify-between mb-4">
//               <h3 className="text-xl font-semibold">Invoice Details</h3>
//               <button onClick={() => setShowPdfModal(false)} className="text-gray-500 hover:text-gray-700">
//                 <XCircle size={24} />
//               </button>
//             </div>

//             <p className="text-gray-600 mb-2"><strong>Invoice ID:</strong> {selectedInvoice.id}</p>
//             <p className="text-gray-600 mb-2"><strong>Seller:</strong> {selectedInvoice.seller.name}</p>
//             <p className="text-gray-600 mb-2"><strong>Amount:</strong> {selectedInvoice.amount}</p>
//             <p className="text-gray-600 mb-6"><strong>Due Date:</strong> {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
//             <p className="text-gray-600 mb-6"><strong>Type:</strong> {selectedInvoice.factoring}</p>

//             {selectedInvoice.invoiceDocument ? (
//               <div className="border rounded-lg overflow-hidden mb-4" style={{ height: 400 }}>
//                 <embed
//                   src={`data:application/pdf;base64,${selectedInvoice.invoiceDocument}`}
//                   type="application/pdf"
//                   width="100%"
//                   height="100%"
//                 />
//               </div>
//             ) : (
//               <p className="text-red-500 mb-4">No invoice document available.</p>
//             )}

//             <button
//               onClick={downloadPdf}
//               className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
//             >
//               <Download size={16} className="mr-2" />
//               Download PDF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoiceApproval;
return (
  <div className="max-w-7xl mx-auto px-4 py-6">
    {/* Filters */}
    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex gap-2">
        {['all','pending','approved','rejected'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === status
                ? 'bg-[#006A71] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search invoices..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#006A71]"
      />
    </div>

    {/* Invoice Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visible.map(inv => (
        <div key={inv.id} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold">{inv.id}</h3>
              <p className="text-gray-600">{inv.seller.name}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              inv.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : inv.status === 'rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <DollarSign size={16} className="mr-2" /> {inv.amount}
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-2" />
              Due: {new Date(inv.dueDate).toLocaleDateString()}
            </div>
            {/* ← NEW: show factoring type */}
            <div className="flex items-center text-gray-600">
  <span className="font-medium mr-1">Type:</span>
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
    inv.factoring 
      ? 'bg-purple-100 text-purple-800'
      : 'bg-blue-100 text-blue-800'
  }`}>
    {inv.factoring ? 'Reverse Factoring' : 'Factoring'}
  </span>
</div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => { setSelectedInvoice(inv); setShowPdfModal(true); }}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Eye size={16} className="mr-2" /> View
            </button>
            {inv.status === 'pending' && (
              <>
                <button
                  onClick={() => handleApprove(inv)}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <CheckCircle size={16} className="mr-2" /> Approve
                </button>
                <button
                  onClick={() => handleReject(inv)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <XCircle size={16} className="mr-2" /> Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Remark Modal */}
    {showRemarkModal && selectedInvoice && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">
            {decisionType === 'approve' ? 'Approve Invoice' : 'Reject Invoice'}
          </h3>
          <textarea
            value={remark}
            onChange={e => setRemark(e.target.value)}
            placeholder="Enter remarks..."
            rows={4}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#006A71] mb-4"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowRemarkModal(false)} className="px-4 py-2 text-gray-600">
              Cancel
            </button>
            <button
              onClick={() => submitDecision(decisionType!)}
              className="px-4 py-2 bg-[#006A71] text-white rounded-lg"
            >
              {decisionType === 'approve' ? 'Approve' : 'Reject'}
            </button>
          </div>
        </div>
      </div>
    )}

    {/* PDF Modal */}
    {showPdfModal && selectedInvoice && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-semibold">Invoice Details</h3>
            <button onClick={() => setShowPdfModal(false)} className="text-gray-500 hover:text-gray-700">
              <XCircle size={24} />
            </button>
          </div>

          <p className="text-gray-600 mb-2"><strong>Invoice ID:</strong> {selectedInvoice.id}</p>
          <p className="text-gray-600 mb-2"><strong>Seller:</strong> {selectedInvoice.seller.name}</p>
          <p className="text-gray-600 mb-2"><strong>Amount:</strong> {selectedInvoice.amount}</p>
          <p className="text-gray-600 mb-2">
            <strong>Due Date:</strong> {new Date(selectedInvoice.dueDate).toLocaleDateString()}
          </p>
          {/* ← NEW: factoring type in modal */}
          <p className="text-gray-600 mb-6">
            
            <strong>Type:</strong> {selectedInvoice.factoring ? 'Reverse Factoring' : 'Factoring'}
          </p>

          {selectedInvoice.invoiceDocument ? (
            <div className="border rounded-lg overflow-hidden mb-4" style={{ height: 400 }}>
              <embed
                src={`data:application/pdf;base64,${selectedInvoice.invoiceDocument}`}
                type="application/pdf"
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <p className="text-red-500 mb-4">No invoice document available.</p>
          )}

          <button
            onClick={downloadPdf}
            className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            <Download size={16} className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>
    )}
  </div>
);
};

export default InvoiceApproval;