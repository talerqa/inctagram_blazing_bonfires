export const PaymentsIcon = ({
  className,
  fill = 'white',
}: {
  className?: string
  fill?: 'white' | 'black'
}) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8924_12670)">
        <path
          d="M19 5H5C4.20435 5 3.44129 5.31607 2.87868 5.87868C2.31607 6.44129 2 7.20435 2 8V16C2 16.7956 2.31607 17.5587 2.87868 18.1213C3.44129 18.6839 4.20435 19 5 19H19C19.7956 19 20.5587 18.6839 21.1213 18.1213C21.6839 17.5587 22 16.7956 22 16V8C22 7.20435 21.6839 6.44129 21.1213 5.87868C20.5587 5.31607 19.7956 5 19 5ZM4 8C4 7.73478 4.10536 7.48043 4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H19C19.2652 7 19.5196 7.10536 19.7071 7.29289C19.8946 7.48043 20 7.73478 20 8V9H4V8ZM20 16C20 16.2652 19.8946 16.5196 19.7071 16.7071C19.5196 16.8946 19.2652 17 19 17H5C4.73478 17 4.48043 16.8946 4.29289 16.7071C4.10536 16.5196 4 16.2652 4 16V11H20V16Z"
          fill={fill}
        />
        <path
          d="M7 15H11C11.2652 15 11.5196 14.8946 11.7071 14.7071C11.8946 14.5196 12 14.2652 12 14C12 13.7348 11.8946 13.4804 11.7071 13.2929C11.5196 13.1054 11.2652 13 11 13H7C6.73478 13 6.48043 13.1054 6.29289 13.2929C6.10536 13.4804 6 13.7348 6 14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15Z"
          fill={fill}
        />
        <path
          d="M15 15H17C17.2652 15 17.5196 14.8946 17.7071 14.7071C17.8946 14.5196 18 14.2652 18 14C18 13.7348 17.8946 13.4804 17.7071 13.2929C17.5196 13.1054 17.2652 13 17 13H15C14.7348 13 14.4804 13.1054 14.2929 13.2929C14.1054 13.4804 14 13.7348 14 14C14 14.2652 14.1054 14.5196 14.2929 14.7071C14.4804 14.8946 14.7348 15 15 15Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_8924_12670">
          <rect width="24" height="24" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  )
}
