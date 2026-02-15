declare module 'react-responsive-masonry' {
    import { ReactNode, FC } from 'react';

    export interface MasonryProps {
        children: ReactNode;
        columnsCount?: number;
        gutter?: string;
        className?: string;
        style?: object;
    }

    export interface ResponsiveMasonryProps {
        children: ReactNode;
        columnsCountBreakPoints?: Record<number, number>;
        className?: string;
        style?: object;
    }

    const Masonry: FC<MasonryProps>;
    export const ResponsiveMasonry: FC<ResponsiveMasonryProps>;
    export default Masonry;
}
