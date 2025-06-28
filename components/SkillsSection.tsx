'use client';

import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaDatabase } from 'react-icons/fa';
import Image from 'next/image';
interface Skill {
  name: string;
  category: string;
  icon: JSX.Element;
}

export default function SkillsSection() {
  const skills: Skill[] = [
    {
      name: 'React',
      category: 'Frontend',
      icon: <FaReact size={50} className="text-cyan-400" />,
    },
    {
      name: 'Node.js',
      category: 'Backend',
      icon: <FaNodeJs size={50} className="text-green-500" />,
    },
    {
      name: 'HTML5',
      category: 'Markup',
      icon: <FaHtml5 size={50} className="text-orange-500" />,
    },
    {
      name: 'CSS3',
      category: 'Styling',
      icon: <FaCss3Alt size={50} className="text-blue-500" />,
    },
    {
      name: 'GitHub',
      category: 'Version Control',
      icon: <FaGithub size={50} className="text-white" />,
    },
    {
      name: 'Database',
      category: 'Storage',
      icon: <FaDatabase size={50} className="text-yellow-400" />,
    },
  ];

  return (
    <section id="skills" className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
        <p className="text-gray-400">Technologies I’m Confident Working With</p>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div
          className="flex gap-12 w-max animate-marquee"
          style={{
            animation: 'scroll 25s linear infinite',
          }}
        >
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 flex-shrink-0"
            >
              {skill.icon}
              <div className="text-center">
                <p className="font-semibold">{skill.name}</p>
                <p className="text-sm text-gray-400">{skill.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tambahkan animasi jika belum ada */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
}
