/** Join class names; falsy values are omitted. */
export const cn = (...args) => args.filter(Boolean).join(' ')

const v = (x) => `calc((1vw+1vh)/${x})`
const borderBox = 'border border-[calc((1vw+1vh)/10)] border-[#8fc9b9] rounded-[calc((1vw+1vh)/1.5)]'

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
  appMain: 'w-[90%] h-[90%] flex flex-col justify-between gap-[8vh]',
  configBtn: `cursor-pointer w-[2vw] aspect-square fixed right-[calc((1vw+1vh)/2)] bottom-[calc((1vw+1vh)/2)] flex justify-center items-center ${btnBg} ${btnInputBase} ${btnEffects}`,

  // Config panel
  configBackdrop: 'fixed inset-0 bg-black/60 z-[1]',
  configPanel: 'fixed right-0 w-[30%] h-full bg-black/70 backdrop-blur-[1px] transform transition-transform duration-500 ease-in-out z-[2]',
  configSlide: (open) => (open ? 'translate-x-0' : 'translate-x-[120%]'),
  configCloseBtn: `cursor-pointer w-[2vw] aspect-square fixed right-[calc((1vw+1vh)/2)] top-[calc((1vw+1vh)/2)] flex justify-center items-center ${btnBg} ${btnInputBase} ${btnEffects}`,

  // LinkCard
  linkCard: 'w-[6vw] aspect-[10/13] flex flex-col justify-between items-center relative',
  linkCardLink: 'w-full flex justify-center items-center cursor-pointer',
  linkCardImg: `w-full aspect-square rounded-[${v(3)}]`,
  linkCardActionBtn: `cursor-pointer w-[25%] aspect-square absolute top-0 border-none rounded-action-btn ${btnBg} flex justify-center items-center p-[${v(4)}] ${btnEffects}`,
  linkCardLabel: 'w-[130%] text-center whitespace-nowrap overflow-hidden text-ellipsis text-[1vw]',

  // Streaks / Bookmarks sections
  section: `w-full aspect-[10/1] ${borderBox} flex justify-center items-center`,
  sectionFull: `w-full h-full ${borderBox} flex justify-center items-center`,
  sectionList: 'w-fit flex items-center gap-[2vw]',
  sectionListWrap: 'w-fit flex flex-wrap items-center justify-center gap-[2vw] p-4',
  addBtn: `cursor-pointer w-[6vw] aspect-square border-none rounded-action-btn ${btnBg} text-white flex justify-center items-center self-start py-0 px-[0.3vw] ${btnEffects}`,

  // Modals (overlay = fixed full-screen centering; modal = dialog box)
  modalOverlay: 'fixed inset-0 flex items-center justify-center z-10 bg-black/60',
  modal: 'w-fit h-fit modal-box relative bg-[#171f25] flex flex-col gap-[1vw]',
  modalCloseBtn: `cursor-pointer w-[2vw] aspect-square absolute modal-close-pos flex justify-center items-center ${btnBg} ${btnInputBase} ${btnEffects}`,
  modalAlert: 'text-[#c90a02] ml-[1vw]',
  modalActions: 'flex gap-[1vw]',
  modalInput: btnInputBase,
  modalSubmitBtn: `cursor-pointer w-fit mt-[3vh] ${btnBg} ${btnInputBase} px-[0.5vw] ${btnEffects}`,
}
