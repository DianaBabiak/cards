import iconSprite from '../../../assets/IconSprite.svg'
interface IconPropsType {
  height?: string
  iconId: string
  width?: string
  viewBox?: string
}

export const Icon = ({ height, iconId, width, viewBox }: IconPropsType) => {
  return (
    <svg
      fill={'none'}
      height={height || '24'}
      viewBox={viewBox || '0 0 24 24'}
      width={width || '24'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <use xlinkHref={`${iconSprite}#${iconId}`}></use>
    </svg>
  )
}
