import { IconProps } from '@utils/type'

const Telegram: React.FC<IconProps> = ({ size = 34, className = '' }) => {
  const svgSize = `${size}px`

  return (
    <svg
      width={svgSize}
      height={svgSize}
      className={className}
      viewBox='0 0 34 34'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M30.5772 5.74853C30.7891 4.18361 29.4872 2.94841 28.2697 3.55933L4.02021 15.7271C3.14711 16.1652 3.21098 17.6766 4.11652 18.0062L9.11738 19.8263C10.0718 20.1736 11.1053 19.994 11.9388 19.3359L23.2135 10.4337C23.5535 10.1652 23.9241 10.7177 23.6336 11.06L15.5178 20.6228C14.7305 21.5504 14.8868 23.1223 15.8338 23.8009L24.9203 30.313C25.9394 31.0434 27.2505 30.3097 27.4411 28.9023L30.5772 5.74853Z'
        fill='white'
      />
    </svg>
  )
}

export default Telegram
