'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  return (
    <section className="py-24 px-6 bg-black/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 -z-10" />
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Let&apos;s work together to bring your ideas to life. I&apos;m always excited to discuss new opportunities and projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="glass-card glass-hover rounded-xl p-6 flex items-center space-x-4 fade-in-up bg-black/30 backdrop-blur-sm group transition-all duration-300 hover:scale-[1.02]">
              <div className="glass-card rounded-lg p-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Email</h3>
                <p className="text-muted-foreground">trongh1337@gmail.com</p>
              </div>
            </div>

            <div className="glass-card glass-hover rounded-xl p-6 flex items-center space-x-4 fade-in-up bg-black/30 backdrop-blur-sm group transition-all duration-300 hover:scale-[1.02]" style={{ animationDelay: '150ms' }}>
              <div className="glass-card rounded-lg p-3">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Phone</h3>
                <p className="text-muted-foreground">+84 344 427 301</p>
              </div>
            </div>

            <div className="glass-card glass-hover rounded-xl p-6 flex items-center space-x-4 fade-in-up bg-black/30 backdrop-blur-sm group transition-all duration-300 hover:scale-[1.02]" style={{ animationDelay: '300ms' }}>
              <div className="glass-card rounded-lg p-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Location</h3>
                <p className="text-muted-foreground">Ho Chi Minh City, Vietnam</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-2xl p-8 fade-in-up bg-black/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]" style={{ animationDelay: '450ms' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Name</label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full glass-card rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] focus:text-blue-400 focus:glow-text" 
                  placeholder="Your name"
                  required
                  disabled={status.type === 'loading'}
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
                  className="w-full glass-card rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] focus:text-blue-400 focus:glow-text" 
                  placeholder="your.email@example.com"
                  required
                  disabled={status.type === 'loading'}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 transition-all duration-300 group-hover:text-blue-400 group-hover:glow-text">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full glass-card rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all duration-300 hover:scale-[1.02] focus:scale-[1.02] focus:text-blue-400 focus:glow-text" 
                  placeholder="Tell me about your project..."
                  required
                  disabled={status.type === 'loading'}
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-4 rounded-lg ${
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
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
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
    </section>
  )
}

export default ContactSection 