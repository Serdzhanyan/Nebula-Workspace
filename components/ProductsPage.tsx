
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Package, Tag, DollarSign, Archive, AlertTriangle, CheckCircle2, XCircle, Edit2, Trash2, X, Save, Image as ImageIcon, MapPin, Box, ShoppingCart, Truck, ArrowRight, ClipboardList, Clock, Minus, RefreshCw } from 'lucide-react';

interface ProductOrder {
  id: string;
  customer: string;
  quantity: number;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  committed: number; // Reserved for orders
  warehouseLocation: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image: string;
  description: string;
  orders: ProductOrder[];
}

export const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock Data
  const [products, setProducts] = useState<Product[]>([
    { 
      id: '1', 
      name: 'Enterprise License (Annual)', 
      sku: 'SW-ENT-001', 
      category: 'Software', 
      price: 12500, 
      cost: 200, 
      stock: 999, 
      committed: 12,
      warehouseLocation: 'Digital Server A',
      status: 'In Stock', 
      image: 'https://picsum.photos/seed/p1/200/200',
      description: 'Full access to enterprise features for one year.',
      orders: [
          { id: 'ORD-1024', customer: 'Acme Corp', quantity: 5, date: 'Oct 24', status: 'Processing' },
          { id: 'ORD-1021', customer: 'Stark Ind', quantity: 1, date: 'Oct 22', status: 'Shipped' },
      ]
    },
    { 
      id: '2', 
      name: 'Implementation Package', 
      sku: 'SVC-IMP-002', 
      category: 'Service', 
      price: 5000, 
      cost: 1500, 
      stock: 50, 
      committed: 5,
      warehouseLocation: 'N/A (Service)',
      status: 'In Stock', 
      image: 'https://picsum.photos/seed/p2/200/200',
      description: '40 hours of dedicated implementation support.',
      orders: [
          { id: 'ORD-1011', customer: 'Wayne Ent', quantity: 1, date: 'Oct 20', status: 'Pending' }
      ]
    },
    { 
      id: '3', 
      name: 'Cloud Server Blade X1', 
      sku: 'HW-SRV-X1', 
      category: 'Hardware', 
      price: 3500, 
      cost: 1800, 
      stock: 8, 
      committed: 5,
      warehouseLocation: 'Zone B, Aisle 4, Bin 12',
      status: 'Low Stock', 
      image: 'https://picsum.photos/seed/p3/200/200',
      description: 'High performance compute unit for edge processing.',
      orders: [
          { id: 'ORD-1033', customer: 'Cyberdyne', quantity: 3, date: 'Oct 25', status: 'Processing' },
          { id: 'ORD-1030', customer: 'Massive Dynamic', quantity: 2, date: 'Oct 24', status: 'Pending' }
      ]
    },
    { 
      id: '4', 
      name: 'Security Audit', 
      sku: 'SVC-SEC-001', 
      category: 'Service', 
      price: 8500, 
      cost: 2000, 
      stock: 10, 
      committed: 0,
      warehouseLocation: 'N/A (Service)',
      status: 'In Stock', 
      image: 'https://picsum.photos/seed/p4/200/200',
      description: 'Comprehensive security vulnerability assessment.',
      orders: []
    },
    { 
      id: '5', 
      name: 'Legacy Adapter Kit', 
      sku: 'HW-ADP-005', 
      category: 'Hardware', 
      price: 150, 
      cost: 45, 
      stock: 0, 
      committed: 2,
      warehouseLocation: 'Zone A, Aisle 1, Bin 05',
      status: 'Out of Stock', 
      image: 'https://picsum.photos/seed/p5/200/200',
      description: 'Adapter for connecting legacy systems to new IO.',
      orders: [
          { id: 'ORD-0999', customer: 'Hooli', quantity: 2, date: 'Oct 15', status: 'Pending' } // Backorder
      ]
    },
  ]);

  // Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: 'Software',
    price: 0,
    stock: 0,
    status: 'In Stock',
    description: ''
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name || 'New Product',
      sku: newProduct.sku || `SKU-${Date.now()}`,
      category: newProduct.category || 'Software',
      price: Number(newProduct.price),
      cost: 0, 
      stock: Number(newProduct.stock),
      committed: 0,
      warehouseLocation: 'Unassigned',
      status: (Number(newProduct.stock) === 0 ? 'Out of Stock' : Number(newProduct.stock) < 10 ? 'Low Stock' : 'In Stock'),
      image: `https://picsum.photos/seed/${Date.now()}/200/200`,
      description: newProduct.description || '',
      orders: []
    };

    setProducts([product, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', sku: '', category: 'Software', price: 0, stock: 0, status: 'In Stock', description: '' });
  };

  const handleUpdateStock = (amount: number) => {
      if (!selectedProduct) return;
      const updatedProduct = { 
          ...selectedProduct, 
          stock: Math.max(0, selectedProduct.stock + amount),
          status: (Math.max(0, selectedProduct.stock + amount) === 0 ? 'Out of Stock' : Math.max(0, selectedProduct.stock + amount) < 10 ? 'Low Stock' : 'In Stock') as any
      };
      
      setSelectedProduct(updatedProduct);
      setProducts(prev => prev.map(p => p.id === selectedProduct.id ? updatedProduct : p));
  };

  const handleOrderStatusChange = (orderId: string, newStatus: ProductOrder['status']) => {
      if (!selectedProduct) return;
      const updatedOrders = selectedProduct.orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
      
      const updatedProduct = { ...selectedProduct, orders: updatedOrders };
      setSelectedProduct(updatedProduct);
      setProducts(prev => prev.map(p => p.id === selectedProduct.id ? updatedProduct : p));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-900/30';
      case 'Low Stock': return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/30';
      case 'Out of Stock': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/30';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Product Details Drawer */}
      {selectedProduct && (
        <div className="absolute inset-0 z-20 flex justify-end">
            <div className="absolute inset-0 bg-slate-900/20" onClick={() => setSelectedProduct(null)}></div>
            <div className="w-full max-w-2xl bg-white dark:bg-slate-800 shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-200 dark:border-slate-700">
                
                {/* Drawer Header */}
                <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex gap-4">
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-white" />
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-slate-400">{selectedProduct.sku}</span>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(selectedProduct.status)}`}>
                                    {selectedProduct.status}
                                </span>
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white leading-tight mb-1">{selectedProduct.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Tag size={14} /> {selectedProduct.category}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setSelectedProduct(null)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50 dark:bg-slate-900">
                    
                    {/* Warehouse & Inventory Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Box className="text-indigo-500" size={20} /> Inventory Management
                            </h4>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => handleUpdateStock(-1)}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    title="Decrease Stock"
                                >
                                    <Minus size={16} className="text-slate-500" />
                                </button>
                                <span className="text-sm font-bold w-8 text-center">{selectedProduct.stock}</span>
                                <button 
                                    onClick={() => handleUpdateStock(1)}
                                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                    title="Increase Stock"
                                >
                                    <Plus size={16} className="text-slate-500" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                                    <MapPin size={18} className="text-red-500" />
                                    {selectedProduct.warehouseLocation}
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Value</div>
                                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                                    <DollarSign size={18} className="text-emerald-500" />
                                    {formatCurrency(selectedProduct.price * selectedProduct.stock)}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Total Stock</span>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">{selectedProduct.stock}</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full w-full"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-amber-500"></div> Committed to Orders
                                    </span>
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">{selectedProduct.committed}</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-amber-500 h-full transition-all duration-500" 
                                        style={{ width: `${Math.min((selectedProduct.committed / selectedProduct.stock) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Available to Sell
                                    </span>
                                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                        {Math.max(selectedProduct.stock - selectedProduct.committed, 0)}
                                    </span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-emerald-500 h-full transition-all duration-500" 
                                        style={{ width: `${Math.min(((selectedProduct.stock - selectedProduct.committed) / selectedProduct.stock) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connected Orders & Processing */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <ShoppingCart className="text-indigo-500" size={20} /> Order Processing
                            </h4>
                            <span className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-1 rounded text-xs font-bold">
                                {selectedProduct.orders.length} Active
                            </span>
                        </div>
                        
                        {selectedProduct.orders.length > 0 ? (
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                                    <tr>
                                        <th className="px-6 py-3">Order ID</th>
                                        <th className="px-6 py-3">Customer</th>
                                        <th className="px-6 py-3">Qty</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3 text-right">Fulfillment</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                    {selectedProduct.orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                                            <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-300">{order.id}</td>
                                            <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{order.customer}</td>
                                            <td className="px-6 py-4">{order.quantity}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                                    order.status === 'Shipped' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30' :
                                                    order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' :
                                                    'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'
                                                }`}>
                                                    {order.status === 'Shipped' && <Truck size={10} />}
                                                    {order.status === 'Processing' && <RefreshCw size={10} />}
                                                    {order.status === 'Pending' && <Clock size={10} />}
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <select 
                                                    value={order.status}
                                                    onChange={(e) => handleOrderStatusChange(order.id, e.target.value as any)}
                                                    className="text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 outline-none focus:border-indigo-500 cursor-pointer"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-8 text-center text-slate-400">
                                <ClipboardList size={32} className="mx-auto mb-2 opacity-20" />
                                <p>No active orders for this product.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-700" 
                onClick={e => e.stopPropagation()}
            >
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Package size={20} className="text-indigo-600 dark:text-indigo-400" />
                        Add New Product
                    </h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                
                <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Product Name</label>
                            <input 
                                required
                                type="text" 
                                placeholder="e.g. Premium Support Plan"
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                value={newProduct.name}
                                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">SKU</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. SVC-001"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    value={newProduct.sku}
                                    onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Category</label>
                                <select 
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                                >
                                    <option>Software</option>
                                    <option>Hardware</option>
                                    <option>Service</option>
                                    <option>Subscription</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Price ($)</label>
                                <input 
                                    required
                                    type="number" 
                                    min="0"
                                    placeholder="0.00"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Initial Stock</label>
                                <input 
                                    required
                                    type="number" 
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                                    value={newProduct.stock}
                                    onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 block">Description</label>
                            <textarea 
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none h-24"
                                placeholder="Product details..."
                                value={newProduct.description}
                                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200/50 dark:shadow-none"
                        >
                            <Save size={16} /> Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="text-indigo-500" /> Product Catalog
           </h2>
           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage inventory, pricing, and service offerings.
           </p>
        </div>
        
        <div className="flex gap-2">
            <div className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {products.length} Items
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50 dark:shadow-none"
            >
                <Plus size={18} /> Add Product
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <Archive size={16} className="text-blue-500" /> Total Inventory
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {products.reduce((acc, p) => acc + p.stock, 0).toLocaleString()}
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <DollarSign size={16} className="text-emerald-500" /> Catalog Value
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(products.reduce((acc, p) => acc + (p.price * p.stock), 0))}
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle size={16} className="text-amber-500" /> Low Stock
              </div>
              <div className="text-2xl font-bold text-amber-500">
                  {products.filter(p => p.status === 'Low Stock').length}
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <XCircle size={16} className="text-red-500" /> Out of Stock
              </div>
              <div className="text-2xl font-bold text-red-500">
                  {products.filter(p => p.status === 'Out of Stock').length}
              </div>
          </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                  type="text" 
                  placeholder="Search products by name, SKU..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 dark:text-slate-200 placeholder-slate-400"
              />
          </div>
          <div className="flex gap-3">
              <div className="relative">
                  <select 
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="appearance-none pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-700 dark:text-slate-300 font-medium"
                  >
                      {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                      ))}
                  </select>
                  <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                  <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none pl-4 pr-10 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer text-slate-700 dark:text-slate-300 font-medium"
                  >
                      <option value="All">All Status</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                  </select>
                  <Filter size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
          </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                      <tr className="bg-slate-50/50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
                          <th className="py-4 pl-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-16">Image</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Product Name / SKU</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Price</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Stock Level</th>
                          <th className="py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                          <th className="py-4 pr-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {filteredProducts.length === 0 ? (
                          <tr>
                              <td colSpan={7} className="py-16 text-center text-slate-400">
                                  <div className="flex flex-col items-center gap-2">
                                      <Package size={32} className="opacity-20" />
                                      <p className="text-sm">No products found</p>
                                  </div>
                              </td>
                          </tr>
                      ) : filteredProducts.map((product) => (
                          <tr 
                            key={product.id} 
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                          >
                              <td className="py-4 pl-6">
                                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-600">
                                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                  </div>
                              </td>
                              <td className="py-4">
                                  <div>
                                      <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{product.name}</p>
                                      <p className="text-xs text-slate-500 font-mono mt-0.5">{product.sku}</p>
                                  </div>
                              </td>
                              <td className="py-4">
                                  <div className="flex items-center gap-1.5">
                                      <Tag size={12} className="text-slate-400" />
                                      <span className="text-sm text-slate-600 dark:text-slate-300">{product.category}</span>
                                  </div>
                              </td>
                              <td className="py-4">
                                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{formatCurrency(product.price)}</span>
                              </td>
                              <td className="py-4">
                                  <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-8">{product.stock}</span>
                                      <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                          <div 
                                              className={`h-full rounded-full ${
                                                  product.stock > 20 ? 'bg-emerald-500' : 
                                                  product.stock > 5 ? 'bg-amber-500' : 'bg-red-500'
                                              }`} 
                                              style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                                          ></div>
                                      </div>
                                  </div>
                              </td>
                              <td className="py-4">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(product.status)}`}>
                                      {product.status === 'In Stock' && <CheckCircle2 size={10} />}
                                      {product.status === 'Low Stock' && <AlertTriangle size={10} />}
                                      {product.status === 'Out of Stock' && <XCircle size={10} />}
                                      {product.status}
                                  </span>
                              </td>
                              <td className="py-4 pr-6 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                                          <Edit2 size={16} />
                                      </button>
                                      <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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
    </div>
  );
};
