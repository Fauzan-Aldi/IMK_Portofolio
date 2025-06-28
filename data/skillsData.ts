// data/skillsData.ts
import { FaReact, FaNodeJs } from 'react-icons/fa';
import Image from 'next/image';

export interface Skill {
  name: string;
  category: string;
  color: string;
  icon: JSX.Element;
}

export const skills: Skill[] = [
  {
    name: 'React',
    category: 'Frontend',
    color: 'bg-blue-500',
    icon: <FaReact size={24} />,
  },
  {
    name: 'Node.js',
    category: 'Backend',
    color: 'bg-green-600',
    icon: <FaNodeJs size={24} />,
  },
  {
    name: 'Custom Tool',
    category: 'Tools',
    color: 'bg-yellow-500',
    icon: (
      <Image
        src="/icons/my-custom-icon.png"
        alt="Custom Icon"
        width={24}
        height={24}
      />
    ),
  },
];
