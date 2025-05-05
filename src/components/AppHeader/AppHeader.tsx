interface AppHeaderProps {
  title: string;
  description: string;
}

export default function AppHeader({
  title,
  description
}: AppHeaderProps) {
  return (
    <div className="w-full pb-16 py-10 flex flex-col gap-5 text-center">
        <p className="text-primary-main text-3xl font-bold">{title}</p>
        <p className="text-light-200">{description}</p>
    </div>
  )
}
