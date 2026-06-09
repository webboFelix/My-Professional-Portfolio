// components/ui/Card.tsx
interface CardProps {
  title: string;
  value: number;
  emptyMessage?: string; // add this line
}

export function Card({ title, value, emptyMessage = "No records" }: CardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <h3 className="text-gray-400 text-sm uppercase tracking-wide">{title}</h3>
      {value === 0 ? (
        <p className="text-gray-500 mt-2 text-sm">{emptyMessage}</p>
      ) : (
        <p className="text-3xl font-bold mt-2">{value}</p>
      )}
    </div>
  );
}
