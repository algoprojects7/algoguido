'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@algoguido/ui';
import {
  LayoutDashboard,
  TrendingUp,
  GraduationCap,
  Database,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Search,
  Bell,
  Cpu,
  ChevronRight,
  Award,
  Mail,
  Briefcase,
  UserPlus
} from 'lucide-react';
import { motion as originalMotion, AnimatePresence } from 'framer-motion';
const motion = originalMotion as any;




interface AdminDashboardProps {
  onLogout: () => void;
  userRole?: string;
}


export default function AdminDashboard({ onLogout, userRole = 'ADMIN' }: AdminDashboardProps) {
  const isSuperAdmin = userRole === 'SUPER_ADMIN';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Certificate Management States
  const [certs, setCerts] = useState<any[]>([]);
  const [certsLoading, setCertsLoading] = useState(false);
  const [certSearchQuery, setCertSearchQuery] = useState('');
  const [newCert, setNewCert] = useState({
    certificateNo: '',
    candidateName: '',
    course: '',
    grade: 'A+',
    duration: '3 Months',
    dateOfIssue: new Date().toISOString().split('T')[0],
    description: '',
  });

  // Leads states
  const [leads, setLeads] = useState<any[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');

  // Applications states
  const [apps, setApps] = useState<any[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appSearchQuery, setAppSearchQuery] = useState('');

  // Products states
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [prodSearchQuery, setProdSearchQuery] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    slug: '',
    description: '',
    price: 9999,
    status: 'ACTIVE',
  });

  // Enterprise states
  const [entServices, setEntServices] = useState<any[]>([]);
  const [entLoading, setEntLoading] = useState(false);
  const [entSearchQuery, setEntSearchQuery] = useState('');
  const [newEntService, setNewEntService] = useState({
    name: '',
    slug: '',
    description: '',
    category: 'ERP',
    features: '',
    technologies: '',
    isActive: true,
    sortOrder: 0,
  });

  // Admin user creation states
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'ADMIN',
  });

  const [billing, setBilling] = useState<any[]>([]);
  const [billingLoading, setBillingLoading] = useState(false);

  // Dynamic metrics calculated from active DB states
  const totalLeadsCount = leads.length;
  const totalAppsCount = apps.length;

  // Total captured revenue (sum rawAmount where status is SUCCESS / CAPTURED, converted to INR)
  const totalRevenueAmount = billing
    .filter((pay) => pay.rawStatus === 'CAPTURED' || pay.status === 'SUCCESS')
    .reduce((sum, pay) => sum + (pay.rawAmount || 0), 0) / 100;

  // WhatsApp states
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [selectedLeadForWa, setSelectedLeadForWa] = useState<any>(null);
  const [waMsgType, setWaMsgType] = useState<'conversion' | 'payment'>('conversion');
  const [waCustomMessage, setWaCustomMessage] = useState('');

  // View Detail panel states
  const [selectedLeadDetail, setSelectedLeadDetail] = useState<any>(null);
  const [selectedAppDetail, setSelectedAppDetail] = useState<any>(null);

  interface NavigationItem {
    id: string;
    name: string;
    icon: any;
    restricted?: boolean;
    href?: string;
    isExternal?: boolean;
    badge?: string;
  }

  const allNavigationItems: NavigationItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', name: 'Leads', icon: TrendingUp },
    { id: 'certificates', name: 'Certificate', icon: Award },
    { id: 'applications', name: 'Applications', icon: GraduationCap },
    { id: 'products', name: 'Products', icon: Database, restricted: true },
    { id: 'enterprise', name: 'Enterprise', icon: Briefcase, restricted: true },
    { id: 'createadmin', name: 'Create Admin', icon: UserPlus, restricted: true },
    { id: 'billing', name: 'Razorpay Billing', icon: CreditCard },
    { id: 'settings', name: 'Settings', icon: Settings, restricted: true },
    { id: 'webmail', name: 'Web Mail', icon: Mail, href: 'https://linux12.hostguy.com:2096', isExternal: true },
  ];

  // ADMIN role cannot see restricted nav items at all
  const navigationItems = isSuperAdmin
    ? allNavigationItems
    : allNavigationItems.filter((item) => !item.restricted);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchLeads();
      fetchApplications();
      fetchBilling();
    } else if (activeTab === 'certificates') {
      fetchCertificates();
    } else if (activeTab === 'leads') {
      fetchLeads();
    } else if (activeTab === 'applications') {
      fetchApplications();
    } else if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'enterprise') {
      fetchEnterpriseServices();
    } else if (activeTab === 'createadmin') {
      fetchUsers();
    } else if (activeTab === 'billing') {
      fetchBilling();
    }
  }, [activeTab]);

  const fetchCertificates = async () => {
    setCertsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/certificates`);
      if (res.ok) {
        const data = await res.json();
        setCerts(data);
      } else {
        setCerts([]);
      }
    } catch (e) {
      console.error('Failed to fetch certificates:', e);
      setCerts([]);
    } finally {
      setCertsLoading(false);
    }
  };

  const handleAddCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCert),
      });

      if (res.ok) {
        const created = await res.json();
        setCerts((prev) => [created, ...prev]);
      } else {
        const created = {
          id: `cert-${Date.now()}`,
          ...newCert,
          dateOfIssue: new Date(newCert.dateOfIssue).toISOString(),
        };
        setCerts((prev) => [created, ...prev]);
      }

      setNewCert({
        certificateNo: '',
        candidateName: '',
        course: '',
        grade: 'A+',
        duration: '3 Months',
        dateOfIssue: new Date().toISOString().split('T')[0],
        description: '',
      });
    } catch (e) {
      console.error(e);
      const created = {
        id: `cert-${Date.now()}`,
        ...newCert,
        dateOfIssue: new Date(newCert.dateOfIssue).toISOString(),
      };
      setCerts((prev) => [created, ...prev]);
      setNewCert({
        certificateNo: '',
        candidateName: '',
        course: '',
        grade: 'A+',
        duration: '3 Months',
        dateOfIssue: new Date().toISOString().split('T')[0],
        description: '',
      });
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) {
      return;
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/certificates/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setCerts((prev) => prev.filter((c) => c.id !== id));
        alert('Certificate deleted successfully.');
      } else {
        alert(`Failed to delete certificate: ${res.status}`);
      }
    } catch (e: any) {
      alert(`Network error: ${e.message}`);
    }
  };

  const fetchLeads = async () => {
    setLeadsLoading(true);
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/leads`, { headers });
      if (res.ok) {
        const data = await res.json();
        const leadsData = data.data || data;
        setLeads(leadsData);
      } else {
        setLeads([]);
      }
    } catch (e) {
      console.error('Failed to fetch leads:', e);
      setLeads([]);
    } finally {
      setLeadsLoading(false);
    }
  };

  const fetchApplications = async () => {
    setAppsLoading(true);
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/leads`, { headers });
      if (res.ok) {
        const data = await res.json();
        const leadsData = data.data || data;
        const eduApps = leadsData.filter((l: any) => l.source === 'EDUCATION_PORTAL');
        setApps(eduApps);
      } else {
        setApps([]);
      }
    } catch (e) {
      setApps([]);
    } finally {
      setAppsLoading(false);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (e) {
      console.error('Failed to fetch products:', e);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchEnterpriseServices = async () => {
    setEntLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/enterprise-services`);
      if (res.ok) {
        const data = await res.json();
        setEntServices(data);
      } else {
        setEntServices([]);
      }
    } catch (e) {
      console.error('Failed to fetch enterprise services:', e);
      setEntServices([]);
    } finally {
      setEntLoading(false);
    }
  };

  const fetchBilling = async () => {
    setBillingLoading(true);
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/payments`, { headers });
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((pay: any) => ({
          id: pay.id,
          paymentId: pay.razorpayPaymentId || pay.razorpayOrderId || 'N/A',
          email: pay.customerEmail,
          product: pay.description || 'Payment Transaction',
          amount: `₹${(pay.amount / 100).toLocaleString()}`,
          status: pay.status === 'CAPTURED' ? 'SUCCESS' : pay.status === 'CREATED' ? 'PENDING' : 'FAILED',
          rawAmount: pay.amount,
          rawStatus: pay.status,
          date: pay.createdAt,
        }));
        setBilling(formatted);
      } else {
        setBilling([]);
      }
    } catch (e) {
      setBilling([]);
    } finally {
      setBillingLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
      } else {
        const created = {
          id: `prod-${Date.now()}`,
          ...newProduct,
        };
        setProducts((prev) => [created, ...prev]);
      }

      setNewProduct({
        name: '',
        slug: '',
        description: '',
        price: 9999,
        status: 'ACTIVE',
      });
    } catch (e) {
      const created = {
        id: `prod-${Date.now()}`,
        ...newProduct,
      };
      setProducts((prev) => [created, ...prev]);
      setNewProduct({
        name: '',
        slug: '',
        description: '',
        price: 9999,
        status: 'ACTIVE',
      });
    }
  };

  const handleAddEnterpriseService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const payload = {
        ...newEntService,
        features: newEntService.features.split(',').map(f => f.trim()).filter(Boolean),
        technologies: newEntService.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/enterprise-services`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();
        setEntServices((prev) => [created, ...prev]);
      } else {
        const created = {
          id: `ent-${Date.now()}`,
          ...payload,
        };
        setEntServices((prev) => [created, ...prev]);
      }

      setNewEntService({
        name: '',
        slug: '',
        description: '',
        category: 'ERP',
        features: '',
        technologies: '',
        isActive: true,
        sortOrder: 0,
      });
    } catch (e) {
      const created = {
        id: `ent-${Date.now()}`,
        ...newEntService,
        features: newEntService.features.split(',').map(f => f.trim()).filter(Boolean),
        technologies: newEntService.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };
      setEntServices((prev) => [created, ...prev]);
      setNewEntService({
        name: '',
        slug: '',
        description: '',
        category: 'ERP',
        features: '',
        technologies: '',
        isActive: true,
        sortOrder: 0,
      });
    }
  };

  const handleDeleteEnterpriseService = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enterprise service?')) {
      return;
    }
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/enterprise-services/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (res.ok) {
        setEntServices((prev) => prev.filter((es) => es.id !== id));
      } else {
        alert(`Failed to delete: ${res.status}`);
      }
    } catch (e: any) {
      alert(`Network error: ${e.message}`);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/users`, { headers });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setUsers([]);
      }
    } catch (e) {
      console.error('Failed to fetch admin users:', e);
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers,
        body: JSON.stringify(newAdmin),
      });

      if (res.ok) {
        const created = await res.json();
        setUsers((prev) => [created, ...prev]);
        alert('Admin account created successfully.');
        setNewAdmin({
          name: '',
          email: '',
          password: '',
          role: 'ADMIN',
        });
      } else {
        const errText = await res.text();
        alert(`Failed to create admin: ${res.status} - ${errText || 'Error'}`);
      }
    } catch (e: any) {
      alert(`Network error: ${e.message}`);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this administrator account?')) {
      return;
    }
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        alert('User deleted successfully.');
      } else {
        const errText = await res.text();
        alert(`Failed to delete: ${res.status} - ${errText || 'Error'}`);
      }
    } catch (e: any) {
      alert(`Network error: ${e.message}`);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        alert('Product deleted successfully.');
      } else {
        alert(`Failed to delete product: ${res.status}`);
      }
    } catch (e: any) {
      alert(`Network error: ${e.message}`);
    }
  };

  const handleOpenWhatsAppModal = (lead: any) => {
    setSelectedLeadForWa(lead);
    setWaMsgType('conversion');

    // Default conversion message
    const msg = `Hello ${lead.name},\n\nThank you for contacting Algoguido Technologies. We received your inquiry regarding "${lead.message || 'our services'}". We would love to schedule a brief call to discuss your requirements. Let us know a convenient time.\n\nBest regards,\nAlgoguido Admin`;

    setWaCustomMessage(msg);
    setIsWaModalOpen(true);
  };

  useEffect(() => {
    if (!selectedLeadForWa) return;

    if (waMsgType === 'conversion') {
      const msg = `Hello ${selectedLeadForWa.name},\n\nThank you for contacting Algoguido Technologies. We received your inquiry regarding "${selectedLeadForWa.message || 'our services'}". We would love to schedule a brief call to discuss your requirements. Let us know a convenient time.\n\nBest regards,\nAlgoguido Admin`;
      setWaCustomMessage(msg);
    } else {
      // Pre-filled Payment Gateway Link Message
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const checkoutUrl = `${siteUrl}/checkout?leadId=${selectedLeadForWa.id}&amount=${selectedLeadForWa.value || 9999}`;
      const msg = `Hello ${selectedLeadForWa.name},\n\nTo proceed with your request, we have generated a secure payment link. You can complete the transaction here:\n\n${checkoutUrl}\n\nOnce completed, your service will be provisioned immediately.\n\nBest regards,\nAlgoguido Billing`;
      setWaCustomMessage(msg);
    }
  }, [waMsgType, selectedLeadForWa]);

  const handleSendWhatsApp = () => {
    if (!selectedLeadForWa || !selectedLeadForWa.phone) return;
    // Format phone: remove spaces, symbols, keep only numbers
    const cleanPhone = selectedLeadForWa.phone.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(waCustomMessage);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(waUrl, '_blank');
    setIsWaModalOpen(false);
  };

  const handleDeleteLead = async (id: string, type: string = 'lead') => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }
    try {
      const token = sessionStorage.getItem('algoguido_admin_token');
      const headers: any = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${apiUrl}/leads/${id}`, {
        method: 'DELETE',
        headers,
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        setApps((prev) => prev.filter((a) => a.id !== id));
        alert(`${type === 'application' ? 'Application' : 'Lead'} deleted successfully.`);
      } else {
        const errText = await res.text();
        alert(`Failed to delete: ${res.status} - ${errText || 'Unauthorized or forbidden.'}`);
      }
    } catch (e: any) {
      alert(`Network error: ${e.message}`);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/20 relative z-10">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-slate-900/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 border-r border-slate-200/60 bg-white/60 backdrop-blur-xl p-6 flex flex-col gap-8 z-40 transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo Branding */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display font-extrabold text-2xl tracking-wider text-gradient-brand">
              ALGOGUIDO
            </span>
            <p className="text-xs text-slate-500 font-bold tracking-widest mt-0.5 uppercase">
              Control Center
            </p>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5 flex-grow overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.isExternal) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 cursor-pointer w-full text-left"
                >
                  <Icon className="h-4.5 w-4.5 text-slate-500 shrink-0" />
                  <span>{item.name}</span>
                </a>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 w-full text-left ${isActive
                  ? 'bg-gradient-brand text-white shadow-glow'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.name}</span>
                {item.badge && !isActive && (
                  <Badge variant="primary" className="ml-auto px-1.5 py-0.5 bg-brand-50 text-brand-600 border-brand-200">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Section */}
        <div className="border-t border-slate-200/60 pt-6 mt-auto">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-100/40 border border-slate-200/30">
            <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center font-extrabold text-white text-sm shadow-glow shrink-0">
              {isSuperAdmin ? 'SA' : 'AD'}
            </div>
            <div className="min-w-0 flex-grow">
              <p className="text-sm font-bold text-slate-800 truncate">
                {typeof window !== 'undefined' ? sessionStorage.getItem('algoguido_admin_name') || 'Administrator' : 'Administrator'}
              </p>
              <span className={`inline-block text-[9px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded-md mt-0.5 ${isSuperAdmin ? 'bg-violet-100 text-violet-700' : 'bg-sky-100 text-sky-700'
                }`}>
                {isSuperAdmin ? 'Super Admin' : 'Admin'}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full mt-4 h-10 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl border border-dashed border-slate-200 hover:border-red-200/60 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            System Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-200/60 bg-white/40 backdrop-blur-xl px-6 md:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h1 className="font-display font-extrabold text-xl text-slate-900 tracking-tight">
                {navigationItems.find((item) => item.id === activeTab)?.name} Overview
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="status-indicator shrink-0" />
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                  Live Operations Node
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 bg-slate-100/60 border border-slate-200/40 rounded-xl px-3 h-10 w-64">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Global telemetry search..."
                className="bg-transparent border-none text-xs outline-none text-slate-700 w-full placeholder-slate-400"
              />
            </div>
            <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full" />
            </button>
            <div className="h-8 w-px bg-slate-200/60" />
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="h-9 px-3 rounded-lg border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs font-semibold flex items-center gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </Button>
          </div>
        </header>

        {/* Dashboard Panels Workspace */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 bg-transparent">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            {activeTab === 'dashboard' ? (
              <>
                {/* Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <Card variant="glass" className="p-6 relative overflow-hidden bg-white/40 border-white/60 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</p>
                      <span className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
                        <TrendingUp className="h-4.5 w-4.5" />
                      </span>
                    </div>
                    <p className="text-3xl font-display font-extrabold mt-4 text-slate-800">
                      {leadsLoading ? '...' : totalLeadsCount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-100">
                        ↑ Realtime
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">this month</span>
                    </div>
                    <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </Card>

                  {/* Card 2 */}
                  <Card variant="glass" className="p-6 relative overflow-hidden bg-white/40 border-white/60 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applications</p>
                      <span className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                        <GraduationCap className="h-4.5 w-4.5" />
                      </span>
                    </div>
                    <p className="text-3xl font-display font-extrabold mt-4 text-slate-800">
                      {appsLoading ? '...' : totalAppsCount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-100">
                        ↑ Realtime
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">this month</span>
                    </div>
                    <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '58%' }} />
                    </div>
                  </Card>

                  {/* Card 3 */}
                  <Card variant="glass" className="p-6 relative overflow-hidden bg-white/40 border-white/60 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Razorpay Revenue</p>
                      <span className="p-2 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
                        <CreditCard className="h-4.5 w-4.5" />
                      </span>
                    </div>
                    <p className="text-3xl font-display font-extrabold mt-4 text-slate-800">
                      {billingLoading ? '...' : `₹${totalRevenueAmount.toLocaleString()}`}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-lg border border-emerald-100">
                        ↑ Realtime
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">this month</span>
                    </div>
                    <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '84%' }} />
                    </div>
                  </Card>

                  {/* Card 4 */}
                  <Card variant="glass" className="p-6 relative overflow-hidden bg-white/40 border-white/60 shadow-sm hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Status</p>
                      <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <Cpu className="h-4.5 w-4.5" />
                      </span>
                    </div>
                    <p className="text-3xl font-display font-extrabold mt-4 text-emerald-600">99.98%</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200">
                        ONLINE
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">telem-node-a</span>
                    </div>
                    <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full animate-pulse-glow" style={{ width: '100%' }} />
                    </div>
                  </Card>
                </div>

                {/* Core Panel Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Recent Activity */}
                  <Card variant="glass" className="p-6 md:p-8 lg:col-span-2 flex flex-col gap-6 bg-white/45 border-white/60 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-slate-800">Recent Leads Activity</h3>
                        <p className="text-xs text-slate-500">Realtime submission flow logs</p>
                      </div>
                      <button className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                        View CRM <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {leadsLoading ? (
                        <div className="py-8 text-center text-slate-400 font-bold animate-pulse text-xs uppercase tracking-wider">
                          Syncing telemetry logs...
                        </div>
                      ) : leads.length === 0 ? (
                        <div className="py-8 text-center text-slate-400 text-xs font-semibold">
                          No recent leads registered.
                        </div>
                      ) : (
                        leads.slice(0, 3).map((l: any) => (
                          <div key={l.id} className="p-4 rounded-2xl bg-white/50 border border-slate-200/40 flex items-center justify-between hover:shadow-sm transition-shadow duration-300">
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-800">
                                {l.name} {l.company ? `(${l.company})` : ''}
                              </p>
                              <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                <span className="font-semibold text-brand-600">{l.source || 'WEBSITE_CONTACT'}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                <span className="truncate max-w-[240px]">{l.message || 'No custom description.'}</span>
                              </p>
                            </div>
                            <Badge variant={l.stage === 'NEW' ? 'primary' : l.stage === 'LOST' ? 'neutral' : 'warning'}>
                              {l.stage}
                            </Badge>
                          </div>
                        ))
                      )}
                    </div>
                  </Card>

                  {/* Right Column: AI Assistant Telemetry */}
                  <Card variant="glass" className="p-6 md:p-8 flex flex-col gap-6 bg-white/45 border-white/60 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200/50 pb-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-slate-800">AI Telemetry</h3>
                        <p className="text-xs text-slate-500">Gemini widget interactions</p>
                      </div>
                      <span className="p-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 animate-float">
                        <Cpu className="h-4.5 w-4.5" />
                      </span>
                    </div>

                    <div className="space-y-4 flex-grow overflow-y-auto">
                      <div className="p-3.5 rounded-2xl bg-white/50 border border-slate-200/40 text-xs flex flex-col gap-2.5">
                        <div className="flex justify-between items-center text-slate-400 font-semibold">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            User Query
                          </span>
                          <span>10m ago</span>
                        </div>
                        <p className="text-slate-700 font-medium">"What enterprise pricing plans do you support?"</p>
                        <div className="pt-2 border-t border-slate-200/30 text-indigo-600 font-medium flex gap-2">
                          <span className="font-bold">Gemini:</span>
                          <span className="text-slate-600 italic">"We support Custom SaaS, School ERP modules, and government cloud deployments with SLA..."</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white/50 border border-slate-200/40 text-xs flex flex-col gap-2.5">
                        <div className="flex justify-between items-center text-slate-400 font-semibold">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            User Query
                          </span>
                          <span>24m ago</span>
                        </div>
                        <p className="text-slate-700 font-medium">"Who operates Algoguido?"</p>
                        <div className="pt-2 border-t border-slate-200/30 text-indigo-600 font-medium flex gap-2">
                          <span className="font-bold">Gemini:</span>
                          <span className="text-slate-600 italic">"Algoguido Technologies is a premium provider of educational software, custom databases..."</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            ) : activeTab === 'certificates' ? (
              <div className="flex flex-col gap-8 w-full animate-fade-in pb-12">
                {/* Top Section: Form and Stats */}
                <div className="grid lg:grid-cols-12 gap-8 w-full">
                  {/* Column 1: Add Certificate Form */}
                  <Card variant="glass" className="lg:col-span-8 p-6 md:p-8 bg-white/45 border-white/60 shadow-sm flex flex-col gap-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                        <Award className="h-5 w-5 text-indigo-600 animate-pulse" />
                        Create New Certificate
                      </h3>
                      <p className="text-xs text-slate-500">Record a validated student or candidate certificate credentials</p>
                    </div>

                    <form onSubmit={handleAddCertificate} className="flex flex-col gap-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Certificate No *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. AGC-2026-9812"
                            value={newCert.certificateNo}
                            onChange={(e) => setNewCert({ ...newCert, certificateNo: e.target.value })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Candidate Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Amit Baruah"
                            value={newCert.candidateName}
                            onChange={(e) => setNewCert({ ...newCert, candidateName: e.target.value })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Course / Track Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. React & Next.js Full Stack Development"
                            value={newCert.course}
                            onChange={(e) => setNewCert({ ...newCert, course: e.target.value })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Grade *</label>
                            <select
                              value={newCert.grade}
                              onChange={(e) => setNewCert({ ...newCert, grade: e.target.value })}
                              className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="O (Outstanding)">O (Outstanding)</option>
                              <option value="A+">A+</option>
                              <option value="A">A</option>
                              <option value="B+">B+</option>
                              <option value="B">B</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Duration *</label>
                            <select
                              value={newCert.duration}
                              onChange={(e) => setNewCert({ ...newCert, duration: e.target.value })}
                              className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <option value="4 Weeks">4 Weeks</option>
                              <option value="6 Weeks">6 Weeks</option>
                              <option value="2 Months">2 Months</option>
                              <option value="3 Months">3 Months</option>
                              <option value="6 Months">6 Months</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Date of Issue *</label>
                          <input
                            type="date"
                            required
                            value={newCert.dateOfIssue}
                            onChange={(e) => setNewCert({ ...newCert, dateOfIssue: e.target.value })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:cursor-pointer"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Additional Description / Notes</label>
                          <input
                            type="text"
                            placeholder="e.g. Completed with honors"
                            value={newCert.description}
                            onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <Button type="submit" variant="primary" className="mt-2 font-bold uppercase tracking-wider rounded-xl py-2">
                        Add Certificate
                      </Button>
                    </form>
                  </Card>

                  {/* Column 2: Telemetry Stats */}
                  <Card variant="glass" className="lg:col-span-4 p-6 bg-white/45 border-white/60 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800">Seeded Registries</h3>
                      <p className="text-xs text-slate-500">Live indicators for local records</p>
                    </div>

                    <div className="space-y-4 my-4">
                      <div className="flex justify-between items-center bg-white/50 border border-slate-200/40 p-3 rounded-xl">
                        <span className="text-xs font-semibold text-slate-500">Total Registered</span>
                        <span className="text-sm font-extrabold text-indigo-600">{certs.length} Certificates</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/50 border border-slate-200/40 p-3 rounded-xl">
                        <span className="text-xs font-semibold text-slate-500">Search Queries</span>
                        <span className="text-sm font-extrabold text-slate-700">Active</span>
                      </div>
                    </div>

                    {/* Quick Search */}
                    <div className="flex flex-col gap-1.5 mt-auto">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Search Records</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Search className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          placeholder="Search name or cert no..."
                          value={certSearchQuery}
                          onChange={(e) => setCertSearchQuery(e.target.value)}
                          className="pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Bottom Section: Table List */}
                <Card variant="glass" className="p-6 md:p-8 bg-white/45 border-white/60 shadow-sm w-full">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800">Certificate Repository</h3>
                      <p className="text-xs text-slate-500">All registered credentials in database</p>
                    </div>
                    <Button onClick={fetchCertificates} variant="outline" size="sm" className="text-xs">
                      Refresh Database
                    </Button>
                  </div>

                  {certsLoading ? (
                    <div className="py-12 flex justify-center text-slate-400 font-bold animate-pulse text-sm">
                      Syncing credentials...
                    </div>
                  ) : certs.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-sm font-medium">
                      No certificates registered. Add one using the form above.
                    </div>
                  ) : (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="border-b border-slate-200/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            <th className="pb-3 w-[150px]">Certificate No</th>
                            <th className="pb-3 w-[200px]">Candidate Name</th>
                            <th className="pb-3 w-[250px]">Course</th>
                            <th className="pb-3 text-center">Grade</th>
                            <th className="pb-3 text-center">Duration</th>
                            <th className="pb-3 text-right">Date Issued</th>
                            <th className="pb-3 text-right w-[80px]">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                          {certs
                            .filter((c) =>
                              c.candidateName?.toLowerCase()?.includes(certSearchQuery.toLowerCase()) ||
                              c.certificateNo?.toLowerCase()?.includes(certSearchQuery.toLowerCase())
                            )
                            .map((c) => (
                              <tr key={c.id} className="hover:bg-slate-50/20 transition-colors">
                                <td className="py-3.5 font-mono font-bold text-slate-800">
                                  <span className="px-2 py-0.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px]">
                                    {c.certificateNo}
                                  </span>
                                </td>
                                <td className="py-3.5 font-semibold text-slate-800">{c.candidateName}</td>
                                <td className="py-3.5 text-slate-600">{c.course}</td>
                                <td className="py-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400">{c.grade}</td>
                                <td className="py-3.5 text-center font-medium text-slate-500">{c.duration}</td>
                                <td className="py-3.5 text-right font-medium text-slate-500">
                                  {new Date(c.dateOfIssue).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </td>
                                <td className="py-3.5 text-right">
                                  <button
                                    onClick={() => handleDeleteCertificate(c.id)}
                                    className="text-red-500 hover:text-red-700 hover:underline font-bold"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>
              </div>
            ) : activeTab === 'leads' ? (
              /* Leads CRM Tab */
              <div className="flex flex-col gap-6 w-full animate-fade-in pb-12">
                <Card variant="glass" className="p-6 md:p-8 bg-white/45 border-white/60 shadow-sm w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800">Leads CRM Database</h3>
                      <p className="text-xs text-slate-500">Telemetry records from landing page contact inquiries</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <div className="relative flex-grow md:w-64">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Search className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          placeholder="Search leads..."
                          value={leadSearchQuery}
                          onChange={(e) => setLeadSearchQuery(e.target.value)}
                          className="pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        />
                      </div>
                      <Button onClick={fetchLeads} variant="outline" size="sm" className="text-xs shrink-0">
                        Refresh
                      </Button>
                    </div>
                  </div>

                  {leadsLoading ? (
                    <div className="py-12 flex justify-center text-slate-400 font-bold animate-pulse text-sm">
                      Syncing CRM registry logs...
                    </div>
                  ) : leads.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-sm font-medium">
                      No leads registered. Seed database or submit landing page forms to generate.
                    </div>
                  ) : (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="border-b border-slate-200/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            <th className="pb-3 w-[180px]">Lead Name</th>
                            <th className="pb-3 w-[200px]">Email & Contact</th>
                            <th className="pb-3 w-[150px]">Company</th>
                            <th className="pb-3 text-center">Score</th>
                            <th className="pb-3 text-center">Stage</th>
                            <th className="pb-3">Inquiry Source</th>
                            <th className="pb-3 text-right w-[150px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                          {leads
                            .filter((l) =>
                              l.name?.toLowerCase()?.includes(leadSearchQuery.toLowerCase()) ||
                              l.email?.toLowerCase()?.includes(leadSearchQuery.toLowerCase()) ||
                              l.company?.toLowerCase()?.includes(leadSearchQuery.toLowerCase())
                            )
                            .map((l) => (
                              <tr key={l.id} className="hover:bg-slate-50/20 transition-colors">
                                <td className="py-3.5">
                                  <div className="font-semibold text-slate-800">{l.name}</div>
                                  <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">{l.message || l.notes?.[0]?.content}</div>
                                </td>
                                <td className="py-3.5">
                                  <div className="font-medium text-slate-700">{l.email}</div>
                                  {l.phone && <div className="text-[10px] text-slate-400 mt-0.5">{l.phone}</div>}
                                </td>
                                <td className="py-3.5 text-slate-600 font-medium">{l.company || 'Individual'}</td>
                                <td className="py-3.5 text-center">
                                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${l.score >= 85 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                    l.score >= 70 ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                      'bg-slate-50 text-slate-700 border border-slate-100'
                                    }`}>
                                    {l.score}/100
                                  </span>
                                </td>
                                <td className="py-3.5 text-center">
                                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${l.stage === 'QUALIFIED' ? 'bg-emerald-500 text-white' :
                                    l.stage === 'NEGOTIATION' ? 'bg-purple-500 text-white' :
                                      l.stage === 'CONTACTED' ? 'bg-cyan-500 text-white' :
                                        'bg-indigo-500 text-white'
                                    }`}>
                                    {l.stage}
                                  </span>
                                </td>
                                <td className="py-3.5 font-medium">
                                  <Badge variant={l.source === 'EDUCATION_PORTAL' ? 'warning' : 'primary'} className="text-[9px]">
                                    {l.source}
                                  </Badge>
                                </td>
                                <td className="py-3.5 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => setSelectedLeadDetail(l)}
                                      className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-[10px] font-bold border border-indigo-100"
                                    >
                                      View
                                    </button>
                                    {l.phone && (
                                      <button
                                        onClick={() => handleOpenWhatsAppModal(l)}
                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                                        title="Connect on WhatsApp"
                                      >
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.805-9.8.001-2.617-1.015-5.078-2.862-6.93C16.37 1.944 13.916.927 11.306.927c-5.4.001-9.799 4.398-9.8 9.802-.001 1.472.49 2.91 1.453 4.542l-.963 3.523 3.659-.968zm13.125-9.512c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                                        </svg>
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDeleteLead(l.id, 'lead')}
                                      className="text-red-500 hover:text-red-700 font-bold hover:underline"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>



              </div>
            ) : activeTab === 'applications' ? (
              /* Applications Tab */
              <div className="flex flex-col gap-6 w-full animate-fade-in pb-12">
                <Card variant="glass" className="p-6 md:p-8 bg-white/45 border-white/60 shadow-sm w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800">Academic & Education Applications</h3>
                      <p className="text-xs text-slate-500">Internship, FDP, Workshop, and Research logs from Education portal</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <div className="relative flex-grow md:w-64">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Search className="h-4 w-4" />
                        </span>
                        <input
                          type="text"
                          placeholder="Search applications..."
                          value={appSearchQuery}
                          onChange={(e) => setAppSearchQuery(e.target.value)}
                          className="pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        />
                      </div>
                      <Button onClick={fetchApplications} variant="outline" size="sm" className="text-xs shrink-0">
                        Refresh
                      </Button>
                    </div>
                  </div>

                  {appsLoading ? (
                    <div className="py-12 flex justify-center text-slate-400 font-bold animate-pulse text-sm">
                      Syncing academic databases...
                    </div>
                  ) : apps.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-sm font-medium">
                      No student applications registered. Submit form under "Education" on public site contact page.
                    </div>
                  ) : (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="border-b border-slate-200/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            <th className="pb-3 w-[180px]">Candidate Name</th>
                            <th className="pb-3 w-[180px]">Email & Contact</th>
                            <th className="pb-3 w-[180px]">University/College</th>
                            <th className="pb-3 w-[150px]">Program Type</th>
                            <th className="pb-3 text-slate-400">Core Skillset</th>
                            <th className="pb-3 text-center">Score</th>
                            <th className="pb-3 text-right w-[120px]">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                          {apps
                            .filter((a) =>
                              a.name?.toLowerCase()?.includes(appSearchQuery.toLowerCase()) ||
                              a.email?.toLowerCase()?.includes(appSearchQuery.toLowerCase()) ||
                              a.company?.toLowerCase()?.includes(appSearchQuery.toLowerCase())
                            )
                            .map((a) => (
                              <tr key={a.id} className="hover:bg-slate-50/20 transition-colors">
                                <td className="py-3.5">
                                  <div className="font-semibold text-slate-800">{a.name}</div>
                                  <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">{a.message || a.notes?.[0]?.content}</div>
                                </td>
                                <td className="py-3.5">
                                  <div className="font-medium text-slate-700">{a.email}</div>
                                  <div className="text-[10px] text-slate-400 mt-0.5">{a.phone}</div>
                                </td>
                                <td className="py-3.5 text-slate-600 font-semibold">{a.company}</td>
                                <td className="py-3.5 font-bold text-slate-800">
                                  {a.program || 'Paid Internship'}
                                </td>
                                <td className="py-3.5 text-slate-600 font-mono text-[10px]">
                                  {a.skills || 'React, Python, SQL'}
                                </td>
                                <td className="py-3.5 text-center">
                                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    {a.score || 85}/100
                                  </span>
                                </td>
                                <td className="py-3.5 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => setSelectedAppDetail(a)}
                                      className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-[10px] font-bold border border-indigo-100"
                                    >
                                      View
                                    </button>
                                    {a.phone && (
                                      <button
                                        onClick={() => handleOpenWhatsAppModal(a)}
                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                                        title="Connect on WhatsApp"
                                      >
                                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.805-9.8.001-2.617-1.015-5.078-2.862-6.93C16.37 1.944 13.916.927 11.306.927c-5.4.001-9.799 4.398-9.8 9.802-.001 1.472.49 2.91 1.453 4.542l-.963 3.523 3.659-.968zm13.125-9.512c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.568-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
                                        </svg>
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleDeleteLead(a.id, 'application')}
                                      className="text-red-500 hover:text-red-700 font-bold hover:underline"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>



              </div>
            ) : activeTab === 'products' ? (
              /* Products Tab */
              <div className="flex flex-col gap-8 w-full animate-fade-in pb-12">
                <div className="grid lg:grid-cols-12 gap-8 w-full">
                  {/* Left: Add Product Form */}
                  <Card variant="glass" className="lg:col-span-4 p-6 bg-white/45 border-white/60 shadow-sm flex flex-col gap-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                        <Database className="h-5 w-5 text-indigo-600" />
                        Register New Product
                      </h3>
                      <p className="text-xs text-slate-500">Record a custom database or software package</p>
                    </div>

                    <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Product Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. eduAI365 Suite"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Product SKU/Slug *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. eduai365-suite"
                          value={newProduct.slug}
                          onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Price (INR) *</label>
                          <input
                            type="number"
                            required
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Status *</label>
                          <select
                            value={newProduct.status}
                            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Description</label>
                        <textarea
                          placeholder="Tell us about the software features..."
                          rows={3}
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />
                      </div>

                      <Button type="submit" variant="primary" className="mt-2 font-bold uppercase tracking-wider rounded-xl py-2">
                        Add Product
                      </Button>
                    </form>
                  </Card>

                  {/* Right: Products List */}
                  <Card variant="glass" className="lg:col-span-8 p-6 md:p-8 bg-white/45 border-white/60 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="font-display font-bold text-lg text-slate-800">Database Product Registries</h3>
                          <p className="text-xs text-slate-500">Manage catalog configurations</p>
                        </div>
                        <div className="relative w-48">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Search className="h-3.5 w-3.5" />
                          </span>
                          <input
                            type="text"
                            placeholder="Filter slug..."
                            value={prodSearchQuery}
                            onChange={(e) => setProdSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1.5 rounded-lg text-[10px] border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                          />
                        </div>
                      </div>

                      {productsLoading ? (
                        <div className="py-12 flex justify-center text-slate-400 font-bold animate-pulse text-sm">
                          Loading products...
                        </div>
                      ) : products.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 text-sm font-medium">
                          No products registered.
                        </div>
                      ) : (
                        <div className="overflow-x-auto w-full">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                <th className="pb-3 w-[180px]">Product Name</th>
                                <th className="pb-3">SKU/Slug</th>
                                <th className="pb-3 text-right">Unit Price</th>
                                <th className="pb-3 text-center">Status</th>
                                <th className="pb-3 text-right w-[80px]">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                              {products
                                .filter((p) =>
                                  p.name?.toLowerCase()?.includes(prodSearchQuery.toLowerCase()) ||
                                  p.slug?.toLowerCase()?.includes(prodSearchQuery.toLowerCase())
                                )
                                .map((p) => (
                                  <tr key={p.id} className="hover:bg-slate-50/20 transition-colors">
                                    <td className="py-3 font-semibold text-slate-800">
                                      {p.name}
                                      <p className="text-[10px] text-slate-400 font-normal mt-0.5 truncate max-w-[220px]">{p.description}</p>
                                    </td>
                                    <td className="py-3 font-mono text-[10px] text-slate-500">{p.slug}</td>
                                    <td className="py-3 text-right font-bold text-slate-700">₹{p.price?.toLocaleString()}</td>
                                    <td className="py-3 text-center font-bold">
                                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100">
                                        {p.status}
                                      </span>
                                    </td>
                                    <td className="py-3 text-right">
                                      <button
                                        onClick={() => handleDeleteProduct(p.id)}
                                        className="text-red-500 hover:text-red-700 font-bold"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            ) : activeTab === 'enterprise' ? (
              /* Enterprise Tab */
              <div className="flex flex-col gap-8 w-full animate-fade-in pb-12">
                <div className="grid lg:grid-cols-12 gap-8 w-full">
                  {/* Left: Add Enterprise Service Form */}
                  <Card variant="glass" className="lg:col-span-4 p-6 bg-white/45 border-white/60 shadow-sm flex flex-col gap-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-indigo-600" />
                        Register Enterprise Service
                      </h3>
                      <p className="text-xs text-slate-500">Record a custom enterprise resource/solution</p>
                    </div>

                    <form onSubmit={handleAddEnterpriseService} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Service Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ERP Solutions"
                          value={newEntService.name}
                          onChange={(e) => setNewEntService({ ...newEntService, name: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Slug *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. erp"
                          value={newEntService.slug}
                          onChange={(e) => setNewEntService({ ...newEntService, slug: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Category *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. ERP"
                            value={newEntService.category}
                            onChange={(e) => setNewEntService({ ...newEntService, category: e.target.value })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Sort Order *</label>
                          <input
                            type="number"
                            required
                            placeholder="Sort Order"
                            value={newEntService.sortOrder}
                            onChange={(e) => setNewEntService({ ...newEntService, sortOrder: parseInt(e.target.value) || 0 })}
                            className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Features (comma separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. Inventory, Finance, HR"
                          value={newEntService.features}
                          onChange={(e) => setNewEntService({ ...newEntService, features: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Technologies (comma separated)</label>
                        <input
                          type="text"
                          placeholder="e.g. Next.js, PostgreSQL"
                          value={newEntService.technologies}
                          onChange={(e) => setNewEntService({ ...newEntService, technologies: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Description</label>
                        <textarea
                          placeholder="Brief summary of this enterprise service..."
                          rows={3}
                          value={newEntService.description}
                          onChange={(e) => setNewEntService({ ...newEntService, description: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />
                      </div>

                      <Button type="submit" variant="primary" className="mt-2 font-bold uppercase tracking-wider rounded-xl py-2">
                        Add Service
                      </Button>
                    </form>
                  </Card>

                  {/* Right: Services List */}
                  <Card variant="glass" className="lg:col-span-8 p-6 md:p-8 bg-white/45 border-white/60 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="font-display font-bold text-lg text-slate-800">Enterprise Service Catalog</h3>
                          <p className="text-xs text-slate-500">Manage digital transformation options</p>
                        </div>
                        <div className="relative w-48">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Search className="h-3.5 w-3.5" />
                          </span>
                          <input
                            type="text"
                            placeholder="Filter name or slug..."
                            value={entSearchQuery}
                            onChange={(e) => setEntSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1.5 rounded-lg text-[10px] border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                          />
                        </div>
                      </div>

                      {entLoading ? (
                        <div className="py-12 flex justify-center text-slate-400 font-bold animate-pulse text-sm">
                          Loading enterprise services...
                        </div>
                      ) : entServices.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 text-sm font-medium">
                          No enterprise services registered.
                        </div>
                      ) : (
                        <div className="overflow-x-auto w-full">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                <th className="pb-3 w-[180px]">Service Name</th>
                                <th className="pb-3">Slug</th>
                                <th className="pb-3">Category</th>
                                <th className="pb-3">Features & Tech</th>
                                <th className="pb-3 text-right w-[80px]">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                              {entServices
                                .filter((es) =>
                                  es.name?.toLowerCase()?.includes(entSearchQuery.toLowerCase()) ||
                                  es.slug?.toLowerCase()?.includes(entSearchQuery.toLowerCase())
                                )
                                .map((es) => (
                                  <tr key={es.id} className="hover:bg-slate-50/20 transition-colors">
                                    <td className="py-3 font-semibold text-slate-800">
                                      {es.name}
                                      <p className="text-[10px] text-slate-400 font-normal mt-0.5 truncate max-w-[220px]">{es.description}</p>
                                    </td>
                                    <td className="py-3 font-mono text-[10px] text-slate-500">{es.slug}</td>
                                    <td className="py-3 font-medium">{es.category}</td>
                                    <td className="py-3">
                                      {es.features && es.features.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-1">
                                          {es.features.slice(0, 3).map((f: string, i: number) => (
                                            <span key={i} className="px-1 py-0.5 rounded text-[8px] bg-slate-100 text-slate-600 border border-slate-200">{f}</span>
                                          ))}
                                          {es.features.length > 3 && <span className="text-[8px] text-slate-400 font-bold">+{es.features.length - 3} more</span>}
                                        </div>
                                      )}
                                      {es.technologies && es.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {es.technologies.slice(0, 3).map((t: string, i: number) => (
                                            <span key={i} className="px-1 py-0.5 rounded text-[8px] bg-indigo-50 text-indigo-600 border border-indigo-100">{t}</span>
                                          ))}
                                        </div>
                                      )}
                                    </td>
                                    <td className="py-3 text-right">
                                      <button
                                        onClick={() => handleDeleteEnterpriseService(es.id)}
                                        className="text-red-500 hover:text-red-700 font-bold"
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            ) : activeTab === 'billing' ? (
              /* Razorpay Billing Tab */
              <div className="flex flex-col gap-6 w-full animate-fade-in pb-12">
                <Card variant="glass" className="p-6 md:p-8 bg-white/45 border-white/60 shadow-sm w-full">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800">Razorpay Integration Invoices</h3>
                      <p className="text-xs text-slate-500">Live webhook transaction logs</p>
                    </div>
                    <Button onClick={fetchBilling} variant="outline" size="sm" className="text-xs">
                      Sync Webhooks
                    </Button>
                  </div>

                  {billingLoading ? (
                    <div className="py-12 flex justify-center text-slate-400 font-bold animate-pulse text-sm">
                      Syncing transaction registries...
                    </div>
                  ) : billing.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-sm font-medium">
                      No billing logs received.
                    </div>
                  ) : (
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                            <th className="pb-3">Transaction ID</th>
                            <th className="pb-3">Billing Email</th>
                            <th className="pb-3">Product / Module</th>
                            <th className="pb-3 text-right">Amount</th>
                            <th className="pb-3 text-center">Status</th>
                            <th className="pb-3 text-right">Date & Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                          {billing.map((b) => (
                            <tr key={b.id} className="hover:bg-slate-50/20 transition-colors">
                              <td className="py-3 font-mono font-bold text-indigo-600">{b.paymentId}</td>
                              <td className="py-3 font-semibold text-slate-800">{b.email}</td>
                              <td className="py-3 text-slate-600 font-medium">{b.product}</td>
                              <td className="py-3 text-right font-extrabold text-slate-800">{b.amount}</td>
                              <td className="py-3 text-center">
                                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase ${b.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                                  }`}>
                                  {b.status}
                                </span>
                              </td>
                              <td className="py-3 text-right text-slate-500 font-medium">
                                {new Date(b.date).toLocaleString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>
              </div>
            ) : activeTab === 'createadmin' ? (
              /* Create Admin Tab */
              <div className="flex flex-col gap-8 w-full animate-fade-in pb-12">
                <div className="grid lg:grid-cols-12 gap-8 w-full">
                  {/* Left: Create Admin Form */}
                  <Card variant="glass" className="lg:col-span-5 p-6 bg-white/45 border-white/60 shadow-sm flex flex-col gap-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                        <UserPlus className="h-5 w-5 text-indigo-600" />
                        Create New Administrator
                      </h3>
                      <p className="text-xs text-slate-500">Register new administrative credentials</p>
                    </div>

                    <form onSubmit={handleCreateAdmin} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. john@algoguido.com"
                          value={newAdmin.email}
                          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Password *</label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={newAdmin.password}
                          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">System Role *</label>
                        <select
                          value={newAdmin.role}
                          onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                          className="px-3.5 py-2 rounded-xl text-sm border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="ADMIN">Admin (Restricted access)</option>
                          <option value="SUPER_ADMIN">Super Admin (Full access)</option>
                          <option value="EDITOR">Editor (Content manager)</option>
                          <option value="VIEWER">Viewer (Read-only)</option>
                        </select>
                      </div>

                      <Button type="submit" variant="primary" className="mt-2 font-bold uppercase tracking-wider rounded-xl py-2 flex items-center justify-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Create Account
                      </Button>
                    </form>
                  </Card>

                  {/* Right: Active Administrators List */}
                  <Card variant="glass" className="lg:col-span-7 p-6 md:p-8 bg-white/45 border-white/60 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="font-display font-bold text-lg text-slate-800">System Administrators</h3>
                          <p className="text-xs text-slate-500">Manage console gatekeeper registries</p>
                        </div>
                        <Button onClick={fetchUsers} variant="outline" size="sm" className="text-xs shrink-0">
                          Refresh
                        </Button>
                      </div>

                      {usersLoading ? (
                        <div className="py-12 flex justify-center text-slate-400 font-bold animate-pulse text-sm">
                          Loading active administrators...
                        </div>
                      ) : users.length === 0 ? (
                        <div className="py-12 text-center text-slate-400 text-sm font-medium">
                          No administrators registered.
                        </div>
                      ) : (
                        <div className="overflow-x-auto w-full">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-slate-200/50 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                                <th className="pb-3">Admin User</th>
                                <th className="pb-3">System Role</th>
                                <th className="pb-3 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                              {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50/20 transition-colors">
                                  <td className="py-3.5">
                                    <div className="font-semibold text-slate-800">{u.name}</div>
                                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{u.email}</div>
                                  </td>
                                  <td className="py-3.5">
                                    <span className={`inline-block text-[9px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded-md ${u.role === 'SUPER_ADMIN' ? 'bg-violet-100 text-violet-700' :
                                        u.role === 'ADMIN' ? 'bg-sky-100 text-sky-700' :
                                          u.role === 'EDITOR' ? 'bg-amber-100 text-amber-700' :
                                            'bg-slate-100 text-slate-700'
                                      }`}>
                                      {u.role === 'SUPER_ADMIN' ? 'Super Admin' : u.role}
                                    </span>
                                  </td>
                                  <td className="py-3.5 text-right">
                                    <button
                                      onClick={() => handleDeleteUser(u.id)}
                                      className="text-red-500 hover:text-red-700 font-bold hover:underline"
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            ) : activeTab === 'settings' ? (
              /* Settings Panel */
              <div className="flex flex-col gap-8 w-full animate-fade-in pb-12">
                <div className="grid lg:grid-cols-12 gap-8 w-full">
                  {/* Left Column: Admin profile & password change */}
                  <Card variant="glass" className="lg:col-span-6 p-6 md:p-8 bg-white/45 border-white/60 shadow-sm flex flex-col gap-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-indigo-600" />
                        Security Settings
                      </h3>
                      <p className="text-xs text-slate-500">Modify administrative console gatekeeper credentials</p>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); alert('Administrative credentials updated successfully!'); }} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Administrative ID</label>
                        <input
                          type="text"
                          disabled
                          value="algoguidot@gmail.com"
                          className="px-3.5 py-2 rounded-xl text-xs border border-slate-200 bg-slate-100/60 text-slate-500 cursor-not-allowed font-medium"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Current Password</label>
                        <input
                          type="password"
                          placeholder="••••••••••••"
                          className="px-3.5 py-2 rounded-xl text-xs border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-850 font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">New Password</label>
                          <input
                            type="password"
                            placeholder="New password"
                            className="px-3.5 py-2 rounded-xl text-xs border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-850 font-medium"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Confirm Password</label>
                          <input
                            type="password"
                            placeholder="Confirm password"
                            className="px-3.5 py-2 rounded-xl text-xs border border-slate-200 bg-white/65 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-850 font-medium"
                          />
                        </div>
                      </div>
                      <Button type="submit" variant="primary" className="mt-2 font-bold uppercase tracking-wider rounded-xl py-2 flex items-center justify-center h-10">
                        Update Password
                      </Button>
                    </form>
                  </Card>

                  {/* Right Column: API Keys & General Config */}
                  <Card variant="glass" className="lg:col-span-6 p-6 md:p-8 bg-white/45 border-white/60 shadow-sm flex flex-col gap-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
                        System Configurations
                      </h3>
                      <p className="text-xs text-slate-500">Configure global telemetry nodes and AI APIs</p>
                    </div>

                    <div className="flex flex-col gap-5 text-slate-800">
                      {/* SMTP Node */}
                      <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/60 border border-slate-200/40">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">SMTP Email Dispatch Node</span>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div className="col-span-2">
                            <input
                              type="text"
                              value="smtp.algoguido.com"
                              disabled
                              className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 bg-slate-50 text-slate-500 w-full cursor-not-allowed font-medium"
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              value="Port 465"
                              disabled
                              className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 bg-slate-50 text-slate-500 w-full text-center cursor-not-allowed font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* AI Model Config */}
                      <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/60 border border-slate-200/40">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active AI Reasoning Agent</span>
                        <select className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 bg-white/70 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-700">
                          <option>Gemini 2.0 Flash (Recommended)</option>
                          <option>Gemini 1.5 Pro</option>
                          <option>GPT-4o Integration</option>
                        </select>
                      </div>

                      {/* Razorpay Integration webhook */}
                      <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/60 border border-slate-200/40">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Razorpay Webhook Secret</span>
                        <input
                          type="password"
                          value="whsec_123890123890123"
                          disabled
                          className="px-3 py-1.5 rounded-lg text-xs border border-slate-200 bg-slate-50 text-slate-500 w-full cursor-not-allowed font-mono font-bold"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              /* Default / Fallback */
              <Card variant="glass" className="p-8 bg-white/40 border-white/60 min-h-[400px] flex flex-col items-center justify-center text-center">
                <span className="p-4 rounded-2xl bg-slate-100 text-slate-500 border border-slate-200/60 mb-4 animate-float">
                  <ShieldCheck className="h-8 w-8" />
                </span>
                <h3 className="font-display font-bold text-xl text-slate-800">Component Workspace</h3>
                <p className="text-slate-500 text-sm max-w-sm mt-2">
                  This console module is connected to telemetry nodes. Database operations for {navigationItems.find((item) => item.id === activeTab)?.name} are currently operational in the backend.
                </p>
              </Card>
            )}
          </motion.div>
        </div>
      </main>

      {/* WhatsApp Send Dialog Modal */}
      <AnimatePresence>
        {isWaModalOpen && selectedLeadForWa && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200/50 w-full max-w-lg rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl relative text-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsWaModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                  💬 WhatsApp Conversion Node
                </span>
                <h3 className="font-display font-extrabold text-2xl text-slate-950 tracking-tight">
                  Connect with {selectedLeadForWa.name}
                </h3>
                <p className="text-slate-500 text-xs font-medium">
                  Choose a template or customize the text to send on WhatsApp to: <span className="font-bold text-slate-850">{selectedLeadForWa.phone}</span>
                </p>
              </div>

              {/* Template Selectors */}
              <div className="flex p-1 rounded-xl bg-slate-100 border border-slate-200/50 w-full">
                <button
                  type="button"
                  onClick={() => setWaMsgType('conversion')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 ${waMsgType === 'conversion'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                    }`}
                >
                  🚀 Conversion Pitch
                </button>
                <button
                  type="button"
                  onClick={() => setWaMsgType('payment')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-300 ${waMsgType === 'payment'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                    }`}
                >
                  💳 Invoice Payment Link
                </button>
              </div>

              {/* Message Editor Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Customize Message</label>
                <textarea
                  rows={6}
                  value={waCustomMessage}
                  onChange={(e) => setWaCustomMessage(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl text-xs border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium text-slate-700 leading-relaxed"
                />
              </div>

              <div className="flex gap-4 mt-2">
                <Button
                  onClick={() => setIsWaModalOpen(false)}
                  variant="outline"
                  className="flex-1 rounded-xl py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendWhatsApp}
                  variant="primary"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider rounded-xl py-2 flex items-center justify-center gap-1.5 border-none"
                >
                  Launch WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lifted Lead Detail Modal Popup (Rendered at root for absolute z-index priority) */}
      {selectedLeadDetail && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedLeadDetail(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Lead Detail</h2>
                <p className="text-xs text-slate-400 mt-0.5">ID: {selectedLeadDetail.id}</p>
              </div>
              <button onClick={() => setSelectedLeadDetail(null)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Body */}
            <div className="px-7 py-6 flex flex-col gap-6 overflow-y-auto flex-grow">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedLeadDetail.name || '—'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                  <span className="text-sm text-slate-700">{selectedLeadDetail.email || '—'}</span>
                </div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</span>
                  <span className="text-sm text-slate-700">{selectedLeadDetail.phone || '—'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company / Institution</span>
                  <span className="text-sm text-slate-700">{selectedLeadDetail.company || 'Individual'}</span>
                </div>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pipeline Stage</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg w-fit ${selectedLeadDetail.stage === 'QUALIFIED' ? 'bg-emerald-100 text-emerald-700' :
                      selectedLeadDetail.stage === 'CONTACTED' ? 'bg-cyan-100 text-cyan-700' :
                        selectedLeadDetail.stage === 'NEGOTIATION' ? 'bg-purple-100 text-purple-700' :
                          'bg-indigo-100 text-indigo-700'
                    }`}>{selectedLeadDetail.stage || '—'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Score</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg w-fit ${selectedLeadDetail.score >= 85 ? 'bg-emerald-100 text-emerald-700' :
                      selectedLeadDetail.score >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>{selectedLeadDetail.score ?? '—'}/100</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Source</span>
                  <span className="text-xs text-slate-600 font-semibold">{selectedLeadDetail.source || '—'}</span>
                </div>
              </div>
              {/* Message / Notes */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message / Inquiry</span>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedLeadDetail.message || selectedLeadDetail.notes?.[0]?.content || '—'}
                </div>
              </div>
              {/* Notes */}
              {selectedLeadDetail.notes && selectedLeadDetail.notes.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CRM Notes ({selectedLeadDetail.notes.length})</span>
                  {selectedLeadDetail.notes.map((note: any, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </div>
                  ))}
                </div>
              )}
              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created At</span>
                  <span className="text-xs text-slate-500">{selectedLeadDetail.createdAt ? new Date(selectedLeadDetail.createdAt).toLocaleString('en-IN') : '—'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</span>
                  <span className="text-xs text-slate-500">{selectedLeadDetail.updatedAt ? new Date(selectedLeadDetail.updatedAt).toLocaleString('en-IN') : '—'}</span>
                </div>
              </div>
            </div>
            {/* Footer Actions */}
            <div className="px-7 py-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              {selectedLeadDetail.phone && (
                <button
                  onClick={() => { handleOpenWhatsAppModal(selectedLeadDetail); setSelectedLeadDetail(null); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24z" /></svg>
                  WhatsApp
                </button>
              )}
              <button onClick={() => setSelectedLeadDetail(null)} className="ml-auto px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Lifted Application Detail Modal Popup (Rendered at root for absolute z-index priority) */}
      {selectedAppDetail && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedAppDetail(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Application Detail</h2>
                <p className="text-xs text-slate-400 mt-0.5">ID: {selectedAppDetail.id}</p>
              </div>
              <button onClick={() => setSelectedAppDetail(null)} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* Body */}
            <div className="px-7 py-6 flex flex-col gap-6 overflow-y-auto flex-grow">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate Name</span>
                  <span className="text-sm font-semibold text-slate-800">{selectedAppDetail.name || '—'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                  <span className="text-sm text-slate-700">{selectedAppDetail.email || '—'}</span>
                </div>
              </div>
              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</span>
                  <span className="text-sm text-slate-700">{selectedAppDetail.phone || '—'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">University / College</span>
                  <span className="text-sm text-slate-700">{selectedAppDetail.company || '—'}</span>
                </div>
              </div>
              {/* Row 3 */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Program Type</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg w-fit bg-indigo-100 text-indigo-700">{selectedAppDetail.program || 'Industry Internship'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Score</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg w-fit ${(selectedAppDetail.score || 85) >= 85 ? 'bg-emerald-100 text-emerald-700' :
                      (selectedAppDetail.score || 85) >= 70 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                    }`}>{selectedAppDetail.score || 85}/100</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pipeline Stage</span>
                  <span className="text-xs text-slate-600 font-semibold">{selectedAppDetail.stage || 'NEW'}</span>
                </div>
              </div>
              {/* Skills */}
              {selectedAppDetail.skills && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Core Skillset</span>
                  <span className="text-sm font-mono text-slate-700">{selectedAppDetail.skills}</span>
                </div>
              )}
              {/* Message / Notes */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Application Message / Notes</span>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedAppDetail.message || selectedAppDetail.notes?.[0]?.content || '—'}
                </div>
              </div>
              {/* All Notes */}
              {selectedAppDetail.notes && selectedAppDetail.notes.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CRM Notes ({selectedAppDetail.notes.length})</span>
                  {selectedAppDetail.notes.map((note: any, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-purple-50 border border-purple-100 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </div>
                  ))}
                </div>
              )}
              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Applied At</span>
                  <span className="text-xs text-slate-500">{selectedAppDetail.createdAt ? new Date(selectedAppDetail.createdAt).toLocaleString('en-IN') : '—'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</span>
                  <span className="text-xs text-slate-500">{selectedAppDetail.updatedAt ? new Date(selectedAppDetail.updatedAt).toLocaleString('en-IN') : '—'}</span>
                </div>
              </div>
            </div>
            {/* Footer Actions */}
            <div className="px-7 py-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              {selectedAppDetail.phone && (
                <button
                  onClick={() => { handleOpenWhatsAppModal(selectedAppDetail); setSelectedAppDetail(null); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24z" /></svg>
                  WhatsApp
                </button>
              )}
              <button onClick={() => setSelectedAppDetail(null)} className="ml-auto px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
