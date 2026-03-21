export default function MetricCard({ title, value, change, changeText, trend }) {
  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';
  
  return (
    <div className="glass-effect rounded-[20px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.02)] bg-white/40 border border-white/60 hover:-translate-y-1 transition-transform duration-300 animate-fade-in-up">
      <h3 className="text-sm font-medium text-ink-secondary mb-3">{title}</h3>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-serif font-bold text-ink leading-none">{value}</div>
        {change && (
          <div className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
            isPositive ? 'bg-accent-green-light text-accent-green' : isNeutral ? 'bg-primary-100 text-primary-600' : 'bg-red-50 text-red-500'
          }`}>
            {change} {changeText}
          </div>
        )}
      </div>
    </div>
  );
}
