import { IconProps } from '@utils/type'

const ArrowLeftIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      width='12'
      height='14'
      className={className}
      viewBox='0 0 12 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.86875 7.83337L7.06875 12.5L6 13.6667L0 7.00004L6 0.333374L7.06875 1.50004L2.86875 6.16671H12V7.83337H2.86875Z'
        fill='white'
      />
    </svg>
  )
}

export default ArrowLeftIcon
