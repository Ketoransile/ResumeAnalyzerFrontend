export const KeySkillsCard = ({ title }: { title: string }) => {
  return (
    <div
      className="
        flex items-center gap-2
        bg-emerald-600 text-white 
        rounded-full px-4 py-2.5 
        font-semibold // Make the text bolder
        shadow-lg shadow-emerald-700/50 
        hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-800/60 
        transition-all duration-200 ease-in-out
        cursor-pointer
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 text-emerald-100" // Icon color adjusted for better contrast
      >
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-sm whitespace-nowrap">{title}</span>
    </div>
  );
};
