import React from 'react';
import { Bot, User, Ghost, Cpu } from 'lucide-react';
import { customizations } from '../constants';

interface AvatarProps {
  avatarId: string | null;
  equipped: {
    color: string;
    accessory: string;
  };
  size?: number;
  className?: string;
}

const avatarIcons: Record<string, any> = {
  bot1: Bot,
  bot2: User,
  bot3: Ghost,
  bot4: Cpu,
};

export const Avatar: React.FC<AvatarProps> = ({ avatarId, equipped, size = 100, className = "" }) => {
  if (!avatarId) {
    return (
      <div 
        style={{ width: size, height: size }} 
        className={`bg-slate-700 rounded-full flex items-center justify-center ${className}`}
      >
        <User className="text-slate-500" size={size * 0.6} />
      </div>
    );
  }

  const Icon = avatarIcons[avatarId] || Bot;
  const colorData = customizations.colors.find(c => c.id === equipped.color);
  const colorValue = colorData?.value || '#38bdf8';

  return (
    <div 
      style={{ width: size, height: size }} 
      className={`relative flex items-center justify-center rounded-full bg-slate-800/50 p-2 border-2 border-slate-700 ${className}`}
    >
      <Icon 
        size={size * 0.8} 
        style={{ color: colorValue }} 
        className="transition-colors duration-300"
      />
      {equipped.accessory === 'hat' && (
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-slate-400">
          <div className="w-6 h-2 bg-slate-600 rounded-t-full" />
        </div>
      )}
      {equipped.accessory === 'glasses' && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-3 h-2 bg-black rounded-sm opacity-80" />
          <div className="w-3 h-2 bg-black rounded-sm opacity-80" />
        </div>
      )}
    </div>
  );
};
