/**
 * @returns Rounded Value of Number
 */

function rounder(num) {
    return Number(Number(num).toFixed(3));
}

import values from './values.js';
import log from './logger.js';

//Brequet's Range Equation Paramaters
let range = values.range;
let sfc = values.sfc;
let aerodynamicEfficiency = values.aerodynamicEfficiency;
let cruiseVelocity = values.cruiseVelocity;
let density = values.density;
let clmax = values.clmax;
let wingArea = values.wingArea;
let emptyWeightRatio = values.emptyWeightRatio;

//Known Weights
let wp = values.wp;
let wc = values.wc;
let specificGravity = values.specificGravity;

//Landing
let landingApproachAngle = values.landingApproachAngle;
let landingDistance = values.landingDistance;
let j = values.j;
let N = values.N;

//Takeoff
let takeoffDistance = values.takeoffDistance;
let extraThrust = values.extraThrust;
let cdo = values.cdo;
let maxAerodynamicEfficiency = values.maxAerodynamicEfficiency;
let ostwaldEfficiency = values.ostwaldEfficiency;

//Wing
let wingTaperRatio = values.wingTaperRatio;
let thicknessOfRoot = values.thicknessOfRoot;
let frontSpar = values.frontSpar;
let rearSpar = values.rearSpar;
let fuelThickTolerance = values.fuelThickTolerance;

//Fuselage
let a = values.a;
let C = values.C;
let finenessRatio = values.finenessRatio;

//Horizontal and Vertical Tail
let cht = values.cht;
let cvt = values.cvt;
let arht = values.arht;
let arvt = values.arvt;
let trht = values.trht;
let trvt = values.trvt;

//Weight Breakage
let engineWt = values.engineWt;
let engineCount = values.engineCount;

//--------------------------------------------------------------------//

let pow = ((range * sfc) / (aerodynamicEfficiency * cruiseVelocity));
let expPow = Math.exp(pow);
let cruiseWeightRatio = rounder(1 / expPow);
let finalWeightRatio = rounder((0.97 * 0.98 * 0.995 * cruiseWeightRatio));
let fuelWeightRatio = rounder(1.06 * (1 - finalWeightRatio));

let wo = rounder(((wc + wp) / (1 - fuelWeightRatio - emptyWeightRatio)));
let wf = rounder(fuelWeightRatio * wo);
let we = rounder(emptyWeightRatio * wo);
let volumeOfFuel = rounder(wf / specificGravity);
let wingLoading = rounder(wo / wingArea);

let vstall = rounder(Math.sqrt((2 * wingLoading * 9.81) / (density * clmax)));
let landingvf = rounder(1.23 * vstall);
let landingTurnRadius = rounder((Math.pow(landingvf, 2.0) / 1.962));

let landinghf = rounder((landingTurnRadius * (1 - Math.cos(landingApproachAngle * 0.0175))));
let landingsa = rounder(((15 - landinghf) / Math.tan(landingApproachAngle * 0.0175)));
let landingsf = rounder((landingTurnRadius * Math.sin(landingApproachAngle * 0.0175)));
let landingsg = rounder(landingDistance - landingsa - landingsf);

let qda = rounder((Math.pow(j, 2.0) / (9.81 * density * clmax * 0.4)));
let qdb = rounder((j * N * Math.sqrt(2 / (density * clmax))));
let qdc = -landingsg;
let root = rounder((-qdb + Math.sqrt(Math.pow(qdb, 2.0) - 4 * qda * qdc)) / (2 * qda));
let landingWingLoading = rounder(Math.pow(root, 2.0));

let takeoffTurnRadius = rounder(((6.96 * vstall * vstall) / 9.81));
let takeoffApproachAngle = rounder((Math.acos(1 - (15 / takeoffTurnRadius)) * 57.296));
let takeoffsa = rounder((takeoffTurnRadius * Math.sin(takeoffApproachAngle * 0.0175)));
let takeoffsg = takeoffDistance - takeoffsa;

let twratio = rounder((1.21 * wingLoading / (density * clmax * takeoffsg)));

let thrustRequired = rounder((twratio * wo * 9.81));
let thrustAvailable = rounder(((1 + (extraThrust / 100)) * thrustRequired));

let K = rounder((1 / (4 * Math.pow(maxAerodynamicEfficiency, 2.0) * cdo)));
let wingAR = rounder((1 / (Math.PI * ostwaldEfficiency * K)));

let wingSpan = rounder((Math.sqrt(wingAR * wingArea)));
let wingcr = rounder((2 * wingArea / wingSpan) / (1 + wingTaperRatio));
let wingct = rounder(wingcr * wingTaperRatio);

let MAC = rounder(((2.0/3.0) * wingcr * (1.0 + wingTaperRatio + Math.pow(wingTaperRatio, 2.0)) / (1.0 + wingTaperRatio)));
let positionOfMAC = rounder(((wingSpan / 6.0) * (1.0 + (2.0 * wingTaperRatio)) * (1.0 + wingTaperRatio)));
let aerodynamicCentre = rounder(0.25 * MAC);

let fuelThick = rounder(((100 - fuelThickTolerance) / 100 * (thicknessOfRoot * wingcr / 100.0)));
let fuelBreadth = rounder(((rearSpar / 100.0 * wingcr) - (frontSpar / 100.0 * wingcr)));
let fuelLength = rounder(volumeOfFuel / (2 * fuelBreadth * fuelThick));

let Lb = rounder((a * Math.pow((wo * 2.205), C)) * 0.305);
let Db = rounder(Lb / finenessRatio);
let Rb = rounder(Db / 2.0);
let MCSA = rounder((Math.PI * Rb * Rb));

let Lvt = rounder(Lb / 2);
let Svt = rounder((cvt * wingSpan * wingArea) / Lvt);
let bvt = rounder(Math.sqrt(Svt * arvt));

let crvt = rounder((2 * Svt / bvt) / (1 + trvt));
let ctvt = rounder(crvt * trvt);

let Lht = rounder(Lb / 2);
let Sht = rounder((cht * MAC * wingArea) / Lht);
let bht = rounder(Math.sqrt(Sht * arht));

let crht = rounder((2 * Sht / bht) / (1 + trht));
let ctht = rounder(crht * trht);

let dryWt = rounder(wo - wf);
let bf = Lb;

let cockpitDis = rounder((0.06 * bf));
let mlgDis = rounder((0.12 * bf));
let paybay1Dis = rounder((0.25 * bf));
let equipmentsDis = rounder((0.37 * bf));
let fusAndMlgDis = rounder((0.48 * bf));
let paybay2Dis = rounder((0.6 * bf));
let hvstabliziersDis = rounder((0.93 * bf));

let mlgWt = rounder(0.01 * dryWt);
let eachPayBayWt = rounder(wp / 2);
let equipmentWt = rounder(0.004 * dryWt);
let fusAndMlgWt = rounder(0.3 * dryWt);
let hvstabliziersWt = rounder(0.03 * dryWt);

let wingWt = rounder(2.5 * wingArea);
let totalEngineWeight = rounder(engineCount * engineWt);
let oldAddedWeights = rounder(mlgWt + (eachPayBayWt * 2) + equipmentWt + fusAndMlgWt + hvstabliziersWt + wingWt + totalEngineWeight)
let weightAddition = rounder((dryWt - oldAddedWeights) / 3);

let cockpitWt = weightAddition;
let newEachPaybayWt = rounder(eachPayBayWt + weightAddition);

let summationW = rounder(mlgWt + equipmentWt + fusAndMlgWt + hvstabliziersWt + cockpitWt + (newEachPaybayWt * 2));
let summationWL = rounder((mlgWt * mlgDis) + (newEachPaybayWt * paybay1Dis) + (equipmentsDis * equipmentWt) + (fusAndMlgDis * fusAndMlgWt) + (hvstabliziersDis * hvstabliziersWt) + (cockpitWt * cockpitDis) + (newEachPaybayWt * paybay2Dis));
let XbarWithoutWing = rounder(summationWL / summationW);

let Wingcg = rounder(0.4 * MAC);
let XbarWithWing = rounder((summationWL + (wingWt * (XbarWithoutWing + (Wingcg - aerodynamicCentre)))) / (summationW + wingWt));

//-------------------------------------------------------------------------------------------

log("\n\n---------------------------------\nAircraft Design Project Helper\nMade by lolliellolliate.\n---------------------------------\n\n");

log("Given Paramteres:", 'main');
log("-----------------------------------");
log("")

log("Weight Estimation Paramters", "heading");
log("------------------------------------", "line");
log("Range (R): " + range + " km");
log("Specific Fuel Consumption (Ct): " + sfc);
log("Aerodynamic Efficiency (L/D): " + aerodynamicEfficiency);
log("Cruise Velocity (Vcruise): " + cruiseVelocity + " km/hr");

log("");
log("");

log("Density of Air: " + density);
log("Clmax of Airfoil: " + clmax);
log("Wing Area (S): " + wingArea + " m2");

log("");
log("");

log("Empty Weight to Overall Weight Ratio (we/wo): " + emptyWeightRatio);
log("Payload Weight (Wp): " + wp + " kg");
log("Crew Weight (Wc): " + wp + " kg");
log("Specific Gravity of Fuel: " + specificGravity);

log("");
log("");

log("Landing Performance Parameters", "heading");
log("------------------------------------", "line");
log("Landing Approach Angle: " + landingApproachAngle + " degrees");
log("Total Landing DIstance (S): " + landingDistance + " m");
log("Value of j: " + j);
log("Value of N: " + N);

log("");
log("");

log("Take-Off Performance Parameters", "heading");
log("------------------------------------", "line");
log("Total Take-off Distance (S): " + takeoffDistance + " m");
log("Extra Thrust Percentage: " + extraThrust );
log("Value of CDo: " + cdo);
log("Maximum Aerodynamic Efficiency (L/D)max: " + maxAerodynamicEfficiency);
log("Ostwald's Efficiecy Factor (e): " + ostwaldEfficiency);

log("");
log("");

log("Wing Configuration Parameters", "heading");
log("------------------------------------", "line");
log("WIng's Taper Ratio: " + wingTaperRatio);
log("Maximum THickness at Root Airfoil: " + thicknessOfRoot);
log("Front Spar Percentage: " + frontSpar + " %");
log("Rear Spar Percentage: " + rearSpar + " %");

log("");
log("");

log("Fuselage Configuration Parameters", "heading");
log("------------------------------------", "line");
log("Value of a (Fuselage): " + a);
log("Value of C (Fuselage): " + C);
log("Fineness Ratio (Lb/Db): " + finenessRatio);

log("");
log("");

log("Emphennage Configuration Parameters", "heading");
log("------------------------------------", "line");
log("Horizontal Tail Volume Co-efficient (CHT): " + cht);
log("Vertical Tail Volume Co-efficient (CVT): " + cvt);
log("Aspect Ratio of HT: " + arht);
log("Aspect Ratio of VT: " + arvt);
log("Taper Ratio of HT: " + trht);
log("Taper Ratio of VT: " + trvt);
log("------------------------------------", "line");

log("");
log("");
log("------------------------------------", "line");
log("Results:", 'main');
log("------------------------------------", "line");
log("");

log("Brequet's Range Equation", "heading");
log("------------------------------------", "line");
log("Your Aircraft's W3/W2 ratio is approx: " + cruiseWeightRatio);
log("Your Aircraft's W5/Wo ratio is " + finalWeightRatio);
log("Your Aircraft's Wf/Wo ratio is " + fuelWeightRatio);
log("------------------------------------", "line");
log("");

log("Weight Estimation", "heading");
log("------------------------------------", "line");
log("Aircraft's Overall Weight: " + wo + " kg");
log("AIrcraft's Empty Weight: " + we + " kg");
log("Aircraft's Fuel Weight: " + wf + " kg (" + rounder(wf * 1000/specificGravity) + " l)");
log("Aircraft's Max Wing Loading (W/S): " + wingLoading + " kg/m2");
log("Fuel Tank Volume in m3: " + volumeOfFuel);
log("------------------------------------", "line");
log("");

log("Landing Performance", "heading");
log("------------------------------------", "line");
log("Stall Velocity (Vstall): " + vstall + " m/s");
log("Flare Velocity (Vf): " + landingvf + " m/s");
log("Turn Radius (R): " + landingTurnRadius + " m");
log("Height of Flare (hf): " + landinghf + " m");
log("Flare Distance (Sf): " + landingsf + " m");
log("Approach Distance (Sa): " + landingsa + " m");
log("Ground Run Distance (Sg): " + landingsg + " m");
log("Landing Wing Loading (W/S): " + rounder((landingWingLoading / 9.81)) + " kg (" + rounder(landingWingLoading) + " N)");
log("------------------------------------", "line");
log("");

log("Take-Off Performance", "heading");
log("------------------------------------", "line");
log("Turn Radius (R): " + takeoffTurnRadius + " m");
log("Approach Angle: " + takeoffApproachAngle + " degrees");
log("Approach Distance (Sa): " + takeoffsa + " m");
log("Ground Run Distance (Sg): " + takeoffsg + " m");
log("Thrust to Weight Ratio (T/W): " + twratio);
log("Thrust Required (TR): " + thrustRequired + " N (" + rounder(thrustRequired / 1000) + " kN)");
log("Thrust Available (TA): " + thrustAvailable + " N (" + rounder(thrustAvailable / 1000) + " kN)");
log("Value of K in Drag Polar Equation: " + K);
log("Aspect Ratio (AR): " + wingAR);
log("------------------------------------", "line");
log("");

log("Wing Configuration", "heading");
log("------------------------------------", "line");
log("Wing Span (b): " + wingSpan + " m");
log("Root Chord (Cr): " + wingcr + " m");
log("Tip Chord (Ct): " + wingct + " m");
log("Mean Aerodynamic Chord (MAC): " + MAC + " m");
log("Position of MAC: " + positionOfMAC + " m");
log("Aerodynamic Centre: " + aerodynamicCentre + " m");
log("Total Volume of Fuel: " + volumeOfFuel + " m3");
log("Volume of Fuel per Wing: " + rounder((volumeOfFuel / 2.0)) + " m3");
log("Fuel Tank Configuration Per Wing: " + "Length: " + fuelLength + "m | Breadth: " + fuelBreadth + "m | Thickness: " + fuelThick + "m");
log("------------------------------------", "line");
log("");

log("Fuselage Configuration", "heading");
log("------------------------------------", "line");
log("Span of Fuselage (Lb): " + Lb + " m");
log("Diameter of Fuselage (Db): " + Db + " m");
log("Radius of Fuselage (Rb): " + Rb + " m");
log("MAximum Cross Sectional Area of Fuselage: " + MCSA + " m");
log("Fuselage part removed from Wing Span: " + rounder(wingSpan - Db) + " m");
log("------------------------------------", "line");

log("");

log("Emphennage Configuration", "heading");
log("------------------------------------", "line");
log("Horizontal Tail Configuration", "heading");
log("------------------------------------", "line");
log("Length of Horizontal Tail (LVT): " + Lht + " m");
log("Span of Horizontal Tail (bVT): " + bht + " m");
log("Area of Horizontal Tail (SVT): " + Sht + " m2");
log("Root Chord of Horizontal Tail (CrVT): " + crht + " m");
log("Tip Chord of Horizontal Tail (CtVT): " + ctht + " m");
log("------------------------------------", "line");

log("");

log("------------------------------------", "line");
log("Vertical Tail Configuration", "heading");
log("------------------------------------", "line");
log("Length of Vertical Tail (LVT): " + Lvt + " m");
log("Span of Vertical Tail (bVT): " + bvt + " m");
log("Area of Vertical Tail (SVT): " + Svt + " m2");
log("Root Chord of Vertical Tail (CrVT): " + crvt + " m");
log("Tip Chord of Vertical Tail (CtVT): " + ctvt + " m");
log("------------------------------------", "line");
log("");

log("------------------------------------", "line");
log("Location from Nose:", "heading");
log("------------------------------------", "line");
log("Crew + Cockpit Equipments (6%): " + cockpitDis + " m");
log("Main Landing Gear (12%): " + mlgDis + " m");
log("Payload Bay 1 (25%): " + paybay1Dis + " m");
log("Fixed Equipments (37%): " + equipmentsDis + " m");
log("Fuselage + Main Landing Gear (48%): " + fusAndMlgDis + " m");
log("Payload Bay 2 (60%): " + paybay2Dis + " m");
log("Horizontal + Vertical Stabilizers (93%): " + hvstabliziersDis + " m");

log("");

log("------------------------------------", "line");
log("Weights of Each Part in (kg):", "heading");
log("------------------------------------", "line");
log("Dry Weight: " + dryWt + " kg");
log("Crew + Cockpit Equipments: " + cockpitWt + " kg");
log("Main Landing Gear (1%): " + mlgWt + " kg");
log("Payload Bay 1: " + newEachPaybayWt + " kg");
log("Fixed Equipments (0.4%): " + equipmentWt + " kg");
log("Fuselage + Main Landing Gear (30%): " + fusAndMlgWt + " kg");
log("Payload Bay 2: " + newEachPaybayWt + " kg");
log("Horizontal + Vertical Stabilizers (3%): " + hvstabliziersWt + " kg");

log("");
log("");

log("------------------------------------", "line");
log("Centre of Gravity Location:", "heading");
log("------------------------------------", "line");
log("Weight of the Wing: " + wingWt + " kg");
log("Summation W: " + summationW + " kg");
log("Summation Wl: " + summationWL + " kg");
log("Centre of Gravity of Wing: " + Wingcg + " m");
log("Xbar without Wing: " + XbarWithoutWing + " m");
log("Xbar with Wing: " + XbarWithWing + " m");