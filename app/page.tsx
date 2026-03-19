"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, TerminalSquare, Github, Linkedin, Mail, ExternalLink, Send } from 'lucide-react';
import Image from 'next/image';

// --- CONFIGURAÇÃO DAS PARTÍCULAS ---
const generateDataParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 500,
    y: Math.random() * 300 + 50,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 0.2,
    color: "#a1a1aa", 
  }));
};

const dataParticles = generateDataParticles(30);

// --- COMPONENTE DO CARROSSEL DE IMAGENS ---
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative h-48 w-full rounded-lg overflow-hidden mb-6 border border-orange-100 bg-orange-50/50 group-hover:border-orange-300 transition-colors">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Fallback caso a imagem não exista*/}
          {images[index] ? (
            <Image src={images[index]} alt="Dashboard" fill className="object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-orange-300 text-xs">Sem Imagem</div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Bolinhas indicadoras do carrossel*/}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-orange-500 w-3' : 'bg-white/70'}`} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- MEUS PROJETOS REAIS ---
const dashboards = [
  {
    id: 1,
    title: 'Pesquisa de Satisfação - IPSEMG',
    description: 'Aplicação interativa desenvolvida para análise da percepção dos usuários sobre os serviços do IPSEMG, utilizando dados coletados por meio de formulários digitais e processados em Python, SQL e DAX para geração de insights estratégicos.',
    techs: ['Python', 'Power BI', 'SQL'],
    images: ['/pesquisa_sat_1.png', '/pesquisa_sat_2.png', '/pesquisa_sat_3.png'], 
    link: 'https://app.powerbi.com/view?r=eyJrIjoiYTUwNDZiYzItZDBiOS00MmE4LTlmODgtNzk2ZjA3ODQ5ZjI0IiwidCI6IjE2ODIxZDUzLTQzNzMtNGFjMS1iMjZhLTIwOTVlMDY5NzYwNCJ9', 
  },
  {
    id: 3,
    title: 'Dashboard SAFE/SADS - IPSEMG',
    description: 'Relatório interativo desenvolvido para acompanhamento de maior execução de procedimentos com prestadores terceirizados, utilizando dados de faturamento e execução para identificar oportunidades de otimização e garantir a eficiência operacional dos serviços contratados.',
    techs: ['SQL', 'Power BI', 'Figma'],
    images: ['/safe_1.png', '/safe_2.png', '/safe_3.png'],
    link: '', 
  },
  {
    id: 2,
    title: 'Acompanhamento de Projetos - IPSEMG',
    description: 'Acompanhamento de projetos estratégicos do IPSEMG por meio de dashboards dinâmicos, integrando dados de múltiplas fontes para fornecer uma visão consolidada do progresso, prazos e recursos - humanos - alocados, facilitando a gestão e a tomada de decisões pela diretoria.',
    techs: ['Power BI', 'DAX', 'ETL'],
    images: ['/acomp_proj_1.png', '/acomp_proj_2.png', '/acomp_proj_3.png'], 
    link: 'https://app.powerbi.com/https://app.powerbi.com/view?r=eyJrIjoiZWViMmNmMmEtM2IzZi00NThjLTk1ZGEtMmM2ZjFiYWMwYjBmIiwidCI6IjE2ODIxZDUzLTQzNzMtNGFjMS1iMjZhLTIwOTVlMDY5NzYwNCJ9?r=seu_link_aqui',
  }
];

// --- DADOS DA RECOMENDAÇÃO ---
const testimonials = [
  {
    id: 1,
    name: "Lucas Hirata",
    role: "Assessor de Gestão Estratégica e Qualidade - IPSEMG", 
    text: "Recomendo fortemente o Marcos pela sua excelente performance. Ele se destaca pela proatividade e pelo domínio técnico avançado em Excel, Python, Power BI e bancos de dados. Sua atuação foi fundamental em projetos estratégicos de alta complexidade... entregando análises que subsidiaram diretamente a tomada de decisão da nossa diretoria.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" 
  }
];

export default function Portfolio() {
  const [githubProjects, setGithubProjects] = useState<any[]>([]);
  const [isDissolving, setIsDissolving] = useState(false);

useEffect(() => {
    fetch('https://api.github.com/users/Frsfd12/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const projetosFiltrados = data.filter(
            repo => !repo.fork && repo.name !== 'portfolio-marcos'
          );
          setGithubProjects(projetosFiltrados);
        }
      })
      .catch(console.error);
  }, []);

  const handleVerProjetos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsDissolving(true); 
    setTimeout(() => {
      document.getElementById('dashboards')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => setIsDissolving(false), 2000); 
    }, 600); 
  };

  return (
    // FUNDO OLIVE-200 BASE
    <div className="min-h-screen bg-[#e6e8e3] text-zinc-900 selection:bg-orange-100 font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 overflow-hidden">
        
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-200/30 blur-[150px] rounded-full pointer-events-none z-10" />

        <div 
          className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden z-0 pointer-events-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        >
          <div className="flex animate-scrollHorizontal whitespace-nowrap items-center h-full opacity-[0.04]"> 
            <div className="flex gap-20 items-center px-10">
              <span className="text-[12rem] font-black tracking-tighter text-zinc-950 uppercase">PYTHON</span>
              <span className="text-[10rem] font-bold text-zinc-900 uppercase">Power BI</span>
              <span className="text-[12rem] font-black tracking-tighter text-zinc-950 uppercase">SQL</span>
              <span className="text-[10rem] font-bold text-zinc-900 uppercase">Machine Learning</span>
              <span className="text-[12rem] font-black tracking-tighter text-zinc-950 uppercase">Gen AI</span>
            </div>
            <div className="flex gap-20 items-center px-10" aria-hidden="true">
              <span className="text-[12rem] font-black tracking-tighter text-zinc-950 uppercase">PYTHON</span>
              <span className="text-[10rem] font-bold text-zinc-900 uppercase">Power BI</span>
              <span className="text-[12rem] font-black tracking-tighter text-zinc-950 uppercase">SQL</span>
              <span className="text-[10rem] font-bold text-zinc-900 uppercase">Machine Learning</span>
              <span className="text-[12rem] font-black tracking-tighter text-zinc-950 uppercase">Gen AI</span>
            </div>
          </div>
        </div>
        
        <div className="z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 px-6 w-full mt-20 md:mt-0">
          
          <div className="flex-1 flex justify-center md:justify-end order-1 relative w-[320px] h-[320px] md:w-[480px] md:h-[480px]">
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isDissolving ? 
                { opacity: 0, filter: "blur(10px)", transition: { duration: 0.8 } } : 
                { opacity: 1, scale: 1, transition: { delay: 0.8, duration: 1.2 } }
              }
            >
              <div 
                className="relative w-full h-full transition-all duration-1000 group-hover:scale-105"
                style={{
                  WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 65%)',
                  maskImage: 'radial-gradient(circle at center, black 50%, transparent 65%)',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                }}
              >
                <Image
                  src="/fotoperfil.png"
                  alt="Marcos Estevam"
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                  priority 
                />
              </div>
            </motion.div>

            <AnimatePresence>
              {isDissolving && (
                <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                  {dataParticles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute rounded-full"
                      style={{ width: particle.size, height: particle.size, backgroundColor: particle.color }}
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 0], x: particle.x, y: particle.y }}
                      transition={{ duration: 1.5, delay: particle.delay }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-1 text-center md:text-left order-2"
          >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-bold uppercase tracking-widest border rounded-md text-orange-700 border-orange-200 bg-orange-50 justify-center md:justify-start">
                  Especialista em Dados
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-zinc-950 leading-[1.1]">
                  Marcos <br /> <span className="text-orange-500 font-light text-4xl md:text-6xl italic">Estevam.</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-700 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
                  Transformo dados em decisões com <span className="text-orange-700 font-medium">Dashboards Estratégicos</span> e automações eficientes em Python.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <a href="#dashboards" onClick={handleVerProjetos} className="flex items-center gap-2 px-10 py-4 font-bold text-white transition-all bg-zinc-900 rounded-lg hover:bg-orange-600 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 group">
                      Ver Projetos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#contato" className="flex items-center gap-2 px-10 py-4 font-bold transition-all border border-orange-200 bg-white/50 text-orange-600 rounded-lg hover:text-orange-700 hover:border-orange-400">
                      Contato
                  </a>
              </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          2. DASHBOARDS SECTION
          ========================================= */}
      <section id="dashboards" className="relative w-full py-32 overflow-hidden">
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }} 
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} 
          className="absolute inset-0 bg-[#f6f7f4] origin-left z-0" 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">Business Intelligence</h2>
            <div className="h-1 w-12 bg-orange-500" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3">
            {dashboards.map((dash, index) => (
              <motion.div 
                key={dash.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }} 
                className="group bg-white/80 border border-orange-100 rounded-xl p-5 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all hover:-translate-y-1 backdrop-blur-sm flex flex-col"
              >
                <ImageCarousel images={dash.images || []} />
                
                <h3 className="text-xl font-bold mb-2 text-zinc-950">{dash.title}</h3>
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed line-clamp-2 flex-grow">{dash.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dash.techs.map(tech => (
                    <span key={tech} className="px-2 py-1 text-[10px] font-bold uppercase text-orange-600 bg-orange-50 border border-orange-100 rounded">{tech}</span>
                  ))}
                </div>
                
                <a href={dash.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 border-b-2 border-orange-200 hover:border-orange-500 transition-all mt-auto self-start">
                  Explorar Dashboard <ExternalLink size={14} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          3. GITHUB SECTION 
          ========================================= */}
      <section id="codigo" className="relative w-full py-32 overflow-hidden">
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-[#dce0d9] origin-right z-0" 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2">Códigos em Python</h2>
            <div className="h-1 w-12 bg-orange-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {githubProjects.length > 0 ? githubProjects.map((repo: any, index: number) => (
              <motion.a 
                href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-6 bg-white/60 border border-orange-100/50 rounded-xl hover:shadow-md hover:bg-white hover:border-orange-300 transition-all group backdrop-blur-md"
              >
                <div>
                  <h3 className="text-lg font-bold text-zinc-950 group-hover:text-orange-600">{repo.name}</h3>
                  <p className="text-sm text-orange-600 mt-1 font-medium">{repo.language || 'Python'}</p>
                </div>
                <ArrowRight className="text-orange-200 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" size={24} />
              </motion.a>
            )) : <p className="text-zinc-500 italic">Consultando repositórios...</p>}
          </div>
        </div>
      </section>

      {/* =========================================
          4. TESTIMONIALS SECTION
          ========================================= */}
      <section id="recomendacoes" className="relative w-full py-32 overflow-hidden">
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-[#f6f7f4] origin-left z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold text-zinc-900 mb-2 italic">Recomendações</h2>
            <div className="h-1 w-12 bg-orange-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {testimonials.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative p-8 bg-white/95 border border-orange-200 rounded-2xl shadow-md hover:shadow-2xl transition-all"
              >
                <div className="absolute top-6 right-8 text-orange-100 text-6xl font-serif">“</div>
                <p className="text-zinc-800 text-lg mb-8 relative z-10 leading-relaxed font-medium">"{item.text}"</p>
                <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-orange-100 shadow-inner">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" priority />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-950 text-base">{item.name}</h4>
                    <p className="text-xs text-orange-700 font-medium uppercase tracking-wider mt-1">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          5. CONTACT & FOR
          ========================================= */}
      <section id="contato" className="py-32 px-6 max-w-7xl mx-auto border-t border-zinc-300/30 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight">Vamos criar <br /> algo juntos?</h2>
            <p className="text-lg text-zinc-700 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-normal">
              Tem um projeto de dados em mente, busca consultoria em BI ou precisa de automações avançadas em Python? Me mande uma mensagem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a href="https://www.linkedin.com/in/marcos-estevam/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-white/60 border border-orange-200 text-orange-600 font-bold rounded-lg hover:bg-white hover:border-orange-400 transition-all shadow-sm backdrop-blur-sm group hover:-translate-y-1">
                <Linkedin size={20} className="group-hover:rotate-6 transition-transform" /> Conectar no LinkedIn
              </a>
            </div>
          </div>

          <div className="bg-white/90 p-8 md:p-10 rounded-3xl border border-orange-100 shadow-xl shadow-orange-950/5 backdrop-blur-md">
            
            {}
            <form action="https://formspree.io/f/xojkygvj" method="POST" className="flex flex-col gap-6">
              
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-zinc-800 mb-2">Nome Completo</label>
                <input type="text" id="name" name="name" required placeholder="Ex: João Silva" className="w-full px-5 py-4 rounded-xl bg-white border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-zinc-900 placeholder:text-zinc-400" />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-zinc-800 mb-2">E-mail Profissional</label>
                <input type="email" id="email" name="email" required placeholder="seu@empresa.com" className="w-full px-5 py-4 rounded-xl bg-white border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-zinc-900 placeholder:text-zinc-400" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-zinc-800 mb-2">Detalhes do Projeto</label>
                <textarea id="message" name="message" required rows={4} placeholder="Como posso ajudar a transformar seus dados em inteligência?" className="w-full px-5 py-4 rounded-xl bg-white border border-orange-100 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-zinc-900 resize-none placeholder:text-zinc-400"></textarea>
              </div>
              
              <button type="submit" className="w-full py-4 mt-2 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group hover:-translate-y-1">
                Enviar Solicitação <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* =========================================
          RODAPÉ
          ========================================= */}
      <footer className="py-12 flex flex-col items-center justify-center gap-6 border-t border-zinc-300/30 relative z-10 bg-white/20 backdrop-blur-sm">
        
        <a 
          href="https://wa.me/5521971083014"
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2.5 text-base font-bold text-white transition-all bg-[#25D366] px-8 py-3.5 rounded-full shadow-lg shadow-[#25D366]/30 hover:bg-[#20b859] hover:scale-105 active:scale-95 group"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="group-hover:rotate-6 transition-transform">
            <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.74.45 3.39 1.25 4.83L2 22l5.31-1.39A9.97 9.97 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12.004 2zm3.1 14.6c-.22.61-1.09 1.11-1.63 1.22-.52.1-1.07.13-1.61.13-1.07 0-2.19-.38-3.14-1.07-1.78-1.28-2.9-3.21-2.9-5.41 0-1.12.31-2.18.88-3.09a4.8 4.8 0 0 1 1.79-1.64c.2-.09.39-.14.61-.14.28 0 .56.09.78.27.18.15.34.34.46.56l.7 1.28c.11.21.16.43.16.65 0 .22-.05.43-.16.63l-.44.78c-.06.11-.08.23-.08.36 0 .16.03.32.1.48.2.45.54.89.96 1.26a3.9 3.9 0 0 0 1.48.88c.17.06.34.09.51.09.13 0 .27-.01.4-.04.16-.04.3-.12.42-.23l.71-.65c.2-.18.47-.27.75-.27s.55.09.76.27l1.37.89c.19.12.33.31.41.53z"/>
          </svg>
          Chamar no WhatsApp
        </a>
        
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 text-center px-6">
          Marcos Estevam • {new Date().getFullYear()} • Belo Horizonte / MG • Inteligência de Dados
        </p>
      </footer>
    </div>
  );
}