/** Join class names; falsy values are omitted. */
export const cn = (...args) => args.filter(Boolean).join(' ')

/** Container-relative (for content inside the 16:9 app-main). */
const c = (x) => `calc((1cqw+1cqh)/${x})`
const borderBoxC = 'border border-[calc((1cqw+1cqh)/10)] border-[#8fc9b9] rounded-[calc((1cqw+1cqh)/1.5)]'

/** Exact Tailwind equivalent of the former base styles for button/input. */
const btnInputBase =
  'border border-[calc((1vw+1vh)/10)] border-[rgba(119,119,119,0.5)] rounded-[calc((1vw+1vh)/5)] outline-none py-0 px-[0.3vw]'

/** Dark-theme button background (slightly lighter than modal #171f25). */
const btnBg = 'bg-[#252d33]'

/** Class name for shared button effects (hover, active, focus-visible). Defined in index.css so styles are always emitted. */
const btnEffects = 'btn-effects'

export const classes = {
  // App
  app: 'w-screen h-screen flex justify-center items-center',
  appMain: 'app-main [container-type:size] aspect-[16/9] w-[min(100%,177.78vh)] max-h-[min(100vh,56.25vw)] p-[calc((1vw+1vh)/2)] flex flex-col justify-between gap-[calc((1vw+1vh)/4)]',
  configBtnInSection: `cursor-pointer w-[2vw] aspect-square absolute right-[calc((1cqw+1cqh)/2)] bottom-[calc((1cqw+1cqh)/2)] flex justify-center items-center border-none rounded-config-btn ${btnBg} ${btnEffects}`,

  // Config panel
  configBackdrop: 'fixed inset-0 bg-black/60 z-[1]',
  configPanel: 'fixed right-0 w-[30%] h-full bg-black/70 backdrop-blur-[1px] transform transition-transform duration-500 ease-in-out z-[2]',
  configSlide: (open) => (open ? 'translate-x-0' : 'translate-x-[120%]'),
  configCloseBtn: `cursor-pointer w-[2vw] aspect-square fixed right-[calc((1vw+1vh)/2)] top-[calc((1vw+1vh)/2)] flex justify-center items-center ${btnBg} ${btnInputBase} ${btnEffects}`,

  // LinkCard (sizes relative to 16:9 container)
  linkCard: 'w-[5cqw] aspect-[10/13] flex flex-col justify-between items-center relative',
  linkCardDraggable: 'cursor-grab active:cursor-grabbing',
  linkCardDragging: 'opacity-50 cursor-grabbing',
  linkCardLink: 'w-full flex justify-center items-center cursor-pointer',
  linkCardImg: `w-full aspect-square rounded-[${c(3)}]`,
  linkCardActionBtn: `cursor-pointer w-[25%] aspect-square absolute top-0 border-none rounded-action-btn ${btnBg} flex justify-center items-center p-[${c(4)}] ${btnEffects}`,
  linkCardLabel: 'w-[130%] text-center whitespace-nowrap overflow-hidden text-ellipsis text-[1cqw]',

  // Streaks / Bookmarks sections (sizes relative to 16:9 container)
  section: `w-full aspect-[10/1] ${borderBoxC} flex justify-center items-center`,
  sectionFull: `w-full h-full relative ${borderBoxC} flex justify-center items-center`,
  sectionList: 'w-fit flex items-between justify-around gap-[4cqw]',
  sectionListWrap: 'w-fit flex flex-wrap items-center justify-center gap-[4cqw] p-4',
  addBtn: `cursor-pointer w-[5cqw] aspect-square border-none rounded-action-btn ${btnBg} text-white flex justify-center items-center self-start py-0 px-[0.3cqw] ${btnEffects}`,

  // Modals (overlay = fixed full-screen centering; modal = dialog box)
  modalOverlay: 'fixed inset-0 flex items-center justify-center z-10 bg-black/60',
  modal: 'w-fit h-fit modal-box relative bg-[#171f25] flex flex-col gap-[1vw]',
  modalCloseBtn: `cursor-pointer w-[2vw] aspect-square absolute modal-close-pos flex justify-center items-center ${btnBg} ${btnInputBase} ${btnEffects}`,
  modalAlert: 'text-[#c90a02] ml-[1vw]',
  modalActions: 'flex gap-[1vw]',
  modalInput: btnInputBase,
  modalSubmitBtn: `cursor-pointer w-fit mt-[3vh] ${btnBg} ${btnInputBase} px-[0.5vw] ${btnEffects}`,
}
