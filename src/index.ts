import './scss/main.scss';

declare global {
  interface Window { GOVUKFrontend: any; }
}

window.GOVUKFrontend.initAll()

const printName = () => {
  const name: string = "testy";
  console.log(name);
}

printName();