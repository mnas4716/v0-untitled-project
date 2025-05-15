"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddressFieldsProps {
  addressValue: string
  suburbValue: string
  stateValue: string
  postcodeValue: string
  onAddressChange: (value: string) => void
  onSuburbChange: (value: string) => void
  onStateChange: (value: string) => void
  onPostcodeChange: (value: string) => void
  required?: boolean
}

export function AddressFields({
  addressValue,
  suburbValue,
  stateValue,
  postcodeValue,
  onAddressChange,
  onSuburbChange,
  onStateChange,
  onPostcodeChange,
  required = true,
}: AddressFieldsProps) {
  const australianStates = [
    { value: "NSW", label: "New South Wales" },
    { value: "VIC", label: "Victoria" },
    { value: "QLD", label: "Queensland" },
    { value: "WA", label: "Western Australia" },
    { value: "SA", label: "South Australia" },
    { value: "TAS", label: "Tasmania" },
    { value: "ACT", label: "Australian Capital Territory" },
    { value: "NT", label: "Northern Territory" },
  ]

  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Enter your street address"
          value={addressValue}
          onChange={(e) => onAddressChange(e.target.value)}
          required={required}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="suburb">Suburb</Label>
        <Input
          id="suburb"
          placeholder="Enter your suburb"
          value={suburbValue}
          onChange={(e) => onSuburbChange(e.target.value)}
          required={required}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="state">State</Label>
          <Select value={stateValue} onValueChange={onStateChange} required={required}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {australianStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            id="postcode"
            placeholder="Enter postcode"
            value={postcodeValue}
            onChange={(e) => onPostcodeChange(e.target.value)}
            required={required}
            maxLength={4}
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>
      </div>
    </>
  )
}
