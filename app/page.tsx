"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, BarChart3, TerminalSquare, Github, Linkedin, Mail, ExternalLink, Send, ChevronDown, Sparkles, Brain, TrendingUp, Database, Code, Zap, Award, Briefcase, Users } from 'lucide-react';
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
          {images[index] ? (
            <Image src={images[index]} alt="Dashboard" fill className="object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-orange-300 text-xs">Sem Imagem</div>
          )}
        </motion.div>
      </AnimatePresence>
      
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
    description: 'Acompanhamento de projetos estratégicos do IPSEMG por meio de dashboards dinâmicos, integrando dados de múltiplas fontes para fornecer uma visão consolidada do progresso, prazos e recursos humanos alocados, facilitando a gestão e a tomada de decisões pela diretoria.',
    techs: ['Power BI', 'DAX', 'ETL'],
    images: ['/acomp_proj_1.png', '/acomp_proj_2.png', '/acomp_proj_3.png'], 
    link: 'https://app.powerbi.com/view?r=eyJrIjoiZWViMmNmMmEtM2IzZi00NThjLTk1ZGEtMmM2ZjFiYWMwYjBmIiwidCI6IjE2ODIxZDUzLTQzNzMtNGFjMS1iMjZhLTIwOTVlMDY5NzYwNCJ9',
  }
];

// --- DADOS DA RECOMENDAÇÃO ---
const testimonials = [
  {
    id: 1,
    name: "Lucas Hirata",
    role: "Assessor de Gestão Estratégica e Qualidade - IPSEMG", 
    text: "Recomendo fortemente o Marcos pela sua excelente performance. Ele se destaca pela proatividade e pelo domínio técnico avançado em Excel, Python, Power BI e bancos de dados. Sua atuação foi fundamental em projetos estratégicos de alta complexidade... entregando análises que subsidiaram diretamente a tomada de decisão da nossa diretoria.",
    avatar: "/recomendacao-1.jpg" 
  }
];

// --- HABILIDADES EM DESTAQUE ---
const skills = [
  { name: 'Python', icon: <Code size={20} />, level: 90 },
  { name: 'Power BI', icon: <BarChart3 size={20} />, level: 95 },
  { name: 'SQL', icon: <Database size={20} />, level: 85 },
  { name: 'Machine Learning', icon: <Brain size={20} />, level: 70 },
  { name: 'Estatística', icon: <TrendingUp size={20} />, level: 80 },
  { name: 'DAX', icon: <Zap size={20} />, level: 90 },
];

export default function Portfolio() {
  const [githubProjects, setGithubProjects] = useState<any[]>([]);
  const [isDissolving, setIsDissolving] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Controle da barra de scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/xojkygvj', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  // Dados da Jornada (Timeline)
  const journeySteps = [
    {
      title: 'A Fundação UFMG',
      role: 'Administração & Pesquisa Operacional',
      text: 'Onde minha visão estratégica de negócios nasceu. Descobri minha vocação ao explorar a Pesquisa Operacional e aplicar Python no projeto Milhagem UFMG para desafios reais de análise de dados.',
      icon: <Award size={24} className="text-orange-500" />,
      delay: 0.1,
    },
    {
      title: 'Dominando o Stack Técnico',
      role: 'Engenharia de Dados & BI',
      text: 'Tradução do conhecimento estratégico em soluções técnicas pesadas. Domínio prático de Python, SQL e Power BI para extrair, transformar e visualizar dados complexos de forma automatizada.',
      icon: <Zap size={24} className="text-orange-500" />,
      delay: 0.3,
    },
    {
      title: 'Impacto Real (IPSEMG)',
      role: 'Especialista em Dados',
      text: 'Responsável por extrair dados em SQL, automatizar rotinas com Python e Power Automate, e construir dashboards executivos que impactam diretamente a tomada de decisão da diretoria.',
      icon: <Users size={24} className="text-orange-500" />,
      delay: 0.5,
    },
  ];

  return (
    <div className="min-h-screen bg-[#e6e8e3] text-zinc-900 selection:bg-orange-100 font-sans overflow-x-hidden">
      
      {/* BARRA DE PROGRESSO DE SCROLL */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-orange-500 z-50 origin-left shadow-md shadow-orange-500/50"
        style={{ scaleX }}
      />

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
          
          <div className="shrink-0 flex justify-center md:justify-end order-1 relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px] mb-8 md:mb-0">
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
                  src="/perfil.png" 
                  alt="Marcos Estevam - Especialista em Dados"
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-bold uppercase tracking-widest border rounded-full text-orange-700 border-orange-200 bg-orange-50/80 justify-center md:justify-start">
                <Sparkles size={16} className="text-orange-500" />
                Especialista em Dados
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-zinc-950 leading-[1.1]">
                  Marcos <br /> <span className="text-orange-500 font-light text-4xl md:text-6xl italic">Estevam</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-700 mb-6 max-w-xl mx-auto md:mx-0 leading-relaxed">
                  Transformo dados em decisões com <span className="text-orange-700 font-medium">Dashboards Estratégicos</span>, automações eficientes em Python e análises que geram impacto real para o setor público e privado.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
                {skills.slice(0, 4).map(skill => (
                  <span key={skill.name} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 border border-orange-100 rounded-full text-xs font-medium text-zinc-700">
                    {skill.icon} {skill.name}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <a href="#dashboards" onClick={handleVerProjetos} className="flex items-center gap-2 px-10 py-4 font-bold text-white transition-all bg-zinc-900 rounded-lg hover:bg-orange-600 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 group">
                      Ver Projetos <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#contato" className="flex items-center gap-2 px-10 py-4 font-bold transition-all border border-orange-200 bg-white/50 text-orange-600 rounded-lg hover:text-orange-700 hover:border-orange-400">
                      Contato
                  </a>
              </div>

              <div className="mt-12 flex items-center gap-4 justify-center md:justify-start text-zinc-500">
                <a href="https://www.linkedin.com/in/marcos-estevam/" target="_blank" rel="noreferrer" className="hover:text-orange-600 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/Frsfd12" target="_blank" rel="noreferrer" className="hover:text-orange-600 transition-colors">
                  <Github size={20} />
                </a>
                <span className="text-xs text-zinc-400">|</span>
                <span className="text-sm">Belo Horizonte / MG</span>
              </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <ChevronDown size={24} className="text-zinc-400" />
        </div>
      </section>

      {/* 2. SEÇÃO SOBRE MIM (TIMELINE) */}
      <section id="sobre" className="relative w-full py-24 overflow-hidden bg-white/40 backdrop-blur-sm border-y border-zinc-200/50">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center md:text-left">
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2 block">Trajetória</span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">Unindo Negócios e Dados</h2>
            <div className="h-1 w-12 bg-orange-500 mx-auto md:mx-0" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Linha Central Vertical */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-orange-200/50 rounded-full" />

            {journeySteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: step.delay, type: "spring", bounce: 0.3 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Espaçador Desktop */}
                  <div className="flex-1 hidden md:block" />

                  {/* Ícone Central */}
                  <div className="absolute left-0 md:relative md:left-auto z-10 w-16 h-16 rounded-full bg-white border-4 border-[#e6e8e3] shadow-md flex items-center justify-center shrink-0 md:mx-8">
                    {step.icon}
                  </div>

                  {/* Card de Conteúdo */}
                  <div className="flex-1 w-full pl-24 md:pl-0">
                    <div className="bg-white/80 p-8 rounded-3xl border border-orange-100/50 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all backdrop-blur-sm">
                      <span className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2 block">{step.role}</span>
                      <h3 className="text-2xl font-bold mb-3 text-zinc-950">{step.title}</h3>
                      <p className="text-zinc-600 text-base leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EXPERTISE TÉCNICA */}
      <section className="relative w-full py-24 bg-[#dce0d9]/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-16 text-zinc-800">Expertise Técnica</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white border border-orange-100 shadow-sm flex items-center justify-center text-zinc-500 group-hover:text-orange-600 group-hover:border-orange-300 group-hover:scale-110 transition-all">
                  {skill.icon}
                </div>
                <h3 className="font-bold text-sm text-zinc-900">{skill.name}</h3>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full mt-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="bg-orange-500 h-full rounded-full relative"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DASHBOARDS SECTION */}
      <section id="dashboards" className="relative w-full py-32 overflow-hidden">
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }} 
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} 
          className="absolute inset-0 bg-[#f6f7f4] origin-left z-0" 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center md:text-left">
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2 block">Portfólio</span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">Business Intelligence</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto md:mx-0">
              Dashboards estratégicos desenvolvidos para o IPSEMG, entregando insights que subsidiam a tomada de decisão da diretoria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3">
            {dashboards.map((dash, index) => (
              <motion.div 
                key={dash.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.3 }} 
                className="group bg-white/80 border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-orange-300 transition-all hover:-translate-y-2 backdrop-blur-sm flex flex-col"
              >
                <ImageCarousel images={dash.images || []} />
                
                <h3 className="text-xl font-bold mb-3 text-zinc-950 group-hover:text-orange-600 transition-colors">{dash.title}</h3>
                <p className="text-zinc-600 text-sm mb-6 leading-relaxed flex-grow">{dash.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {dash.techs.map(tech => (
                    <span key={tech} className="px-2.5 py-1 text-[10px] font-bold uppercase text-orange-700 bg-orange-50 border border-orange-100 rounded-md">{tech}</span>
                  ))}
                </div>
                
                {dash.link && dash.link !== 'https://app.powerbi.com/view?r=eyJrIjoiZWViMmNmMmEtM2IzZi00NThjLTk1ZGEtMmM2ZjFiYWMwYjBmIiwidCI6IjE2ODIxZDUzLTQzNzMtNGFjMS1iMjZhLTIwOTVlMDY5NzYwNCJ9' ? (
                  <a href={dash.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 border-b-2 border-orange-200 hover:border-orange-500 hover:text-orange-600 transition-all mt-auto self-start pb-1">
                    Explorar Dashboard <ExternalLink size={16} />
                  </a>
                ) : dash.link ? (
                  <a href={dash.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 border-b-2 border-orange-200 hover:border-orange-500 hover:text-orange-600 transition-all mt-auto self-start pb-1">
                    Explorar Dashboard <ExternalLink size={16} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 border-b-2 border-zinc-200 mt-auto self-start cursor-not-allowed pb-1">
                    Em breve <Briefcase size={16} />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GITHUB SECTION */}
      <section id="codigo" className="relative w-full py-32 overflow-hidden">
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-[#dce0d9] origin-right z-0" 
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center md:text-left">
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2 block">Open Source</span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">Códigos em Python</h2>
            <p className="text-zinc-600 max-w-2xl mx-auto md:mx-0">
              Projetos de análise de dados, automação e ciência de dados disponíveis no GitHub.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {githubProjects.length > 0 ? (
              githubProjects.map((repo: any, index: number) => (
                <motion.a 
                  href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                  className="flex items-center justify-between p-6 bg-white/60 border border-orange-100/50 rounded-2xl hover:shadow-lg hover:bg-white hover:border-orange-300 transition-all group backdrop-blur-md hover:-translate-y-1"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-zinc-950 group-hover:text-orange-600 transition-colors">
                      {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
                    </h3>
                    <p className="text-sm text-zinc-600 mt-2 line-clamp-1">
                      {repo.description || 'Projeto de análise e automação com Python'}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-xs font-bold text-orange-700 bg-orange-50/80 border border-orange-100 px-2.5 py-1 rounded-md uppercase">
                        {repo.language || 'Python'}
                      </span>
                      <span className="text-xs font-medium text-zinc-500 flex items-center gap-1">
                        ⭐ {repo.stargazers_count || 0}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center ml-4 group-hover:bg-orange-500 transition-colors">
                    <ArrowRight className="text-orange-300 group-hover:text-white transition-colors" size={20} />
                  </div>
                </motion.a>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <div className="animate-pulse flex flex-col items-center">
                  <Github size={40} className="text-zinc-300 mb-4" />
                  <p className="text-zinc-500">Carregando repositórios do GitHub...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center mt-16">
            <a 
              href="https://github.com/Frsfd12" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1"
            >
              Ver todos no GitHub <Github size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section id="recomendacoes" className="relative w-full py-32 overflow-hidden">
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-[#f6f7f4] origin-left z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center md:text-left">
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2 block">Depoimentos</span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">Recomendações</h2>
            <div className="h-1 w-12 bg-orange-500 mx-auto md:mx-0" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-4xl">
            {testimonials.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className="relative p-8 md:p-10 bg-white border border-orange-100/80 rounded-3xl shadow-lg shadow-orange-950/5 hover:shadow-xl transition-all"
              >
                <div className="absolute top-8 right-10 text-orange-100 text-8xl font-serif leading-none">“</div>
                <div className="flex items-center gap-2 mb-6">
                  <Award size={20} className="text-orange-500" />
                  <span className="text-sm font-bold text-orange-600 uppercase tracking-wider">Recomendação Profissional</span>
                </div>
                <p className="text-zinc-700 text-lg md:text-xl mb-10 relative z-10 leading-relaxed italic">"{item.text}"</p>
                <div className="flex items-center gap-5 border-t border-zinc-100 pt-8">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-100 shadow-inner shrink-0">
                    <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-950 text-lg">{item.name}</h4>
                    <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mt-1">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT */}
      <section id="contato" className="py-32 px-6 max-w-7xl mx-auto border-t border-zinc-300/30 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-center lg:text-left">
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest mb-2 block">Contato</span>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight">Vamos criar <br /> algo juntos?</h2>
            <p className="text-lg text-zinc-600 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-normal">
              Tem um projeto de dados em mente, busca consultoria em BI ou precisa de automações avançadas em Python? Me mande uma mensagem.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <a href="https://www.linkedin.com/in/marcos-estevam/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-white/60 border border-orange-200 text-orange-600 font-bold rounded-xl hover:bg-white hover:border-orange-400 transition-all shadow-sm backdrop-blur-sm group hover:-translate-y-1">
                <Linkedin size={20} className="group-hover:rotate-6 transition-transform" /> Conectar no LinkedIn
              </a>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-orange-100 shadow-2xl shadow-orange-950/5">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-zinc-800 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Ex: João Silva" 
                  className="w-full px-5 py-4 rounded-xl bg-[#f6f7f4] border border-transparent focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 outline-none transition-all text-zinc-900 placeholder:text-zinc-400" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-zinc-800 mb-2">E-mail Profissional</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="seu@empresa.com" 
                  className="w-full px-5 py-4 rounded-xl bg-[#f6f7f4] border border-transparent focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 outline-none transition-all text-zinc-900 placeholder:text-zinc-400" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-zinc-800 mb-2">Detalhes do Projeto</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={4} 
                  placeholder="Como posso ajudar a transformar seus dados em inteligência?" 
                  className="w-full px-5 py-4 rounded-xl bg-[#f6f7f4] border border-transparent focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 outline-none transition-all text-zinc-900 resize-none placeholder:text-zinc-400"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={formStatus === 'sending'}
                className={`w-full py-4 mt-2 bg-orange-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group hover:-translate-y-1 ${formStatus === 'sending' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
              >
                {formStatus === 'sending' ? (
                  <>Enviando...</>
                ) : formStatus === 'success' ? (
                  <>Mensagem Enviada! <Send size={18} /></>
                ) : formStatus === 'error' ? (
                  <>Erro ao enviar. Tente novamente.</>
                ) : (
                  <>Enviar Mensagem <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* 8. RODAPÉ */}
      <footer className="py-12 flex flex-col items-center justify-center gap-6 border-t border-zinc-300/30 relative z-10 bg-[#e6e8e3]">
        
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
          Marcos Estevam • {new Date().getFullYear()} • Inteligência de Dados
        </p>
      </footer>
    </div>
  );
}