const values = {
    //Brequet's Range Equation Paramaters
    range: 8500,
    sfc: 0.5,
    aerodynamicEfficiency: 15,
    cruiseVelocity: 856,
    density: 1.225,
    clmax: 2.445,
    wingArea: 438,
    emptyWeightRatio: 0.47,

    //Known Weights in kg
    wp: 65000,
    wc: 500,
    specificGravity: 820,

    //Landing
    landingApproachAngle: 3,
    landingDistance: 1500,
    j: 1.15,
    N: 3,

    //Takeoff
    takeoffDistance: 2000,
    extraThrust: 17,
    cdo: 0.01655,
    maxAerodynamicEfficiency: 18,
    ostwaldEfficiency: 0.7,

    //Wing
    wingTaperRatio: 0.26,
    thicknessOfRoot: 15,
    frontSpar: 12,
    rearSpar: 60,
    fuelThickTolerance: 10, //Percentage of Thickness to leave

    //Fuselage
    a: 0.67,
    C: 0.43,
    finenessRatio: 10,

    //Horizontal and Vertical Tail
    cht: 1,
    cvt: 0.09,
    arht: 5,
    arvt: 3,
    trht: 0.3,
    trvt: 0.3
}

export default values;