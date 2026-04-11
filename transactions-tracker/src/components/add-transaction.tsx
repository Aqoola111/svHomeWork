import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {categories, type Transaction} from "../App.tsx";
import {cn} from "../utils.ts";

interface AddTransactionProps {
	onAddTransaction: (transaction: Transaction) => void;
	defaultData?: Transaction | null
}

type TransactionForm = Omit<Transaction, 'id'>

export const AddTransaction = ({onAddTransaction, defaultData}: AddTransactionProps) => {
	const form = useForm<TransactionForm>({})
	const transactionType = form.watch('type')
	
	useEffect(() => {
		if (defaultData) {
			form.reset({
				type: defaultData.type,
				amount: defaultData.amount,
				description: defaultData.description,
				category: defaultData.category,
				date: defaultData.date
			});
		} else {
			form.reset({
				type: 'Expense',
				amount: 0,
				description: '',
				category: categories[0].name,
				date: new Date().toISOString().split('T')[0]
			});
		}
	}, [defaultData, form.reset]);
	
	const onSubmit = (data: TransactionForm) => {
		onAddTransaction({
			...data,
			id: defaultData?.id || crypto.randomUUID()
		})
		form.reset();
	}
	
	const inputStyles = "w-full bg-neutral-50 border border-neutral-200 text-neutral-700 py-2.5 px-4 rounded-xl focus:ring-2 focus:ring-neutral-200 outline-none transition-all text-sm";
	const labelStyles = "text-xs font-bold text-neutral-400 uppercase ml-1";
	
	return (
		<div className='w-full h-fit bg-white flex-col flex gap-6 items-center'>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
				<div className='flex justify-between w-full gap-3'>
					<button
						type="button"
						onClick={() => form.setValue('type', 'Expense')}
						className={cn('flex-1 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 py-2 rounded-xl font-semibold text-sm', transactionType === 'Expense' && 'bg-red-500 text-white')}>
						Expense
					</button>
					<button
						type="button"
						onClick={() => form.setValue('type', 'Income')}
						className={cn('flex-1 border border-emerald-100 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all duration-300 py-2 rounded-xl font-semibold text-sm', transactionType === 'Income' && 'bg-emerald-500 text-white')}>
						Income
					</button>
				</div>
				
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-1.5">
						<label className={labelStyles}>Category</label>
						<select
							{...form.register('category')}
							className={cn(inputStyles, "appearance-none cursor-pointer")}>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.name}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
					
					<div className="flex flex-col gap-1.5">
						<label className={labelStyles}>Amount</label>
						<input
							type="number"
							step="0.01"
							{...form.register('amount', {valueAsNumber: true})}
							className={inputStyles}
							placeholder="0.00"
						/>
					</div>
				</div>
				
				<div className="grid grid-cols-2 gap-4">
					<div className="flex flex-col gap-1.5">
						<label className={labelStyles}>Date</label>
						<input
							type="date"
							{...form.register('date')}
							className={inputStyles}
						/>
					</div>
					
					<div className="flex flex-col gap-1.5">
						<label className={labelStyles}>Description</label>
						<input
							type="text"
							{...form.register('description')}
							className={inputStyles}
							placeholder="Note..."
						/>
					</div>
				</div>
				
				<button
					type="submit"
					className="w-full mt-2 bg-neutral-900 text-white py-3.5 rounded-xl font-bold hover:bg-black shadow-lg text-sm">
					{defaultData ? 'Update' : 'Add'} Transaction
				</button>
			</form>
		</div>
	)
};