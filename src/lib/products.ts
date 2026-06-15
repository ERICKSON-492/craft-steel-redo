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
    name: "Work Tables",
    slug: "work-tables",
    items: [
      { image: IMG.worktopUndershelf, title: "Table with undershelf", description: "Stainless steel worktop with full-length undershelf — custom-fabricated in any size." },
      { image: IMG.tableNoUndershelf, title: "Table without undershelf", description: "Clean open-base prep table, with or without backsplash." },
      { image: IMG.tableChute, title: "Table with chute", description: "Integrated waste chute for fast-paced prep and pass lines." },
    ],
  },
  {
    name: "Sinks",
    slug: "sinks",
    items: [
      { image: IMG.sinkSingle, title: "Single bowl sink", description: "Custom-fabricated single-bowl stainless steel sink." },
      { image: IMG.sinkDouble, title: "Double bowl sink", description: "Two equal bowls with optional drainboards on either side." },
      { image: IMG.sinkTriple, title: "Triple bowl sink", description: "Three-compartment wash, rinse and sanitise station." },
    ],
  },
  {
    name: "Wall shelves & rack systems",
    slug: "shelving",
    items: [
      { image: IMG.wallShelf, title: "Wall shelves", description: "Single and double-tier stainless wall-mounted shelves." },
      { image: IMG.rackSystem, title: "Rack systems", description: "Free-standing storage racks for dry goods or equipment." },
      { image: IMG.perforatedShelf, title: "Perforated wall shelf", description: "Ventilated perforated shelving for hot or wet stations." },
    ],
  },
  {
    name: "Exhaust hoods & canopy systems",
    slug: "hoods",
    items: [
      { image: IMG.hood1, title: "Wall canopy hood", description: "Wall-mounted canopy with stainless filters and integrated lighting." },
      { image: IMG.hood2, title: "Kitchen extraction hood", description: "Heavy-duty extraction hood sized to your cookline." },
      { image: IMG.hood3, title: "Custom canopy hood", description: "Bespoke profile hoods for tight or unusual spaces." },
    ],
  },
  {
    name: "Dishwashing & landing tables",
    slug: "dishwashing",
    items: [
      { image: IMG.dishwasher1, title: "Dishwasher inlet table", description: "Soiled-side landing table with pre-rinse area." },
      { image: IMG.dishwasher2, title: "Dishwasher table — right", description: "Right-hand dishwasher table with integrated sink." },
      { image: IMG.dishwasher3, title: "Dishwasher table — left", description: "Left-hand table with double sink and backsplash." },
    ],
  },
  {
    name: "Grease traps & floor drains",
    slug: "drainage",
    items: [
      { image: IMG.greaseTrap, title: "Grease trap", description: "Stainless steel grease interceptor in multiple capacities." },
      { image: IMG.floorDrains, title: "Floor drains", description: "Stainless floor drains for wet commercial kitchens." },
    ],
  },
];

export const refrigerationSections = [
  {
    name: "Cold room shelving",
    items: [
      { image: IMG.coldroom1, title: "Modular cold room shelves", description: "Adjustable stainless shelving units for walk-in cold rooms." },
      { image: IMG.coldroom2, title: "Heavy-duty cold room shelving", description: "Reinforced shelving for high-load refrigerated storage." },
    ],
  },
  {
    name: "Meat rails & hanging systems",
    items: [
      { image: IMG.meatRails, title: "Meat rails", description: "Stainless overhead rail systems for carcass hanging." },
      { image: IMG.meatTrolley, title: "Meat carcass trolley", description: "Custom-fabricated trolleys with stainless hooks." },
    ],
  },
  {
    name: "Evaporator & drain trays",
    items: [
      { image: IMG.evapTray, title: "Evaporator drain tray", description: "Stainless condensate trays sized to your evaporator unit." },
      { image: IMG.drainTray, title: "Drain tray", description: "Custom drip trays for refrigeration and ice equipment." },
      { image: IMG.dripTray, title: "Drip tray with drain (40×22)", description: "Recessed stainless drip tray with integrated drain outlet." },
    ],
  },
];

export const homeProducts = [
  { image: IMG.worktopUndershelf, title: "Work tables", description: "With or without undershelf, chute or splashback.", tag: "Kitchen" },
  { image: IMG.sinkTriple, title: "Sinks", description: "Single, double and triple-bowl commercial sinks.", tag: "Kitchen" },
  { image: IMG.hood1, title: "Exhaust hoods", description: "Wall, island and custom canopy hoods with filters.", tag: "Ventilation" },
  { image: IMG.rackSystem, title: "Shelves & racks", description: "Wall shelves, rack systems and perforated shelving.", tag: "Storage" },
  { image: IMG.coldroom1, title: "Cold room shelving", description: "Modular and heavy-duty shelving for cold rooms.", tag: "Refrigeration" },
  { image: IMG.dishwasher2, title: "Dishwashing tables", description: "Inlet, outlet and integrated dishwashing stations.", tag: "Warewashing" },
  { image: IMG.meatTrolley, title: "Meat trolleys & rails", description: "Carcass trolleys and overhead rail systems.", tag: "Butchery" },
  { image: IMG.greaseTrap, title: "Grease traps & drains", description: "Stainless interceptors and floor drains.", tag: "Drainage" },
];
