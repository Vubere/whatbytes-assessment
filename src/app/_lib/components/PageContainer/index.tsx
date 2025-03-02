


export default function PageContainer({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="h-full w-full max-w-full overflow-y-auto px-4  py-4  xl:px-8 xl:py-4 pt-[30px] xl:pl-[40px]">
      {children}
    </div>
  );
}