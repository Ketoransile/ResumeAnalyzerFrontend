import { IResumeAnalysisResult } from "@/app/result/[id]/fetchResumeAnalysis";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ResumeAnalysisCard } from "./ResumeAnalysisCard";
const LeftSidebar = ({
  data,
  loadingAll,
  errorAll,
  isResultPage = false,
  onCardClick,
}: {
  data: IResumeAnalysisResult[];
  loadingAll: boolean;
  errorAll: string | null;
  onCardClick: (item: IResumeAnalysisResult) => void;
  isResultPage?: boolean; 
}) => {
  return (
    <Accordion
      type="single"
      defaultValue={"item-1"}
      collapsible
      className={`${isResultPage ? "w-full  flex px-20" : "w-96"} min-h-full`}
    >
      <AccordionItem
        value="item-1"
        className="
        w-full
        bg-gradient-to-br from-neutral-900 to-neutral-800
        border border-neutral-700 rounded-2xl p-5
        shadow-xl shadow-neutral-950/50
      "
      >
        <AccordionTrigger
          className="
          flex items-center justify-between w-full
          text-xl font-bold text-neutral-100 cursor-pointer
          py-2
          group
        "
        >
          <span className="flex items-center gap-3">
       
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors"
            >
              <path
                fillRule="evenodd"
                d="M19.5 21a3 3 0 0 0 3-3V9a2.25 2.25 0 0 0-2.25-2.25H15V4.5a3 3 0 0 0-3-3h-2.25a3 3 0 0 0-3 3V6.75H4.5A2.25 2.25 0 0 0 2.25 9v9a3 3 0 0 0 3 3h14.25ZM12 2.25a.75.75 0 0 0-.75.75V6h-2.25a.75.75 0 0 0-.75.75V9H4.5A.75.75 0 0 1 3.75 9.75v6.75c0 .096.06.182.145.23L9 18.75V9.75A.75.75 0 0 1 9.75 9h5.25a.75.75 0 0 1 .75.75v9l5.105-2.77A.75.75 0 0 1 21.75 18V9.75A.75.75 0 0 1 21 9h-4.5V6.75a.75.75 0 0 0-.75-.75H13.5V3A.75.75 0 0 0 12 2.25Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="group-hover:text-neutral-50 transition-colors">
              Analysis History
            </span>
          </span>
        </AccordionTrigger>

        <AccordionContent className="pt-4">
          <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto pr-2">
           
            <style jsx>{`
              .overflow-y-auto::-webkit-scrollbar {
                width: 8px;
              }
              .overflow-y-auto::-webkit-scrollbar-track {
                background: #2a2a2a; /* neutral-800 */
                border-radius: 10px;
              }
              .overflow-y-auto::-webkit-scrollbar-thumb {
                background: #525252; /* neutral-600 */
                border-radius: 10px;
              }
              .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                background: #737373; /* neutral-500 */
              }
            `}</style>

            {loadingAll ? (
              <p className="text-neutral-400 text-center py-4">
                Loading previous evaluations...
              </p>
            ) : errorAll ? (
              <p className="text-red-400 text-center py-4">
                Error loading evaluations. Please try again.
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
              <div className="text-center py-6 text-neutral-400">
                <p className="mb-2">No previous evaluations found.</p>
                <p className="text-sm">
                  Upload a resume and job description to get started!
                </p>
              </div>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default LeftSidebar;
