import { IconProps } from '@utils/type'

const Wallet: React.FC<IconProps> = ({ size = 26, className = '' }) => {
  const svgSize = `${size}px`

  return (
    <svg
      width={svgSize}
      className={className}
      height={svgSize}
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0.0255737 0.0799561L9.99581 14.615L0.236746 25.92H2.39893L10.9507 16.0068L17.7507 25.92H25.92L15.5035 10.7355L24.6955 0.0799561H22.5399L14.5473 9.33964L8.19487 0.0799561H0.0255737ZM2.60745 1.43996H7.47901L23.3382 24.56H18.4666L2.60745 1.43996Z'
        fill='white'
      />
    </svg>
  )
}

export default Wallet
