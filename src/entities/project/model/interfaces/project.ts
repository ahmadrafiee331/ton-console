import { Subscription } from './subscription';

export interface Project {
    id: number;
    name: string;
    imgUrl: string;
    creationDate: Date;

    subscriptions: Subscription[];
}
