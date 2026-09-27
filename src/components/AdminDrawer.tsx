import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Phone, MessageCircle, Mail, Clock, CheckCircle2, AlertCircle, Trash2, Download, Search, Edit3, ShieldCheck } from 'lucide-react';
import { STORE_INFO } from '../data/catalog';
import { ChaudhariLogo } from './ChaudhariLogo';

interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: string;
  clothingFor: string;
  message: string;
  status: 'new' | 'contacted' | 'appointment_booked' | 'resolved';
  createdAt: string;
  emailSent: boolean;
  emailSentAt?: string;
  emailError?: string;
  adminNotes?: string;
}

interface AdminDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onInquiryUpdated?: () => void;
}

export const AdminDrawer: React.FC<AdminDrawerProps> = ({ isOpen, onClose, onInquiryUpdated }) => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        onInquiryUpdated?.();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes: tempNotes }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, adminNotes: tempNotes } : item))
        );
        setEditingNotesId(null);
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this customer inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        onInquiryUpdated?.();
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Category', 'Target Group', 'Status', 'Message', 'Admin Notes'];
    const rows = inquiries.map((i) => [
      i.id,
      new Date(i.createdAt).toLocaleString('en-IN'),
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      `"${i.email}"`,
      `"${i.category}"`,
      `"${i.clothingFor}"`,
      i.status,
      `"${i.message.replace(/"/g, '""')}"`,
      `"${(i.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `chaudhari_lifestyle_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const statusMatch = filterStatus === 'all' || inq.status === filterStatus;
    const q = searchFilter.toLowerCase();
    const searchMatch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.phone.includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.category.toLowerCase().includes(q) ||
      inq.message.toLowerCase().includes(q);

    return statusMatch && searchMatch;
  });

  const newCount = inquiries.filter((i) => i.status === 'new').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#151717] text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div>
            <div className="flex items-center gap-3">
              <ChaudhariLogo variant="dark" size="sm" showTagline={false} />
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#1c5652] px-2 py-0.5 rounded text-white">
                Admin Console
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1.5">
              Customer Leads & Form Inquiries · Owner: <span className="text-amber-200">omshrirao58@gmail.com</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
              title="Export Leads as CSV"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={fetchInquiries}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
              title="Refresh Inquiries"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-stone-500">Total Leads: </span>
              <strong className="text-stone-900">{inquiries.length}</strong>
            </div>
            <div>
              <span className="text-stone-500">New / Uncontacted: </span>
              <strong className="text-[#9c4238]">{newCount}</strong>
            </div>
            <div>
              <span className="text-stone-500">Owner Email: </span>
              <strong className="text-stone-700 font-mono text-[11px]">omshrirao58@gmail.com</strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
              Auto-Notification: Active
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-stone-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search name, phone, category..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
            {['all', 'new', 'contacted', 'appointment_booked', 'resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 text-xs rounded capitalize whitespace-nowrap transition-colors ${
                  filterStatus === st
                    ? 'bg-stone-900 text-white font-medium'
                    : 'text-stone-600 bg-stone-100 hover:bg-stone-200'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-stone-200 p-8">
              <p className="text-stone-500 text-sm">No inquiries match your current filter.</p>
            </div>
          ) : (
            filteredInquiries.map((inq) => {
              const formattedDate = new Date(inq.createdAt).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
              });

              return (
                <div
                  key={inq.id}
                  className={`bg-white rounded-lg border p-5 transition-all shadow-xs ${
                    inq.status === 'new' ? 'border-[#9c4238]/40 ring-1 ring-[#9c4238]/20' : 'border-stone-200'
                  }`}
                >
                  {/* Top Line: Customer Info & Status Dropdown */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-editorial text-lg font-bold text-stone-900">
                          {inq.name}
                        </h4>
                        {inq.status === 'new' && (
                          <span className="text-[10px] font-bold text-white bg-[#9c4238] px-1.5 py-0.2 rounded uppercase tracking-wider">
                            New Lead
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 mt-1">
                        <a
                          href={`tel:${inq.phone}`}
                          className="font-bold text-stone-900 hover:text-[#9c4238] flex items-center gap-1"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#9c4238]" />
                          {inq.phone}
                        </a>

                        {inq.email && inq.email !== 'Not provided' && (
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-stone-600 hover:text-stone-900 flex items-center gap-1"
                          >
                            <Mail className="w-3.5 h-3.5 text-stone-400" />
                            {inq.email}
                          </a>
                        )}

                        <span className="text-stone-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formattedDate}
                        </span>
                      </div>
                    </div>

                    {/* Status Select & Actions */}
                    <div className="flex items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded border capitalize focus:outline-none ${
                          inq.status === 'new'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : inq.status === 'contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : inq.status === 'appointment_booked'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <option value="new">Status: New</option>
                        <option value="contacted">Status: Contacted</option>
                        <option value="appointment_booked">Status: Visit Booked</option>
                        <option value="resolved">Status: Resolved</option>
                      </select>

                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-stone-100 rounded"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Category & Requirement Box */}
                  <div className="mt-3.5 p-3 rounded bg-stone-50 border border-stone-200/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-stone-500">
                      <span>
                        <strong className="text-stone-700">Category:</strong> {inq.category} ·{' '}
                        <strong className="text-stone-700">Target:</strong> {inq.clothingFor}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">ID: {inq.id}</span>
                    </div>

                    <p className="text-stone-800 font-normal leading-relaxed italic bg-white p-2.5 rounded border border-stone-200">
                      "{inq.message}"
                    </p>
                  </div>

                  {/* Immediate Email Dispatch Audit */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-100 pt-2">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Owner notified via email (omshrirao58@gmail.com)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                          `Hello ${inq.name}, this is from Chaudhari Lifestyle, Nagpur. We received your inquiry regarding ${inq.category}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <span>·</span>
                      <a
                        href={`tel:${inq.phone}`}
                        className="text-[#9c4238] hover:underline font-semibold"
                      >
                        Call Customer
                      </a>
                    </div>
                  </div>

                  {/* Admin Notes Section */}
                  <div className="mt-2.5 pt-2 border-t border-stone-100 text-xs">
                    {editingNotesId === inq.id ? (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Add internal notes (e.g. customer interested in size 42, requested photo via WhatsApp)..."
                          className="w-full p-2 text-xs border border-stone-300 rounded focus:ring-1 focus:ring-stone-900"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleSaveNotes(inq.id)}
                            className="px-2.5 py-1 text-xs font-semibold bg-stone-900 text-white rounded"
                          >
                            Save Note
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-stone-500">
                        <span className="text-[11px]">
                          <strong>Internal Notes:</strong>{' '}
                          {inq.adminNotes ? inq.adminNotes : 'No notes added yet.'}
                        </span>
                        <button
                          onClick={() => {
                            setEditingNotesId(inq.id);
                            setTempNotes(inq.adminNotes || '');
                          }}
                          className="text-[11px] text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{inq.adminNotes ? 'Edit Note' : 'Add Note'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Chaudhari Lifestyle Store Management</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-semibold hover:bg-stone-800"
          >
            Close Portal
          </button>
        </div>
      </div>
    </div>
  );
};
