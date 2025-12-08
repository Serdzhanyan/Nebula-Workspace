
import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Phone, MessageSquare, GitBranch, Mic, Settings, Trash2, PlayCircle, X, ZoomIn, ZoomOut, Move, MousePointer2, GripHorizontal } from 'lucide-react';

interface IVRNode {
  id: string;
  type: 'menu' | 'message' | 'transfer' | 'input';
  label: string;
  content: string;
  options?: { key: string; label: string; nextNodeId?: string }[];
  position: { x: number; y: number };
}

interface IVREditorPageProps {
  onBack: () => void;
}

export const IVREditorPage: React.FC<IVREditorPageProps> = ({ onBack }) => {
  const [zoom, setZoom] = useState(1);
  const [nodes, setNodes] = useState<IVRNode[]>([
    { 
      id: '1', 
      type: 'menu', 
      label: 'Main Menu', 
      content: 'Welcome to Nebula Support. Press 1 for Sales, 2 for Support.', 
      options: [
        { key: '1', label: 'Sales', nextNodeId: '2' },
        { key: '2', label: 'Support', nextNodeId: '3' }
      ],
      position: { x: 100, y: 100 } 
    },
    { 
      id: '2', 
      type: 'transfer', 
      label: 'Transfer to Sales', 
      content: 'Queue: Sales_General', 
      position: { x: 500, y: 50 } 
    },
    { 
      id: '3', 
      type: 'menu', 
      label: 'Support Menu', 
      content: 'Press 1 for Tech Support, 2 for Billing.', 
      options: [
        { key: '1', label: 'Tech Support', nextNodeId: '4' },
        { key: '2', label: 'Billing' }
      ],
      position: { x: 500, y: 250 } 
    },
    {
      id: '4',
      type: 'transfer',
      label: 'Tech Queue',
      content: 'Queue: Tech_L1',
      position: { x: 900, y: 200 }
    }
  ]);

  const [selectedNode, setSelectedNode] = useState<IVRNode | null>(null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'menu': return 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      case 'message': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'transfer': return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300';
      case 'input': return 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300';
      default: return 'border-slate-500 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'menu': return <GitBranch size={18} />;
      case 'message': return <MessageSquare size={18} />;
      case 'transfer': return <Phone size={18} />;
      case 'input': return <Mic size={18} />;
      default: return <Settings size={18} />;
    }
  };

  const handleDragStart = (e: React.DragEvent, nodeId: string) => {
      e.dataTransfer.setData('nodeId', nodeId);
  };

  const handleDrop = (e: React.DragEvent) => {
      const nodeId = e.dataTransfer.getData('nodeId');
      if (nodeId) {
          const rect = e.currentTarget.getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;
          
          setNodes(prev => prev.map(n => 
              n.id === nodeId ? { ...n, position: { x: offsetX - 120, y: offsetY - 40 } } : n
          ));
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 animate-in fade-in slide-in-from-right-4 duration-300 absolute inset-0 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GitBranch size={20} className="text-indigo-500" /> IVR Flow Editor
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Main Incoming Route • v2.4</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mr-4">
             <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400 shadow-sm transition-all" title="Select"><MousePointer2 size={16}/></button>
             <button className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded-md text-slate-500 dark:text-slate-400 transition-all" title="Pan"><Move size={16}/></button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 dark:shadow-none">
            <Save size={16} /> Save & Publish
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tools */}
        <div className="w-16 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center py-4 gap-4 z-10 shadow-sm">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 cursor-grab hover:scale-110 transition-transform" title="Menu Node" draggable>
                <GitBranch size={24} />
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 cursor-grab hover:scale-110 transition-transform" title="Play Message" draggable>
                <MessageSquare size={24} />
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 cursor-grab hover:scale-110 transition-transform" title="Transfer Call" draggable>
                <Phone size={24} />
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 cursor-grab hover:scale-110 transition-transform" title="Capture Input" draggable>
                <Mic size={24} />
            </div>
        </div>

        {/* Canvas Area */}
        <div 
            className="flex-1 relative overflow-auto bg-slate-50 dark:bg-slate-950 cursor-crosshair"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
          {/* Grid Pattern */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.4]" 
               style={{ 
                   backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', 
                   backgroundSize: '24px 24px' 
               }}>
          </div>

          <div className="min-w-[1200px] min-h-[800px] relative transform origin-top-left transition-transform" style={{ transform: `scale(${zoom})` }}>
            {/* Render Connections */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full z-0">
              {nodes.map(node => (
                node.options?.map((opt, i) => {
                  const target = nodes.find(n => n.id === opt.nextNodeId);
                  if (target) {
                    const startX = node.position.x + 280;
                    const startY = node.position.y + 80 + (i * 32);
                    const endX = target.position.x;
                    const endY = target.position.y + 40;
                    
                    const controlPointX1 = startX + 50;
                    const controlPointX2 = endX - 50;

                    return (
                      <g key={`${node.id}-${i}`}>
                          <path 
                            d={`M ${startX} ${startY} C ${controlPointX1} ${startY}, ${controlPointX2} ${endY}, ${endX} ${endY}`}
                            fill="none"
                            stroke="#cbd5e1"
                            strokeWidth="2"
                            className="dark:stroke-slate-700"
                          />
                          <circle cx={startX} cy={startY} r="4" fill="#6366f1" />
                          <circle cx={endX} cy={endY} r="4" fill="#6366f1" />
                      </g>
                    );
                  }
                  return null;
                })
              ))}
            </svg>

            {nodes.map(node => (
              <div 
                key={node.id}
                draggable
                onDragStart={(e) => handleDragStart(e, node.id)}
                onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                className={`absolute w-72 bg-white dark:bg-slate-900 rounded-xl shadow-lg border-2 transition-all group ${
                    selectedNode?.id === node.id 
                    ? 'border-indigo-500 ring-4 ring-indigo-500/10 z-20' 
                    : 'border-white dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 z-10'
                }`}
                style={{ left: node.position.x, top: node.position.y }}
              >
                {/* Node Header */}
                <div className={`p-3 rounded-t-lg border-b border-slate-100 dark:border-slate-800 flex items-center justify-between ${
                    selectedNode?.id === node.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'bg-slate-50 dark:bg-slate-900'
                }`}>
                    <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${getNodeColor(node.type)}`}>
                            {getNodeIcon(node.type)}
                        </div>
                        <span className="font-bold text-sm text-slate-800 dark:text-white">{node.label}</span>
                    </div>
                    <GripHorizontal size={16} className="text-slate-300 cursor-grab active:cursor-grabbing" />
                </div>

                {/* Node Content */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-b-xl">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-medium">
                      "{node.content}"
                  </p>
                  
                  {node.options && (
                    <div className="space-y-2">
                      {node.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors relative group/opt">
                          <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-700 px-1.5 rounded border border-slate-200 dark:border-slate-600 min-w-[24px] text-center shadow-sm">
                                  {opt.key}
                              </span>
                              <span className="text-slate-600 dark:text-slate-300 font-medium">{opt.label}</span>
                          </div>
                          {/* Connection Point */}
                          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm opacity-0 group-hover/opt:opacity-100 transition-opacity cursor-crosshair"></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Floating Controls */}
          <div className="absolute bottom-6 left-6 flex bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-1">
              <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded text-slate-500"><ZoomOut size={18}/></button>
              <span className="px-2 flex items-center text-xs font-mono text-slate-500 border-x border-slate-100 dark:border-slate-700 mx-1">{Math.round(zoom * 100)}%</span>
              <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded text-slate-500"><ZoomIn size={18}/></button>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <div className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col h-full shadow-2xl z-20 animate-in slide-in-from-right duration-200">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Node Properties</h3>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><X size={18}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">Node Label</label>
                <input 
                    type="text" 
                    defaultValue={selectedNode.label} 
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white transition-all" 
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-2">Prompt / TTS Text</label>
                <div className="relative">
                  <textarea 
                    rows={4} 
                    defaultValue={selectedNode.content} 
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none" 
                  />
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <button className="p-1.5 bg-white dark:bg-slate-700 text-slate-400 hover:text-indigo-600 rounded shadow-sm border border-slate-200 dark:border-slate-600"><Mic size={12}/></button>
                    <button className="p-1.5 bg-white dark:bg-slate-700 text-slate-400 hover:text-indigo-600 rounded shadow-sm border border-slate-200 dark:border-slate-600"><PlayCircle size={12}/></button>
                  </div>
                </div>
              </div>

              {selectedNode.type === 'menu' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Menu Options</label>
                      <button className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                          <Plus size={10} /> Add
                      </button>
                  </div>
                  <div className="space-y-2">
                    {selectedNode.options?.map((opt, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input type="text" defaultValue={opt.key} className="w-12 px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm text-center font-mono font-bold text-slate-700 dark:text-slate-200" />
                        <input type="text" defaultValue={opt.label} className="flex-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-sm text-slate-700 dark:text-slate-200" />
                        <button className="text-slate-400 hover:text-red-500 p-1"><Trash2 size={14}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <Trash2 size={16} /> Delete Node
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
