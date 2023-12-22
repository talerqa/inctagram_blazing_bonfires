import React from 'react'

type Props = {
  color?: string
}
export const EditPost = ({ color = '#8D9094' }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="113"
      height="24"
      viewBox="0 0 113 24"
      fill={color}
    >
      <path
        d="M37.233 17V6.81818H43.3778V7.91193H38.4659V11.3523H43.0597V12.446H38.4659V15.9062H43.4574V17H37.233ZM48.3246 17.1591C47.6882 17.1591 47.1264 16.9983 46.6392 16.6768C46.152 16.352 45.7708 15.8946 45.4957 15.3047C45.2206 14.7114 45.0831 14.0104 45.0831 13.2017C45.0831 12.3996 45.2206 11.7036 45.4957 11.1136C45.7708 10.5237 46.1536 10.0679 46.6442 9.74645C47.1347 9.42495 47.7015 9.2642 48.3445 9.2642C48.8416 9.2642 49.2344 9.34706 49.5227 9.51278C49.8144 9.67519 50.0365 9.8608 50.1889 10.0696C50.3447 10.2751 50.4657 10.4441 50.5518 10.5767H50.6513V6.81818H51.8246V17H50.6911V15.8267H50.5518C50.4657 15.9659 50.343 16.1416 50.1839 16.3537C50.0249 16.5625 49.7978 16.7498 49.5028 16.9155C49.2079 17.0779 48.8151 17.1591 48.3246 17.1591ZM48.4837 16.1051C48.9543 16.1051 49.352 15.9825 49.6768 15.7372C50.0017 15.4886 50.2486 15.1456 50.4176 14.7081C50.5866 14.2673 50.6712 13.7585 50.6712 13.1818C50.6712 12.6117 50.5883 12.1129 50.4226 11.6854C50.2569 11.2545 50.0116 10.9197 49.6868 10.6811C49.362 10.4392 48.9609 10.3182 48.4837 10.3182C47.9865 10.3182 47.5722 10.4458 47.2408 10.701C46.9126 10.9529 46.6657 11.2959 46.5 11.7301C46.3376 12.161 46.2564 12.6449 46.2564 13.1818C46.2564 13.7254 46.3393 14.2192 46.505 14.6634C46.674 15.1042 46.9226 15.4555 47.2507 15.7173C47.5821 15.9759 47.9931 16.1051 48.4837 16.1051ZM54.1364 17V9.36364H55.3097V17H54.1364ZM54.733 8.09091C54.5043 8.09091 54.3071 8.01302 54.1413 7.85724C53.9789 7.70147 53.8977 7.5142 53.8977 7.29545C53.8977 7.0767 53.9789 6.88944 54.1413 6.73366C54.3071 6.57789 54.5043 6.5 54.733 6.5C54.9616 6.5 55.1572 6.57789 55.3196 6.73366C55.4853 6.88944 55.5682 7.0767 55.5682 7.29545C55.5682 7.5142 55.4853 7.70147 55.3196 7.85724C55.1572 8.01302 54.9616 8.09091 54.733 8.09091ZM60.7797 9.36364V10.358H56.8223V9.36364H60.7797ZM57.9757 7.53409H59.149V14.8125C59.149 15.1439 59.197 15.3925 59.2931 15.5582C59.3926 15.7206 59.5185 15.83 59.671 15.8864C59.8268 15.9394 59.9908 15.9659 60.1632 15.9659C60.2924 15.9659 60.3985 15.9593 60.4814 15.946C60.5642 15.9295 60.6305 15.9162 60.6802 15.9062L60.9189 16.9602C60.8393 16.9901 60.7283 17.0199 60.5858 17.0497C60.4432 17.0829 60.2626 17.0994 60.0439 17.0994C59.7124 17.0994 59.3876 17.0282 59.0694 16.8857C58.7546 16.7431 58.4927 16.526 58.2839 16.2344C58.0784 15.9427 57.9757 15.5748 57.9757 15.1307V7.53409ZM66.6412 17V6.81818H70.0815C70.8803 6.81818 71.5332 6.96236 72.0403 7.25071C72.5507 7.53575 72.9286 7.92188 73.1738 8.40909C73.4191 8.89631 73.5417 9.43987 73.5417 10.0398C73.5417 10.6397 73.4191 11.1849 73.1738 11.6754C72.9319 12.166 72.5574 12.5571 72.0502 12.8487C71.5431 13.1371 70.8935 13.2812 70.1014 13.2812H67.6355V12.1875H70.0616C70.6085 12.1875 71.0476 12.093 71.3791 11.9041C71.7105 11.7152 71.9508 11.46 72.1 11.1385C72.2524 10.8137 72.3287 10.4474 72.3287 10.0398C72.3287 9.6321 72.2524 9.26752 72.1 8.94602C71.9508 8.62453 71.7089 8.37263 71.3741 8.19034C71.0394 8.00473 70.5952 7.91193 70.0417 7.91193H67.8741V17H66.6412ZM78.389 17.1591C77.6996 17.1591 77.0948 16.995 76.5744 16.6669C76.0574 16.3388 75.653 15.8797 75.3613 15.2898C75.073 14.6998 74.9288 14.0104 74.9288 13.2216C74.9288 12.4261 75.073 11.7318 75.3613 11.1385C75.653 10.5452 76.0574 10.0845 76.5744 9.75639C77.0948 9.42827 77.6996 9.2642 78.389 9.2642C79.0784 9.2642 79.6816 9.42827 80.1987 9.75639C80.719 10.0845 81.1234 10.5452 81.4118 11.1385C81.7034 11.7318 81.8493 12.4261 81.8493 13.2216C81.8493 14.0104 81.7034 14.6998 81.4118 15.2898C81.1234 15.8797 80.719 16.3388 80.1987 16.6669C79.6816 16.995 79.0784 17.1591 78.389 17.1591ZM78.389 16.1051C78.9127 16.1051 79.3436 15.9709 79.6816 15.7024C80.0197 15.4339 80.2699 15.081 80.4324 14.6435C80.5948 14.206 80.676 13.732 80.676 13.2216C80.676 12.7112 80.5948 12.2356 80.4324 11.7947C80.2699 11.3539 80.0197 10.9976 79.6816 10.7259C79.3436 10.4541 78.9127 10.3182 78.389 10.3182C77.8654 10.3182 77.4345 10.4541 77.0964 10.7259C76.7583 10.9976 76.5081 11.3539 76.3457 11.7947C76.1833 12.2356 76.1021 12.7112 76.1021 13.2216C76.1021 13.732 76.1833 14.206 76.3457 14.6435C76.5081 15.081 76.7583 15.4339 77.0964 15.7024C77.4345 15.9709 77.8654 16.1051 78.389 16.1051ZM89.0494 11.0739L87.9954 11.3722C87.9291 11.1965 87.8313 11.0258 87.7021 10.8601C87.5761 10.6911 87.4038 10.5518 87.185 10.4425C86.9663 10.3331 86.6862 10.2784 86.3448 10.2784C85.8775 10.2784 85.488 10.3861 85.1765 10.6016C84.8683 10.8137 84.7141 11.0838 84.7141 11.4119C84.7141 11.7036 84.8202 11.9339 85.0323 12.103C85.2444 12.272 85.5759 12.4129 86.0266 12.5256L87.1602 12.804C87.8429 12.9697 88.3517 13.2232 88.6864 13.5646C89.0212 13.9027 89.1886 14.3385 89.1886 14.8722C89.1886 15.3097 89.0626 15.7008 88.8107 16.0455C88.5621 16.3902 88.2141 16.6619 87.7667 16.8608C87.3192 17.0597 86.7989 17.1591 86.2056 17.1591C85.4267 17.1591 84.7821 16.9901 84.2717 16.652C83.7612 16.3139 83.4381 15.8201 83.3022 15.1705L84.4158 14.892C84.5219 15.303 84.7224 15.6113 85.0174 15.8168C85.3157 16.0223 85.7051 16.125 86.1857 16.125C86.7326 16.125 87.1668 16.009 87.4883 15.777C87.8131 15.5417 87.9755 15.2599 87.9755 14.9318C87.9755 14.6667 87.8827 14.4446 87.6971 14.2656C87.5115 14.0833 87.2264 13.9474 86.842 13.858L85.5692 13.5597C84.8699 13.3939 84.3562 13.1371 84.0281 12.7891C83.7032 12.4377 83.5408 11.9986 83.5408 11.4716C83.5408 11.0407 83.6618 10.6596 83.9038 10.3281C84.149 9.99669 84.4821 9.73651 84.9031 9.54758C85.3273 9.35866 85.8079 9.2642 86.3448 9.2642C87.1005 9.2642 87.6938 9.42992 88.1246 9.76136C88.5588 10.0928 88.8671 10.5303 89.0494 11.0739ZM94.2757 9.36364V10.358H90.3184V9.36364H94.2757ZM91.4718 7.53409H92.6451V14.8125C92.6451 15.1439 92.6931 15.3925 92.7892 15.5582C92.8887 15.7206 93.0146 15.83 93.1671 15.8864C93.3229 15.9394 93.4869 15.9659 93.6593 15.9659C93.7885 15.9659 93.8946 15.9593 93.9775 15.946C94.0603 15.9295 94.1266 15.9162 94.1763 15.9062L94.415 16.9602C94.3354 16.9901 94.2244 17.0199 94.0819 17.0497C93.9393 17.0829 93.7587 17.0994 93.54 17.0994C93.2085 17.0994 92.8837 17.0282 92.5655 16.8857C92.2507 16.7431 91.9888 16.526 91.78 16.2344C91.5745 15.9427 91.4718 15.5748 91.4718 15.1307V7.53409Z"
        fill={color}
      />
      <g clipPath="url(#clip0_309_6061)">
        <path
          d="M19 20H5C4.73478 20 4.48043 20.1054 4.29289 20.2929C4.10536 20.4804 4 20.7348 4 21C4 21.2652 4.10536 21.5196 4.29289 21.7071C4.48043 21.8946 4.73478 22 5 22H19C19.2652 22 19.5196 21.8946 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21C20 20.7348 19.8946 20.4804 19.7071 20.2929C19.5196 20.1054 19.2652 20 19 20Z"
          fill="white"
        />
        <path
          d="M5.0003 18H5.0903L9.2603 17.62C9.71709 17.5745 10.1443 17.3732 10.4703 17.05L19.4703 8.05C19.8196 7.68096 20.0084 7.1885 19.9953 6.68053C19.9822 6.17256 19.7682 5.6905 19.4003 5.34L16.6603 2.6C16.3027 2.26409 15.8341 2.07135 15.3436 2.05845C14.8532 2.04554 14.3751 2.21336 14.0003 2.53L5.0003 11.53C4.67706 11.856 4.4758 12.2832 4.4303 12.74L4.0003 16.91C3.98683 17.0565 4.00583 17.2041 4.05596 17.3424C4.10608 17.4807 4.1861 17.6062 4.2903 17.71C4.38374 17.8027 4.49455 17.876 4.61639 17.9258C4.73823 17.9755 4.86869 18.0008 5.0003 18ZM15.2703 4L18.0003 6.73L16.0003 8.68L13.3203 6L15.2703 4ZM6.3703 12.91L12.0003 7.32L14.7003 10.02L9.1003 15.62L6.1003 15.9L6.3703 12.91Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_309_6061">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}