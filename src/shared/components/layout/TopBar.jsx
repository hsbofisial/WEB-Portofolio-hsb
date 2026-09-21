export default function TopBar({ isOpen, showNavText }) {
  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-surface flex items-center justify-end border-b-2 border-black header-shadow z-40 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen
          ? 'md:left-[240px] left-0 px-4 sm:px-6'
          : 'left-0 pl-[56px] sm:pl-[60px] pr-4 sm:pr-6'
      }`}
    >

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <img
          src="/images/profile.jpg?v=2"
          onError={(e) => {
            e.currentTarget.src = '/images/PP.jpg';
          }}
          alt="Muhammad Hajid Hasibu Wahab"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-black object-cover hover:scale-105 transition-transform duration-200"
        />
        <span className="hidden sm:inline font-black text-sm sm:text-lg text-on-surface truncate max-w-[160px] sm:max-w-[240px]">
          Muhammad Hajid
        </span>
      </div>
    </header>
  );
}
