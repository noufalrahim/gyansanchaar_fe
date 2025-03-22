import { cn } from '@/lib/utils';
import { Button } from '../ui/button'

interface PrimaryButtonProps {
    label: string;
    onClick?: () => void;
    className?: string;
    leadIcon?: React.ReactNode;
    trailIcon?: React.ReactNode;
};

export default function PrimaryButton({
    label,
    onClick,
    className,
    leadIcon,
    trailIcon,
}: PrimaryButtonProps) {
    return (
        <Button onClick={onClick} className={cn('bg-primary-main hover:bg-primary-950 text-white text-md', className)}>
            {leadIcon}
            {label}
            {trailIcon}
        </Button>
    )
}
