'use client';
import './globals.css'
import { useState, useEffect } from 'react';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaDatabase, FaGithub } from 'react-icons/fa';
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ChevronDown, Code, Smartphone, Database, Cloud, Award, Heart, User, GraduationCap, Briefcase, FolderOpen, Wrench, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import img from '../img/aldi1.jpeg'; 
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { Server,  Layers, GitBranch, Globe, Cpu, Palette, Zap, Monitor } from 'lucide-react';
import React from 'react';
import { FaPython } from 'react-icons/fa';
import Image from 'next/image';
import SkillsSection from '@/components/SkillsSection';
import { Bug } from 'lucide-react';
import {Network,} from 'lucide-react';
import { FlaskConical } from 'lucide-react';
import { Terminal } from 'lucide-react';
import { FileCode } from 'lucide-react';
import { 
  ServerCog, 
  ServerCrash, 
  DatabaseBackup, 
  HardDriveDownload, 
} from 'lucide-react';
import { StarIcon } from '@heroicons/react/24/solid';
import { 
  BookOpen,
  Shield,
  ArrowUp,
  Coffee,
  Gamepad2,
  Music,
  Camera,
  Dumbbell,
  Plane
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
import {  Clock, Calendar } from 'lucide-react';


export interface AboutData {
  id: number;
  name: string;
  title: string;
  description: string;
  age: number;
  city: string;
  phone: string;
  email: string;
  degree: string;
  profileImage: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa: string;
  description: string;
  type: 'university' | 'school' | 'certification';
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  type: 'work' | 'freelance' | 'volunteer';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  category: string;
}



export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  website?: string;
}

export type AuthState = 'login' | 'dashboard' | 'portfolio';

export type DashboardSection = 'overview' | 'about' | 'education' | 'experience' | 'projects' | 'skills' | 'certificates' | 'contact';

const articles = [
  {
    id: 1,
    title: "Forensik Digital untuk Investigasi Kejahatan Siber",
    excerpt: "Penelitian tentang teknik forensik digital dalam menganalisis bukti kejahatan siber dengan fokus pada pemulihan data dan analisis artefak.",
    category: "Digital Forensics",
    readTime: "17 min",
    date: "Dec 15, 2024",
    tags: ["Digital Forensics", "Investigation", "Data Recovery"],
    type: "research",
    link: "https://journal.umy.ac.id/index.php/mt"
  },
  {
    id: 2,
    title: "Implementasi Zero Trust Architecture pada Cloud Computing",
    excerpt: "Studi implementasi arsitektur Zero Trust untuk meningkatkan keamanan layanan cloud computing dengan pendekatan never trust.",
    category: "Cloud Security",
    readTime: "20 min",
    date: "Nov 28, 2024",
    tags: ["Zero Trust", "Cloud Security", "Network"],
    type: "research",
    link: "https://ejournal.unsri.ac.id/index.php/jsi"
  },
  {
    id: 3,
    title: "Machine Learning untuk Deteksi Anomali Keamanan Jaringan",
    excerpt: "Pengembangan sistem deteksi intrusi menggunakan algoritma machine learning untuk mengidentifikasi pola anomali pada traffic.",
    category: "AI Security",
    readTime: "19 min",
    date: "Oct 22, 2024",
    tags: ["Machine Learning", "Detection", "Network"],
    type: "research",
    link: "https://jurnal.ugm.ac.id/ijccs"
  },
  {
    id: 4,
    title: "Blockchain Technology untuk Keamanan Data Healthcare",
    excerpt: "Analisis penerapan teknologi blockchain dalam mengamankan data kesehatan elektronik dengan fokus pada privacy dan integritas data.",
    category: "Blockchain Security",
    readTime: "16 min",
    date: "Sep 18, 2024",
    tags: ["Blockchain", "Healthcare Security", "Data Privacy"],
    type: "research",
    link: "https://journal.its.ac.id/index.php/jiki"
  },
  {
    id: 5,
    title: "Analisis Kerentanan IoT Device dalam Smart Home System",
    excerpt: "Penelitian keamanan perangkat Internet of Things (IoT) dalam sistem rumah pintar dengan identifikasi vektor serangan dan mitigasi.",
    category: "IoT Security",
    readTime: "18 min",
    date: "Aug 25, 2024",
    tags: ["IoT", "Smart Home", "Device Vulnerability"],
    type: "research",
    link: "https://ejournal.unp.ac.id/index.php/jtik"
  },
  {
    id: 6,
    title: "Cryptographic Hash Function untuk Integrity Verification",
    excerpt: "Studi perbandingan fungsi hash kriptografi modern untuk verifikasi integritas data dengan analisis performa dan resistensi serangan",
    category: "Cryptography",
    readTime: "15 min",
    date: "Jul 20, 2024",
    tags: ["Hash", "Data Integrity", "Cryptographic Security"],
    type: "research",
    link: "https://journal.uii.ac.id/Snati",
    color: ""
  }
];

const interests: Interest[] = [
  {
    name: "Cybersecurity Research",
    icon: <Shield className="w-6 h-6" />,
    description: "Researching new vulnerabilities and attack vectors",
    color: "from-red-500 to-red-600"
  },
  {
    name: "CTF Competitions",
    icon: <Gamepad2 className="w-6 h-6" />,
    description: "Participating in Capture The Flag challenges",
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Tech Articles",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Reading and writing technical security articles",
    color: "from-green-500 to-green-600"
  },
  {
    name: "Open Source",
    icon: <Code className="w-6 h-6" />,
    description: "Contributing to security tools and frameworks",
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Bug Bounty",
    icon: <Terminal className="w-6 h-6" />,
    description: "Hunting for bugs in web applications",
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "Photography",
    icon: <Camera className="w-6 h-6" />,
    description: "Capturing moments and exploring creativity",
    color: "from-pink-500 to-pink-600"
  }
];


type Skill = {
  name: string;
  icon: JSX.Element;
  category: string;
  color: string;
};
interface Certificate {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  issuer: string;
  year: string;
}
interface Interest {
  name: string;
  icon: JSX.Element;
  description: string;
  color: string;
}
interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

interface User {
  email: string;
  name: string;
  avatar?: string;
}
function SectionWrapper({ children, id, className = '' }: SectionWrapperProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-20 px-6 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

const interest: Interest[] = [
  {
    name: "Cybersecurity Research",
    icon: <Shield className="w-6 h-6" />,
    description: "Researching new vulnerabilities and attack vectors",
    color: "from-red-500 to-red-600"
  },
  {
    name: "CTF Competitions",
    icon: <Gamepad2 className="w-6 h-6" />,
    description: "Participating in Capture The Flag challenges",
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Tech Articles",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Reading and writing technical security articles",
    color: "from-green-500 to-green-600"
  },
  {
    name: "Open Source",
    icon: <Code className="w-6 h-6" />,
    description: "Contributing to security tools and frameworks",
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Bug Bounty",
    icon: <Terminal className="w-6 h-6" />,
    description: "Hunting for bugs in web applications",
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "Photography",
    icon: <Camera className="w-6 h-6" />,
    description: "Capturing moments and exploring creativity",
    color: "from-pink-500 to-pink-600"
  }
];


const skill: Skill[] = [
  {
    name: 'React',
    category: 'Frontend',
    icon: <FaReact />,
    color: 'bg-blue-500',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    icon: <FaNodeJs />,
    color: 'bg-green-600',
  },
  {
    name: 'HTML5',
    category: 'Markup',
    icon: <FaHtml5 />,
    color: 'bg-orange-500',
  },
  {
    name: 'CSS3',
    category: 'Style',
    icon: <FaCss3Alt />,
    color: 'bg-blue-600',
  },
  {
    name: 'MySQL',
    category: 'Database',
    icon: <FaDatabase />,
    color: 'bg-yellow-600',
  },
  {
    name: 'GitHub',
    category: 'Version Control',
    icon: <FaGithub />,
    color: 'bg-gray-800',
  },
  {
    name: 'React',
    category: 'Frontend',
    color: 'bg-blue-500',
    icon: <FaReact size={24} />,
  },
  {
    name: 'No=de.js',
    category: 'Backend',
    color: 'bg-green-600',
    icon: <FaNodeJs size={24} />,
  },
  {
    name: 'Custom Icon',
    category: 'Tooling',
    color: 'bg-yellow-600',
    icon: (
      <Image
        src="/icons/my-custom-icon.png"
        alt="My Custom Icon"
        width={24}
        height={24}
      />
    ),
  },

];
const skillsTop: Skill[] = [
  {
    name: 'Burp Suite',
    icon: <Bug className="w-6 h-6" />,
    category: 'Web Penetration Testing',
    color: '',
  },
  {
    name: 'Nmap',
    icon: <Network className="w-6 h-6" />,
    category: 'Network Scanning',
    color: '',
  },
  {
    name: 'Metasploit',
    icon: <Server className="w-6 h-6" />,
    category: 'Exploit Framework',
    color: '',
  },
  {
    name: 'John the Ripper',
    icon: <Database className="w-6 h-6" />,
    category: 'Password Cracking',
    color: '',
  },
  {
    name: 'Parrot OS',
    icon: <Cloud className="w-6 h-6" />,
    category: 'Penetration Testing',
    color: '',
  },
  {
    name: 'OpenVas',
    icon: <Database className="w-6 h-6" />,
    category: 'Vulnerability Scanner',
    color: '',
  },
  {
    name: 'OSINT Tools',
    icon: <Layers className="w-6 h-6" />,
    category: 'Information Gathering',
    color: '',
  },
  {
    name: 'Snort',
    icon: <Globe className="w-6 h-6" />,
    category: 'Intrusion Detection System',
    color: '',
  },
 
];
const skillsBottom: Skill[] = [
  { 
    name: 'MySQL', 
    icon: <ServerCog className="w-6 h-6" />, 
    category: 'Relational Database', 
    color: '' 
  },
  {
    name: 'MongoDB',
    icon: <DatabaseBackup className="w-6 h-6" />,
    category: 'NoSQL Database',
    color: ''
  },
  {
    name: 'Redis',
    icon: <HardDriveDownload className="w-6 h-6" />,
    category: 'In-Memory Key-Value Store',
    color: ''
  },
  {
    name: 'Firebase',
    icon: <Cloud className="w-6 h-6" />,
    category: 'Realtime NoSQL Database',
    color: ''
  },
  {
    
    name: 'Python',
    icon: <Cpu className="w-6 h-6" />,
    category: 'Programming Language',
    color: '',
  },
  {
    name: 'Git',
    icon: <GitBranch className="w-6 h-6" />,
    category: 'Version Control',
    color: '',
  },

  {
    name: 'TypeScript',
  icon: <FileCode className="w-6 h-6" />,
  category: 'Programming Language',
  color: '',
  },
  {
    name: 'Tailwind CSS',
    icon: <Palette className="w-6 h-6" />,
    category: 'CSS Framework',
    color: '',
  },
  {
    name: 'GraphQL',
    icon: <Zap className="w-6 h-6" />,
    category: 'API Query Language',
    color: '',
  },
  {
    name: 'Vue.js',
    icon: <Monitor className="w-6 h-6" />,
    category: 'Frontend Framework',
    color: '',
  },
  {
    name: 'Node.js',
    icon: <Cpu className="w-6 h-6" />,
    category: 'Runtime Environment',
    color: '',
  },
  {
    name: 'Express.js',
    icon: <Server className="w-6 h-6" />,
    category: 'Web Framework',
    color: '',
  },
  {
    name: 'Laravel',
    icon: <Server className="w-6 h-6" />,
    category: 'PHP Framework',
    color: '',
  },
  {
    name: 'Spring Boot',
    icon: <Zap className="w-6 h-6" />,
    category: 'Java Backend Framework',
    color: '',
  },
  {
    name: 'Django',
    icon: <Layers className="w-6 h-6" />,
    category: 'Python Framework',
    color: '',
  },
  {
    name: 'Flask',
    icon: <FlaskConical className="w-6 h-6" />,
    category: 'Web Framework',
    color: '',
  },
  {
    name: 'PHP',
  icon: <Terminal className="w-6 h-6" />,
  category: 'Backend Programming',
  color: '',
  },

];
const certificates: Certificate[] = [
  {
    id: 1,
    title: "Google Cyber Security",
    description: " Kursus program pelatihan untuk pemula, mengajarkan keterampilan keamanan siber.",
    imageUrl: "/src/img/GoogleCyberSecurity.png",
    issuer: "Coursera-Net",
    year: "2024"
  },
  {
    id: 2,
    title: "Fundamental Of Cyber",
    description: "Kursus Fundamental Cyber Security yang memperkenalkan konsep keamanan siber.",
    imageUrl: "/src/img/Course.net.png",
    issuer: "Coursera-Net",
    year: "2024"
  },
  {
    id: 3,
    title: "Endpoint Security",
    description: "Kursus keamanan perangkat yang melindungi dari malware dan serangan siber berbasis cloud.",
    imageUrl: "/src/img/Endpointsecurity.png",
    issuer: "Cisco",
    year: "2024"
  },
  {
    id: 4,
    title: "Jaringan Komputer",
    description: "Kursus ini mengajarkan dasar-dasar jaringan komputer, termasuk protokol, alamat IP dll.",
    imageUrl: "/src/img/Jaringan.png",
    issuer: "Coursera-Net",
    year: "2024"
  },
  {
    id: 5,
    title: "Certified AI/ML Pentester (C-AI/MLPEN)",
    description: "Sertifikasi Dari The Sec Ops Group tentang menguji keamanan sistem AI dan machine learning. ",
    imageUrl: "/src/img/ai.png",
    issuer: "The SecOps Group",
    year: "2024"
  },
  {
    id: 6,
    title: "Certified Red Team Analyst (CRTA)",
    description: "Sertifikasi Dari CWL untuk menguji kemampuan melakukan serangan simulasi dan eksploitasi.",
    imageUrl: "/src/img/CRTA.png",
    issuer: "CWL",
    year: "2025"
  },
  {
    id: 7,
    title: "Certified Multi-Cloud Blue Team Analyst (MCBTA)",
    description: " Sertifikasi Dari CWL untuk menguasai keamanan, pemantauan, dan investigasi.",
    imageUrl: "/src/img/MCBTA.jpg",
    issuer: "CWL",
    year: "2025"
  },
  {
    id: 8,
    title: "Certified AppSec Pentester (CAPEN)",
    description: "Sertifikasi Dari CWL untuk menguji kemampuan praktis dalam pengujian pentes.",
    imageUrl: "/src/img/AppSec.png",
    issuer: "CWL",
    year: "2024"
  },
  {
    id: 11,
    title: "BSSN VVIP PROGRAM : VULNERABILITY ( HIGH )",
    description: "Sebagai pelapor kerentanan dengan severity (HIGH) program BSSN.",
    imageUrl: "/src/img/BSSN3.png",
    issuer: "BSSN VVIP",
    year: "2024"
  },
  {
    id: 9,
    title: "BSSN VVIP PROGRAM : JAWA TIMUR",
    description: "Sebagai partisipan program identifikasi Kerentanan : Jawa Timur Program BSSN.",
    imageUrl: "/src/img/BSSN1.png",
    issuer: "BSSN VVIP",
    year: "5 -14 Februari 2024"
  },
  {
    id: 10,
    title: "BSSN VVIP PROGRAM : D.I.YOGYAKARTA",
    description: "Sebagai partisipan program identifikasi Kerentanan : D.I Yogyakarta Program BSSN.",
    imageUrl: "/src/img/BSSN2.png",
    issuer: "BSSN VVIP",
    year: "2024"
  },
  {
    id: 11,
    title: "BSSN VVIP PROGRAM : KULON PROGO",
    description: "Sebagai partisipan program identifikasi Kerentanan : Kulon Progo Program BSSN.",
    imageUrl: "/src/img/BSSN4.jpg",
    issuer: "BSSN VVIP",
    year: "2024"
  },
 
];

function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <Card className="group bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 hover:scale-105">
      <div className=" relative overflow-hidden h-40 bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={cert.imageUrl}
          alt={cert.title}
          layout="fill"
          objectFit="contain"
          className="group-hover:scale-105 transition-transform duration-800"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <div className="flex items-center justify-between text-white text-xs">
            <span className="font-medium">{cert.issuer}</span>
            <span>{cert.year}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {cert.description}
        </p>
        <div className="mt-4 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-200 to-blue-200"></div>
          <div className="px-3 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full border border-cyan-200">
            <span className="text-xs font-medium text-cyan-700"></span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-cyan-200"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'experience', 'projects', 'skills', 'certifications', 'interests', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  

  return (
    <div className="bg-black text-white min-h-screen">
     {/* Navigation */}
<nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
  <div className="max-w-7xl mx-auto px-6 py-4">
    <div className="flex justify-between items-center">
<div className="flex items-center space-x-3">
  

  
  {/* Icons */}
  <div className="flex space-x-2">
    <a
      href="https://github.com/Fauzan-Aldi"
      className="p-1.5 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:scale-105 shadow"
    >
      <Github className="w-4 h-4" />
    </a>
    <a
      href="https://www.linkedin.com/in/fauzan-aldi/?profileId=ACoAAEouJEIBVUAGgqKuqi8WB1u4bYx4M-4VHFM"
      className="p-1.5 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:scale-105 shadow"
    >
      <Linkedin className="w-4 h-4" />
    </a>
    <a
      href="mailto:fauzanalditester@gmail.com"
      className="p-1.5 bg-gray-800/50 rounded-full hover:bg-cyan-500/20 transition-all duration-300 hover:scale-105 shadow"
    >
      <Mail className="w-4 h-4" />
    </a>
  </div>

  {/* Name */}
  <span className="text-lg md:text-xl font-semibold tracking-tight bg-gradient-to-r from-green-400 via-cyan-500 to-lime-300 bg-clip-text text-transparent">
    Fauzan Aldi
  </span>
</div>

      
      {/* Left: Navigation Menu */}
      <div className="hidden md:flex space-x-8">
        {['About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact', 'Login'].map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
              activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
               
          </div>
        </div>
      </nav>

      

  {/* Hero Section */}
  function Hero() 
  return 
    <section
      id="hero"
      className="py-20 px-4 sm:px-6 "
    >
      <div className="container pb-8 sm:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Text Section */}
          <div className="flex flex-col justify-center pt-1  mt-[-90px] sm:pt-0 text-center sm:text-left order-2 sm:order-1 gap-8">
            {/* Text Page Hero */}
            <div className=" dark:text-white text-2xl">
              <p>
                Hy, My Name Is ...🙌{" "}
                <span className="text-4xl block font-bold my-5">
                  Fauzan Aldi
                </span>
                I'm{" "}
                <span className="text-cyan-400 text-2xl">
                  <ReactTyped
                    strings={[
                      "Security Researcher",
                      "Penetration Tester",
                      "Bug Hunter",
                      "CTF Players",
                      "Cyber Security Enthusiast",
                      "Informatics Student",
                    ]}
                    typeSpeed={100}
                    loop
                    backSpeed={20}
                    cursorChar="|"
                    showCursor={true}
                  />
                </span>
              </p>
            </div>
          </div>

          {/* Image Section (Optional) */}
          <div className="sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2">
            <div className="relative h-full w-full flex justify-center items-center">
              {/* Image Placeholder */}
              {/* 
              <img
                src="/profile.png"
                alt="Profile"
                className="w-[300px] lg:w-[350px] sm:w-[450px] sm:scale-100 mx-auto"
              />
              */}
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-gray-300 font-sans">A Brief Introduction About Who I Am</p>


          </div>
         </div> 
         
          <div className="grid md:grid-cols-2 gap-12 items-start">
  {/* Bagian Kiri: Teks */}
  <div className=" flex-col space-y-6 text-justify pl-0 sm:pl-8 md:pl-16">
  <h3 className="text-xl font-bold text-white">Security Researcher & CTF Players</h3>
  <div className="space-y-6 text-justify">
    <p className="text-sm text-gray-300 leading-relaxed">
    Saya adalah seorang Security Researcher dengan fokus pada analisis keamanan aplikasi, 
    sistem, dan jaringan. Keahlian saya mencakup penetration testing, vulnerability assessment, 
    reverse engineering, serta malware analysis. Saya aktif mengeksplorasi berbagai celah keamanan
    melalui pendekatan riset yang sistematis dan berbasis standar industri seperti OWASP dan NIST.
    </p>
    <p className="text-sm text-gray-300 leading-relaxed">
    Di samping aktivitas profesional, saya juga aktif mengikuti kompetisi 
    Capture The Flag (CTF) baik secara individu maupun dalam tim. CTF menjadi
    sarana utama saya untuk mengasah keterampilan praktis di berbagai bidang keamanan
    seperti web exploitation, binary exploitation, cryptography, forensic analysis, hingga privilege escalation.
    Pengalaman CTF ini memperkuat kemampuan saya dalam berpikir kritis, cepat dalam debugging, serta memahami serangan
    dunia nyata secara lebih mendalam.
    </p>
    <p className="text-sm text-gray-300 leading-relaxed">
    Saya terbiasa menggunakan berbagai tools seperti Burp Suite, Wireshark, Ghidra, IDA Pro, Metasploit, dan custom script untuk 
    eksploitasi dan analisis kerentanan. Setiap temuan saya dokumentasikan dengan baik dalam bentuk laporan teknis dan proof-of-concept.
    </p>
    {/* Kontak Info */}
    <div className="flex flex-col gap-2">
    <div className="flex items-center space-x-2">
      <User className="w-5 h-5 text-cyan-400" />
      <span className="text-gray-300">Age : 20</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <MapPin className="w-5 h-5 text-cyan-400" />
        <span className="text-gray-300">City : Kepulauan Riau, Indonesia</span>
      </div>

      <div className="flex items-center space-x-2">
        <Phone className="w-5 h-5 text-cyan-400" />
        <span className="text-gray-300">Phone : +62 853 6340 7399</span>
      </div>

      <div className="flex items-center space-x-2">
      <User className="w-5 h-5 text-cyan-400" />
      <span className="text-gray-300">Degree : Mahasiswa Universitas</span>
      </div>
      <div className="flex items-center space-x-2">
      <Award className="w-5 h-5 text-cyan-400" />
      <span className="text-gray-300">Email : fauzanalditester@gmail.com</span>
      </div>
      
    </div>
  </div>
  </div>

   <div>    
            <div className="flex justify-center md:justify-end ">
            <div className="relative">
            <img 
             src="/src/img/aldi1.jpeg" 
             alt="My Profile"  
             className="w-[300px] h-[300px] sm:w-[300px] sm:h-[300px] object-cover rounded-xl shadow-md relative sm:left-[-150px] sm:top-14 mt-6 mx-auto sm:mx-0"
            />
          </div>       
         
          </div>


          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Education
            </h2>
            <p className="text-gray-300 font-sans">Educational Journey And Milestones</p>
          </div>
          
          <div className="space-y-8">
        
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <GraduationCap className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 sm:gap-0">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Universitas Maritim Raja Ali Haji</h3>
                        <p className="text-cyan-400 font-medium">Teknik Informatika</p>
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">2023 - 2027</Badge>
                    </div>
                    <p className="text-gray-300">
                    Focused on secure web application development,
                    vulnerability assessment, and implementation of security best practices across full-stack environments.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">GPA: 3.5/4.0</Badge>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">2023-2027</Badge>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">List</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
         
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Award className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 sm:gap-0">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">SMKN 4 Tanjung Pinang</h3>
                        <p className="text-purple-400 font-medium">Teknik Komputer Dan Jaringan</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">2020-2023</Badge>
                    </div>
                    <p className="text-gray-300">
                    Focused on computer network setup, server administration, and basic cybersecurity
                    practices including firewall configuration, network monitoring, and system hardening.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">GPA: 90.5</Badge>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">2020-2023</Badge>
                      <Badge variant="secondary" className="bg-gray-800 text-gray-300">List</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
          
          </div>
        </div>
      </section>


           {/* Experience Section */}
           <section id="experience" className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Experiences
            </h2>
            <p className="text-gray-300 font-sans">My Professional Cybersecurity Journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Left Timeline */}
            <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-8">
          
              {/* BUG HUNTER */}
              <div className="relative mt-[-80px]">
              <CardContent className="p-6 space-y-3">
            </CardContent>
            </div>

                <CardContent className="p-6 space-y-3 text justify">
                  <h3 className="text-xl font-bold text-white">BUG HUNTER</h3>
                  <p className="text-sm text-gray-400">Agustus 2023 - Agustus 2024 | Pekerja Lepas</p>
                  <p className="text-sm text-cyan-400">BugCrowd</p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Menemukan celah kritis dan mendapat kompensasi serta pengakuan Hall of Fame NASA.</li>
                    <li>Diundang program bug bounty privat oleh platform ternama.</li>
                    <li>Ahli Burp Suite, OWASP ZAP dan teknik uji manual.</li>
                  </ul>
                </CardContent>
            

              {/* PENETRATION TESTER */}
            
                <CardContent className="p-6 space-y-3 text-justify -translate-y-6">
                  <h3 className="text-xl font-bold text-white">PENETRATION TESTER</h3>
                  <p className="text-sm text-gray-400">Juni 2022 - Juni 2024 | Pekerja Lepas</p>
                  <p className="text-sm text-cyan-400">Intigriti</p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Mendeteksi kerentanan dan mempercepat mitigasi risiko keamanan.</li>
                    <li>Mengembangkan sistem keamanan otomatis untuk monitoring dan threat detection.</li>
                    <li>Mengurangi dampak finansial dari potensi insiden keamanan.</li>
                  </ul>
                </CardContent>
              
            </div>

            {/* Right Timeline */}
            <div className="relative pl-6 border-l-2 border-cyan-500/30 space-y-8">
              {/* BUG BOUNTY */}
              
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white">BUG BOUNTY</h3>
                  <p className="text-sm text-gray-400">Juli 2022 - Juli 2024 | Pekerja Lepas</p>
                  <p className="text-sm text-cyan-400">YesWeHack</p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Laporan pengujian penetrasi dengan analisis sistematis dan penilaian risiko.</li>
                    <li>Kuat dalam keamanan aplikasi web dan pembelajaran teknologi keamanan terbaru.</li>
                    <li>Berpengalaman dengan Nessus dan Metasploit.</li>
                  </ul>
                </CardContent>
            

              {/* VVIP BSSN */}
              <div className="relative -top-6">
                <CardContent className="p-6 space-y-3 text-justify">
                  <h3 className="text-xl font-bold text-white">VVIP PROGRAM - BADAN SIBER DAN SANDI NEGARA</h3>
                  <p className="text-sm text-gray-400">Mei 2024 - Mei 2024 | Pekerja Lepas</p>
                  <p className="text-sm text-cyan-400">Voluntary Bug Hunter</p>
                  <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                    <li>Berkontribusi dalam program strategis BSSN untuk peningkatan keamanan sistem elektronik.</li>
                    <li>Evaluasi kerentanan web apps menggunakan metode manual dan otomatis.</li>
                    <li>Menerima sertifikat partisipasi resmi dari BSSN.</li>
                  </ul>
                </CardContent>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <p className="text-gray-300 font-sans">Projects That Reflect My Skills And Passion</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch tracking-normal">
            
            {[
              {
                title: "Blobcat Fast Web Login Page Bruteforce Tool",
                description: "Blobcat adalah alat brute-force login web berbasis Python yang menggunakan requests dan multithreading untuk pengujian cepat.",
                tech: ["Multithreading", "User-Agent", "Python"],
                color: "cyan"
              },
              {
                title: "Simple Vulnerable Web Application",
                description: "Aplikasi web ini dibuat khusus untuk tujuan edukasi, yaitu untuk mendemonstrasikan berbagai kerentanan keamanan pada web.",
                tech: ["SimpleVuln", "VulnWeb Report", "Analyzer"],
                color: "blue"
              },
              {
                title:"Enumeration of Buffer Overflow Protections BOF",
                description: "BOF digunakan untuk menghitung proses sistem dan mengidentifikasi tingkat proteksi, serta menampilkan info layanan, pengguna dll.",
                tech: ["MakeFile", "Api", "Program C"],
                color: "purple"
              },
              {
                title: "Password Vault",
                description: "aplikasi penyimpan password aman. Cukup ingat satu password utama, dan semua password akunmu akan disimpan terenkripsi.",
                tech: ["Enkripsi", "log Aktivitas", "Python"],
                color: "green"
              },
              {
                title: "Bug Platform Web3",
                description: "Mengungkap Celah Keamanan yang Dapat Dieksploitasi dalam Kontrak Cerdas untuk pengembangan oracle semantik otomatis.",
                tech: ["Out of scope", "Bisa dideteksi", "Butuh oracle"],
                color: "pink"
              },
              {
                title: "CVE-2022-21661",
                description: "PoC Python untuk CVE-2022-21661, adaptasi dari versi Go z92g untuk demonstrasi kerentanan secara praktis.",
                tech: ["Proof of Concept", "RCE", "Python"],
                color: "orange"
              }
            ].map((project, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <FolderOpen className="w-8 h-8 text-cyan-400" />
                    <div className="flex space-x-2">
                      <ExternalLink className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
                      <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm-200 mb-4 text-sm text-justify">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
  
    <section id="skills" className="py-20 px-0">
      <div className="w-full mx-auto">
        <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 leading-[1.4] bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block">
              Skills & Technologies
          </h2>
          <p className="text-gray-300 font-sans">Technologies I’m Confident Working With</p>
        </div>

        {/* Animated Skills Marquee */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient overlays */}
        {/* Gradient overlays */}
            {/* Gradient overlays */}

          {/* First marquee row */}
          <div className="flex animate-marquee space-x-8 mb-8 min-w-fit">
          {[...skillsTop, ...skillsTop, ...skillsTop].map((skill: Skill, index: number) => (
              <div key={`row1-${index}`} className="flex-shrink-0 group cursor-pointer">
                <div className="flex items-center space-x-4 px-6 py-4 rounded-">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${skill.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-light">{skill.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second marquee row (reverse) */}
          <div className="flex animate-marquee-reverse space-x-8 min-w-fit">
          {[...skillsBottom, ...skillsBottom, ...skillsBottom].reverse().map((skill: Skill, index: number) => (
              <div key={`row2-${index}`} className="flex-shrink-0 group cursor-pointer">
                <div className="flex items-center space-x-4 px-6 py-4 rounded-full">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full ${skill.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-light">{skill.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    
   {/* Interests Section */}
<section id="interests">
  <div className="max-w-6xl mx-auto px-6">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Hack & Reading Articles
      </h2>
      <p className="text-gray-300 font-sans">
        Sharing articles that fuel my passion for cybersecurity
      </p>
    </div>

    {/* Articles Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article.id}
          className="group bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:-translate-y-1"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${article.color} bg-opacity-20`}>
                {article.type === 'hack' ? (
                  <Shield className="h-4 w-4 text-cyan-400" />
                ) : (
                  <BookOpen className="h-4 w-4 text-blue-400" />
                )}
              </div>
              <div>
                <span className="text-sm font-medium text-gray-300">{article.category}</span>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors opacity-0 group-hover:opacity-100">
              <ExternalLink className="h-4 w-4 text-gray-300" />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 text-xs rounded-md bg-gray-700/40 text-gray-300 border border-gray-600/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Optional footer/stats */}
    <div className="mt-16 text-center">
      {/* Konten statistik atau tambahan di sini jika ada */}
    </div>
  </div>
</section>

     
          
      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Certifications</h2>
            <p className="text-gray-300 font-sans">Certificates From Courses, Programs, And Institutions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
        {/* Contact Section */}
<SectionWrapper id="contact" className="py-12 px-6">
  <div className="max-w-4xl mx-auto">
    <div className="text-center mb-16">
      <motion.h2 
        className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </motion.h2>
      <p className="text-gray-300 font-sans">
        Do you have a project or question about cybersecurity? Just send us a message
      </p>
    </div>
    
    <div className="grid md:grid-cols-2 gap-12">
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        {[
          { icon: <Mail className="w-6 h-6" />, title: "Email", value: "fauzanalditester@gmail.com" },
          { icon: <Phone className="w-6 h-6 " />, title: "Phone", value: "+62 853 6340 7399" },
          { icon: <MapPin className="w-6 h-6 " />, title: "Location", value: "Kepulauan Riau, Indonesia" }
        ].map((contact, index) => (
          <motion.div 
            key={index}
            className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              {contact.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
              <p className="text-gray-300">{contact.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <form
          className="space-y-6"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = e.currentTarget;
            const name = (form.elements[0] as HTMLInputElement).value;
            const email = (form.elements[1] as HTMLInputElement).value;
            const subject = (form.elements[2] as HTMLInputElement).value;
            const message = (form.elements[3] as HTMLTextAreaElement).value;

            const mailtoLink = `mailto:fauzanaldi139@gmail.com?subject=${encodeURIComponent(subject)}&body=Nama: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0APesan:%0A${encodeURIComponent(message)}`;

            window.location.href = mailtoLink;
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none rounded-lg px-4 py-3 transition-colors"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none rounded-lg px-4 py-3 transition-colors"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none rounded-lg px-4 py-3 transition-colors"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your message..."
              rows={5}
              className="w-full bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none rounded-lg px-4 py-3 resize-none transition-colors"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </motion.button>
        </form>
      </motion.div>
      
    </div>
  </div>
</SectionWrapper>

         {/* Footer */}
         <footer className="py-12 px-6">
       <div className="max-w-6xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-center">
           <div className="mb-4 md:mb-0">
             <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
               Fauzan Aldi 
             </div>
             <p className="text-gray-400">Securing The Digital World, One Vulnerability At A Time.</p>
           </div>
           <div className="flex space-x-6">
             <motion.a 
               href="https://github.com/Fauzan-Aldi" 
               className="text-gray-400 hover:text-cyan-400 transition-colors"
               whileHover={{ scale: 1.2, rotate: 360 }}
               transition={{ duration: 0.3 }}
             >
               <Github className="w-6 h-6" />
             </motion.a>
             <motion.a 
               href="https://www.linkedin.com/in/fauzan-aldi/?profileId=ACoAAEouJEIBVUAGgqKuqi8WB1u4bYx4M-4VHFM" 
               className="text-gray-400 hover:text-cyan-400 transition-colors"
               whileHover={{ scale: 1.2, rotate: 360 }}
               transition={{ duration: 0.3 }}
             >
               <Linkedin className="w-6 h-6" />
             </motion.a>
             <motion.a 
               href="mailto:fauzanalditester@gmail.com"
               className="text-gray-400 hover:text-cyan-400 transition-colors"
               whileHover={{ scale: 1.2, rotate: 360 }}
               transition={{ duration: 0.3 }}
             >
               <Mail className="w-6 h-6" />
             </motion.a>
           </div>
         </div>
         
       </div>
     </footer>
      {/* Bottom Section */}
      <div className="">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
          
              
              </div>
              
              

            </div>
          </div>
         <div className="mt-8 pt-8 border-t border-gray-800 text-center">
  <p className="text-gray-400">
    © 2024 Fauzan Aldi – Security Researcher. Built with React, TypeScript & Tailwind CSS.
  </p>
  <p className="text-gray-500 text-xs mt-1">
    Built with React, TypeScript & Tailwind CSS
  </p>
  <div className="flex justify-center space-x-6 mt-2">
    <motion.div
      className="flex items-center space-x-2 text-gray-500 text-xs"
      whileHover={{ scale: 1.05 }}
    >
      <Shield className="w-4 h-4" />
      <span>Secure by Design</span>
    </motion.div>
    <motion.div
      className="flex items-center space-x-2 text-gray-500 text-xs"
      whileHover={{ scale: 1.05 }}
    >
      <Code className="w-4 h-4" />
      <span>Open Source</span>
    </motion.div>
  </div>
</div>
      </section>
    </div>
  );
} 
   