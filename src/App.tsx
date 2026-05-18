import { Link, Route, Routes } from "react-router-dom";

import Index from "@/pages/index";
import Mobile from "@/pages/mobile";
import Proposal from "@/pages/proposal";

import AdminLayout from "@/pages/admin";
import AdminIndex from "@/pages/admin.index";
import AdminAiRecs from "@/pages/admin.ai-recommendations";
import AdminConsultations from "@/pages/admin.consultations";
import AdminContent from "@/pages/admin.content";
import AdminCustomers from "@/pages/admin.customers";
import AdminExperts from "@/pages/admin.experts";
import AdminOrders from "@/pages/admin.orders";
import AdminProducts from "@/pages/admin.products";
import AdminSettings from "@/pages/admin.settings";
import AdminShipments from "@/pages/admin.shipments";
import AdminSubscriptions from "@/pages/admin.subscriptions";

import ExpertsLayout from "@/pages/experts";
import ExpertsIndex from "@/pages/experts.index";
import ExpertsAiReview from "@/pages/experts.ai-review";
import ExpertsAppointments from "@/pages/experts.appointments";
import ExpertsChat from "@/pages/experts.chat";
import ExpertsEarnings from "@/pages/experts.earnings";
import ExpertsPatients from "@/pages/experts.patients";
import ExpertsPrescriptions from "@/pages/experts.prescriptions";

import WebLayout from "@/pages/web";
import WebIndex from "@/pages/web.index";
import WebAbout from "@/pages/web.about";
import WebAccount from "@/pages/web.account";
import WebAskAi from "@/pages/web.ask-ai";
import WebBlogs from "@/pages/web.blogs";
import WebBlogSlug from "@/pages/web.blog.slug";
import WebCart from "@/pages/web.cart";
import WebCategorySlug from "@/pages/web.category.slug";
import WebCheckout from "@/pages/web.checkout";
import WebConcernSlug from "@/pages/web.concern.slug";
import WebContact from "@/pages/web.contact";
import WebLogin from "@/pages/web.login";
import WebProductSlug from "@/pages/web.product.slug";
import WebRegister from "@/pages/web.register";
import WebReviews from "@/pages/web.reviews";
import WebShop from "@/pages/web.shop";
import WebTrack from "@/pages/web.track";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/mobile" element={<Mobile />} />
      <Route path="/proposal" element={<Proposal />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminIndex />} />
        <Route path="ai-recommendations" element={<AdminAiRecs />} />
        <Route path="consultations" element={<AdminConsultations />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="experts" element={<AdminExperts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="shipments" element={<AdminShipments />} />
        <Route path="subscriptions" element={<AdminSubscriptions />} />
      </Route>

      <Route path="/experts" element={<ExpertsLayout />}>
        <Route index element={<ExpertsIndex />} />
        <Route path="ai-review" element={<ExpertsAiReview />} />
        <Route path="appointments" element={<ExpertsAppointments />} />
        <Route path="chat" element={<ExpertsChat />} />
        <Route path="earnings" element={<ExpertsEarnings />} />
        <Route path="patients" element={<ExpertsPatients />} />
        <Route path="prescriptions" element={<ExpertsPrescriptions />} />
      </Route>

      <Route path="/web" element={<WebLayout />}>
        <Route index element={<WebIndex />} />
        <Route path="about" element={<WebAbout />} />
        <Route path="account" element={<WebAccount />} />
        <Route path="ask-ai" element={<WebAskAi />} />
        <Route path="blogs" element={<WebBlogs />} />
        <Route path="blog/:slug" element={<WebBlogSlug />} />
        <Route path="cart" element={<WebCart />} />
        <Route path="category/:slug" element={<WebCategorySlug />} />
        <Route path="checkout" element={<WebCheckout />} />
        <Route path="concern/:slug" element={<WebConcernSlug />} />
        <Route path="contact" element={<WebContact />} />
        <Route path="login" element={<WebLogin />} />
        <Route path="product/:slug" element={<WebProductSlug />} />
        <Route path="register" element={<WebRegister />} />
        <Route path="reviews" element={<WebReviews />} />
        <Route path="shop" element={<WebShop />} />
        <Route path="track" element={<WebTrack />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
