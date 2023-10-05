import { forwardRef, Icon } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export const CoinsIcon24 = forwardRef<ComponentProps<typeof Icon>, typeof Icon>((props, ref) => {
    return (
        <Icon
            ref={ref}
            w="24px"
            h="24px"
            color="icon.primary"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12C2 8.68629 4.68629 6 8 6C11.3137 6 14 8.68629 14 12C14 15.3137 11.3137 18 8 18C4.68629 18 2 15.3137 2 12ZM8 4.5C3.85786 4.5 0.5 7.85786 0.5 12C0.5 16.1421 3.85786 19.5 8 19.5C9.47062 19.5 10.8424 19.0767 12.0001 18.3454C12.1613 18.4472 12.3266 18.543 12.4959 18.6326C12.862 18.8264 13.3158 18.6867 13.5096 18.3206C13.6917 17.9766 13.5794 17.5552 13.2615 17.3448C14.6433 15.9844 15.5 14.0923 15.5 12C15.5 9.90775 14.6433 8.0156 13.2615 6.65522C13.5794 6.4448 13.6917 6.02337 13.5096 5.67941C13.3158 5.31331 12.862 5.17362 12.4959 5.3674C12.3266 5.45697 12.1613 5.55282 12.0001 5.65462C10.8424 4.92327 9.47062 4.5 8 4.5ZM15.2059 6.052C15.4654 6.01773 15.7304 6 16 6C16.3435 6 16.6797 6.02879 17.0064 6.08392C17.4149 6.15284 17.8019 5.8776 17.8708 5.46916C17.9397 5.06072 17.6645 4.67375 17.256 4.60483C16.8471 4.53584 16.4275 4.5 16 4.5C15.6646 4.5 15.334 4.52206 15.0095 4.56491C14.5989 4.61914 14.31 4.996 14.3642 5.40664C14.4184 5.81729 14.7953 6.10623 15.2059 6.052ZM20.3408 5.88319C20.0032 5.64321 19.535 5.72236 19.295 6.05997C19.055 6.39758 19.1342 6.86581 19.4718 7.10579C20.0218 7.49676 20.5032 7.97819 20.8942 8.52822C21.1342 8.86584 21.6024 8.94499 21.94 8.70501C22.2776 8.46503 22.3568 7.9968 22.1168 7.65918C21.6286 6.97234 21.0277 6.3714 20.3408 5.88319ZM23.3952 10.744C23.3263 10.3356 22.9393 10.0603 22.5308 10.1292C22.1224 10.1981 21.8472 10.5851 21.9161 10.9936C21.9712 11.3203 22 11.6565 22 12C22 12.3435 21.9712 12.6797 21.9161 13.0064C21.8472 13.4149 22.1224 13.8019 22.5308 13.8708C22.9393 13.9397 23.3263 13.6644 23.3952 13.256C23.4642 12.8471 23.5 12.4275 23.5 12C23.5 11.5725 23.4642 11.1529 23.3952 10.744ZM22.1168 16.3408C22.3568 16.0032 22.2776 15.535 21.94 15.295C21.6024 15.055 21.1342 15.1342 20.8942 15.4718C20.5032 16.0218 20.0218 16.5032 19.4718 16.8942C19.1342 17.1342 19.055 17.6024 19.295 17.94C19.535 18.2776 20.0032 18.3568 20.3408 18.1168C21.0277 17.6286 21.6286 17.0277 22.1168 16.3408ZM17.256 19.3952C17.6645 19.3263 17.9397 18.9393 17.8708 18.5308C17.8019 18.1224 17.4149 17.8472 17.0064 17.9161C16.6797 17.9712 16.3435 18 16 18C15.7304 18 15.4654 17.9823 15.2059 17.948C14.7953 17.8938 14.4184 18.1827 14.3642 18.5934C14.31 19.004 14.5989 19.3809 15.0095 19.4351C15.334 19.4779 15.6646 19.5 16 19.5C16.4275 19.5 16.8471 19.4642 17.256 19.3952Z"
                fill="currentColor"
            />
        </Icon>
    );
});

CoinsIcon24.displayName = 'CoinsIcon24';
