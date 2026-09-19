import { X, Package, MapPin, User as UserIcon, Mail, Clock, DollarSign, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import type { Order, OrderStatus } from '../data/mockData';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void;
}

const STATUS_OPTIONS: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Manufacturing', 'QC', 'Dispatch', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrderModal({ isOpen, onClose, order, onStatusUpdate }: OrderModalProps) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[20px] font-bold" style={{ color: 'var(--dash-heading)' }}>
                Order {order.id}
              </h2>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-[13px]" style={{ color: 'var(--dash-muted)' }}>
              Placed on {formatDate(order.date)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Section: Quick Actions / Status Update */}
          <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
            <h3 className="text-[14px] font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--dash-heading)' }}>
              <Clock size={16} className="text-[var(--dash-green)]" /> Update Order Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(status => (
                <button
                  key={status}
                  onClick={() => onStatusUpdate(order.id, status)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                    order.status === status 
                      ? 'bg-[var(--dash-green)] text-white shadow-md' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pt-4 pb-8">
            <div className="absolute top-[3.75rem] left-0 right-0 h-1 bg-slate-100 rounded-full" />
            <div 
              className="absolute top-[3.75rem] left-0 h-1 bg-[var(--dash-green)] rounded-full transition-all duration-700 ease-out" 
              style={{ 
                width: `${(STATUS_OPTIONS.indexOf(order.status) / (STATUS_OPTIONS.length - 1)) * 100}%` 
              }}
            />
            <div className="relative flex justify-between gap-2">
              {STATUS_OPTIONS.filter(s => !['Cancelled'].includes(s)).map((status) => {
                const isCompleted = STATUS_OPTIONS.indexOf(order.status) >= STATUS_OPTIONS.indexOf(status);
                const isCurrent = order.status === status;
                
                return (
                  <div key={status} className="flex flex-col items-center gap-3 flex-1 min-w-0">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 ${
                        isCurrent 
                          ? 'bg-white border-[var(--dash-green)] scale-110 shadow-lg' 
                          : isCompleted 
                            ? 'bg-[var(--dash-green)] border-[var(--dash-green)]' 
                            : 'bg-white border-slate-100'
                      }`}
                    >
                      {isCompleted && !isCurrent ? (
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      ) : isCurrent ? (
                        <div className="w-3 h-3 bg-[var(--dash-green)] rounded-full animate-pulse" />
                      ) : (
                        <div className="w-2 h-2 bg-slate-200 rounded-full" />
                      )}
                    </div>
                    <span 
                      className={`text-[10px] font-bold text-center leading-tight transition-colors ${
                        isCurrent ? 'text-[var(--dash-green)]' : isCompleted ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* Customer & Shipping */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--dash-muted)' }}>
                  Customer Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                      <UserIcon size={16} />
                    </div>
                    <p className="text-[14px] font-medium" style={{ color: 'var(--dash-heading)' }}>{order.customerName || 'Anonymous'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                    <p className="text-[14px]" style={{ color: 'var(--dash-body)' }}>{order.customerEmail || 'No email provided'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--dash-muted)' }}>
                  Shipping Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} />
                    </div>
                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--dash-body)' }}>{order.address}</p>
                  </div>
                  {order.trackingId && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--dash-soft-green)] text-[var(--dash-green)] flex items-center justify-center">
                        <Package size={16} />
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-mono font-medium" style={{ color: 'var(--dash-heading)' }}>{order.trackingId}</p>
                        <button className="text-[var(--dash-green)] hover:underline flex items-center gap-1 text-[12px] font-bold">
                          Track <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items & Summary */}
            <div className="space-y-6">
              <div>
                <h3 className="text-[13px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--dash-muted)' }}>
                  Order Items
                </h3>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Package size={18} className="text-slate-400" />
                        </div>
                        <p className="text-[14px] font-medium truncate max-w-[150px]" style={{ color: 'var(--dash-heading)' }}>{item}</p>
                      </div>
                      <p className="text-[13px] font-bold" style={{ color: 'var(--dash-green)' }}>x1</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-dashed border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Subtotal</p>
                  <p className="text-[14px] font-medium" style={{ color: 'var(--dash-heading)' }}>{formatCurrency(order.total)}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Shipping</p>
                  <p className="text-[14px] font-medium text-emerald-500">Free</p>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-200">
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} className="text-[var(--dash-green)]" />
                    <span className="text-[14px] font-medium opacity-80">Total Amount</span>
                  </div>
                  <span className="text-[20px] font-bold">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 flex-shrink-0 bg-slate-50/30">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-slate-200 text-[14px] font-semibold hover:bg-white transition-colors"
          >
            Close Details
          </button>
          <button
            className="px-8 py-2.5 rounded-xl text-white text-[14px] font-bold hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2"
            style={{ background: 'var(--dash-green)' }}
          >
            Print Invoice <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
