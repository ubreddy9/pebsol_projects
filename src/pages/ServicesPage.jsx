import React from 'react';
import { useData } from '../context/DataContext';
import { 
  Building2, 
  Sun, 
  CheckCircle2, 
  ArrowRight, 
  Warehouse, 
  Zap, 
  Layers, 
  ShieldCheck,
  Check 
} from 'lucide-react';

export const ServicesPage = () => {
  const { setIsQuoteOpen, settings } = useData();

  const services = [
    {
      id: "peb-prefab",
      title: "PEB & Prefab Buildings",
      subtitle: "Rapid, Reliable, and Cost-Effective Industrial Construction",
      image: settings?.media?.servicePeb || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
      description: "Custom-designed Pre-Engineered metal buildings tailored for industrial manufacturing sheds, warehouses, pharmaceutical factories, and logistics terminals. Featuring wide column-free clear spans up to 60 meters, rapid erection, and 100% leak-proof standing seam roofing systems.",
      specs: [
        "Primary Framing: Built-up high-tensile tapered I-sections with automated submerged arc welding",
        "Secondary Framing: Cold roll-formed galvanized C & Z purlins (345 MPa tensile strength)",
        "Clear Spans: 15m to 60m column-free clear spans for maximum operational volume",
        "Execution Speed: 40% to 50% faster completion compared to conventional civil RCC",
        "Standards: AISC, MBMA, IS 800:2007, and IS 875 wind and seismic parameters"
      ],
      applications: ["Manufacturing Facilities", "Logistics & Warehousing", "Pharma Plants", "Aviation Hangars", "Industrial Sheds"]
    },
    {
      id: "solar-mms-ground",
      title: "Solar Module Mounting Structures (Ground Mount)",
      subtitle: "Utility-Scale Ground Mount Structures Engineered for 175 km/h Wind Resilience",
      image: settings?.media?.serviceSolarGround || "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&q=80&w=1200",
      description: "High-strength ground-mounted solar structural systems engineered for utility-scale solar parks and commercial solar power plants. Designed for rapid on-site assembly with both ramming post and concrete foundation configurations, delivering unmatched structural rigidity and longevity.",
      specs: [
        "Capacity: Over 700 MW annual manufacturing capacity from Medak plant",
        "Corrosion Protection: 80-micron minimum hot-dip galvanizing per IS 4759 / ASTM A123",
        "Wind Load Certification: Validated up to 175 km/h cyclonic wind speeds via wind tunnel tests",
        "Configuration: 2x Portrait, 4x Landscape, Fixed Tilt & Seasonal Tilt alignments",
        "Material: High-strength grade steel (YSt 250 / YSt 350 / Galvalume / POSMAC)"
      ],
      applications: ["Utility-Scale Solar Farms", "Captive Solar Plants", "Agricultural Solar Projects", "Government Solar Corridors"]
    },
    {
      id: "solar-rooftop",
      title: "Industrial Rooftop Solar Mounting Solutions",
      subtitle: "Non-Penetrating Seam Clamp Mounting for Factory & Warehouse Roofs",
      image: settings?.media?.serviceSolarRooftop || "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=1200",
      description: "Engineered rooftop solar mounting systems designed specifically for industrial standing seam and trapezoidal metal sheet roofs. Non-penetrating clamps attach securely to roof seams without piercing the sheet, ensuring 100% waterproof integrity and preserving building manufacturer warranties.",
      specs: [
        "Leak Protection: 100% non-penetrating mechanical seam clamps with EPDM cushioning",
        "Weight Optimization: High-strength extruded aluminum rails (6063-T6) minimize structural dead load",
        "Thermal Benefit: Rooftop solar shading reduces building interior temperature by 2°C to 4°C",
        "Speed: Fast-track click-clamp rail system reduces installation labor by 35%",
        "Tilt Options: Flush-to-roof or elevated tilt angle brackets (5° to 15°)"
      ],
      applications: ["Warehouse Roofs", "Textile & Spinning Mills", "Automotive Plants", "Commercial Malls"]
    },
    {
      id: "commercial-convention",
      title: "Commercial & Convention Centers",
      subtitle: "Architectural Steel Structures for Auditoriums, Retail & Event Spaces",
      image: settings?.media?.serviceCommercial || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
      description: "Grand, column-free steel structural architecture combining modern aesthetic porticos, glass facades, and acoustically insulated sandwich roof panels. Projects such as Ananda Convention Center and Devi Function Hall exemplify our ability to combine functional strength with exquisite visual elegance.",
      specs: [
        "Aesthetic Spans: Massive 45m+ pillar-free banquet hall spans",
        "Acoustic Control: Insulated composite sandwich panels preventing rain and external reverberation",
        "Facade Flexibility: Seamless integration with structural glazing, ACP, and tensile fabric",
        "Fast-Track Execution: Rapid delivery minimizing downtime for commercial developers"
      ],
      applications: ["Grand Convention Halls", "Exhibition Centers", "Retail Hypermarkets", "Auditoriums"]
    },
    {
      id: "solar-carports",
      title: "Solar Carports & EV Fleet Canopies",
      subtitle: "Waterproof Commercial Solar Parking Structures with EV Charging",
      image: settings?.media?.serviceCarport || "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1200",
      description: "Dual-purpose architectural solar canopies that shade corporate car parks while generating clean renewable electricity. Equipped with integrated waterproof gutters and built-in conduit channels for direct high-speed EV chargers.",
      specs: [
        "Waterproofing: Patented interlocking rubber gaskets and concealed perimeter drainage",
        "Finish: Hot-dip galvanized with polyurethane powder coating in custom corporate colors",
        "EV Ready: Pre-engineered cable trays and mounting bays for AC & DC fast chargers",
        "Structural Layout: Cantilever, T-frame, and inverted Y-frame single/double bay layouts"
      ],
      applications: ["IT Parks & Corporate Campuses", "Airports & Rail Terminals", "Hospital Parking", "Fleet Depots"]
    },
    {
      id: "warehouses-logistics",
      title: "Logistics Hubs & Light-Gauge Prefab Housing",
      subtitle: "High-Bay Distribution Terminals & Rapid Modular Steel Housing",
      image: settings?.media?.serviceWarehouse || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200",
      description: "Heavy logistics distribution centers with automated dock levelers, canopy projections, and FM2 floor load tie-ins, alongside light-gauge steel framed (LGSF) modular housing for fast-track accommodation and site offices.",
      specs: [
        "Internal Clear Height: 10m to 14m under roof hook for high-density pallet racking",
        "Dock Integration: Pre-punched loading bays designed for automated dock levelers",
        "LGSF Capabilities: Light-gauge cold-formed steel frames for multi-tier modular construction",
        "Environmental Rating: 100% recyclable steel supporting green building LEED certification"
      ],
      applications: ["E-Commerce Fulfilment", "Cold Storage Terminals", "Modular Site Offices", "Defense Housing"]
    }
  ];

  return (
    <div className="w-full bg-white text-slate-800">
      
      {/* Clean Banner */}
      <section className="bg-slate-50 border-b border-slate-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-emerald-700 font-bold uppercase tracking-wider text-xs bg-emerald-100 px-3 py-1 rounded-full">
            Our Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-['Barlow'] uppercase text-[#0f2b48] tracking-tight">
            PEB & Solar Services
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Delivering precision-engineered Pre-Engineered Buildings and Solar Module Mounting Solutions under one roof.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              
              <div className={`space-y-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Offering 0{index + 1}
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2b48] font-['Barlow'] uppercase">
                  {service.title}
                </h2>
                
                <p className="text-emerald-700 font-semibold text-sm">
                  {service.subtitle}
                </p>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Technical Parameters */}
                <div className="space-y-1.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Engineering Specifications
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {service.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Target Applications */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Applications
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.applications.map((app, aIdx) => (
                      <span key={aIdx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-medium border border-slate-200">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-all inline-flex items-center space-x-2 shadow-sm"
                  >
                    <span>Request Proposal for this Solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="rounded-xl overflow-hidden shadow-md border border-slate-200 h-[360px] group">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-14 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <h3 className="text-2xl font-bold font-['Barlow'] uppercase text-[#0f2b48]">
            Quality Standards & Structural Compliance
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            All PEBSOL steel structures adhere to IS 800:2007 (Structural Steel), IS 875 (Wind & Seismic Loads), AISC 360, MBMA, and IS 4759 hot-dip galvanizing standards.
          </p>
        </div>
      </section>

    </div>
  );
};
