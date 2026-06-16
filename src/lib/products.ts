import worktopUndershelf from "@/assets/products/worktop-undershelf.png.asset.json";
import tableNoUndershelf from "@/assets/products/table-no-undershelf.png.asset.json";
import tableChute from "@/assets/products/table-chute.png.asset.json";
import sinkSingle from "@/assets/products/sink-single.png.asset.json";
import sinkDouble from "@/assets/products/sink-double.png.asset.json";
import sinkTriple from "@/assets/products/sink-triple.png.asset.json";
import wallShelf from "@/assets/products/wall-shelf.png.asset.json";
import rackSystem from "@/assets/products/rack-system.png.asset.json";
import perforatedShelf from "@/assets/products/perforated-shelf.png.asset.json";
import hood1 from "@/assets/products/hood-1.png.asset.json";
import hood2 from "@/assets/products/hood-2.png.asset.json";
import hood3 from "@/assets/products/hood-3.png.asset.json";
import dishwasher1 from "@/assets/products/dishwasher-1.png.asset.json";
import dishwasher2 from "@/assets/products/dishwasher-2.png.asset.json";
import dishwasher3 from "@/assets/products/dishwasher-3.png.asset.json";
import greaseTrap from "@/assets/products/grease-trap.png.asset.json";
import floorDrains from "@/assets/products/floor-drains.png.asset.json";
import coldroom1 from "@/assets/products/coldroom-1.png.asset.json";
import coldroom2 from "@/assets/products/coldroom-2.png.asset.json";
import meatRails from "@/assets/products/meat-rails.jpg.asset.json";
import meatTrolley from "@/assets/products/meat-trolley.png.asset.json";
import evapTray from "@/assets/products/evap-tray.webp.asset.json";
import drainTray from "@/assets/products/drain-tray.png.asset.json";
import dripTray from "@/assets/products/drip-tray.png.asset.json";

export const IMG = {
  worktopUndershelf: worktopUndershelf.url,
  tableNoUndershelf: tableNoUndershelf.url,
  tableChute: tableChute.url,
  sinkSingle: sinkSingle.url,
  sinkDouble: sinkDouble.url,
  sinkTriple: sinkTriple.url,
  wallShelf: wallShelf.url,
  rackSystem: rackSystem.url,
  perforatedShelf: perforatedShelf.url,
  hood1: hood1.url,
  hood2: hood2.url,
  hood3: hood3.url,
  dishwasher1: dishwasher1.url,
  dishwasher2: dishwasher2.url,
  dishwasher3: dishwasher3.url,
  greaseTrap: greaseTrap.url,
  floorDrains: floorDrains.url,
  coldroom1: coldroom1.url,
  coldroom2: coldroom2.url,
  meatRails: meatRails.url,
  meatTrolley: meatTrolley.url,
  evapTray: evapTray.url,
  drainTray: drainTray.url,
  dripTray: dripTray.url,
};

export const kitchenCategories = [
  {
    name: "Work Tables // Sub-Assembly",
    slug: "work-tables",
    items: [
      { image: IMG.worktopUndershelf, title: "Table with Undershelf", description: "Heavy-duty grade 304 stainless steel worktop with full-length integrated stability undershelf." },
      { image: IMG.tableNoUndershelf, title: "Table without Undershelf", description: "High-clearance open-base raw processing table, built with rigid structural upright bracing lines." },
      { image: IMG.tableChute, title: "Table with Chute", description: "Integrated high-volume waste evacuation chute engineered for fast-paced commercial prep lines." },
    ],
  },
  {
    name: "Sinks // Hydration Nodes",
    slug: "sinks",
    items: [
      { image: IMG.sinkSingle, title: "Single Bowl Sink Station", description: "Precision welded deep-draw single compartment basin configured for industrial sanitization lines." },
      { image: IMG.sinkDouble, title: "Double Bowl Sink Station", description: "Dual high-capacity processing basins with structural sound-deadening properties and side drainboards." },
      { image: IMG.sinkTriple, title: "Triple Bowl Wash Matrix", description: "Three-compartment high-fidelity architectural line item for systematic wash, rinse, and chemical sanitizing workflows." },
    ],
  },
  {
    name: "Wall Shelves & Rack Systems // Containment",
    slug: "shelving",
    items: [
      { image: IMG.wallShelf, title: "Wall Shelves", description: "Single and dual-tier high-load cantilevered steel shelves engineered for concrete anchor placement." },
      { image: IMG.rackSystem, title: "Free-standing Rack Systems", description: "Heavy industrial high-capacity storage frame configurations for dry bulk materials or heavy machinery." },
      { image: IMG.perforatedShelf, title: "Perforated Wall Shelf", description: "High-airflow ventilated shelving matrix optimized for thermal steam zones and wet wash environments." },
    ],
  },
  {
    name: "Exhaust Hoods & Canopy Systems // Extraction",
    slug: "hoods",
    items: [
      { image: IMG.hood1, title: "Wall Canopy Hood", description: "Wall-mounted high-velocity canopy featuring baffled dynamic grease containment filters and sealed internal lighting." },
      { image: IMG.hood2, title: "Kitchen Extraction Hood", description: "Heavy-duty overhead atmospheric volume containment terminal optimized to regulate heavy thermal thermal mass." },
      { image: IMG.hood3, title: "Custom Profile Canopy Hood", description: "Bespoke engineered layout exhaust profiles built to fit strict structural ceiling challenges and low overhead zones." },
    ],
  },
  {
    name: "Dishwashing & Landing Tables // Warewashing Grid",
    slug: "dishwashing",
    items: [
      { image: IMG.dishwasher1, title: "Dishwasher Inlet Table", description: "Soiled-side intake terminal component containing pre-wash scrap containment sinks and splash guards." },
      { image: IMG.dishwasher2, title: "Dishwasher Table — Right Axis", description: "Right-hand directional system integration table built to lock down automatically into standard flight machines." },
      { image: IMG.dishwasher3, title: "Dishwasher Table — Left Axis", description: "Left-hand execution clean outfeed line table constructed with deep splash back panels and double sinks." },
    ],
  },
  {
    name: "Grease Traps & Floor Drains // Liquid Management",
    slug: "drainage",
    items: [
      { image: IMG.greaseTrap, title: "Industrial Grease Interceptor", description: "High-capacity flow-regulated grease trap designed for maximum fat sedimentation and kitchen safety retention." },
      { image: IMG.floorDrains, title: "High-Volume Floor Drains", description: "Corrosion-resistant heavy-gauge perimeter drain channels customized for high-discharge wet production lines." },
    ],
  },
];

export const refrigerationSections = [
  {
    name: "Cold Room Shelving Matrix",
    items: [
      { image: IMG.coldroom1, title: "Modular Cold Room Shelving", description: "Corrosion-proof adjustable steel structural modules built to withstand continuous below-zero thermal processing." },
      { image: IMG.coldroom2, title: "Heavy-Duty Cold Storage Racks", description: "Reinforced high-load framework configurations engineered for dense commercial bulk refrigeration freezing." },
    ],
  },
  {
    name: "Meat Rails & Hanging Frameworks",
    items: [
      { image: IMG.meatRails, title: "Overhead Meat Rails", description: "Heavy-gauge overhead conveyor track lines built for industrial carcass transportation and placement." },
      { image: IMG.meatTrolley, title: "Carcass Transport Trolley", description: "Mobile structural steel transport chassis equipped with heavy-duty roller casters and load hooks." },
    ],
  },
  {
    name: "Evaporator & Drain Systems // Condensate Management",
    items: [
      { image: IMG.evapTray, title: "Evaporator Drain Tray", description: "Precision pitched condensation collection units custom-contoured for standard industrial cooling coils." },
      { image: IMG.drainTray, title: "Refrigeration Collection Tray", description: "Bespoke custom-fabricated drip containment pans meant for auxiliary ice machine overflow channels." },
      { image: IMG.dripTray, title: "Drip Tray with Drain [40×22]", description: "Recessed surface management tray containing an integrated low-profile drainage outlet collar." },
    ],
  },
];

export const homeProducts = [
  { image: IMG.worktopUndershelf, title: "Work Tables // Prep Units", description: "Custom engineered heavy-prep surface stations equipped with targeted undershelves and anti-spill profiles.", tag: "FABRICATION" },
  { image: IMG.sinkTriple, title: "Sinks // Sanitization", description: "Multi-compartment heavy production washing cells manufactured to withstand extreme daily sanitation cycles.", tag: "HYDRATION" },
  { image: IMG.hood1, title: "Exhaust Systems", description: "High-velocity architectural canopy hoods engineered to meet strict HVAC extraction and air balancing mandates.", tag: "VENTILATION" },
  { image: IMG.rackSystem, title: "Shelves & Storage Matrix", description: "Wall-mounted storage panels, high-clearance freestanding equipment towers, and ventilated racks.", tag: "CONTAINMENT" },
  { image: IMG.coldroom1, title: "Cold Room Frameworks", description: "High-rigidity shelving units optimized for low-temperature airflow circulation and maximum sub-zero hygiene.", tag: "CRYOGENIC" },
  { image: IMG.dishwasher2, title: "Warewashing Systems", description: "Integrated dirty-intake landing stations and high-output clean outfeed table assemblies.", tag: "WAREWASHING" },
  { image: IMG.meatTrolley, title: "Logistics Trolleys & Rails", description: "Heavy structural rolling transport solutions and structural ceiling conveyor infrastructure items.", tag: "BUTCHERY" },
  { image: IMG.greaseTrap, title: "Effluent Management Systems", description: "Solid particle flow interceptors and continuous heavy-gauge drainage solutions.", tag: "DRAINAGE" },
];
