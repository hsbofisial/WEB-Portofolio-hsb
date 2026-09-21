import React from 'react';

export default function FAB() {
  const handleClick = () => {
    alert('Chat micro-interaction triggered! Real chat can be loaded here.');
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-secondary-container border-2 border-black hard-shadow w-14 h-14 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
    >
      <span className="material-symbols-outlined text-black font-black">chat_bubble</span>
    </button>
  );
}
