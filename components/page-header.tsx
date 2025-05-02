interface PageHeaderProps {
  title: string;
  backgroundImage: string;
}

export function PageHeader({ title, backgroundImage }: PageHeaderProps) {
  return (
    <div className="relative w-full">
      <div
        className="relative flex w-full items-center justify-center bg-cover bg-center page-header-styled"
        style={{ backgroundImage: `url('/fondo.jpg')` }}
      >
        <div className="bg-black/60 rounded-xl px-10 py-6">
          <h1
            className="page-header-title relative z-10 font-medium uppercase tracking-wider text-white text-larger"
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}