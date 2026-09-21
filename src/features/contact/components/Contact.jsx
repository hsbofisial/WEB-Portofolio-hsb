import React from 'react';
import { CONTACT_EMAIL, CONTACT_WHATSAPP, CONTACT_WHATSAPP_CLEAN, WHATSAPP_ICON } from '../data/contactData';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements['name']?.value || '';
    const email = form.elements['email']?.value || '';
    const message = form.elements['message']?.value || '';
    const text = encodeURIComponent(
      `Halo Muhammad Hajid (HSB.DSGN),\n\nSaya: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    );
    window.open(`https://wa.me/${CONTACT_WHATSAPP_CLEAN}?text=${text}`, '_blank');
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pt-8" id="contact">
      <div className="flex flex-col justify-center">
        <h2 className="text-[64px] font-black uppercase leading-tight mb-6">
          Let's build<br />together
        </h2>
        <p className="text-[16px] leading-6 max-w-md mb-8">
          Siap berkolaborasi untuk proyek desain grafis, brand identity, kampanye visual, atau materi promosi bisnis Anda.
        </p>
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="bg-white text-black px-6 py-3 font-bold border-2 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-100 flex items-center gap-2 w-fit cursor-pointer"
          >
            <span className="material-symbols-outlined">mail</span>
            <span className="font-bold">{CONTACT_EMAIL}</span>
          </a>
          <a
            href={`https://wa.me/${CONTACT_WHATSAPP_CLEAN}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-6 py-3 font-bold border-2 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-100 flex items-center gap-2 w-fit cursor-pointer"
          >
            <img
              src={WHATSAPP_ICON}
              alt="WhatsApp"
              className="w-5 h-5 object-contain"
            />
            <span className="font-bold">{CONTACT_WHATSAPP}</span>
          </a>
        </div>
      </div>
      <div className="bg-primary-container border-2 border-black hard-shadow p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[14px] font-bold uppercase mb-2">Full Name</label>
            <input
              name="name"
              className="w-full bg-white border-2 border-black p-4 focus:outline-none focus:hard-shadow transition-all duration-100"
              placeholder="Masukkan nama Anda"
              type="text"
              required
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold uppercase mb-2">Email Address</label>
            <input
              name="email"
              className="w-full bg-white border-2 border-black p-4 focus:outline-none focus:hard-shadow transition-all duration-100"
              placeholder="nama@email.com"
              type="email"
              required
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold uppercase mb-2">Message</label>
            <textarea
              name="message"
              className="w-full bg-white border-2 border-black p-4 focus:outline-none focus:hard-shadow transition-all duration-100"
              placeholder="Ceritakan kebutuhan desain Anda..."
              rows="4"
              required
            ></textarea>
          </div>
          <button
            className="w-full bg-black text-white p-4 font-black uppercase border-2 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-100 cursor-pointer"
            type="submit"
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
}
