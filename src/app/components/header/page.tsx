import Navbar from "../navbar/navbar";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        <ul className="flex flex-row space-x-4">
          <Navbar />
        </ul>
      </nav>
    </header>
  );
}
