import { Icon } from '@chakra-ui/react';
import { ComponentProps, FunctionComponent } from 'react';

export const TgIcon: FunctionComponent<ComponentProps<typeof Icon>> = props => {
    return (
        <Icon
            w="16px"
            h="16px"
            fill="none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.09992 7.07832C5.39488 5.20707 8.25885 3.97343 9.69185 3.3774C13.7834 1.6756 14.6335 1.37998 15.1877 1.37022C15.3095 1.36807 15.5821 1.39828 15.7586 1.54151C15.9076 1.66245 15.9486 1.82583 15.9683 1.9405C15.9879 2.05517 16.0123 2.31638 15.9929 2.52049C15.7712 4.85012 14.8118 10.5035 14.3237 13.1127C14.1172 14.2168 13.7105 14.587 13.3169 14.6232C12.4613 14.7019 11.8116 14.0578 10.9829 13.5146C9.68624 12.6646 8.9537 12.1355 7.69503 11.306C6.24043 10.3475 7.18338 9.82062 8.01236 8.95961C8.22931 8.73428 11.999 5.30548 12.0719 4.99444C12.0811 4.95554 12.0895 4.81053 12.0034 4.73396C11.9172 4.65739 11.7901 4.68357 11.6983 4.7044C11.5683 4.73392 9.49681 6.10309 5.48389 8.81192C4.89591 9.21567 4.36333 9.4124 3.88616 9.40209C3.36012 9.39072 2.34822 9.10465 1.59598 8.86013C0.673328 8.56021 -0.0599784 8.40164 0.00387615 7.89229C0.0371355 7.62699 0.402482 7.35566 1.09992 7.07832Z"
                fill="black"
            />
        </Icon>
    );
};
