import {categories, type Transaction} from "../App.tsx";

interface CategorySummaryProps {
	transactions: Transaction[];
}

export const CategorySummary = ({transactions}: CategorySummaryProps) => {
	const expenses = transactions.filter(t => t.type === 'Expense');
	const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
	
	const categoryTotals = expenses.reduce((acc, t) => {
		acc[t.category] = (acc[t.category] || 0) + t.amount;
		return acc;
	}, {} as Record<string, number>);
	
	if (expenses.length === 0) return null;
	
	return (
		<div className="w-full bg-white p-6 rounded-[2rem] shadow-sm border border-neutral-100 flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h3 className="text-xl font-bold text-neutral-800">Spending by Category</h3>
				<span className="text-xs font-bold bg-red-50 text-red-500 px-3 py-1 rounded-full uppercase">
                    Expenses focus
                </span>
			</div>
			
			<div className="flex flex-col gap-5">
				{Object.entries(categoryTotals).map(([categoryName, amount]) => {
					const percentage = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
					const categoryIcon = categories.find(c => c.name === categoryName)?.icon || '💰';
					
					return (
						<div key={categoryName} className="flex flex-col gap-2">
							<div className="flex justify-between items-end">
								<div className="flex items-center gap-2">
									<span className="text-xl">{categoryIcon}</span>
									<span className="font-bold text-neutral-700">{categoryName}</span>
								</div>
								<div className="text-right">
									<span className="font-black text-neutral-900">${amount.toLocaleString()}</span>
									<span
										className="text-[10px] text-neutral-400 ml-2 font-bold">{percentage.toFixed(0)}%</span>
								</div>
							</div>
							<div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
								<div
									className="h-full bg-neutral-900 rounded-full transition-all duration-500 ease-out"
									style={{width: `${percentage}%`}}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};