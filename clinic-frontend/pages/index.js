import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <header className="header">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Front Desk System</h1>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="card">
            <h2 className="text-lg font-semibold">Queue</h2>
            <p className="mt-2">Manage walk-in patients</p>
            <Link href="/queue" className="btn mt-4 inline-block">Open Queue</Link>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold">Appointments</h2>
            <p className="mt-2">Book or reschedule</p>
            <Link href="/appointments" className="btn mt-4 inline-block">Open Appointments</Link>
          </div>
          <div className="card">
            <h2 className="text-lg font-semibold">Doctors</h2>
            <p className="mt-2">Manage doctors</p>
            <Link href="/doctors" className="btn mt-4 inline-block">Open Doctors</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
