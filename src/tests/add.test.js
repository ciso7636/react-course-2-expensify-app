const add = (a, b) => a + b;

test('Nespravne cislo', () => {
    const result = add(3, 4);
    expect(result).toBe(7)
})