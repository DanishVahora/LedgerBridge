import { Routes, Route } from 'react-router-dom';
import SupplierRegister from '../pages/RegisterSupplier';
import BuyerRegister from '../pages/buyer/RegisterBuyer';
import LandingPage from '../pages/LandingPage';
import SellerLayout from '../layout/seller/SellerLayout';
import SellerDashboard from '../pages/seller/SellerDashboard';
import UploadInvoice from '../pages/seller/UploadInvoice';
import BidsAndOffers from '../pages/seller/BidsAndOffers';
import FinancierRegister from '../pages/RegisterFinancier';
import VerificationPage from '../pages/VerificationPage';
import BuyerLayout from '../layout/buyer/BuyerLayout';
import BuyerDashboard from '../pages/buyer/BuyerDashboard';
import InvoiceApproval from '../pages/buyer/InvoiceApproval';
import InvoiceStatusPage from '../pages/buyer/InvoiceStatus';
import FinancierLayout from '../layout/financier/FinancierLayout';
import FinancierDashboard from '../pages/financier/FinancierDashboard';
import NewRequest from '../pages/financier/NewRequest';

export const AppRoute = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/register/supplier" element={<SupplierRegister />} />
    <Route path="/register/buyer" element={<BuyerRegister />} />
    <Route path="/register/financier" element={<FinancierRegister />} />
    <Route path="verify" element={<VerificationPage />} />

    {/* Seller Routes */}
    <Route path="/seller" element={<SellerLayout />}>
      <Route path="dashboard" element={<SellerDashboard />} />
      <Route path="upload" element={<UploadInvoice />} />
      <Route path="bids" element={<BidsAndOffers />} />
      {/* <Route path="invoices" element={<div>Invoices Page</div>} /> */}
      <Route path="settings" element={<div>Settings Page</div>} />
    </Route>

    {/* Buyer Routes */}
    <Route path="/buyer" element={<BuyerLayout />}>
      <Route path="dashboard" element={<BuyerDashboard />} />
      <Route path="approvals" element={<InvoiceApproval />} />
      <Route path="invoice-status" element={<InvoiceStatusPage />}></Route>
    </Route>

    {/* Financier Routes */}
    <Route path="/financier" element={<FinancierLayout />}>
      <Route path="dashboard" element={<FinancierDashboard/>}/>
      <Route path="factoring/requests" element={<NewRequest/>}/>

    </Route>

    <Route path="*" element={<LandingPage />} />
  </Routes>
);
