const fs = require('fs');
const path = require('path');

const compPath = path.join(__dirname, '../src/components/LiveHotelSearch.tsx');
let code = fs.readFileSync(compPath, 'utf8');

const emptyStateBlock = `
      {/* Empty Search Fallback */}
      {!isScanning && hasSearched && hotels.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-xl text-white">
          <Building2 className="w-12 h-12 text-amber-400 mx-auto opacity-75" />
          <h4 className="text-lg font-black text-white">No Properties Found for "{destination}"</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            We searched live B2B Bedbank gateways. Try searching for Oslo, Paris, Las Vegas, Dubai, Davao, Tokyo, or explore our global portfolio.
          </p>
          <button
            type="button"
            onClick={() => {
              setDestination('');
              performSearch('');
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Explore Global Wholesale Portfolio
          </button>
        </div>
      )}
`;

if (!code.includes('Empty Search Fallback')) {
  code = code.replace(
    '      {/* Results Section with Price Tier Filter Tabs */}',
    emptyStateBlock + '\n      {/* Results Section with Price Tier Filter Tabs */}'
  );
}

fs.writeFileSync(compPath, code, 'utf8');
console.log('Successfully updated LiveHotelSearch.tsx with empty fallback state!');
