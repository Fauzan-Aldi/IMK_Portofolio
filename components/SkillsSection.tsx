'use client';

import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGithub, FaDatabase } from 'react-icons/fa';

export default function SkillsSection() {
  const skills = [
    <FaReact size={50} className="text-cyan-400" />,
    <FaNodeJs size={50} className="text-green-500" />,
    <FaHtml5 size={50} className="text-orange-500" />,
    <FaCss3Alt size={50} className="text-blue-500" />,
    <FaGithub size={50} className="text-white" />,
    <FaDatabase size={50} className="text-yellow-400" />,
  ];

  return (
    <section id="skills" className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div
          className="flex gap-12 w-max"
          style={{
            animation: 'scroll 25s linear infinite',
          }}
        >
          {[...skills, ...skills].map((icon, index) => (
            <div key={index} className="flex-shrink-0">{icon}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
