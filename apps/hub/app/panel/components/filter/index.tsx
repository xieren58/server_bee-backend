import { PanelFilter } from '@/constant/enum/filter'
import { usePersistStore } from '@/store/persist-store'
import { Flex } from '@tremor/react'

import { useHydrationStore } from '@/hooks/useHydrationStore'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function FilterTool() {
    const panelOption = [
        {
            key: PanelFilter.All,
            label: 'all',
        },
        {
            key: PanelFilter.OnlyOnline,
            label: 'only online',
        },
        {
            key: PanelFilter.OnlyOffline,
            label: 'only offline',
        },
        {
            key: PanelFilter.HasData,
            label: 'has data',
        },
    ]

    const panelFilter = useHydrationStore(
        usePersistStore,
        (state) => state.panelFilter
    )

    const setPanelFilter = usePersistStore.use.setPanelFilter()

    return (
        <div className="py-3">
            <Flex className="w-auto" justifyContent="end">
                <RadioGroup
                    defaultValue={panelFilter}
                    value={panelFilter}
                    className="flex items-center gap-4"
                    onValueChange={(value) => {
                        setPanelFilter(value as PanelFilter)
                    }}
                >
                    {panelOption.map(({ key, label }) => (
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={key} id={label} />
                            <Label htmlFor={label}>{label}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </Flex>
        </div>
    )
}
