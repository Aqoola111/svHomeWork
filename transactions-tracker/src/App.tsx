import {useState, useEffect} from 'react';
import './App.css';
import {AddTransaction} from "./components/add-transaction.tsx";
import {Modal} from "./components/modal.tsx";
import {TransactionCard} from "./components/transaction-card.tsx";
import {CategorySummary} from "./components/category-summary.tsx";

export interface Transaction {
	id: string;
	amount: number;
	type: 'Income' | 'Expense';
	category: string;
	description: string;
	date: string;
}

export const categories = [
	{id: '1', name: 'Food', icon: '🍔'},
	{id: '2', name: 'Transport', icon: '🚗'},
	{id: '3', name: 'Shopping', icon: '🛍️'},
	{id: '4', name: 'Entertainment', icon: '🎬'},
	{id: '5', name: 'Housing', icon: '🏠'},
	{id: '6', name: 'Salary', icon: '💰'},
	{id: '7', name: 'Health', icon: '🏥'},
	{id: '8', name: 'Education', icon: '📚'}
] as const;

function App() {
	const [transacitonModal, setTransacitonModal] = useState(false);
	const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
	
	const [transactions, setTransactions] = useState<Transaction[]>(() => {
		const saved = localStorage.getItem('budget_transactions');
		if (saved) {
			try {
				return JSON.parse(saved);
			} catch (e) {
				return [];
			}
		}
		return [];
	});
	
	useEffect(() => {
		localStorage.setItem('budget_transactions', JSON.stringify(transactions));
	}, [transactions]);
	
	const addTransaction = (newTransaction: Transaction) => {
		setTransactions(prev => {
			const isEditing = prev.find(t => t.id === newTransaction.id);
			if (isEditing) {
				return prev.map(t => t.id === newTransaction.id ? newTransaction : t);
			}
			return [newTransaction, ...prev];
		});
		setTransacitonModal(false);
		setEditingTransaction(null);
	};
	
	const deleteTransaction = (id: string) => {
		setTransactions(prev => prev.filter(t => t.id !== id));
	};
	
	const sortedTransactions = [...transactions].sort((a, b) =>
		new Date(b.date).getTime() - new Date(a.date).getTime()
	);
	
	const totalIncome = transactions.filter(t => t.type === 'Income').reduce((a, b) => a + b.amount, 0);
	const totalExpense = transactions.filter(t => t.type === 'Expense').reduce((a, b) => a + b.amount, 0);
	const balance = totalIncome - totalExpense;
	
	return (
		<div className='bg-[#f4f7f6] min-h-screen w-full text-slate-900 pb-24 px-4'>
			<Modal
				isOpen={transacitonModal}
				onClose={() => {
					setTransacitonModal(false);
					setEditingTransaction(null);
				}}
				title={editingTransaction ? 'Edit Data' : 'Add New'}
			>
				<AddTransaction defaultData={editingTransaction} onAddTransaction={addTransaction}/>
			</Modal>
			
			<div className='max-w-xl mx-auto pt-12 flex flex-col gap-8'>
				<header
					className='flex justify-between items-center bg-white p-8 rounded-[2.5rem] shadow-sm border border-white'>
					<div>
						<p className='text-xs font-black uppercase text-slate-400 tracking-widest'>Net Worth</p>
						<h1 className='text-4xl font-black tracking-tighter text-slate-800'>
							${balance.toLocaleString()}
						</h1>
					</div>
					<button
						onClick={() => setTransacitonModal(true)}
						className='bg-emerald-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-200 hover:rotate-90 transition-all duration-300'
					>
						+
					</button>
				</header>
				
				<div className='grid grid-cols-2 gap-4'>
					<div className='bg-white p-5 rounded-3xl border border-slate-100 shadow-sm'>
						<span className='text-[10px] font-bold text-emerald-500 uppercase italic'>Inflow</span>
						<p className='text-xl font-black'>+${totalIncome.toLocaleString()}</p>
					</div>
					<div className='bg-white p-5 rounded-3xl border border-slate-100 shadow-sm'>
						<span className='text-[10px] font-bold text-red-400 uppercase italic'>Outflow</span>
						<p className='text-xl font-black'>-${totalExpense.toLocaleString()}</p>
					</div>
				</div>
				
				<CategorySummary transactions={transactions}/>
				
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between px-2'>
						<h2 className='font-black text-lg text-slate-700 uppercase tracking-tight'>History</h2>
						<span className='text-xs font-bold text-slate-400'>{transactions.length} entries</span>
					</div>
					
					<div className='flex flex-col gap-2'>
						{sortedTransactions.length === 0 ? (
							<div className='text-center py-10 opacity-30 font-bold italic'>
								No transactions found...
							</div>
						) : (
							sortedTransactions.map(t => (
								<TransactionCard
									key={t.id}
									transaction={t}
									deleteTransaction={deleteTransaction}
									onEdit={(data) => {
										setEditingTransaction(data);
										setTransacitonModal(true);
									}}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;