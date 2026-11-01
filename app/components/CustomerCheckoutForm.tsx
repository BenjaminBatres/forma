interface IProps {
  title: string;
  children: React.ReactNode;
  required?: boolean;
}

export default function CustomerCheckoutForm({
  title,
  required,
  children,
}: IProps) {
  return (
    <div>
      <div className="border border-[#e6e6e6] bg-white py-2.5 px-5 flex justify-between items-center">
        <h2 className="text-[28px] font-semibold">{title}</h2>
        {required && (
          <p className="text-[#222]/80 text-sm font-medium">* Required</p>
        )}
      </div>
      <div className="p-5 bg-white border-x border-b border-[#e6e6e6] space-y-4">
        {children}
      </div>
    </div>
  );
}
