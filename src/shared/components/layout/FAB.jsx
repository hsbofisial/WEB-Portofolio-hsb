import React, { useState, useEffect, useRef } from 'react';
import { CONTACT_WHATSAPP_CLEAN, WHATSAPP_ICON } from '../../../features/contact/data/contactData';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: 'Halo! Selamat datang di portofolio saya 👋\nAda kebutuhan desain grafis, brand identity, atau materi promosi yang ingin dikonsultasikan?',
    time: 'Baru saja'
  }
];

const QUICK_OPTIONS = [
  { label: '💰 Tanya Biaya / Pricelist', query: 'Halo Hajid, saya ingin tanya informasi pricelist dan estimasi biaya pengerjaan desain.' },
  { label: '🎨 Konsultasi Brand & Logo', query: 'Halo Hajid, saya butuh perancangan brand identity dan desain logo baru.' },
  { label: '📱 Desain Materi Promosi', query: 'Halo Hajid, saya ingin buat materi promosi (banner / feed media sosial).' },
  { label: '💬 Chat langsung ke WhatsApp', query: 'direct_wa' }
];

export default function FAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('hsb_chat_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync with session storage
  useEffect(() => {
    try {
      sessionStorage.setItem('hsb_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Could not save chat history to sessionStorage', e);
    }
  }, [messages]);

  // Scroll to bottom when messages update or when typing
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setUnreadCount(0);
        setShowTooltip(false);
      }
      return next;
    });
  };

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getBotResponse = (userMsg) => {
    const lower = userMsg.toLowerCase();

    if (lower.includes('harga') || lower.includes('biaya') || lower.includes('pricelist') || lower.includes('tarif') || lower.includes('budget')) {
      return 'Untuk estimasi biaya dan pricelist, pengerjaan disesuaikan dengan skala dan ruang lingkup kebutuhan Anda (seperti logo, stationery, feeds, dll). Silakan infokan detail proyek Anda atau diskusikan langsung via WhatsApp agar saya buatkan penawaran terbaik!';
    }
    if (lower.includes('brand') || lower.includes('logo') || lower.includes('identitas')) {
      return 'Layanan Brand Identity mencakup riset visual, konsep rancangan logo, pemilihan warna & tipografi, hingga panduan guideline lengkap untuk media digital dan cetak. Ada konsep atau referensi gaya visual yang sudah Anda siapkan?';
    }
    if (lower.includes('lama') || lower.includes('durasi') || lower.includes('deadline') || lower.includes('kapan') || lower.includes('waktu')) {
      return 'Estimasi waktu pengerjaan biasanya berkisar antara 3 - 7 hari kerja tergantung kompleksitas desain dan jumlah revisi. Jika ada tenggat waktu (deadline) khusus, silakan kabari ya!';
    }
    if (lower.includes('wa') || lower.includes('whatsapp') || lower.includes('kontak') || lower.includes('telepon') || lower.includes('nomor')) {
      return 'Anda bisa langsung menghubungi WhatsApp saya di +62 812-3456-1930 dengan menekan tombol "Lanjut ke WhatsApp" di bawah!';
    }
    return 'Terima kasih telah meninggalkan pesan! Pesan Anda sudah saya catat. Untuk respon cepat atau mengirimkan brief dokumen, Anda dapat langsung mengklik tombol "Kirim ke WhatsApp" berikut.';
  };

  const sendMessage = (textToSend) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      time: getTimeString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replyText = getBotResponse(trimmed);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: replyText,
        time: getTimeString()
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 850);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleQuickOption = (opt) => {
    if (opt.query === 'direct_wa') {
      openWhatsApp('Halo Hajid (HSB.DSGN), saya berkunjung dari portofolio Anda dan ingin berkonsultasi mengenai proyek desain.');
    } else {
      sendMessage(opt.query);
    }
  };

  const openWhatsApp = (customText) => {
    const text = encodeURIComponent(customText || 'Halo Hajid, saya ingin bertanya seputar jasa desain grafis Anda.');
    window.open(`https://wa.me/${CONTACT_WHATSAPP_CLEAN}?text=${text}`, '_blank');
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      sessionStorage.removeItem('hsb_chat_messages');
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <aside aria-label="Live Chat Support" className="relative">
      {/* TOOLTIP CALLOUT ON INITIAL LOAD */}
      {!isOpen && showTooltip && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-18 right-4 sm:bottom-20 sm:right-6 z-50 bg-white border-2 border-black hard-shadow px-3 py-1.5 flex items-center gap-2 animate-bounce max-w-[230px]"
        >
          <span className="text-base">👋</span>
          <div className="flex-1">
            <p className="text-[11px] font-black uppercase leading-tight text-black">Tanya Hajid?</p>
            <p className="text-[10px] font-semibold text-neutral-600 leading-tight">Konsultasi cepat di sini</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Tutup notifikasi pesan"
            className="text-neutral-400 hover:text-black text-xs font-black transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* CHAT WINDOW / MODAL */}
      {isOpen && (
        <div
          className="fixed bottom-18 right-4 sm:bottom-20 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[310px] max-w-[320px] h-[410px] max-h-[calc(100vh-6rem)] bg-[#fcf9f0] border-2 border-black hard-shadow flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          role="dialog"
          aria-label="Kotak Percakapan Desainer"
        >
          {/* HEADER */}
          <div className="bg-secondary-container border-b-2 border-black px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  src="/images/profile.jpg?v=2"
                  alt="Muhammad Hajid"
                  className="w-7 h-7 border border-black object-cover bg-white"
                  onError={(e) => {
                    e.currentTarget.src = '/images/PP.jpg';
                  }}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-black rounded-full" />
              </div>
              <div>
                <h3 className="font-black text-xs uppercase leading-tight text-black flex items-center gap-1">
                  Muhammad Hajid
                  <span className="inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                </h3>
                <p className="text-[9.5px] font-bold text-neutral-700 uppercase leading-none mt-0.5">
                  Designer • Online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Bersihkan chat"
                aria-label="Bersihkan riwayat percakapan"
                className="w-6 h-6 flex items-center justify-center border border-black bg-white hover:bg-neutral-100 text-[10px] font-bold transition-all"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
              </button>
              <button
                onClick={handleToggle}
                title="Tutup chat"
                aria-label="Tutup obrolan"
                className="w-6 h-6 flex items-center justify-center border border-black bg-black text-white hover:bg-neutral-800 text-[10px] font-bold transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          {/* BANNER / QUICK WA CALL */}
          <div className="bg-white border-b-2 border-black px-2.5 py-1.5 flex items-center justify-between text-[11px]">
            <span className="font-bold flex items-center gap-1 text-[10.5px]">
              <img src={WHATSAPP_ICON} alt="WA" className="w-3.5 h-3.5 object-contain" />
              WhatsApp:
            </span>
            <button
              onClick={() => openWhatsApp()}
              className="bg-emerald-500 text-black px-2 py-0.5 text-[10px] font-black uppercase border border-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              Buka WA
            </button>
          </div>

          {/* MESSAGES BODY */}
          <div className="flex-1 p-2.5 overflow-y-auto space-y-2 bg-[#fcf9f0]/60">
            <div className="text-center my-0.5">
              <span className="text-[9px] font-bold uppercase tracking-wider bg-surface-container border border-black/30 px-1.5 py-0.5 text-neutral-600">
                Percakapan Langsung
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-2 text-[11px] leading-snug border-2 border-black ${
                    msg.sender === 'user'
                      ? 'bg-secondary-container text-black'
                      : 'bg-white text-black'
                  }`}
                  style={{ boxShadow: '2px 2px 0px 0px #000' }}
                >
                  <p className="whitespace-pre-line font-medium">{msg.text}</p>
                  
                  {/* Shortcut to WA inside bot reply */}
                  {msg.sender === 'bot' && (
                    <div className="mt-1.5 pt-1.5 border-t border-black/15 flex items-center justify-between gap-1.5">
                      <span className="text-[9px] text-neutral-500 font-bold">{msg.time}</span>
                      <button
                        onClick={() => openWhatsApp(`Halo Hajid, saya membaca pesan di portofolio Anda:\n"${msg.text.slice(0, 80)}..."\n\nSaya ingin melanjutkan konsultasi.`)}
                        className="text-[9.5px] font-black uppercase text-emerald-800 hover:text-black flex items-center gap-0.5 hover:underline cursor-pointer"
                      >
                        Lanjut ke WA →
                      </button>
                    </div>
                  )}

                  {msg.sender === 'user' && (
                    <span className="block text-[9px] text-neutral-600 font-bold text-right mt-0.5">
                      {msg.time}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="flex items-start">
                <div
                  className="bg-white border-2 border-black p-1.5 flex items-center gap-1"
                  style={{ boxShadow: '2px 2px 0px 0px #000' }}
                >
                  <span className="text-[10px] font-bold text-neutral-500 mr-0.5">Hajid mengetik</span>
                  <span className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 h-1 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK SUGGESTIONS */}
          <div className="bg-surface-container border-t-2 border-black px-2 py-1.5 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1">
            {QUICK_OPTIONS.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuickOption(opt)}
                className="inline-block shrink-0 bg-white hover:bg-secondary-container border border-black px-2 py-0.5 text-[10px] font-bold uppercase transition-colors text-black cursor-pointer active:scale-95"
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* CHAT INPUT FORM */}
          <form
            onSubmit={handleFormSubmit}
            className="p-1.5 bg-white border-t-2 border-black flex items-center gap-1.5"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 bg-[#fcf9f0] border-2 border-black px-2.5 py-1 text-xs font-semibold focus:outline-none focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              title="Kirim pesan"
              aria-label="Kirim pesan"
              className="bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed border-2 border-black px-2.5 py-1 hover:bg-neutral-800 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm font-bold">send</span>
            </button>
          </form>
        </div>
      )}

      {/* FLOATING ACTION BUTTON (TOGGLE) */}
      <button
        onClick={handleToggle}
        aria-label={isOpen ? "Tutup pesan chat" : "Buka pesan chat"}
        aria-expanded={isOpen}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-secondary-container border-2 border-black hard-shadow w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all z-50 cursor-pointer group"
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-black font-black text-xl transition-transform duration-200 rotate-90">
            close
          </span>
        ) : (
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-black font-black text-xl group-hover:scale-110 transition-transform">
              chat_bubble
            </span>
            {unreadCount > 0 && (
              <span className="absolute -top-2.5 -right-2.5 w-4 h-4 bg-red-500 text-white border border-black rounded-full flex items-center justify-center text-[9px] font-black animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
        )}
      </button>
    </aside>
  );
}
