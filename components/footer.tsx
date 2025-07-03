import Link from "next/link";

export function Footer() {
  return (
    <>
      <hr />
      <footer className=" text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-block mb-4">
            <div className="text-3xl font-bold text-blue-700 hover:text-blue-600 transition-colors">
              SeatWell
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Swiss Ticket Marketplace
            </p>
          </Link>
          <p className="text-gray-400 text-sm">
            © 2024 SeatWell. All rights reserved. | Connecting FC Zurich fans
            since 2024.
          </p>
        </div>
      </footer>
    </>
  );
}
