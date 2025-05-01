interface Person {
    id: string;
    name: string;
    age: number;
  }
  
  const NAMES = [
   "Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "George",
  "Hannah", "Ian", "Jane", "Kevin", "Laura", "Mike", "Nina", "Oscar",
  "Paula", "Quentin", "Rachel", "Steve", "Tina"
  ];
  
  export const generatePeople = (): Person[] =>
    NAMES.map((name, index) => ({
      id: `person-${index}`, 
      name,
      age: 20 + (index % 25),
    }));