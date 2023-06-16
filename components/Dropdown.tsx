import { Menu } from '@headlessui/react'
import { AirConditioningAge, airConditioningAges, AirConditioningType, airConditioningTypes, MaintenanceFrequency, maintenanceFrequencies } from '@/utils/dropdownTypes'
import {ChevronDownIcon} from "@heroicons/react/20/solid"

interface DropDownProps {
    currentDropdownItem: AirConditioningAge | AirConditioningType | MaintenanceFrequency;
    setDropDownItem: (currentDropdownItem: AirConditioningAge | AirConditioningType | MaintenanceFrequency) => void;
    dropdownItems: AirConditioningAge[] | AirConditioningType[] | MaintenanceFrequency[];
}

export default function Dropdown({currentDropdownItem, setDropDownItem, dropdownItems}: DropDownProps){
    return (
        <Menu as="div" className="relative block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-200 bg-slate-100 px-4 py-2 text-gray-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400">{currentDropdownItem}  <ChevronDownIcon className="h-6 w-4"/></Menu.Button>
            </div>
            <Menu.Items className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-md border border-gray-200 bg-white shadow-lg ring-1 ring-slate-500 ring-opacity-5 focus:outline-none overflow-hidden">
                {dropdownItems.map(item => (
                    <Menu.Item key={item}>
                        {({ active }) => (
                            <button
                                onClick={() => setDropDownItem(item)}
                                className={`${active && 'bg-slate-100'} ${item === currentDropdownItem && 'bg-slate-100 text-gray-700'} px-4 py-2 text-sm w-full text-left flex items-center space-x-2 justify-between`}
                            >
                                {item}
                            </button>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    )
}