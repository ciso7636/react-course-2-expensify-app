
import moment from 'moment';

// Get visible expenses

export default (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1;
    }
  });
};



const lastExpense = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createAt >= startDate; // sikovny zapis do jedneho riadku, ktory zabezpeci ze ak je hodnota cislo tak je false a tym padom este musi zbehnut aj druha podmienka
        const endDateMatch = typeof endDate !== 'number' || expense.createAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); // metoda includes pre ktora vracia boolean ci sa nachadza string v stringu. Je to namiesto indexOf, ktory vracia indes ak najde zhodu    

        return startDateMatch && endDateMatch && textMatch;
    }).sort(function (a, b) { // metoda sort spolu s callback funkciou ktora ma dva par. cize hodnoty z pola, ktore porovnava a nasledne vrati 1 alebo -1
        if(sortBy === 'date'){
            return a.createAt < b.createAt ? 1 : -1;
        }
        else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })
}