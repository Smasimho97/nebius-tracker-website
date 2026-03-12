export const nebiusSites = [
  {
    datacenter_id: "USEAST-1",
    region: "Americas",
    country: "USA", state: "NJ", city: "Vineland",
    activeMW: 50, expansionMW: 300, capacityMW: 350,
    type: "Built", status: "Active",
    coordinates: [-75.0484, 39.4889],
    markerCoordinates: [-74.9484, 39.8889],
    date: [
      { quarter: 1, year: 25, power: "-", type: "announced"},
      { quarter: 4, year: 25, power: 50,  type: "actual" },
      { quarter: 4, year: 26, power: 350,  type: "target" },
    ]
  },
  {
    datacenter_id: "USCENTRAL-1",
    region: "Americas",
    country: "USA", state: "MO", city: "Kansas City",
    activeMW: 12, expansionMW: "", capacityMW: 40,
    type: "Colocation", status: "Active",
    coordinates: [-94.5786, 39.0997],
    markerCoordinates: [-93.8155, 39.0],
    date: [
      { quarter: 4, year: 24, power: "-", type: "announced"},
      { quarter: 2, year: 25, power: 5,  type: "actual" },
      { quarter: 3, year: 25, power: 12, type: "actual" }
    ]
  },
  {
    datacenter_id: "USCENTRAL-2",
    region: "Americas",
    country: "USA", state: "MO", city: "Independence",
    activeMW: "", expansionMW: "", capacityMW: 1025,
    type: "Owned", status: "Announced",
    coordinates: [-93.8155, 39.0911],
    markerCoordinates: [-93.8155, 39.33],
    date: [
      { quarter: 4, year: 25, power: "-", type: "announced"},
      { quarter: 4, year: 26, power: 250,  type: "target" },
      { quarter: 4, year: 27, power: 1100, type: "target" },
    ]
  },
  {
    datacenter_id: "USSOUTH-1",
    region: "Americas",
    country: "USA", state: "AL", city: "Birmingham",
    activeMW: "", expansionMW: "", capacityMW: 375,
    type: "Owned", status: "Announced",
    coordinates: [-86.80249, 33.52066],
    date: [
      { quarter: 4, year: 25, power: "-", type: "announced" },
      { quarter: 4, year: 27, power: 300, type: "target" },
    ]
  },
  {
    datacenter_id: "USSOUTH-2",
    region: "Americas",
    country: "USA", state: "OK", city: "Oklahoma City",
    activeMW: "", expansionMW: "", capacityMW: "",
    type: "Colocation", status: "Announced",
    coordinates: [-97.5164, 35.4676],
    date: [
      { quarter: 1, year: 26, power: "-", type: "announced" },
    ]
  },
  {
    datacenter_id: "USCENTRAL-3",
    region: "Americas",
    country: "USA", state: "MN", city: "Minneapolis",
    activeMW: "", expansionMW: "", capacityMW: 50,
    type: "Colocation", status: "Announced",
    coordinates: [-93.265, 44.9778],
    date: [
      { quarter: 1, year: 26, power: "-", type: "announced" },
    ]
  },
  {
    datacenter_id: "EU-NORTH1",
    region: "Europe",
    country: "Finland", city: "Mäntsälä",
    activeMW: 50, expansionMW: 25, capacityMW: 75,
    type: "Owned", status: "Active",
    coordinates: [25.3167, 60.6333],
    date: [
      { quarter: 2, year: 24, power: 25, type: "actual" },
      { quarter: 4, year: 25, power: 50, type: "actual" },
      { quarter: 1, year: 26, power: 75, type: "target" },
    ]
  },
  {
    datacenter_id: "EU-NORTH2",
    region: "Europe",
    country: "Iceland", city: "Keflavík",
    activeMW: 10, expansionMW: "", capacityMW: 10,
    type: "Colocation", status: "Active",
    coordinates: [-22.5734, 63.9688],
    date: [
      { quarter: 1, year: 25, power: 10, type: "actual" },
    ]
  },
  {
    datacenter_id: "UKSOUTH1",
    region: "Europe",
    country: "UK", city: "Surrey",
    activeMW: 16, expansionMW: "", capacityMW: 16,
    type: "Colocation", status: "Active",
    coordinates: [-0.5861, 51.3778],
    markerCoordinates: [-0.5861, 51],
    date: [
      { quarter: 2, year: 25, power: "-", type: "announced"},
      { quarter: 4, year: 25, power: 16, type: "actual" },
      { quarter: 2, year: 26, power: 28, type: "target" },
    ]
  },
  {
    datacenter_id: "UKEAST1",
    region: "Europe",
    country: "UK", city: "East London",
    activeMW: "", expansionMW: "", capacityMW: "",
    type: "Colocation", status: "Announced",
    coordinates: [0.0055, 51.5424],
    markerCoordinates: [-0.5861, 51.27],
    date: [
      { quarter: 1, year: 26, power: "-", type: "announced" },
    ]
  },
  {
    datacenter_id: "EU-WEST1",
    region: "Europe",
    country: "France", city: "Paris",
    activeMW: 5, expansionMW: "", capacityMW: 5,
    type: "Colocation", status: "Active",
    coordinates: [2.35035, 48.92713],
    markerCoordinates: [2.35035, 49],
    date: [
      { quarter: 4, year: 24, power: 5, type: "actual" },
    ]
  },
  {
    datacenter_id: "EU-WEST2",
    region: "Europe",
    country: "France", city: "Paris",
    activeMW: "", expansionMW: "", capacityMW: "",
    type: "Colocation", status: "Announced",
    coordinates: [2.35035, 48.92713],
    markerCoordinates: [2.35035, 49.29],
    date: [
      { quarter: 1, year: 26, power: "-", type: "announced" },
    ]
  },
  {
    datacenter_id: "EU-WEST3",
    region: "Europe",
    country: "France", city: "Béthune",
    activeMW: "", expansionMW: "", capacityMW: 240,
    type: "Colocation", status: "Announced",
    coordinates: [2.6406, 50.5301],
    date: [
      { quarter: 1, year: 26, power: "-", type: "announced"},
      { quarter: 4, year: 26, power: 120, type: "target" },
      { quarter: 4, year: 27, power: 240, type: "target" },
    ]
  },
  {
    datacenter_id: "ME-WEST1",
    region: "Middle East",
    country: "Israel", city: "Modi'in",
    activeMW: 8, expansionMW: "", capacityMW: 8,
    type: "Colocation", status: "Active",
    coordinates: [35.01, 31.9],
    markerCoordinates: [35, 32.15],
    date: [
      { quarter: 4, year: 25, power: 8, type: "actual" },
    ]
  },
  {
    datacenter_id: "ME-WEST3",
    region: "Middle East",
    country: "Israel", city: "Masmiyya",
    activeMW: "", expansionMW: "", capacityMW: 22,
    type: "Colocation", status: "Announced",
    coordinates: [34.78472, 31.7575],
    markerCoordinates: [35, 32.5],
    date: [
      { quarter: 1, year: 26, power: "-", type: "announced"},
      { quarter: 3, year: 26, power: 22, type: "target" },
    ]
  },
  {
    datacenter_id: "ME-WEST2",
    region: "Middle East",
    country: "Israel", city: "Beit Shemesh",
    activeMW: "", expansionMW: "", capacityMW: 58,
    type: "Colocation", status: "Announced",
    coordinates: [34.98665, 31.74569],
    markerCoordinates: [35, 32.85],
    date: [
      { quarter: 1, year: 26, power: "-", type: "announced" },
      { quarter: 3, year: 26, power: 58, type: "target" },
    ]
  },
];