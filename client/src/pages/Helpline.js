import React from "react";

const helplines = [
  { name: "🚨 Police", number: "100", description: "Emergency police assistance across India." },
  { name: "🔥 Fire Brigade", number: "101", description: "Call in case of fire emergencies." },
  { name: "🚑 Ambulance", number: "102", description: "Medical emergencies and ambulance services." },
  { name: "👩 Women Helpline", number: "1091", description: "Women’s safety and support helpline." },
  { name: "👶 Child Helpline", number: "1098", description: "24x7 toll free helpline for children in distress." },
  { name: "🛡️ Cyber Crime Helpline", number: "155260", description: "Report cyber crimes and online frauds." },
  { name: "👴 Senior Citizens Helpline", number: "14567", description: "Support helpline for senior citizens." },
];

function Helpline() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-2">📞 Emergency Helplines</h1>
      <p className="text-center text-gray-600 mb-8">
        Quick access to important helpline numbers for safety and support.
      </p>

      {/* Helpline Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {helplines.map((h, i) => (
          <div
            key={i}
            className="bg-white border shadow-md rounded-xl p-5 hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold mb-1">{h.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{h.description}</p>
            </div>
            <a
              href={`tel:${h.number}`}
              className="mt-auto inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Call {h.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Helpline;
