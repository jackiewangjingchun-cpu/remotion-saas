import Link from 'next/link';
import { TEMPLATES } from '@/remotion/index';
import { Play, Video, Sparkles, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <nav className="border-b border-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Video className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">VideoGen</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/templates" className="text-white/70 hover:text-white transition">
              模板
            </Link>
            <Link href="/pricing" className="text-white/70 hover:text-white transition">
              价格
            </Link>
            <Link 
              href="/dashboard" 
              className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition"
            >
              开始使用
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm">AI 驱动的视频生成平台</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          几分钟创建
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            专业营销视频
          </span>
        </h1>

        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
          选择模板，输入内容，一键生成高清视频。
          <br />
          无需设计经验，无需昂贵软件。
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Link 
            href="/templates"
            className="px-8 py-4 bg-purple-500 text-white rounded-full font-semibold hover:bg-purple-600 transition flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            开始制作
          </Link>
          <Link 
            href="#templates"
            className="px-8 py-4 border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition"
          >
            浏览模板
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Video, label: '已生成视频', value: '10,000+' },
            { icon: Zap, label: '平均生成时间', value: '< 2分钟' },
            { icon: Shield, label: '用户满意度', value: '99%' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          选择模板
        </h2>
        <p className="text-white/60 text-center mb-12">
          专业设计的视频模板，适用于各种场景
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((template) => (
            <Link
              key={template.id}
              href={`/editor/${template.id}`}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition border border-white/10"
            >
              {/* Thumbnail */}
              <div 
                className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-105 transition duration-500"
              >
                <div className="text-6xl">
                  {template.id === 'birthday' && '🎂'}
                  {template.id === 'product-showcase' && '📦'}
                  {template.id === 'data-report' && '📊'}
                  {template.id === 'social-promo' && '🔥'}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white text-lg">{template.name}</h3>
                  <span className="text-purple-400 font-bold">${template.price}</span>
                </div>
                
                <p className="text-white/50 text-sm mb-4">{template.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-white/40">
                  <span>⏱️ {Math.round(template.duration / template.fps)}秒</span>
                  <span>📐 {template.width}x{template.height}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          三步生成视频
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: '01', title: '选择模板', desc: '从专业设计的模板库中选择适合你需求的模板' },
            { step: '02', title: '自定义内容', desc: '输入文字、上传图片、选择配色方案' },
            { step: '03', title: '生成下载', desc: '一键生成高清视频，立即下载使用' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-6xl font-bold text-purple-500/30 mb-4">{item.step}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-white/40">
          <p>© 2026 VideoGen. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
