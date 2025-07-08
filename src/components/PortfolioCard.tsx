import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PortfolioCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
  className?: string
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  className
}) => {
  return (
    <div 
      className={cn(
        "glass-card glass-hover rounded-2xl p-6 fade-in-up group",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-4">
        <div className="glass-card rounded-xl p-3 mr-4">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

export default PortfolioCard 