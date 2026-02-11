'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { TEMPLATES } from '@/remotion/index';
import { ArrowLeft, Play, Download, CreditCard } from 'lucide-react';

export default function EditorPage() {
  const params = useParams();
  const templateId = params.id as string;
  
  const template = TEMPLATES.find(t => t.id === templateId);
  
  if (!template) {
    return <div>Template not found</div>;
  }

  const [params, setParams] = useState(template.defaultProps);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleParamChange = (key: string, value: string | number) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // 模拟生成过程
    setTimeout(() => {
      setIsGenerating(false);
      alert('视频生成完成！（演示版本）');
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            返回
          </Link>
          
          <h1 className="text-white font-semibold">{template.name}</h1>
          
          <div className="text-purple-400 font-bold">${template.price}</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview */}
          <div className="space-y-4">
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden">
              <div 
                className="w-full h-full flex items-center justify-center text-8xl"
                style={{ 
                  background: `linear-gradient(135deg, ${params.primaryColor || '#667eea'}22, ${params.secondaryColor || '#764ba2'}22)` 
                }}
              >
                {template.id === 'birthday' && '🎂'}
                {template.id === 'product-showcase' && '📦'}
                {template.id === 'data-report' && '📊'}
                {template.id === 'social-promo' && '🔥'}
              </div>
            </div>
            
            <p className="text-white/50 text-sm text-center">
              实时预览功能开发中...
              <br />
              当前显示: {template.width}x{template.height} @ {template.fps}fps
            </p>
          </div>

          {/* Editor */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-6">自定义内容</h2>
            
            <div className="space-y-4">
              {Object.entries(params).map(([key, value]) => {
                // 跳过复杂类型
                if (typeof value === 'object') return null;
                
                return (
                  <div key={key}>
                    <label className="block text-white/70 text-sm mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </label>
                    
                    {key.includes('Color') ? (
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={value as string}
                          onChange={(e) => handleParamChange(key, e.target.value)}
                          className="w-12 h-10 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) => handleParamChange(key, e.target.value)}
                          className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white"
                        />
                      </div>
                    ) : (
                      <input
                        type={typeof value === 'number' ? 'number' : 'text'}
                        value={value as string | number}
                        onChange={(e) => handleParamChange(key, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                        className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30"
                        placeholder={`Enter ${key}...`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-4 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>🎬 生成中... (</span>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    生成视频 - ${template.price}
                  </>
                )}
              </button>
              
              <button className="w-full py-3 border border-white/20 text-white/70 rounded-xl hover:bg-white/5 transition flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                充值余额
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
