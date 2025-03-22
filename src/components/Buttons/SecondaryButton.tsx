import { cn } from '@/lib/utils';
import { Button } from '../ui/button'

interface SecondaryButton {
    label: string;
    onClick?: () => void;
    className?: string;
    leadIcon?: React.ReactNode;
    trailIcon?: React.ReactNode;
};

export default function SecondaryButton({
    label,
    onClick,
    className,
    leadIcon,
    trailIcon,
}: SecondaryButton) {
    return (
        <Button onClick={onClick} className={cn('text-md bg-primary-50 text-primary-main hover:bg-primary-100 transition-colors', className)}>
            {leadIcon}
            {label}
            {trailIcon}
        </Button>
    )
}
