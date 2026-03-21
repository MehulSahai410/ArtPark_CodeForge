import Sidebar from '../components/dashboard/Sidebar';
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Headphones, Circle } from 'lucide-react';

const THREADS = [
  {
    id: 1, name: 'AI Learning Assistant', icon: Bot, unread: 2, lastMessage: 'I recommend starting with System Design Basics.',
    messages: [
      { from: 'bot', text: 'Welcome! I\'ve analyzed your profile and prepared recommendations.', time: '9:00 AM' },
      { from: 'bot', text: 'Based on your skill gaps, I suggest prioritizing System Design and Cloud Architecture.', time: '9:01 AM' },
      { from: 'user', text: 'Thanks! What module should I start with?', time: '9:15 AM' },
      { from: 'bot', text: 'I recommend starting with System Design Basics. It covers caching, load balancing, and scalability fundamentals.', time: '9:16 AM' },
      { from: 'user', text: 'How long will the full roadmap take?', time: '9:20 AM' },
      { from: 'bot', text: 'At your current pace, the 4-week plan should get you interview-ready. Focus on 1-2 hours daily for best results.', time: '9:21 AM' },
    ]
  },
  {
    id: 2, name: 'Career Mentor', icon: User, unread: 1, lastMessage: 'Great progress this week! Keep going.',
    messages: [
      { from: 'bot', text: 'Hi! I\'m your assigned career mentor. Feel free to reach out anytime.', time: 'Mon 10:00 AM' },
      { from: 'user', text: 'Hi! I\'m struggling with distributed systems concepts.', time: 'Mon 2:30 PM' },
      { from: 'bot', text: 'That\'s completely normal. I recommend watching the "Designing Data-Intensive Applications" summary first.', time: 'Mon 2:35 PM' },
      { from: 'bot', text: 'Great progress this week! Keep going.', time: 'Today 8:00 AM' },
    ]
  },
  {
    id: 3, name: 'Platform Support', icon: Headphones, unread: 0, lastMessage: 'Your issue has been resolved.',
    messages: [
      { from: 'user', text: 'The module video isn\'t loading on the React Patterns page.', time: 'Sat 3:00 PM' },
      { from: 'bot', text: 'Thank you for reporting. We\'re looking into it.', time: 'Sat 3:15 PM' },
      { from: 'bot', text: 'Your issue has been resolved. Please try refreshing the page.', time: 'Sun 9:00 AM' },
    ]
  },
  {
    id: 4, name: 'Team Updates', icon: User, unread: 0, lastMessage: 'New modules added to the library.',
    messages: [
      { from: 'bot', text: 'Welcome to AdaptLearn! We\'re excited to have you on board.', time: 'Week 1' },
      { from: 'bot', text: 'New modules added to the library: Docker & Kubernetes, AWS Fundamentals.', time: 'Week 2' },
    ]
  },
  {
    id: 5, name: 'AI Study Group', icon: Bot, unread: 0, lastMessage: 'Session notes shared.',
    messages: [
      { from: 'bot', text: 'Today\'s topic: Caching strategies and CDN usage patterns.', time: 'Wed 11:00 AM' },
      { from: 'user', text: 'Can we also cover Redis vs Memcached?', time: 'Wed 11:05 AM' },
      { from: 'bot', text: 'Absolutely! Session notes shared in the resources section.', time: 'Wed 12:00 PM' },
    ]
  },
];

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState(THREADS[0]);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(THREADS[0].messages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(activeThread.messages);
  }, [activeThread]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = { from: 'user', text: inputText, time: 'Just now' };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: 'Thanks for your message! I\'ll get back to you shortly with a detailed response.', time: 'Just now' }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar />
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0 relative overflow-x-hidden min-h-screen">
        <div className="gradient-blob w-[500px] h-[500px] bg-accent-orange-light top-0 -left-20 animate-pulse-soft absolute pointer-events-none" />
        <div className="gradient-blob w-[600px] h-[600px] bg-primary-200 bottom-0 -right-20 animate-pulse-soft absolute pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="flex-1 p-6 md:p-10 z-10 relative">
          <div className="max-w-6xl mx-auto space-y-6">

            {/* Header */}
            <div className="animate-fade-in-up">
              <h1 className="font-serif font-bold text-3xl md:text-4xl text-ink mb-2">Messages</h1>
              <p className="text-ink-secondary text-base">Conversations, AI recommendations & notifications</p>
            </div>

            {/* Split View */}
            <div className="glass-effect rounded-2xl bg-white/50 border border-white/60 shadow-sm overflow-hidden flex flex-col md:flex-row animate-fade-in-up" style={{ animationDelay: '0.1s', minHeight: '65vh' }}>
              
              {/* Left: Conversations List */}
              <div className="w-full md:w-80 border-r border-gray-100/50 flex flex-col shrink-0">
                <div className="p-4 border-b border-gray-100/50">
                  <p className="text-xs font-semibold text-ink-light uppercase tracking-wider">Conversations</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {THREADS.map(thread => {
                    const Icon = thread.icon;
                    const isActive = activeThread.id === thread.id;
                    return (
                      <button
                        key={thread.id}
                        onClick={() => setActiveThread(thread)}
                        className={`w-full flex items-start gap-3 p-4 text-left transition-all duration-200 border-b border-gray-50 ${
                          isActive ? 'bg-primary-50/60' : 'hover:bg-white/60'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-primary-100' : 'bg-gray-100'}`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-ink-muted'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm truncate ${isActive ? 'font-semibold text-ink' : 'font-medium text-ink/80'}`}>{thread.name}</span>
                            {thread.unread > 0 && (
                              <span className="text-[10px] font-bold bg-primary-500 text-white w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2">{thread.unread}</span>
                            )}
                          </div>
                          <p className="text-xs text-ink-muted truncate mt-0.5">{thread.lastMessage}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Chat Window */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Chat header */}
                <div className="p-4 border-b border-gray-100/50 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
                    <activeThread.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{activeThread.name}</p>
                    <p className="text-[10px] text-accent-green flex items-center gap-1"><Circle className="w-2 h-2 fill-accent-green" /> Online</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.from === 'user'
                          ? 'bg-primary-500 text-white rounded-br-md'
                          : 'bg-gray-100 text-ink rounded-bl-md'
                      }`}>
                        {msg.text}
                        <p className={`text-[10px] mt-1 ${msg.from === 'user' ? 'text-white/60' : 'text-ink-muted'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-ink-muted px-4 py-3 rounded-2xl rounded-bl-md text-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-ink-muted/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-ink-muted/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-ink-muted/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100/50 flex items-center gap-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-sm"
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 rounded-xl bg-primary-500 hover:bg-primary-600 flex items-center justify-center text-white transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
