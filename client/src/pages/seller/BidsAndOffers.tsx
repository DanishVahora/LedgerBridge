// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useUserContext } from '../../context/UserContext';
// // import { Eye, Check, X, TrendingUp, Clock, DollarSign } from 'lucide-react';


// // interface Bid {
// //   id: string;
// //   buyerId: string;
// //   buyerName: string;
// //   bidAmount: number;
// //   discountRate: number;
// //   dueDate: string;
// //   status: 'pending' | 'accepted' | 'rejected';
// //   timestamp: string;
// // }


// // interface Invoice {
// //   id: string;
// //   invoiceNumber: string;
// //   amount: number;
// //   issueDate: string;
// //   dueDate: string;
// //   companyName: string;
// //   status: 'pending' | 'traded' | 'expired';
// //   bids: Bid[];
// // }


// // const BidsAndOffers = () => {
// //   const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
// //   const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
// //   const [invoices, setInvoices] = useState<Invoice[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
 
// //   const { user } = useUserContext();
// //   const sellerUsername = user?.userName;


// //   useEffect(() => {
// //     const fetchBidsAndInvoices = async () => {
// //       if (!sellerUsername) return;
     
// //       try {
// //         setLoading(true);
// //         const response = await axios.get(
// //           `${import.meta.env.VITE_API_BASE_URL}/api/supplier/${sellerUsername}/invoices-with-pending-bids`
// //         );        
// //        console.log('Fetched bids and invoices:');
// //        console.log(response.data);
// //         // Transform backend data to match frontend interface
// //         const transformedData = response.data.map((invoice: any) => ({
// //           id: invoice.id.toString(),
// //           invoiceNumber: invoice.invoiceId,
// //           amount: invoice.amount,
// //           issueDate: invoice.uploadDate,
// //           dueDate: invoice.dueDate,
// //           companyName: invoice.buyerCompanyName,
// //           status: invoice.status.toLowerCase(),
// //           bids: invoice.bids.map((bid: any) => ({
// //             id: bid.id.toString(),
// //             buyerId: bid.financier.id.toString(),
// //             buyerName: bid.financier.companyName,
// //             bidAmount: bid.bidAmount,
// //             discountRate: bid.discountRate,
// //             dueDate: invoice.dueDate,
// //             status: bid.status.toLowerCase(),
// //             timestamp: bid.createdAt
// //           }))
// //         }));
       
// //         setInvoices(transformedData);
// //         setError(null);
// //       } catch (err) {
// //         console.error('Error fetching bids:', err);
// //         setError('Failed to load bids and offers');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };


// //     fetchBidsAndInvoices();
// //   }, [sellerUsername]);


// //   const handleAcceptBid = async (invoiceId: string, bidId: string) => {
// //     try {
// //       await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/bids/${bidId}/status`, null, {
// //         params: {
// //           status: 'ACCEPTED',
// //           supplierUsername: sellerUsername
// //         }
// //       });
// //       // Refresh data after accepting bid
// //       window.location.reload();
// //     } catch (err) {
// //       console.error('Error accepting bid:', err);
// //       alert('Failed to accept bid');
// //     }
// //   };


// //   const handleRejectBid = async (invoiceId: string, bidId: string) => {
// //     try {
// //       await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/supplier/bids/${bidId}/status`, null, {
// //         params: {
// //           status: 'REJECTED',
// //           supplierUsername: sellerUsername
// //         }
// //       });
// //       // Refresh data after rejecting bid
// //       window.location.reload();
// //     } catch (err) {
// //       console.error('Error rejecting bid:', err);
// //       alert('Failed to reject bid');
// //     }
// //   };


// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-6">
// //       {/* Page Header */}
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold text-gray-800">Bids & Offers</h1>
// //         <p className="text-gray-600 mt-2">Manage your invoice trading activities</p>
// //       </div>


// //       {/* Tabs */}
// //       <div className="flex space-x-4 mb-6">
// //         {['pending', 'history'].map((tab) => (
// //           <button
// //             key={tab}
// //             onClick={() => setActiveTab(tab as 'pending' | 'history')}
// //             className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
// //               ${activeTab === tab
// //                 ? 'bg-[#006A71] text-white shadow-lg transform -translate-y-0.5'
// //                 : 'bg-white text-gray-600 hover:bg-gray-50'}`}
// //           >
// //             {tab.charAt(0).toUpperCase() + tab.slice(1)}
// //           </button>
// //         ))}
// //       </div>


// //       {/* Main Content */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Invoices List */}
// //         <div className="lg:col-span-2 space-y-4">
// //           {loading ? (
// //             <div className="text-center py-8">Loading...</div>
// //           ) : error ? (
// //             <div className="text-center text-red-600 py-8">{error}</div>
// //           ) : invoices.length === 0 ? (
// //             <div className="text-center text-gray-600 py-8">No bids found</div>
// //           ) : (
// //             invoices.map((invoice) => (
// //               <div
// //                 key={invoice.id}
// //                 onClick={() => setSelectedInvoice(invoice)}
// //                 className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
// //               >
// //                 <div className="flex justify-between items-start mb-4">
// //                   <div>
// //                     <h3 className="font-semibold text-lg text-gray-800">
// //                       {invoice.invoiceNumber}
// //                     </h3>
// //                     <p className="text-gray-600">{invoice.companyName}</p>
// //                   </div>
// //                   <div className="flex items-center space-x-2">
// //                     <Clock size={16} className="text-gray-400" />
// //                     <span className="text-sm text-gray-600">
// //                       Due: {new Date(invoice.dueDate).toLocaleDateString()}
// //                     </span>
// //                   </div>
// //                 </div>


// //                 <div className="flex justify-between items-center mb-4">
// //                   <div className="flex items-center space-x-2">
// //                     <DollarSign size={20} className="text-[#006A71]" />
// //                     <span className="font-semibold text-xl text-gray-800">
// //                       ${invoice.amount.toLocaleString()}
// //                     </span>
// //                   </div>
// //                   <div className="flex items-center space-x-2">
// //                     <TrendingUp size={16} className="text-[#006A71]" />
// //                     <span className="text-sm font-medium text-[#006A71]">
// //                       {invoice.bids.length} {invoice.bids.length === 1 ? 'bid' : 'bids'}
// //                     </span>
// //                   </div>
// //                 </div>


// //                 {/* Latest Bid Preview */}
// //                 {invoice.bids[0] && (
// //                   <div className="bg-gray-50 rounded-lg p-4">
// //                     <div className="flex justify-between items-center">
// //                       <div>
// //                         <p className="text-sm text-gray-600">Latest Bid</p>
// //                         <p className="font-medium text-gray-800">
// //                           ${invoice.bids[0].bidAmount.toLocaleString()}
// //                         </p>
// //                       </div>
// //                       <div className="flex space-x-2">
// //                         <button
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             handleAcceptBid(invoice.id, invoice.bids[0].id);
// //                           }}
// //                           className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
// //                         >
// //                           <Check size={16} />
// //                         </button>
// //                         <button
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             handleRejectBid(invoice.id, invoice.bids[0].id);
// //                           }}
// //                           className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
// //                         >
// //                           <X size={16} />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             ))
// //           )}
// //         </div>


// //         {/* Bid Details Panel */}
// //         <div className="lg:col-span-1">
// //           {selectedInvoice ? (
// //             <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
// //               <h3 className="font-semibold text-xl mb-4">Bid Details</h3>
// //               {selectedInvoice.bids.map((bid) => (
// //                 <div
// //                   key={bid.id}
// //                   className="border-b border-gray-100 last:border-0 py-4"
// //                 >
// //                   <div className="flex justify-between items-start mb-3">
// //                     <div>
// //                       <p className="font-medium text-gray-800">{bid.buyerName}</p>
// //                       <p className="text-sm text-gray-600">
// //                         {new Date(bid.timestamp).toLocaleString()}
// //                       </p>
// //                     </div>
// //                     <span className={`
// //                       px-3 py-1 rounded-full text-sm font-medium
// //                       ${bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
// //                         bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
// //                         'bg-red-100 text-red-800'}
// //                     `}>
// //                       {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
// //                     </span>
// //                   </div>


// //                   <div className="grid grid-cols-2 gap-4 mb-4">
// //                     <div>
// //                       <p className="text-sm text-gray-600">Bid Amount</p>
// //                       <p className="font-medium text-gray-800">
// //                         ${bid.bidAmount.toLocaleString()}
// //                       </p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-600">Discount Rate</p>
// //                       <p className="font-medium text-gray-800">
// //                         {bid.discountRate}%
// //                       </p>
// //                     </div>
// //                   </div>


// //                   {bid.status === 'pending' && (
// //                     <div className="flex space-x-2 mt-4">
// //                       <button
// //                         onClick={() => handleAcceptBid(selectedInvoice.id, bid.id)}
// //                         className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg
// //                                  hover:bg-green-600 transition-colors"
// //                       >
// //                         Accept
// //                       </button>
// //                       <button
// //                         onClick={() => handleRejectBid(selectedInvoice.id, bid.id)}
// //                         className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg
// //                                  hover:bg-red-600 transition-colors"
// //                       >
// //                         Reject
// //                       </button>
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="bg-white rounded-xl p-6 shadow-lg text-center">
// //               <Eye size={40} className="mx-auto text-gray-400 mb-4" />
// //               <p className="text-gray-600">
// //                 Select an invoice to view bid details
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // export default BidsAndOffers;

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUserContext } from '../../context/UserContext';
// import { Eye, Check, X, TrendingUp, Clock, DollarSign } from 'lucide-react';

// interface Bid {
//   id: string;
//   buyerId: string;
//   buyerName: string;
//   bidAmount: number;
//   discountRate: number;
//   dueDate: string;
//   status: 'pending' | 'accepted' | 'rejected';
//   timestamp: string;
// }

// interface Invoice {
//   id: string;
//   invoiceNumber: string;
//   amount: number;
//   issueDate: string;
//   dueDate: string;
//   companyName: string;
//   status: 'pending' | 'approved' | 'rejected' | 'traded' | 'expired';
//   bids: Bid[];
// }

// const BidsAndOffers = () => {
//   const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
//   const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const { user } = useUserContext();
//   const sellerUsername = user?.userName;

//   useEffect(() => {
//     const fetchBidsAndInvoices = async () => {
//       if (!sellerUsername) return;

//       try {
//         setLoading(true);

//         // 1️⃣ pull out response.data
//         const response = await axios.get(
//           `${import.meta.env.VITE_API_BASE_URL}/api/supplier/${sellerUsername}/invoices-with-pending-bids`
//         );
//         const raw = response.data;
//         const arr: any[] = typeof raw === 'string' ? JSON.parse(raw) : raw;
        
//         // 2️⃣ transform
//         const transformed = (arr as any[]).map((inv) => {
//           const rawBids: any[] = inv.bids ?? [];
//           const bids: Bid[] =
//             rawBids.length > 0
//               ? rawBids.map((b) => ({
//                   id: b.id?.toString() ?? '0',
//                   buyerId: b.financier?.id?.toString() ?? '',
//                   buyerName:
//                     b.financier?.companyName ??
//                     b.financier?.userName ??
//                     'Unknown',
//                   bidAmount: b.bidAmount ?? 0,
//                   discountRate: b.discountRate ?? 0,
//                   dueDate: inv.dueDate,
//                   status: (b.status ?? 'PENDING').toLowerCase() as Bid['status'],
//                   timestamp: b.createdAt ?? inv.uploadDate,
//                 }))
//               : [
//                   {
//                     id: '0',
//                     buyerId: '',
//                     buyerName: 'No bids yet',
//                     bidAmount: 0,
//                     discountRate: 0,
//                     dueDate: inv.dueDate,
//                     status: 'pending',
//                     timestamp: inv.uploadDate,
//                   },
//                 ];

//           return {
//             id: inv.id?.toString() ?? '0',
//             invoiceNumber: inv.invoiceId ?? '—',
//             amount: inv.amount ?? 0,
//             issueDate: inv.uploadDate,
//             dueDate: inv.dueDate,
//             companyName:
//               inv.buyerCompanyName ?? inv.buyerusername ?? 'Unknown Buyer',
//             status: (inv.status ?? 'PENDING').toLowerCase() as Invoice['status'],
//             bids,
//           };
//         });

//         setInvoices(transformed);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching bids:', err);
//         setError('Failed to load bids and offers');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBidsAndInvoices();
//   }, [sellerUsername]);

//   const handleAcceptBid = async (invoiceId: string, bidId: string) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/supplier/bids/${bidId}/status`,
//         null,
//         {
//           params: {
//             status: 'ACCEPTED',
//             supplierUsername: sellerUsername,
//           },
//         }
//       );
//       window.location.reload();
//     } catch (err) {
//       console.error('Error accepting bid:', err);
//       alert('Failed to accept bid');
//     }
//   };

//   const handleRejectBid = async (invoiceId: string, bidId: string) => {
//     try {
//       await axios.put(
//         `${import.meta.env.VITE_API_BASE_URL}/api/supplier/bids/${bidId}/status`,
//         null,
//         {
//           params: {
//             status: 'REJECTED',
//             supplierUsername: sellerUsername,
//           },
//         }
//       );
//       window.location.reload();
//     } catch (err) {
//       console.error('Error rejecting bid:', err);
//       alert('Failed to reject bid');
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Bids & Offers</h1>
//         <p className="text-gray-600 mt-2">Manage your invoice trading activities</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         {(['pending', 'history'] as const).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
//               activeTab === tab
//                 ? 'bg-[#006A71] text-white shadow-lg'
//                 : 'bg-white text-gray-600 hover:bg-gray-50'
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Invoice List */}
//         <div className="lg:col-span-2 space-y-4">
//           {loading ? (
//             <div className="text-center py-8">Loading...</div>
//           ) : error ? (
//             <div className="text-center text-red-600 py-8">{error}</div>
//           ) : invoices.length === 0 ? (
//             <div className="text-center text-gray-600 py-8">
//               No invoices found
//             </div>
//           ) : (
//             invoices.map((invoice) => (
//               <div
//                 key={invoice.id}
//                 onClick={() => setSelectedInvoice(invoice)}
//                 className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl cursor-pointer"
//               >
//                 {/* Invoice header */}
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="font-semibold text-lg text-gray-800">
//                       {invoice.invoiceNumber}
//                     </h3>
//                     <p className="text-gray-600">{invoice.companyName}</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Clock size={16} className="text-gray-400" />
//                     <span className="text-sm text-gray-600">
//                       Due: {new Date(invoice.dueDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Amount & bids count */}
//                 <div className="flex justify-between items-center mb-4">
//                   <div className="flex items-center space-x-2">
//                     <DollarSign size={20} className="text-[#006A71]" />
//                     <span className="font-semibold text-xl text-gray-800">
//                       ${invoice.amount.toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <TrendingUp size={16} className="text-[#006A71]" />
//                     <span className="text-sm font-medium text-[#006A71]">
//                       {invoice.bids.length}{' '}
//                       {invoice.bids.length === 1 ? 'bid' : 'bids'}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Latest bid action */}
//                 {invoice.bids[0] && (
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <p className="text-sm text-gray-600">Latest Bid</p>
//                         <p className="font-medium text-gray-800">
//                           ${invoice.bids[0].bidAmount.toLocaleString()}
//                         </p>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleAcceptBid(invoice.id, invoice.bids[0].id);
//                           }}
//                           className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
//                         >
//                           <Check size={16} />
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleRejectBid(invoice.id, invoice.bids[0].id);
//                           }}
//                           className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
//                         >
//                           <X size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         {/* Bid Details Panel */}
//         <div className="lg:col-span-1">
//           {selectedInvoice ? (
//             <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
//               <h3 className="font-semibold text-xl mb-4">Bid Details</h3>
//               {selectedInvoice.bids.map((bid) => (
//                 <div
//                   key={bid.id}
//                   className="border-b border-gray-100 py-4 last:border-0"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div>
//                       <p className="font-medium text-gray-800">
//                         {bid.buyerName}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         {new Date(bid.timestamp).toLocaleString()}
//                       </p>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm font-medium ${
//                         bid.status === 'pending'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : bid.status === 'accepted'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       {bid.status.charAt(0).toUpperCase() +
//                         bid.status.slice(1)}
//                     </span>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <p className="text-sm text-gray-600">Bid Amount</p>
//                       <p className="font-medium text-gray-800">
//                         ${bid.bidAmount.toLocaleString()}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">Discount Rate</p>
//                       <p className="font-medium text-gray-800">
//                         {bid.discountRate}%
//                       </p>
//                     </div>
//                   </div>
//                   {bid.status === 'pending' && (
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() =>
//                           handleAcceptBid(selectedInvoice.id, bid.id)
//                         }
//                         className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
//                       >
//                         Accept
//                       </button>
//                       <button
//                         onClick={() =>
//                           handleRejectBid(selectedInvoice.id, bid.id)
//                         }
//                         className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white rounded-xl p-6 shadow-lg text-center">
//               <Eye size={40} className="mx-auto text-gray-400 mb-4" />
//               <p className="text-gray-600">
//                 Select an invoice to view bid details
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BidsAndOffers;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';
import {  TrendingUp, Clock, DollarSign } from 'lucide-react';

interface Bid {
  id: string;
  buyerName: string;
  bidAmount: number;
  discountRate: number;
  dueDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  companyName: string;
  bids: Bid[];
}

const BidsAndOffers = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUserContext();
  const sellerUsername = user?.userName;

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!sellerUsername) return;
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/supplier/${sellerUsername}/invoices-with-pending-bids`
        );
        const arr: any[] = typeof data === 'string' ? JSON.parse(data) : data;
        const transformed = arr.map(inv => ({
          id: inv.id?.toString() || '0',
          invoiceNumber: inv.invoiceId || '—',
          amount: inv.amount || 0,
          dueDate: inv.dueDate,
          companyName: inv.buyerCompanyName || inv.buyerusername || 'Unknown',
          bids: [
            {
              id: '0',
              buyerName: 'Dummy Bidder',
              bidAmount: inv.amount * 0.95, // for example
              discountRate: 8,  // dummy 8%
              dueDate: inv.dueDate,
              status: 'pending' as 'pending', // Explicitly cast to match Bid type
              timestamp: inv.uploadDate,
            }
          ],
        }));
        setInvoices(transformed);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [sellerUsername]);

  const handleAccept = async (invoiceId: string, bidId: string) => {
    // call your accept API here
    console.log('Accept', invoiceId, bidId);
  };

  const handleReject = async (invoiceId: string, bidId: string) => {
    // call your reject API here
    console.log('Reject', invoiceId, bidId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Bids & Offers</h1>
        <p className="text-gray-600 mt-2">Manage your invoice trading activities</p>
      </div>

      <div className="flex space-x-4 mb-6">
        {(['pending', 'history'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#006A71] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading && <div className="text-center py-8">Loading...</div>}
        {error && <div className="text-center text-red-600 py-8">{error}</div>}
        {!loading && !error && invoices.map(invoice => (
          <div
            key={invoice.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {invoice.invoiceNumber}
                </h3>
                <p className="text-gray-600">{invoice.companyName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Due: {new Date(invoice.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign size={20} className="text-[#006A71]" />
                <span className="font-semibold text-xl text-gray-800">
                  ${invoice.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} className="text-[#006A71]" />
                <span className="text-sm font-medium text-[#006A71]">
                  {invoice.bids.length} {invoice.bids.length === 1 ? 'bid' : 'bids'}
                </span>
              </div>
            </div>

            {/* Dummy latest bid with Accept/Reject */}
            <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Latest Bid</p>
                <p className="font-medium text-gray-800">
                  ${invoice.bids[0].bidAmount.toLocaleString()} at {invoice.bids[0].discountRate}%
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAccept(invoice.id, invoice.bids[0].id)}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(invoice.id, invoice.bids[0].id)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BidsAndOffers;