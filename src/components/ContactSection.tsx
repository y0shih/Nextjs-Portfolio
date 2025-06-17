'use client'

import React, { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import Footer from './Footer'

// Rate limiting configuration
const RATE_LIMIT = {
  maxEmails: 2,
  timeWindow: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  storageKey: 'email_send_timestamps'
} as const;

// Validate environment variables
const requiredEnvVars = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
} as const;

// Type guard to check if all required env vars are present
const hasRequiredEnvVars = (vars: typeof requiredEnvVars): vars is { [K in keyof typeof vars]: string } => {
  return Object.values(vars).every(Boolean);
};

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: ''
  });
  const [emailCount, setEmailCount] = useState<number>(0);
  const [timeUntilReset, setTimeUntilReset] = useState<number>(0);

  // Initialize rate limiting on component mount
  useEffect(() => {
    const checkRateLimit = () => {
      try {
        const storedData = localStorage.getItem(RATE_LIMIT.storageKey);
        if (storedData) {
          const timestamps: number[] = JSON.parse(storedData);
          const now = Date.now();
          
          // Filter out timestamps older than the time window
          const recentTimestamps = timestamps.filter(
            timestamp => now - timestamp < RATE_LIMIT.timeWindow
          );
          
          // Update localStorage with only recent timestamps
          if (recentTimestamps.length !== timestamps.length) {
            localStorage.setItem(RATE_LIMIT.storageKey, JSON.stringify(recentTimestamps));
          }
          
          setEmailCount(recentTimestamps.length);
          
          // Calculate time until reset
          if (recentTimestamps.length > 0) {
            const oldestTimestamp = Math.min(...recentTimestamps);
            const resetTime = oldestTimestamp + RATE_LIMIT.timeWindow;
            setTimeUntilReset(Math.max(0, resetTime - now));
          } else {
            setTimeUntilReset(0);
          }
        }
      } catch (error) {
        console.error('Error checking rate limit:', error);
      }
    };

    checkRateLimit();
    const interval = setInterval(checkRateLimit, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Update time until reset display
  useEffect(() => {
    if (timeUntilReset > 0) {
      const interval = setInterval(() => {
        setTimeUntilReset(prev => Math.max(0, prev - 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeUntilReset]);

  const formatTimeUntilReset = (ms: number): string => {
    if (ms === 0) return '';
    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check rate limit
    if (emailCount >= RATE_LIMIT.maxEmails) {
      setStatus({
        type: 'error',
        message: `Rate limit exceeded. Please try again in ${formatTimeUntilReset(timeUntilReset)}.`
      });
      return;
    }

    // Check if all required environment variables are present
    if (!hasRequiredEnvVars(requiredEnvVars)) {
      setStatus({
        type: 'error',
        message: 'Email service is not properly configured. Please contact the administrator.'
      });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      await emailjs.send(
        requiredEnvVars.serviceId,
        requiredEnvVars.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Trong',
          reply_to: formData.email,
        },
        requiredEnvVars.publicKey
      );

      // Update rate limiting after successful send
      const now = Date.now();
      const storedData = localStorage.getItem(RATE_LIMIT.storageKey);
      const timestamps: number[] = storedData ? JSON.parse(storedData) : [];
      const recentTimestamps = timestamps.filter(
        timestamp => now - timestamp < RATE_LIMIT.timeWindow
      );
      recentTimestamps.push(now);
      localStorage.setItem(RATE_LIMIT.storageKey, JSON.stringify(recentTimestamps));
      setEmailCount(recentTimestamps.length);

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    }
  };

  const isRateLimited = emailCount >= RATE_LIMIT.maxEmails;

  return (
    <section className="h-screen py-12 px-6 bg-black backdrop-blur-sm relative flex items-center">
      <div className="absolute inset-0 from-black/50 -z-10" />
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 glow-text">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Let&apos;s work together to bring your ideas to life. I&apos;m always excited to discuss new opportunities and projects.
          </p>
          {emailCount > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {emailCount} of {RATE_LIMIT.maxEmails} messages sent in the last 24 hours
              {timeUntilReset > 0 && ` (Reset in ${formatTimeUntilReset(timeUntilReset)})`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="glass-card glass-hover rounded-xl p-4 flex items-center space-x-4 fade-in-up bg-black/30 backdrop-blur-sm group transition-all duration-300 hover:scale-[1.02]">
              <div className="glass-card rounded-lg p-2">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Email</h3>
                <p className="text-sm text-muted-foreground">trongh1337@gmail.com</p>
              </div>
            </div>

            <div className="glass-card glass-hover rounded-xl p-4 flex items-center space-x-4 fade-in-up bg-black/30 backdrop-blur-sm group transition-all duration-300 hover:scale-[1.02]" style={{ animationDelay: '150ms' }}>
              <div className="glass-card rounded-lg p-2">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Phone</h3>
                <p className="text-sm text-muted-foreground">+84 344 427 301</p>
              </div>
            </div>

            <div className="glass-card glass-hover rounded-xl p-4 flex items-center space-x-4 fade-in-up bg-black/30 backdrop-blur-sm group transition-all duration-300 hover:scale-[1.02]" style={{ animationDelay: '300ms' }}>
              <div className="glass-card rounded-lg p-2">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Location</h3>
                <p className="text-sm text-muted-foreground">Ho Chi Minh City, Vietnam</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-6 fade-in-up bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]" style={{ animationDelay: '450ms' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Name</label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full glass-card rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] focus:text-blue-400 focus:glow-text disabled:opacity-50 disabled:cursor-not-allowed" 
                  placeholder="Your name"
                  required
                  disabled={status.type === 'loading' || isRateLimited}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Email</label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full glass-card rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] focus:text-blue-400 focus:glow-text disabled:opacity-50 disabled:cursor-not-allowed" 
                  placeholder="your.email@example.com"
                  required
                  disabled={status.type === 'loading' || isRateLimited}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full glass-card rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] focus:text-blue-400 focus:glow-text disabled:opacity-50 disabled:cursor-not-allowed" 
                  placeholder="Tell me about your project..."
                  required
                  disabled={status.type === 'loading' || isRateLimited}
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-3 rounded-lg text-sm ${
                  status.type === 'success' ? 'bg-green-500/20 text-green-400' :
                  status.type === 'error' ? 'bg-red-500/20 text-red-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {status.message}
                </div>
              )}
              
              <button 
                type="submit" 
                className="w-full glass-card glass-hover rounded-lg px-6 py-3 text-foreground font-semibold flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105 hover:text-blue-400 hover:glow-text disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status.type === 'loading' || isRateLimited}
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : isRateLimited ? (
                  <>
                    <span>Rate Limit Exceeded</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}

export default ContactSection 