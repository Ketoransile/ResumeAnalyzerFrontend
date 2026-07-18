import { IResumeAnalysisResult } from "@/app/result/[id]/fetchResumeAnalysis";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResumeAnalysisCard } from "./ResumeAnalysisCard";
import { FiClock } from "react-icons/fi";
import { useState, useEffect } from "react";

const LeftSidebar = ({
  data,
  loadingAll,
  errorAll,
  onCardClick,
}: {
  data: IResumeAnalysisResult[];
  loadingAll: boolean;
  errorAll: string | null;
  onCardClick: (item: IResumeAnalysisResult) => void;
}) => {
  const [activeItem, setActiveItem] = useState<string>("");

  // Stagger expanded/collapsed based on screen size on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveItem(window.innerWidth >= 1280 ? "item-1" : "");
    }
  }, []);

  return (
    <Accordion
      type="single"
      value={activeItem}
      onValueChange={setActiveItem}
      collapsible
      className="w-full z-30 rounded-2xl border border-white/6 overflow-hidden bg-[#0a0a0a]/50 backdrop-blur-sm shadow-xl shadow-black/40"
    >
      <AccordionItem
        value="item-1"
        className="w-full bg-transparent border-none shadow-none p-0"
      >
        <AccordionTrigger className="flex items-center justify-between w-full text-sm font-bold text-neutral-200 cursor-pointer py-3.5 px-5 group hover:no-underline">
          <span className="flex items-center gap-2.5">
            <FiClock className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
            <span className="group-hover:text-white transition-colors tracking-tight font-medium">
              Evaluation History
            </span>
          </span>
          <span className="text-[10px] bg-white/5 border border-white/5 text-neutral-500 rounded-full px-2 py-0.5 ml-2 font-mono tracking-normal">
            {data.length}
          </span>
        </AccordionTrigger>

        <AccordionContent className="pt-0 px-4 pb-4">
          <div className="flex flex-col gap-2 max-h-[60vh] xl:max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 scrollbar-thin mt-2">
            {loadingAll ? (
              <div className="flex items-center justify-center py-8 gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
                <p className="text-neutral-500 text-sm font-light">Loading history…</p>
              </div>
            ) : errorAll ? (
              <p className="text-red-400/80 text-center py-4 text-xs font-light">
                Failed to load history.
              </p>
            ) : data && data.length > 0 ? (
              data.map((item, index) => (
                <ResumeAnalysisCard
                  key={item._id || index}
                  analysisData={item}
                  onClick={() => onCardClick(item)}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-neutral-500 text-xs mb-1 font-light">No analyses yet.</p>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default LeftSidebar;
