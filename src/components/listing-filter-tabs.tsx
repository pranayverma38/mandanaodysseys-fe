'use client'

import { Button } from '@/components/button'
import ButtonClose from '@/components/button-close'
import ButtonPrimary from '@/components/button-primary'
import ButtonThird from '@/components/button-third'
import { Checkbox, CheckboxField, CheckboxGroup } from '@/components/checkbox'
import { Description, Fieldset, Label } from '@/components/fieldset'
import NcInputNumber from '@/components/nc-input-number'
import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  PopoverPanelProps,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { FilterVerticalIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import clsx from 'clsx'
import Form from 'next/form'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { PriceRangeSlider } from './price-range-slider'

type CheckboxFilterOption = {
  name: string
  value?: string
  description?: string
  defaultChecked?: boolean
}

type CheckboxFilter = {
  label: string
  name: string
  tabUIType: 'checkbox'
  options: CheckboxFilterOption[]
}
type PriceRangeFilter = {
  name: string
  label: string
  tabUIType: 'price-range'
  min: number
  max: number
}
type FilterOptionLoose = {
  label: string
  name: string
  tabUIType: string
  options?: CheckboxFilterOption[]
  min?: number
  max?: number
}

type FilterOption = CheckboxFilter | PriceRangeFilter | SelectNumberFilter

const buildUrlFromFormData = (formData: FormData, pathname: string, currentParams: URLSearchParams) => {
  const params = new URLSearchParams()

  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string' && value !== '') {
      params.append(key.replace(/\[\]$/, ''), value)
    }
  }

  if (!formData.has('price_min') && !formData.has('price_max')) {
    const priceMin = currentParams.get('price_min')
    const priceMax = currentParams.get('price_max')
    if (priceMin) {
      params.set('price_min', priceMin)
    }
    if (priceMax) {
      params.set('price_max', priceMax)
    }
  }

  if (!params.has('location')) {
    const location = currentParams.get('location')
    if (location) {
      params.set('location', location)
    }
  }

  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}

const buildUrlFromDraftState = (
  pathname: string,
  draftSelections: Record<string, string[]>,
  draftPriceRange: [number, number] | null,
  priceFilter: FilterOptionLoose | undefined,
  currentParams: URLSearchParams
) => {
  const params = new URLSearchParams()

  Object.entries(draftSelections).forEach(([key, values]) => {
    values.forEach((value) => params.append(key, value))
  })

  if (draftPriceRange && priceFilter?.min !== undefined && priceFilter.max !== undefined) {
    const atDefault = draftPriceRange[0] === priceFilter.min && draftPriceRange[1] === priceFilter.max
    if (!atDefault) {
      params.set('price_min', String(draftPriceRange[0]))
      params.set('price_max', String(draftPriceRange[1]))
    }
  }

  if (!params.has('location')) {
    const location = currentParams.get('location')
    if (location) {
      params.set('location', location)
    }
  }

  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}

const getSelectedCheckboxValues = (searchParams: URLSearchParams, filterName: string) => {
  return searchParams.getAll(filterName)
}

const getPriceRangeSelection = (searchParams: URLSearchParams, min: number, max: number) => {
  const priceMin = searchParams.get('price_min')
  const priceMax = searchParams.get('price_max')

  if (!priceMin && !priceMax) {
    return null
  }

  return [priceMin ? Number(priceMin) : min, priceMax ? Number(priceMax) : max]
}

type SelectNumberFilter = {
  name: string
  label: string
  tabUIType: 'select-number'
  options: {
    name: string
    max: number
  }[]
}

const demo_filters_options: FilterOption[] = [
  {
    name: 'type-of-place',
    label: 'Type of place',
    tabUIType: 'checkbox',
    options: [
      {
        name: 'Entire place',
        value: 'entire_place',
        description: 'Have a place to yourself',
        defaultChecked: true,
      },
      {
        name: 'Private room',
        value: 'private_room',
        description: 'Have your own room and share some common spaces',
        defaultChecked: true,
      },
      {
        name: 'Hotel room',
        value: 'hotel_room',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Shared room',
        value: 'shared_room',
        description: 'Stay in a shared space, like a common room',
      },
    ],
  },
  {
    label: 'Price per day',
    name: 'price-per-day',
    tabUIType: 'price-range',
    min: 0,
    max: 1000,
  },
  {
    label: 'Rooms & Beds',
    name: 'rooms-beds',
    tabUIType: 'select-number',
    options: [
      { name: 'Beds', max: 10 },
      { name: 'Bedrooms', max: 10 },
      { name: 'Bathrooms', max: 10 },
    ],
  },
  {
    label: 'Amenities',
    name: 'amenities',
    tabUIType: 'checkbox',
    options: [
      {
        name: 'Kitchen',
        value: 'kitchen',
        description: 'Have a place to yourself',
        defaultChecked: true,
      },
      {
        name: 'Air conditioning',
        value: 'air_conditioning',
        description: 'Have your own room and share some common spaces',
        defaultChecked: true,
      },
      {
        name: 'Heating',
        value: 'heating',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Dryer',
        value: 'dryer',
        description: 'Stay in a shared space, like a common room',
      },
      {
        name: 'Washer',
        value: 'washer',
        description: 'Stay in a shared space, like a common room',
      },
    ],
  },
  {
    name: 'Facilities',
    label: 'Facilities',
    tabUIType: 'checkbox',
    options: [
      {
        name: 'Free parking on premise',
        value: 'free_parking_on_premise',
        description: 'Have a place to yourself',
      },
      {
        name: 'Hot tub',
        value: 'hot_tub',
        description: 'Have your own room and share some common spaces',
      },
      {
        name: 'Gym',
        value: 'gym',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Pool',
        value: 'pool',
        description: 'Stay in a shared space, like a common room',
      },
      {
        name: 'EV charger',
        value: 'ev_charger',
        description: 'Stay in a shared space, like a common room',
      },
    ],
  },
  {
    name: 'Property-type',
    label: 'Property type',
    tabUIType: 'checkbox',
    options: [
      {
        name: 'House',
        value: 'house',
        description: 'Have a place to yourself',
      },
      {
        name: 'Bed and breakfast',
        value: 'bed_and_breakfast',
        description: 'Have your own room and share some common spaces',
      },
      {
        name: 'Apartment',
        defaultChecked: true,
        value: 'apartment',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Boutique hotel',
        value: 'boutique_hotel',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Bungalow',
        value: 'bungalow',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Chalet',
        defaultChecked: true,
        value: 'chalet',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Condominium',
        defaultChecked: true,
        value: 'condominium',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Cottage',
        value: 'cottage',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Guest suite',
        value: 'guest_suite',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
      {
        name: 'Guesthouse',
        value: 'guesthouse',
        description: 'Have a private or shared room in a boutique hotel, hostel, and more',
      },
    ],
  },
  {
    name: 'House-rules',
    label: 'House rules',
    tabUIType: 'checkbox',
    options: [
      {
        name: 'Pets allowed',
        value: 'pets_allowed',
        description: 'Have a place to yourself',
      },
      {
        name: 'Smoking allowed',
        value: 'smoking_allowed',
        description: 'Have your own room and share some common spaces',
      },
    ],
  },
]

const CheckboxPanel = ({
  filterOption,
  selectedValues,
  onToggle,
  className,
}: {
  filterOption: CheckboxFilter
  selectedValues?: string[]
  onToggle?: (value: string, checked: boolean) => void
  className?: string
}) => {
  return (
    <Fieldset>
      <CheckboxGroup className={className}>
        {filterOption.options.map((option) => {
          const value = option.value ?? option.name
          const isChecked = selectedValues
            ? selectedValues.includes(value)
            : Boolean(option.defaultChecked)

          return (
            <CheckboxField key={value}>
              <Checkbox
                name={`${filterOption.name}[]`}
                value={value}
                checked={onToggle ? isChecked : undefined}
                defaultChecked={onToggle ? undefined : isChecked}
                onChange={onToggle ? (checked) => onToggle(value, checked) : undefined}
              />
              <Label>{option.name}</Label>
              {option.description && <Description>{option.description}</Description>}
            </CheckboxField>
          )
        })}
      </CheckboxGroup>
    </Fieldset>
  )
}
const PriceRagePanel = ({
  filterOption: { min, max },
  defaultValue,
  value,
  onChange,
}: {
  filterOption: PriceRangeFilter
  defaultValue?: number[]
  value?: number[]
  onChange?: (range: number[]) => void
}) => {
  const [rangePrices, setRangePrices] = useState(defaultValue ?? value ?? [min, max])

  useEffect(() => {
    if (value) {
      setRangePrices(value)
    }
  }, [value])

  const handleChange = (range: number[]) => {
    setRangePrices(range)
    onChange?.(range)
  }

  return (
    <PriceRangeSlider
      defaultValue={rangePrices}
      onChange={handleChange}
      min={min}
      max={max}
    />
  )
}
const NumberSelectPanel = ({ filterOption: { name, options } }: { filterOption: SelectNumberFilter }) => {
  return (
    <div className="relative flex flex-col gap-y-5">
      {options.map((option) => (
        <NcInputNumber key={option.name} inputName={option.name} label={option.name} max={option.max} />
      ))}
    </div>
  )
}

const ListingFilterTabs = ({
  filterOptions = demo_filters_options,
  className,
  optionPanelAnchor = 'bottom',
  inPageStaySearchWithMap,
  syncWithUrl = false,
  activeFilterCount,
}: {
  filterOptions?: FilterOptionLoose[]
  className?: string
  optionPanelAnchor?: PopoverPanelProps['anchor']
  inPageStaySearchWithMap?: boolean
  syncWithUrl?: boolean
  activeFilterCount?: number
}) => {
  const [showAllFilter, setShowAllFilter] = useState(false)
  const [draftSelections, setDraftSelections] = useState<Record<string, string[]>>({})
  const [draftPriceRange, setDraftPriceRange] = useState<[number, number] | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchParamsKey = searchParams.toString()
  const priceFilter = filterOptions.find((option) => option.tabUIType === 'price-range')

  useEffect(() => {
    if (!syncWithUrl) {
      return
    }

    const selections: Record<string, string[]> = {}
    filterOptions.forEach((option) => {
      if (option.tabUIType === 'checkbox') {
        selections[option.name] = getSelectedCheckboxValues(searchParams, option.name)
      }
    })
    setDraftSelections(selections)

    if (priceFilter?.min !== undefined && priceFilter.max !== undefined) {
      setDraftPriceRange(
        (getPriceRangeSelection(searchParams, priceFilter.min, priceFilter.max) ?? [
          priceFilter.min,
          priceFilter.max,
        ]) as [number, number]
      )
    }
  }, [searchParamsKey, syncWithUrl, filterOptions, priceFilter, searchParams])

  const toggleDraftSelection = useCallback((filterName: string, value: string, checked: boolean) => {
    setDraftSelections((current) => {
      const selected = current[filterName] ?? []
      const nextValues = checked ? [...selected, value] : selected.filter((item) => item !== value)

      return {
        ...current,
        [filterName]: nextValues,
      }
    })
  }, [])

  const applyDraftToUrl = useCallback(() => {
    router.push(
      buildUrlFromDraftState(pathname, draftSelections, draftPriceRange, priceFilter, searchParams),
      { scroll: false }
    )
  }, [draftPriceRange, draftSelections, pathname, priceFilter, router, searchParams])

  const clearDraftFilterGroup = useCallback(
    (filterName: string) => {
      const nextSelections = {
        ...draftSelections,
        [filterName]: [],
      }
      setDraftSelections(nextSelections)
      router.push(
        buildUrlFromDraftState(pathname, nextSelections, draftPriceRange, priceFilter, searchParams),
        { scroll: false }
      )
    },
    [draftPriceRange, draftSelections, pathname, priceFilter, router, searchParams]
  )

  const handleFormSubmit = async (formData: FormData) => {
    if (syncWithUrl) {
      applyDraftToUrl()
      return
    }

    const formDataObject = Object.fromEntries(formData.entries())
    console.log('Form submitted with data:', formDataObject)
  }

  const getDraftSelectionsForFilter = (filterName: string) => {
    if (syncWithUrl) {
      return draftSelections[filterName] ?? []
    }

    return getSelectedCheckboxValues(searchParams, filterName)
  }

  const handleClearAll = () => {
    if (syncWithUrl) {
      router.push(pathname, { scroll: false })
    }
    setShowAllFilter(false)
  }

  const getFilterSelectionCount = (filterOption: FilterOptionLoose) => {
    if (!syncWithUrl) {
      return filterOption.tabUIType === 'checkbox'
        ? filterOption.options?.filter((option) => option.defaultChecked).length ?? 0
        : 0
    }

    if (filterOption.tabUIType === 'checkbox') {
      return getSelectedCheckboxValues(searchParams, filterOption.name).length
    }

    if (filterOption.tabUIType === 'price-range') {
      return getPriceRangeSelection(searchParams, filterOption.min ?? 0, filterOption.max ?? 0) ? 1 : 0
    }

    return 0
  }

  const resolvedActiveFilterCount =
    activeFilterCount ??
    filterOptions.reduce((count, filterOption) => count + getFilterSelectionCount(filterOption), 0)

  if (!filterOptions || filterOptions.length === 0) {
    return <div>No filter options available</div>
  }

  return (
    <>
      {syncWithUrl ? (
        <PopoverGroup className={clsx('flex flex-wrap gap-2 2xl:gap-x-3', className)}>
          {filterOptions.map((filterOption, index) => {
          // only show 3 filters in the tab. Other filters will be shown in the All-filters-popover
          if (index > 2 || !filterOption) {
            return null
          }

          const checkedNumber = getFilterSelectionCount(filterOption)

          return (
            <Popover
              className={clsx('relative hidden shrink-0 sm:block', inPageStaySearchWithMap && 'lg:hidden xl:block')}
              key={index + filterOption.name}
            >
              <PopoverButton
                as={Button}
                outline
                className={clsx(
                  'h-10 font-normal sm:text-sm/5 md:px-3.5',
                  checkedNumber &&
                    'border-black! ring-1 ring-black ring-inset dark:border-neutral-200! dark:ring-neutral-200'
                )}
              >
                <span>{filterOption.label}</span>
                <ChevronDownIcon className="size-4" />
                {checkedNumber ? (
                  <span className="absolute top-0 -right-0.5 flex size-4 items-center justify-center rounded-full bg-black text-[0.65rem] font-medium text-white ring-2 ring-white dark:bg-neutral-200 dark:text-neutral-900 dark:ring-neutral-900">
                    {checkedNumber}
                  </span>
                ) : null}
              </PopoverButton>

              <PopoverPanel
                transition
                unmount={false}
                className="z-10 mt-3 w-90 transition data-closed:translate-y-1 data-closed:opacity-0"
                anchor={optionPanelAnchor}
              >
                <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                  <div className="hidden-scrollbar max-h-112 overflow-y-auto px-5 py-6">
                    {filterOption.tabUIType === 'checkbox' && (
                      <CheckboxPanel
                        filterOption={filterOption as CheckboxFilter}
                        selectedValues={getDraftSelectionsForFilter(filterOption.name)}
                        onToggle={
                          syncWithUrl
                            ? (value, checked) => toggleDraftSelection(filterOption.name, value, checked)
                            : undefined
                        }
                      />
                    )}
                    {filterOption.tabUIType === 'price-range' && (
                      <PriceRagePanel
                        filterOption={filterOption as PriceRangeFilter}
                        value={syncWithUrl ? draftPriceRange ?? undefined : undefined}
                        defaultValue={
                          syncWithUrl
                            ? undefined
                            : getPriceRangeSelection(
                                searchParams,
                                (filterOption as PriceRangeFilter).min,
                                (filterOption as PriceRangeFilter).max
                              ) ?? undefined
                        }
                        onChange={
                          syncWithUrl
                            ? (range) => setDraftPriceRange([range[0], range[1]] as [number, number])
                            : undefined
                        }
                      />
                    )}
                    {filterOption.tabUIType === 'select-number' && (
                      <NumberSelectPanel key={index} filterOption={filterOption as SelectNumberFilter} />
                    )}
                  </div>

                  <div className="flex items-center justify-between rounded-b-2xl bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
                    <CloseButton
                      className="-mx-3"
                      as={ButtonThird}
                      type="button"
                      onClick={syncWithUrl ? () => clearDraftFilterGroup(filterOption.name) : undefined}
                    >
                      Clear
                    </CloseButton>
                    {syncWithUrl ? (
                      <CloseButton type="button" as={ButtonPrimary} onClick={applyDraftToUrl}>
                        Apply
                      </CloseButton>
                    ) : (
                      <CloseButton type="submit" as={ButtonPrimary}>
                        Apply
                      </CloseButton>
                    )}
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          )
        })}

        {/* Open dialog All filter button  */}
        <Button
          outline
          onClick={() => setShowAllFilter(true)}
          className="h-10 w-full max-w-44 shrink-0 border-black! ring-1 ring-black ring-inset sm:w-auto sm:text-sm/normal dark:border-neutral-200! dark:ring-neutral-200"
        >
          <HugeiconsIcon icon={FilterVerticalIcon} size={16} color="currentColor" strokeWidth={1.5} />
          <span>All filters</span>
          {resolvedActiveFilterCount > 0 ? (
            <span className="absolute top-0 -right-0.5 flex size-4 items-center justify-center rounded-full bg-black text-[0.65rem] font-medium text-white ring-2 ring-white dark:bg-neutral-200 dark:text-neutral-900 dark:ring-neutral-900">
              {resolvedActiveFilterCount}
            </span>
          ) : null}
        </Button>
        </PopoverGroup>
      ) : (
        <PopoverGroup
          className={clsx('flex flex-wrap gap-2 2xl:gap-x-3', className)}
          as={Form}
          action={handleFormSubmit}
        >
          {filterOptions.map((filterOption, index) => {
            if (index > 2 || !filterOption) {
              return null
            }

            const checkedNumber = getFilterSelectionCount(filterOption)

            return (
              <Popover
                className={clsx('relative hidden shrink-0 sm:block', inPageStaySearchWithMap && 'lg:hidden xl:block')}
                key={index + filterOption.name}
              >
                <PopoverButton
                  as={Button}
                  outline
                  className={clsx(
                    'h-10 font-normal sm:text-sm/5 md:px-3.5',
                    checkedNumber &&
                      'border-black! ring-1 ring-black ring-inset dark:border-neutral-200! dark:ring-neutral-200'
                  )}
                >
                  <span>{filterOption.label}</span>
                  <ChevronDownIcon className="size-4" />
                  {checkedNumber ? (
                    <span className="absolute top-0 -right-0.5 flex size-4 items-center justify-center rounded-full bg-black text-[0.65rem] font-medium text-white ring-2 ring-white dark:bg-neutral-200 dark:text-neutral-900 dark:ring-neutral-900">
                      {checkedNumber}
                    </span>
                  ) : null}
                </PopoverButton>

                <PopoverPanel
                  transition
                  unmount={false}
                  className="z-10 mt-3 w-90 transition data-closed:translate-y-1 data-closed:opacity-0"
                  anchor={optionPanelAnchor}
                >
                  <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900">
                    <div className="hidden-scrollbar max-h-112 overflow-y-auto px-5 py-6">
                      {filterOption.tabUIType === 'checkbox' && (
                        <CheckboxPanel
                          filterOption={filterOption as CheckboxFilter}
                          selectedValues={getDraftSelectionsForFilter(filterOption.name)}
                        />
                      )}
                      {filterOption.tabUIType === 'price-range' && (
                        <PriceRagePanel
                          filterOption={filterOption as PriceRangeFilter}
                          defaultValue={
                            getPriceRangeSelection(
                              searchParams,
                              (filterOption as PriceRangeFilter).min,
                              (filterOption as PriceRangeFilter).max
                            ) ?? undefined
                          }
                        />
                      )}
                      {filterOption.tabUIType === 'select-number' && (
                        <NumberSelectPanel key={index} filterOption={filterOption as SelectNumberFilter} />
                      )}
                    </div>

                    <div className="flex items-center justify-between rounded-b-2xl bg-neutral-50 p-5 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
                      <CloseButton className="-mx-3" as={ButtonThird} type="button">
                        Clear
                      </CloseButton>
                      <CloseButton type="submit" as={ButtonPrimary}>
                        Apply
                      </CloseButton>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            )
          })}

          <Button
            outline
            onClick={() => setShowAllFilter(true)}
            className="h-10 w-full max-w-44 shrink-0 border-black! ring-1 ring-black ring-inset sm:w-auto sm:text-sm/normal dark:border-neutral-200! dark:ring-neutral-200"
          >
            <HugeiconsIcon icon={FilterVerticalIcon} size={16} color="currentColor" strokeWidth={1.5} />
            <span>All filters</span>
            {resolvedActiveFilterCount > 0 ? (
              <span className="absolute top-0 -right-0.5 flex size-4 items-center justify-center rounded-full bg-black text-[0.65rem] font-medium text-white ring-2 ring-white dark:bg-neutral-200 dark:text-neutral-900 dark:ring-neutral-900">
                {resolvedActiveFilterCount}
              </span>
            ) : null}
          </Button>
        </PopoverGroup>
      )}

      {/* All Filter Dialog */}
      <Dialog
        open={showAllFilter}
        onClose={() => setShowAllFilter(false)}
        className="relative z-50"
      >
        <DialogBackdrop transition className="fixed inset-0 bg-black/50 duration-200 ease-out data-closed:opacity-0" />
        <div className="fixed inset-0 flex max-h-screen w-screen items-center justify-center pt-3">
          <DialogPanel
            className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white text-left align-middle shadow-xl duration-200 ease-out dark:border dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 data-closed:translate-y-16 data-closed:opacity-0"
            transition
          >
            <div className="relative shrink-0 border-b border-neutral-200 p-4 text-center sm:px-8 dark:border-neutral-800">
              <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                Filters
              </DialogTitle>
              <div className="absolute end-2 top-2">
                <ButtonClose plain onClick={() => setShowAllFilter(false)} />
              </div>
            </div>

            <div className="hidden-scrollbar grow overflow-y-auto text-start">
              <div className="divide-y divide-neutral-200 px-4 sm:px-8 dark:divide-neutral-800">
                {filterOptions.map((filterOption, index) =>
                  filterOption ? (
                    <div key={index} className="py-7">
                      <h3 className="text-xl font-medium">{filterOption.label}</h3>
                      <div className="relative mt-6">
                        {filterOption.tabUIType === 'checkbox' && (
                          <CheckboxPanel
                            filterOption={filterOption as CheckboxFilter}
                            selectedValues={getDraftSelectionsForFilter(filterOption.name)}
                            onToggle={
                              syncWithUrl
                                ? (value, checked) => toggleDraftSelection(filterOption.name, value, checked)
                                : undefined
                            }
                          />
                        )}
                        {filterOption.tabUIType === 'price-range' && (
                          <PriceRagePanel
                            filterOption={filterOption as PriceRangeFilter}
                            value={syncWithUrl ? draftPriceRange ?? undefined : undefined}
                            defaultValue={
                              syncWithUrl
                                ? undefined
                                : getPriceRangeSelection(
                                    searchParams,
                                    (filterOption as PriceRangeFilter).min,
                                    (filterOption as PriceRangeFilter).max
                                  ) ?? undefined
                            }
                            onChange={
                          syncWithUrl
                            ? (range) => setDraftPriceRange([range[0], range[1]] as [number, number])
                            : undefined
                        }
                          />
                        )}
                        {filterOption.tabUIType === 'select-number' && (
                          <NumberSelectPanel key={index} filterOption={filterOption as SelectNumberFilter} />
                        )}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between bg-neutral-50 p-4 sm:px-8 dark:border-t dark:border-neutral-800 dark:bg-neutral-900">
              <ButtonThird className="-mx-3" onClick={handleClearAll} type="button">
                Clear all
              </ButtonThird>
              {syncWithUrl ? (
                <ButtonPrimary
                  type="button"
                  onClick={() => {
                    applyDraftToUrl()
                    setShowAllFilter(false)
                  }}
                >
                  Show results
                </ButtonPrimary>
              ) : (
                <ButtonPrimary type="submit" onClick={() => setShowAllFilter(false)}>
                  Show results
                </ButtonPrimary>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default ListingFilterTabs
