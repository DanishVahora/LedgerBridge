import { useState, useEffect } from "react";
import axios from "axios";
import {
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit,
} from "lucide-react";


interface DuePayment {
  id: number;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: "upcoming" | "overdue" | "paid";
  buyerUsername: string;
  financierUsername: string;
}


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/due-payments`,
  headers: { "Content-Type": "application/json" },
});


const DuePayments = () => {
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState<DuePayment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<DuePayment | null>(
    null
  );
  const [filter, setFilter] = useState("all"); // Filter payments: 'all', 'buyer', 'financier'


  // Fetching all due payments
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await api.get("");
        setPayments(response.data);
        setError("");
      } catch (err) {
        setError("There was an error fetching the due payments");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);


  const formatCurrency = (amount: number) => `₹${(amount / 1000).toFixed(1)}K`;


  const statusColor = (status: string) => {
    switch (status) {
      case "overdue":
        return "text-red-600";
      case "paid":
        return "text-green-600";
      default:
        return "text-yellow-600";
    }
  };


  const statusIcon = (status: string) => {
    switch (status) {
      case "overdue":
        return <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />;
      case "paid":
        return <CheckCircle2 className="w-4 h-4 mr-1 text-green-500" />;
      default:
        return <CalendarDays className="w-4 h-4 mr-1 text-yellow-500" />;
    }
  };


  const handlePayment = async (id: number) => {
    try {
      

      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === id ? { ...payment, status: "paid" } : payment
        )
      );


      alert("Payment successfully marked as paid!");
    } catch (error) {
      console.error("Error marking payment as paid:", error);
      alert("Failed to mark payment as paid. Please try again.");
    }
  };


  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await api.delete(`/${id}`);
        setPayments((prevPayments) =>
          prevPayments.filter((payment) => payment.id !== id)
        );
        alert("Payment deleted successfully.");
      } catch (error) {
        console.error("Error deleting payment:", error);
        alert("Failed to delete the payment. Please try again.");
      }
    }
  };


  const handleEdit = (payment: DuePayment) => {
    setSelectedPayment(payment);
  };


  // Function to create a random due payment
  const createRandomDuePayment = async () => {
    const randomDuePayment = {
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
      amount: Math.floor(Math.random() * 10000) + 1000, // Amount between 1000 and 11000
      dueDate: new Date(
        new Date().setDate(new Date().getDate() + Math.floor(Math.random() * 30))
      ).toISOString().split("T")[0], // Random due date in the next 30 days
      status: Math.random() > 0.5 ? "upcoming" : "overdue", // Random status
      buyerUsername: `buyer${Math.floor(Math.random() * 1000)}`,
      financierUsername: `financier${Math.floor(Math.random() * 100)}`,
    };


    try {
      const response = await api.post("/", randomDuePayment);
      setPayments((prevPayments) => [...prevPayments, response.data]);
      alert("Random Due Payment created successfully!");
    } catch (error) {
      console.error("Error creating due payment:", error);
      alert("Failed to create a random due payment. Please try again.");
    }
  };


  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;
    return filter === "buyer"
      ? payment.buyerUsername.toLowerCase().includes(search.toLowerCase())
      : payment.financierUsername.toLowerCase().includes(search.toLowerCase());
  });


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Due Payments</h1>


      {/* Error Message */}
      {error && <div className="mb-4 text-red-600">{error}</div>}


      {/* Search and Filter Options */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search Buyer or Financier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-2 border rounded"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-4 p-2 border rounded"
        >
          <option value="all">All Payments</option>
          <option value="buyer">By Buyer</option>
          <option value="financier">By Financier</option>
        </select>
      </div>


      {/* Loading Spinner */}
      {loading && <div>Loading...</div>}


      <div className="bg-white border rounded shadow">
        <div className="grid grid-cols-5 font-semibold text-gray-700 border-b px-4 py-2 bg-gray-50">
          <div>Invoice</div>
          <div>Amount</div>
          <div>Due Date</div>
          <div>Status</div>
          <div>Actions</div>
        </div>


        {/* Payments List */}
        {filteredPayments.length === 0 && !loading ? (
          <div className="p-4">No payments found.</div>
        ) : (
          filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="grid grid-cols-5 px-4 py-3 border-b items-center text-sm"
            >
              <div>{payment.invoiceNumber}</div>
              <div>{formatCurrency(payment.amount)}</div>
              <div>{payment.dueDate}</div>
              <div
                className={`flex items-center ${statusColor(payment.status)}`}
              >
                {statusIcon(payment.status)}
                {payment.status.charAt(0).toUpperCase() +
                  payment.status.slice(1)}
              </div>
              <div className="flex space-x-2">
                {payment.status === "upcoming" && (
                  <button
                    onClick={() => handlePayment(payment.id)}
                    className="px-4 py-2 text-white bg-blue-600 rounded"
                  >
                    Pay Now
                  </button>
                )}
                <button
                  onClick={() => handleEdit(payment)}
                  className="px-4 py-2 text-white bg-yellow-600 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(payment.id)}
                  className="px-4 py-2 text-white bg-red-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>


      {/* Button to Create Random Due Payment */}
      <button
        onClick={createRandomDuePayment}
        className="mt-4 px-4 py-2 text-white bg-green-600 rounded"
      >
        Create Random Due Payment
      </button>


      {/* Payment Details Modal (Optional) */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
            <div>
              <strong>Invoice:</strong> {selectedPayment.invoiceNumber}
            </div>
            <div>
              <strong>Amount:</strong> {formatCurrency(selectedPayment.amount)}
            </div>
            <div>
              <strong>Due Date:</strong> {selectedPayment.dueDate}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              {selectedPayment.status.charAt(0).toUpperCase() +
                selectedPayment.status.slice(1)}
            </div>
            <div>
              <strong>Buyer:</strong> {selectedPayment.buyerUsername}
            </div>
            <div>
              <strong>Financier:</strong> {selectedPayment.financierUsername}
            </div>


            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Close
              </button>
              <button
                onClick={() => handlePayment(selectedPayment.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Mark as Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default DuePayments;