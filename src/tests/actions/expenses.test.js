import { addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({id:'123dvd'})
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123dvd'
    })
})

test('should setup edit expense action object', () => {
    const action = editExpense('123dvd', {note: 'New note value'})
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123dvd',
        updates:{
            note: 'New note value'
        }

    })
})

test('should setup add expense with provided action values', () => {

    const expenseData = {
        description: 'Rent',
        amount: 232,
        createAt: 10,        
        note: 'This is note',
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: {
            ...expenseData,
            id: expect.any(String)      
        }

    })
})

test('should setup add expense with default action values', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expenses: {
            description: '',
            note: '',
            amount: 0,
            createAt: 0,
            id: expect.any(String)      
        }

    })
})