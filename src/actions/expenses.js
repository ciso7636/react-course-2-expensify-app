import uuid from 'uuid';

export const addExpense = ({description = '', note = '', amount = 0, createAt = 0 } = {}) => (
    {
        type:'ADD_EXPENSE',
        expenses:{
            id: uuid(),
            description,
            note,
            amount,
            createAt
        }
    }
)

export const removeExpense = ({id} = {}) => (
    {
        type:'REMOVE_EXPENSE',
        id
    }
)

export const editExpense = (id, updates) => (
    {
        type:'EDIT_EXPENSE',
        id,
        updates
    }
)