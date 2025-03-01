


export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full overflow-y-auto px-4 py-4 pt-[30px] pl-[40px]">
      {children}
    </div>
  );
}