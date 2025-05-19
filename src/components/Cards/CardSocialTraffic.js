import React from "react";

export default function CardTrafficEtudia() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Origine du trafic
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Voir tout
              </button>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Source
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Visiteurs
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Pourcentage
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { source: "Lien partagé", visiteurs: "1,200", pourcentage: 60, color: "bg-indigo-500", bg: "bg-indigo-200" },
                { source: "Recherche Google", visiteurs: "2,800", pourcentage: 75, color: "bg-blue-500", bg: "bg-blue-200" },
                { source: "Campagne Email", visiteurs: "950", pourcentage: 45, color: "bg-green-500", bg: "bg-green-200" },
                { source: "Accès direct", visiteurs: "1,600", pourcentage: 65, color: "bg-purple-500", bg: "bg-purple-200" },
                { source: "Publicité Réseaux", visiteurs: "500", pourcentage: 25, color: "bg-red-500", bg: "bg-red-200" },
              ].map((item, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    {item.source}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.visiteurs}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <div className="flex items-center">
                      <span className="mr-2">{item.pourcentage}%</span>
                      <div className="relative w-full">
                        <div className={`overflow-hidden h-2 text-xs flex rounded ${item.bg}`}>
                          <div
                            style={{ width: `${item.pourcentage}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${item.color}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
