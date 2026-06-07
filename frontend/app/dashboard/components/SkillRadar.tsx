'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { GlassCard } from '@/components/UI/GlassCard';
import { SKILLS } from '@/lib/api';

export function SkillRadar() {
  return (
    <GlassCard title="Skills Radar" className="min-h-[320px]">
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={SKILLS}>
          <PolarGrid stroke="#1a3a2e" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Proficiency"
            dataKey="value"
            stroke="#00ff9d"
            fill="#00ff9d"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
