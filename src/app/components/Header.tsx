import Link from "next/link";

export default function Header() {
  return (
    <header className="main-header">
      <ul>
        <li>
          <Link className="menu-item" href="/">Inicio</Link>
        </li>
        <li>
          <Link className="menu-item" href="/users">Usuarios</Link>
        </li>
      </ul>
    </header>
  );
}
