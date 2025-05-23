import Image from 'next/image';

type Sailing = {
  price: number;
  name: string;
  region: string;
  duration: number;
  departureDate: string;
  returnDate: string;
  itinerary: string[];
  ship: {
    name: string;
    rating: number;
    reviews: number;
    image: string;
    line: {
      logo: string;
      name: string;
    };
  };
};

function formatDateRange(startDateStr: string, endDateStr: string): string {
  const startDate = new Date(startDateStr + "T00:00:00Z");
  const endDate = new Date(endDateStr + "T00:00:00Z");

  const month = startDate.toLocaleString('en-US', { month: 'short' });
  const startDay = startDate.getUTCDate();
  const endDay = endDate.getUTCDate();
  const year = endDate.getUTCFullYear();

  return `${month} ${startDay} - ${endDay}, ${year}`;
}

export default async function SearchResultsPage() {
  const res = await fetch('https://sandbox.cruisebound-qa.com/sailings', {
    cache: 'no-store',
  });
  const data = await res.json();
  const sailings: Sailing[] = data.results;

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl text-black font-semibold">{sailings.length} trips found</h1>
        <button className="text-sm text-black px-3 py-1 border border-gray-400 rounded hover:bg-gray-100">Reset filters</button>
      </div>

      <div className="space-y-6">
        {sailings.map((sailing, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow border flex flex-col md:flex-row bg-white">
            <div className="relative w-full md:w-64 h-56 md:h-auto">
              { sailing.ship.image ? (
                <Image
                  src={sailing.ship.image}
                  alt={sailing.ship.name}
                  fill
                  className="object-cover"
                />
              ) : null }
              <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                {formatDateRange(sailing.departureDate, sailing.returnDate)}
              </span>
            </div>

            <div className="flex-1 p-4">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-black">{sailing.name}</h2>
                  <div className="flex items-center text-sm text-gray-800 mt-1 space-x-2">
                    <span>{sailing.region}</span>
                    <span> {sailing.duration} nights</span>
                    <span className="flex items-center gap-1">
                      <span>⭐ {sailing.ship.rating}</span>
                      <span className="text-xs text-gray-400">{sailing.ship.reviews} reviews</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap mt-2 text-sm text-black">
                    {sailing.itinerary.map((stop, i) => (
                      <span key={i} className="mr-1">
                        {stop}
                        {i < sailing.itinerary.length - 1 && ' ➝ '}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right">
                  { sailing.ship.line.logo ? (
                    <Image
                      src={sailing.ship.line.logo}
                      alt={sailing.ship.line.name}
                      width={80}
                      height={30}
                      className="inline-block"
                    />
                  ) : null }
                  <div className="text-xs text-gray-500 mt-1">{sailing.ship.name}</div>
                </div>
              </div>

              <div className="flex justify-between items-center px-4 py-3 bg-gray-100 rounded-b-lg">
                <div className="leading-tight">
                  <div className="text-xs text-gray-500">Interior from</div>
                  <div className="text-xl font-semibold text-gray-900">${sailing.price}</div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700">
                  See sailings
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}