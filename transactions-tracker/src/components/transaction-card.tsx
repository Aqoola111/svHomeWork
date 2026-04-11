import type {Transaction} from "../App.tsx";
import {cn} from "../utils.ts";

interface TransactionCardProps {
	transaction: Transaction;
	deleteTransaction: (id: string) => void;
	onEdit: (transaction: Transaction) => void;
}

export const TransactionCard = ({transaction, deleteTransaction, onEdit}: TransactionCardProps) => {
	const isIncome = transaction.type === 'Income';
	
	return (
		<div className="group w-full bg-white hover:bg-neutral-50 border border-neutral-100 rounded-2xl p-4 transition-all duration-200 shadow-sm hover:shadow-md flex justify-between items-center relative overflow-hidden">
			<div className={cn(
				"absolute left-0 top-0 bottom-0 w-1.5",
				isIncome ? "bg-emerald-500" : "bg-red-500"
			)}/>
			
			<div className="flex flex-col gap-1 ml-2">
				<h3 className="font-bold text-neutral-800 text-lg leading-tight">
					{transaction.description || "No description"}
				</h3>
				<div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs font-medium uppercase tracking-wider">
                   {transaction.category}
                </span>
					<span className="text-neutral-400 text-xs font-medium">
                   {transaction.date}
                </span>
				</div>
			</div>
			
			<div className="flex items-center gap-6">
				<div className="text-right">
					<p className={cn(
						"text-xl font-black tabular-nums",
						isIncome ? "text-emerald-600" : "text-red-600"
					)}>
						{isIncome ? "+" : "-"}${transaction.amount.toLocaleString()}
					</p>
				</div>
				
				<div className="flex gap-2">
					<button onClick={() => onEdit(transaction)} className="p-2 hover:bg-sky-50 text-sky-600 rounded-xl">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>
						</svg>
					</button>
					<button onClick={() => deleteTransaction(transaction.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-xl">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};