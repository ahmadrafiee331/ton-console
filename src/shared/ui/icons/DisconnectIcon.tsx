import { Icon } from '@chakra-ui/react';
import { ComponentProps, FunctionComponent } from 'react';

export const DisconnectIcon: FunctionComponent<ComponentProps<typeof Icon>> = props => {
    return (
        <Icon
            w="24px"
            h="24px"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.15 3H10.117H10.117C9.02485 2.99999 8.15936 2.99999 7.46173 3.05699C6.74835 3.11527 6.14472 3.23688 5.59355 3.51772C4.69978 3.97312 3.97312 4.69978 3.51772 5.59355C3.23688 6.14472 3.11527 6.74834 3.05699 7.46173C2.99999 8.15935 2.99999 9.02485 3 10.117V10.117V10.15V13.85V13.883V13.883C2.99999 14.9752 2.99999 15.8406 3.05699 16.5383C3.11527 17.2517 3.23688 17.8553 3.51772 18.4065C3.97312 19.3002 4.69978 20.0269 5.59355 20.4823C6.14472 20.7631 6.74835 20.8847 7.46173 20.943C8.15935 21 9.02485 21 10.117 21H10.15H13.25C13.6642 21 14 20.6642 14 20.25C14 19.8358 13.6642 19.5 13.25 19.5H10.15C9.01752 19.5 8.21327 19.4994 7.58388 19.448C6.96325 19.3973 6.579 19.3009 6.27453 19.1458C5.663 18.8342 5.16582 18.337 4.85423 17.7255C4.69909 17.421 4.60271 17.0367 4.55201 16.4161C4.50058 15.7867 4.5 14.9825 4.5 13.85V10.15C4.5 9.01752 4.50058 8.21327 4.55201 7.58388C4.60271 6.96325 4.69909 6.579 4.85423 6.27453C5.16582 5.663 5.663 5.16582 6.27453 4.85423C6.579 4.69909 6.96325 4.60271 7.58388 4.55201C8.21327 4.50058 9.01752 4.5 10.15 4.5H13.25C13.6642 4.5 14 4.16421 14 3.75C14 3.33579 13.6642 3 13.25 3H10.15ZM17.5303 7.21967C17.2374 6.92678 16.7626 6.92678 16.4697 7.21967C16.1768 7.51256 16.1768 7.98744 16.4697 8.28033L19.4393 11.25H8.75C8.33579 11.25 8 11.5858 8 12C8 12.4142 8.33579 12.75 8.75 12.75H19.4393L16.4697 15.7197C16.1768 16.0126 16.1768 16.4874 16.4697 16.7803C16.7626 17.0732 17.2374 17.0732 17.5303 16.7803L21.7803 12.5303C22.0732 12.2374 22.0732 11.7626 21.7803 11.4697L17.5303 7.21967Z"
                fill="black"
            />
        </Icon>
    );
};
