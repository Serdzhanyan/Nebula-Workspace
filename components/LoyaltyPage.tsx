
import React, { useState } from 'react';
import { 
  Heart, Plus, Search, Filter, Megaphone, Mail, Tag, 
  Calendar, BarChart2, Users, Gift, TrendingUp, MoreHorizontal,
  CheckCircle2, X, Save, Clock, ArrowRight, Percent, Smartphone, Share2,
  AlertCircle, DollarSign, Calculator, Trash2, Edit2, Eye, Send
} from 'lucide-react';

interface LoyaltyCampaign {
  id: string;
  name: string;
  type: 'Email' | 'SMS' | 'Push' | 'Social';
  status: 'Draft' | 'Scheduled' | 'Active' | 'Completed';
  audience: string;
  sent: number;
  openRate: number;
  clickRate: number;
  date: string;
}

interface Promotion {
  id: string;
  name: string;
  code: string;
  type: 'Discount' | 'BOGO' | 'Free Shipping' | 'Offer';
  value: string;
  status: 'Active' | 'Expired' | 'Scheduled';
  usage: number;
  startDate: string;
  endDate: string;
  description?: string;
}

export const LoyaltyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'promotions' | 'members'>('campaigns');
  const [searchTerm, setSearchTerm] = useState("");
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<LoyaltyCampaign | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  // Calculator State
  const [calcPrice, setCalcPrice] = useState<number | ''>('');
  const [calcDiscount, setCalcDiscount] = useState<number | ''>('');
  const [calcType, setCalcType] = useState<'percent' | 'fixed'>('percent');

  // Mock Data
  const [campaigns, setCampaigns] = useState<LoyaltyCampaign[]>([
    { id: '1', name: 'Summer Sale Blast', type: 'Email', status: 'Completed', audience: 'All Customers', sent: 12500, openRate: 24.5, clickRate: 3.2, date: 'Jun 15, 2024' },
    { id: '2', name: 'VIP Early Access', type: 'SMS', status: 'Active', audience: 'VIP Segment', sent: 450, openRate: 92.0, clickRate: 45.1, date: 'Oct 24, 2024' },
    { id: '3', name: 'Abandon Cart Recovery', type: 'Email', status: 'Active', audience: 'Dynamic', sent: 120, openRate: 45.0, clickRate: 12.5, date: 'Ongoing' },
    { id: '4', name: 'Black Friday Teaser', type: 'Social', status: 'Scheduled', audience: 'Followers', sent: 0, openRate: 0, clickRate: 0, date: 'Nov 20, 2024' },
    { id: '5', name: 'New Product Announcement', type: 'Push', status: 'Draft', audience: 'Mobile Users', sent: 0, openRate: 0, clickRate: 0, date: 'TBD' },
  ]);

  const [promotions, setPromotions] = useState<Promotion[]>([
    { id: '1', name: 'Welcome Discount', code: 'WELCOME10', type: 'Discount', value: '10%', status: 'Active', usage: 1245, startDate: 'Jan 01, 2024', endDate: 'Dec 31, 2024', description: 'Standard welcome offer for new signups.' },
    { id: '2', name: 'Flash Sale', code: 'FLASH50', type: 'Discount', value: '50%', status: 'Expired', usage: 560, startDate: 'Oct 01, 2024', endDate: 'Oct 02, 2024', description: '24-hour flash sale on clearance items.' },
    { id: '3', name: 'Free Ship Over $50', code: 'FREESHIP', type: 'Free Shipping', value: '$0', status: 'Active', usage: 890, startDate: 'Jan 01, 2024', endDate: 'Ongoing', description: 'Auto-applied on qualifying carts.' },
    { id: '4', name: 'Buy 1 Get 1', code: 'BOGO24', type: 'BOGO', value: '100%', status: 'Scheduled', usage: 0, startDate: 'Nov 01, 2024', endDate: 'Nov 30, 2024', description: 'Special offer for accessories.' },
  ]);

  // Form States
  const [newCampaign, setNewCampaign] = useState({ name: '', type: 'Email', audience: '' });
  const [newPromo, setNewPromo] = useState({ name: '', code: '', type: 'Discount', value: '', description: '' });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const campaign: LoyaltyCampaign = {
        id: Date.now().toString(),
        name: newCampaign.name,
        type: newCampaign.type as any,
        status: 'Draft',
        audience: newCampaign.audience || 'All Customers',
        sent: 0, openRate: 0, clickRate: 0,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setCampaigns([campaign, ...campaigns]);
    setShowCampaignModal(false);
    setNewCampaign({ name: '', type: 'Email', audience: '' });
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    const promo: Promotion = {
        id: Date.now().toString(),
        name: newPromo.name,
        code: newPromo.code.toUpperCase(),
        type: newPromo.type as any,
        value: newPromo.value,
        status: 'Scheduled',
        usage: 0,
        startDate: new Date().toLocaleDateString(),
        endDate: 'TBD',
        description: newPromo.description
    };
    setPromotions([promo, ...promotions]);
    setShowPromoModal(false);
    setNewPromo({ name: '', code: '', type: 'Discount', value: '', description: '' });
  };

  const deletePromo = (id: string) => {
      if(window.confirm('Are you sure you want to delete this offer?')) {
          setPromotions(promotions.filter(p => p.id !== id));
      }
  };

  // Calculator Logic
  const calculateFinalPrice = () => {
      if (!calcPrice) return 0;
      if (!calcDiscount) return Number(calcPrice);
      
      const price = Number(calcPrice);
      const discount = Number(calcDiscount);
      
      if (calcType === 'percent') {
          return price - (price * (discount / 100));
      } else {
          return Math.max(0, price - discount);
      }
  };

  const calculateSavings = () => {
      if (!calcPrice) return 0;
      return Number(calcPrice) - calculateFinalPrice();
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/30';
          case 'Completed': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/30';
          case 'Scheduled': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/30';
          case 'Expired': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/30';
          default: return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600';
      }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Email': return <Mail size={16} />;
          case 'SMS': return <Smartphone size={16} />;
          case 'Social': return <Share2 size={16} />;
          default: return <Megaphone size={16} />;
      }
  };

  const filteredCampaigns = campaigns.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPromotions = promotions.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedCampaign(null)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        {getTypeIcon(selectedCampaign.type)}
                        Campaign Details
                    </h3>
                    <button onClick={() => setSelectedCampaign(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(selectedCampaign.status)}`}>
                                {selectedCampaign.status}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Calendar size={12} /> {selectedCampaign.date}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{selectedCampaign.name}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Target Audience</span>
                            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Users size={16} className="text-indigo-500" />
                                {selectedCampaign.audience}
                            </span>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Total Sent</span>
                            <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Send size={16} className="text-emerald-500" />
                                {selectedCampaign.sent.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Open Rate</span>
                                <span className="font-bold text-slate-900 dark:text-white">{selectedCampaign.openRate}%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${selectedCampaign.openRate}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Click Rate</span>
                                <span className="font-bold text-slate-900 dark:text-white">{selectedCampaign.clickRate}%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${selectedCampaign.clickRate}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-700">
                        <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            Duplicate
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                            View Full Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Promotion Detail Modal */}
      {selectedPromotion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedPromotion(null)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Tag size={20} className="text-indigo-600 dark:text-indigo-400" />
                        Promotion Details
                    </h3>
                    <button onClick={() => setSelectedPromotion(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Content */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(selectedPromotion.status)}`}>
                                {selectedPromotion.status}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Calendar size={12} /> {selectedPromotion.startDate} - {selectedPromotion.endDate}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{selectedPromotion.name}</h2>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">Promo Code</span>
                        <code className="text-3xl font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">{selectedPromotion.code}</code>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Type</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{selectedPromotion.type}</span>
                        </div>
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Value</span>
                            <span className="font-semibold text-slate-900 dark:text-white">{selectedPromotion.value}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Description</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {selectedPromotion.description || "No description provided."}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-4">
                        <Users size={16} /> Total Usage: <span className="font-bold text-slate-900 dark:text-white">{selectedPromotion.usage}</span>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            Edit
                        </button>
                        <button className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-sm">
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCampaignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowCampaignModal(false)}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Plan Campaign</h3>
                      <button onClick={() => setShowCampaignModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Campaign Name</label>
                          <input required type="text" value={newCampaign.name} onChange={e => setNewCampaign({...newCampaign, name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" placeholder="e.g. Winter Sale" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Type</label>
                              <select value={newCampaign.type} onChange={e => setNewCampaign({...newCampaign, type: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white">
                                  <option>Email</option>
                                  <option>SMS</option>
                                  <option>Push</option>
                                  <option>Social</option>
                              </select>
                          </div>
                          <div>
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Target Audience</label>
                              <select value={newCampaign.audience} onChange={e => setNewCampaign({...newCampaign, audience: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white">
                                  <option value="">Select Segment...</option>
                                  <option>All Customers</option>
                                  <option>VIP</option>
                                  <option>New Users</option>
                                  <option>At Risk</option>
                              </select>
                          </div>
                      </div>
                      <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg">Create Draft</button>
                  </form>
              </div>
          </div>
      )}

      {/* Create Promo Modal */}
      {showPromoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowPromoModal(false)}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
                  <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">New Promotion / Offer</h3>
                      <button onClick={() => setShowPromoModal(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleCreatePromo} className="p-6 space-y-4">
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Offer Name</label>
                          <input required type="text" value={newPromo.name} onChange={e => setNewPromo({...newPromo, name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" placeholder="e.g. Fall Discount" />
                      </div>
                      
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Description / Terms</label>
                          <textarea 
                            value={newPromo.description} 
                            onChange={e => setNewPromo({...newPromo, description: e.target.value})} 
                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none h-20" 
                            placeholder="Describe the offer details..." 
                          />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Promo Code</label>
                              <input required type="text" value={newPromo.code} onChange={e => setNewPromo({...newPromo, code: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white font-mono" placeholder="FALL20" />
                          </div>
                          <div>
                              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Type</label>
                              <select value={newPromo.type} onChange={e => setNewPromo({...newPromo, type: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white">
                                  <option value="Discount">Discount</option>
                                  <option value="BOGO">BOGO</option>
                                  <option value="Free Shipping">Free Shipping</option>
                                  <option value="Offer">Special Offer</option>
                              </select>
                          </div>
                      </div>
                      
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Value (e.g. 20%)</label>
                          <input required type="text" value={newPromo.value} onChange={e => setNewPromo({...newPromo, value: e.target.value})} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white" placeholder="20%" />
                      </div>

                      <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg">Create Offer</button>
                  </form>
              </div>
          </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="text-pink-500" /> Loyalty & Marketing
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Plan, launch, and track marketing campaigns and promotions.
           </p>
        </div>
        
        <div className="flex gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button 
                    onClick={() => setActiveTab('campaigns')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'campaigns' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Campaigns
                </button>
                <button 
                    onClick={() => setActiveTab('promotions')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'promotions' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Promotions
                </button>
                <button 
                    onClick={() => setActiveTab('members')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'members' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    Rewards
                </button>
            </div>
            <button 
                onClick={() => activeTab === 'campaigns' ? setShowCampaignModal(true) : setShowPromoModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none"
            >
                <Plus size={18} /> {activeTab === 'campaigns' ? 'New Campaign' : activeTab === 'promotions' ? 'New Offer' : 'Add Member'}
            </button>
        </div>
      </div>

      {/* KPI Cards (Dynamic based on tab) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <Megaphone size={16} className="text-blue-500" /> Active Campaigns
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {campaigns.filter(c => c.status === 'Active').length}
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <Tag size={16} className="text-emerald-500" /> Active Offers
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {promotions.filter(p => p.status === 'Active').length}
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <TrendingUp size={16} className="text-amber-500" /> Avg. Open Rate
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  32.4%
              </div>
          </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                  type="text" 
                  placeholder={`Search ${activeTab}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400"
              />
          </div>
          <div className="flex gap-3">
              <div className="relative">
                  <select className="appearance-none pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Scheduled</option>
                      <option>Completed</option>
                  </select>
                  <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
          </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
          
          {activeTab === 'campaigns' && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden h-full flex flex-col">
                  <div className="flex-1 overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                          <thead>
                              <tr className="bg-slate-50/50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
                                  <th className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Campaign Name</th>
                                  <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Type</th>
                                  <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                  <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Audience</th>
                                  <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sent</th>
                                  <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Performance</th>
                                  <th className="py-4 pr-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Date</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                              {filteredCampaigns.map((camp) => (
                                  <tr 
                                    key={camp.id} 
                                    onClick={() => setSelectedCampaign(camp)}
                                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer"
                                  >
                                      <td className="py-4 pl-6">
                                          <p className="font-bold text-sm text-slate-900 dark:text-white">{camp.name}</p>
                                      </td>
                                      <td className="py-4">
                                          <span className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                              {getTypeIcon(camp.type)} {camp.type}
                                          </span>
                                      </td>
                                      <td className="py-4">
                                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(camp.status)}`}>
                                              {camp.status}
                                          </span>
                                      </td>
                                      <td className="py-4">
                                          <span className="text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                                              {camp.audience}
                                          </span>
                                      </td>
                                      <td className="py-4 text-sm text-slate-500 dark:text-slate-400">{camp.sent.toLocaleString()}</td>
                                      <td className="py-4">
                                          <div className="flex flex-col gap-1 w-32">
                                              <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold">
                                                  <span>Open Rate</span>
                                                  <span>{camp.openRate}%</span>
                                              </div>
                                              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${camp.openRate}%` }}></div>
                                              </div>
                                          </div>
                                      </td>
                                      <td className="py-4 pr-6 text-right text-sm text-slate-500 dark:text-slate-400">
                                          {camp.date}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          )}

          {activeTab === 'promotions' && (
              <div className="flex flex-col xl:flex-row gap-6 h-full min-h-0">
                  {/* Offers List */}
                  <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
                      <div className="flex-1 overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[700px]">
                              <thead>
                                  <tr className="bg-slate-50/50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
                                      <th className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Promotion / Offer</th>
                                      <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Code</th>
                                      <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Type</th>
                                      <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Value</th>
                                      <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                                      <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Usage</th>
                                      <th className="py-4 pr-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                  {filteredPromotions.map((promo) => (
                                      <tr key={promo.id} onClick={() => setSelectedPromotion(promo)} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer">
                                          <td className="py-4 pl-6">
                                              <div>
                                                  <p className="font-bold text-sm text-slate-900 dark:text-white">{promo.name}</p>
                                                  {promo.description && <p className="text-xs text-slate-500 truncate max-w-[200px]">{promo.description}</p>}
                                              </div>
                                          </td>
                                          <td className="py-4">
                                              <code className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-900/50">{promo.code}</code>
                                          </td>
                                          <td className="py-4">
                                              <span className="text-sm text-slate-600 dark:text-slate-300">{promo.type}</span>
                                          </td>
                                          <td className="py-4">
                                              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{promo.value}</span>
                                          </td>
                                          <td className="py-4">
                                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(promo.status)}`}>
                                                  {promo.status}
                                              </span>
                                          </td>
                                          <td className="py-4 text-sm text-slate-500 dark:text-slate-400">{promo.usage} uses</td>
                                          <td className="py-4 pr-6 text-right">
                                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" onClick={(e) => e.stopPropagation()}>
                                                      <Edit2 size={16} />
                                                  </button>
                                                  <button 
                                                      onClick={(e) => { e.stopPropagation(); deletePromo(promo.id); }}
                                                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                  >
                                                      <Trash2 size={16} />
                                                  </button>
                                              </div>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>

                  {/* Calculator Sidebar */}
                  <div className="w-full xl:w-80 shrink-0 flex flex-col gap-6">
                      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                              <Calculator size={20} className="text-indigo-500" /> Discount Calculator
                          </h3>
                          <div className="space-y-4">
                              <div>
                                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Original Price</label>
                                  <div className="relative">
                                      <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                      <input 
                                          type="number" 
                                          value={calcPrice}
                                          onChange={(e) => setCalcPrice(e.target.value ? Number(e.target.value) : '')}
                                          className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                          placeholder="0.00"
                                      />
                                  </div>
                              </div>
                              <div>
                                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Discount</label>
                                  <div className="flex gap-2">
                                      <div className="relative flex-1">
                                          <input 
                                              type="number" 
                                              value={calcDiscount}
                                              onChange={(e) => setCalcDiscount(e.target.value ? Number(e.target.value) : '')}
                                              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                              placeholder={calcType === 'percent' ? "20" : "10.00"}
                                          />
                                      </div>
                                      <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                                          <button 
                                              onClick={() => setCalcType('percent')}
                                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${calcType === 'percent' ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-500'}`}
                                          >
                                              %
                                          </button>
                                          <button 
                                              onClick={() => setCalcType('fixed')}
                                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${calcType === 'fixed' ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-500'}`}
                                          >
                                              $
                                          </button>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2">
                                  <div className="flex justify-between items-center text-sm">
                                      <span className="text-slate-500 dark:text-slate-400">You Save:</span>
                                      <span className="font-bold text-emerald-600 dark:text-emerald-400">-${calculateSavings().toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                      <span className="text-sm font-bold text-slate-800 dark:text-white">Final Price:</span>
                                      <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${calculateFinalPrice().toFixed(2)}</span>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                          <h4 className="font-bold text-lg mb-2">Offer Strategy Tip</h4>
                          <p className="text-sm text-indigo-100 leading-relaxed mb-4">
                              "Offers with specific dollar amounts (e.g. $10 Off) perform 15% better than percentage discounts for items under $50."
                          </p>
                          <button 
                              onClick={() => setShowPromoModal(true)}
                              className="w-full py-2 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors"
                          >
                              Create $ Off Offer
                          </button>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'members' && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <Users size={48} className="mb-4 opacity-20" />
                  <p className="font-medium">Rewards Program Management</p>
                  <p className="text-sm">Configure tiers and points system here.</p>
              </div>
          )}
      </div>
    </div>
  );
};
