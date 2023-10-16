export enum IconType {
  plus = '/plus.svg',
  trash = '/trash.svg',
  save = '/save.svg',
}

export enum ButtonStyle {
  primary = 'primary',
  secondary = 'secondary',
}

export interface IButton {
  style: ButtonStyle;
  icon?: IconType;
  text: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  classOverrides?: string;
}

const stylesMapper = {
  [ButtonStyle.primary]: 'bg-teal-600 text-white focus:outline-none mr-2 my-2 rounded p-2 inline-flex align-bottom',
  [ButtonStyle.secondary]: 'bg-transparent border border-gray-500 text-gray-600 focus:outline-none rounded p-2 inline-flex mr-2 my-2 align-bottom',
};

const iconsMapper = {
  [IconType.plus]: (
    <svg className="h-6 w-8 text-white-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4" />
    </svg>
  ),
  [IconType.trash]: (
    <svg className="h-6 w-8 text-white-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" />
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  ),
  [IconType.save]: (
    <svg className="h-6 w-8 text-white-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  )
};

const Button = ({ style, icon, text, onClick, type = 'button', classOverrides }: IButton) => {
  return (
    <button
      className={`${stylesMapper[style]} ${classOverrides ?? ''}`}
      onClick={onClick}
      type={type}
    >
      {icon && iconsMapper[icon]}
      {text}
    </button>
  )

}

export default Button;
