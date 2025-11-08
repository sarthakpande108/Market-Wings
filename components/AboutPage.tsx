import React from 'react';

const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-2 4V4h4v2H8z" clipRule="evenodd" />
    </svg>
);

export const AboutPage: React.FC = () => {
  return (
    <div className="animate-fade-in text-slate-300 space-y-6">
      <h2 className="text-3xl font-bold text-center text-sky-400">About Me</h2>
      
      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <h3 className="font-semibold text-lg text-slate-100 flex items-center mb-2">
          <ProfileIcon />
          AI Developer & Financial Analyst
        </h3>
        <p className="leading-relaxed">
          I am  Sarthak Pande AI/GenAI developer with four years of experience building innovative AI-powered products. My expertise lies at the intersection of artificial intelligence and finance, a space where I am passionate about creating tools that provide actionable insights from complex data.
        </p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
        <h3 className="font-semibold text-lg text-slate-100 flex items-center mb-2">
            <BriefcaseIcon />
            Professional Experience
        </h3>
        <p className="leading-relaxed">
          Alongside my development work, I serve as a sub-broker with <strong className="font-semibold text-sky-400">Choice International</strong>. In this role, I have successfully managed client portfolios, leveraging data-driven insights and technical analysis to inform investment strategies. My mission is to build intelligent applications like MarketWings to empower investors and traders to make smarter, more informed financial decisions.
        </p>
      </div>

      <div className="text-center text-sm text-slate-400 mt-4">
        <p>Thank you for using MarketWings. I hope it serves you well in your trading journey.</p>
      </div>
    </div>
  );
};