import React, { useState } from 'react';
import { TechEvent } from '../types';

interface DigestViewProps {
  events: TechEvent[];
  onOpenEventDetail: (event: TechEvent) => void;
}

export const DigestView: React.FC<DigestViewProps> = ({ events, onOpenEventDetail }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  const digestItems = [
    {
      title: 'Agentic AI Workflows Dominate Bengaluru Technical Meetups',
      date: 'Weekly Brief · Sep 25, 2024',
      badge: 'Trending Theme',
      summary:
        'Over 60% of technical community submissions this week focus on autonomous tool execution pipelines, Semantic Kernel swarms, and multi-agent coordination rather than standalone chat completions.',
      keyTakeaways: [
        'INT4 / FP8 compilation on TensorRT-LLM shows 2.4x latency improvements for tool invocation.',
        'Lakehouse architectures (Microsoft Fabric & Snowflake Cortex) are adding native zero-copy LLM endpoints.',
        'High demand for hands-on labs over passive keynote lectures.',
      ],
      relevantEventId: 'microsoft-fabric-agentic-ai',
    },
    {
      title: 'Commute & Corridor Intelligence: Silk Board & OMR Delays',
      date: 'Transit Advisory · Sep 26 Evening',
      badge: 'Traffic Alert',
      summary:
        'Evening transit from Koramangala, HSR, and Bellandur toward Lavelle Road / High Grounds will face +25 to +35 minutes delay due to metro construction near Dairy Circle.',
      keyTakeaways: [
        'Recommend using Purple Line Metro via Swami Vivekananda Road or Vidhana Soudha stations.',
        'Event organizers at Microsoft Reactor and AWS Bagmane report doors open at 5:30 PM for early check-in.',
      ],
      relevantEventId: 'aws-genai-immersion-day',
    },
    {
      title: 'Chennai Deep Tech Surge: Vertex AI & Research Park DevFest',
      date: 'Regional Spotlight · IIT Madras',
      badge: 'Chennai Hub',
      summary:
        'With over 350 registrations, GDG Cloud Chennai at IIT Madras Research Park is set to be the largest multimodal Gemini & Vector Search workshop of the quarter.',
      keyTakeaways: [
        'Hands-on sessions using Gemini 1.5 Pro multimodal reasoning.',
        'Production RAG architecture patterns shared by Google Developer Experts.',
      ],
      relevantEventId: 'google-cloud-vertex-devfest',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Top Header */}
      <div className="px-3 sm:px-4 pt-3 pb-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4b41e1] animate-ping"></span>
            <span className="text-[11px] font-bold text-[#4b41e1] uppercase tracking-wider">
              Autonomous Intelligence
            </span>
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#0b1c30]">
            AI Executive Digest
          </h2>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#e2dfff] text-[#3323cc] font-mono text-xs font-bold">
          Issue #39
        </span>
      </div>

      {/* Hero Digest Card */}
      <div className="px-3 sm:px-4 mb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#131b2e] to-[#213145] text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-[#85f8c4] text-[10px] font-bold uppercase tracking-wider">
              Synthesis of 37 Meetups
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base sm:text-lg mt-2 leading-snug">
              "The shift from Prompt Engineering to Agentic Runtime Architecture"
            </h3>
            <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
              Synthesized by TechPulse AI from speaker abstracts, GitHub repo releases, and organizer agendas across Bengaluru &amp; Chennai.
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#4b41e1]/30 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Digest Articles */}
      <div className="px-3 sm:px-4 flex flex-col gap-3">
        {digestItems.map((item, idx) => {
          const isExpanded = expandedSection === idx;
          const matchedEvent = events.find((e) => e.id === item.relevantEventId);

          return (
            <article
              key={idx}
              className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-sm hover:shadow-md transition-all"
            >
              <div
                onClick={() => setExpandedSection(isExpanded ? null : idx)}
                className="cursor-pointer flex items-start justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#4b41e1] font-semibold text-[10px]">
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-[#45464d]">{item.date}</span>
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm sm:text-base text-[#0b1c30] leading-snug">
                    {item.title}
                  </h4>
                </div>
                <span className="material-symbols-outlined text-[#45464d] text-[20px] transition-transform flex-shrink-0">
                  {isExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </div>

              <p className="text-xs text-[#45464d] mt-2 leading-relaxed">
                {item.summary}
              </p>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-[#eff4ff] flex flex-col gap-2 animate-in fade-in duration-150">
                  <span className="text-[11px] font-bold text-[#0b1c30] uppercase tracking-wider">
                    Core Insights &amp; Findings:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#45464d]">
                    {item.keyTakeaways.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4b41e1] mt-1.5 flex-shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {matchedEvent && (
                    <div className="mt-2 pt-2 border-t border-[#eff4ff] flex items-center justify-between">
                      <span className="text-xs text-[#45464d] truncate max-w-[200px]">
                        Related: <strong>{matchedEvent.title}</strong>
                      </span>
                      <button
                        onClick={() => onOpenEventDetail(matchedEvent)}
                        className="text-xs font-semibold text-[#4b41e1] hover:underline flex items-center gap-1 flex-shrink-0"
                      >
                        <span>View Meetup</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
