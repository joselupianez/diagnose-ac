export type AirConditioningAge = 
    "Less than 1 year"
    | "1-5 years"
    | "10-15 years"
    | "15-20 years"
    | "More than 20 years"
    | "Not sure";

export type AirConditioningType = 
    "Split system"
    | "Window unit"
    | "Central air conditioning"
    | "Portable air conditioner"
    | "Ductless mini-split"
    | "Packaged unit"
    | "Rooftop unit"
    | "Geothermal heatpump"
    | "Hybrid system"
    | "Not sure";

export type MaintenanceFrequency = 
    "Every 3 months"
    | "Every 6 months"
    | "Once a year"
    | "As needed/On-demand" 
    | "Never had maintenance";

export const airConditioningAges: AirConditioningAge[] = [
    "Less than 1 year",
    "1-5 years",
    "10-15 years",
    "15-20 years",
    "More than 20 years",
    "Not sure"
];

export const airConditioningTypes: AirConditioningType[] = [
    "Split system",
    "Window unit",
    "Central air conditioning",
    "Portable air conditioner",
    "Ductless mini-split",
    "Packaged unit",
    "Rooftop unit",
    "Geothermal heatpump",
    "Hybrid system",
    "Not sure"
];

export const maintenanceFrequencies: MaintenanceFrequency[] = [ 
    "Every 3 months",
    "Every 6 months",
    "Once a year",
    "As needed/On-demand",
    "Never had maintenance",
];