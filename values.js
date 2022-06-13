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
    cdo: 0.01655, // drag polar co-efficients
    maxAerodynamicEfficiency: 18,
    ostwaldEfficiency: 0.7,

    //Wing
    wingTaperRatio: 0.26, 
    thicknessOfRoot: 15, // @ certain Percentage of chord length --location
    frontSpar: 12, // Percentage of chord length
    rearSpar: 60, // Percentage of chord length
    fuelThickTolerance: 10, //Percentage of Thickness to leave

    //Fuselage
    a: 0.67, // constants
    C: 0.43, // constants
    finenessRatio: 10,

    //Horizontal and Vertical Tail
    cht: 1, //chord of horizontal tail
    cvt: 0.09, // chord of vertical tail
    arht: 5, // aspect ration of horizontal tail
    arvt: 3, // aspect ration of vertical tail
    trht: 0.3, // taper ration of horizontal tail
    trvt: 0.3, // taper ration of vertical tail
    
    //Weight Breakage
    engineWt: 8282.59,
    engineCount: 2,
}

export default values;