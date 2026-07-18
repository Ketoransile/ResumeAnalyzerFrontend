export const KeySkillsCard = ({ title }: { title: string }) => {
  return (
    <div
      className="
        inline-flex items-center gap-2
        bg-emerald-500/10 text-emerald-300
        border border-emerald-500/20
        rounded-full px-4 py-2
        text-sm font-medium
        hover:bg-emerald-500/15 hover:border-emerald-500/30
        transition-all duration-200
        cursor-default
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
          clipRule="evenodd"
        />
      </svg>
      <span className="whitespace-nowrap">{title}</span>
    </div>
  );
};
