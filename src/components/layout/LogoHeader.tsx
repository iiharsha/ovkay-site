
import Image from 'next/image';

import clsx from 'clsx';

const Logo = ({
    size,
    className,
    variant = 'default'
}: {
    size: 'sm' | 'lg';
    className?: string;
    variant?: 'default' | 'white';
}) => {
    const logosource =
        variant === 'white' ? '/images/logo.png' : '/images/logo.png';
    return (
        <Image
            src={logosource}
            width="594"
            height="206"
            sizes={size === 'sm' ? '150px' : '288px'}
            className={clsx('w-auto max-w-none', className, {
                'h-[40px] xl:h-[52px]': size === 'sm',
                'h-[64px] md:h-[100px]': size === 'lg'
            })}
            alt="Recens Logo"
            priority
        />
    );
};

export default Logo;

